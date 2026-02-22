"""
Media Service - Bildverarbeitung & Storage Management
Unterstützt Komprimierung, Resizing und WebP-Konvertierung
"""

import os
import uuid
import re
from pathlib import Path
from PIL import Image
from io import BytesIO
from typing import Optional, Tuple
import logging

logger = logging.getLogger(__name__)

# Configuration
MAX_WIDTH = 1600
MAX_HEIGHT = 1200
JPEG_QUALITY = 85
WEBP_QUALITY = 80

# Media directory structure
MEDIA_ROOT = Path("/app/backend/media")
REFERENCES_DIR = MEDIA_ROOT / "references"

# Ensure directories exist
MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
REFERENCES_DIR.mkdir(parents=True, exist_ok=True)


class MediaService:
    """Handles image upload, processing, and storage"""
    
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'webp'}
    ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/gif', 'image/webp'}
    
    def __init__(self):
        self.media_root = MEDIA_ROOT
        self.references_dir = REFERENCES_DIR
    
    def _sanitize_filename(self, filename: str) -> str:
        """Create a clean, SEO-friendly filename"""
        # Clean the base name (extension handled separately)
        base = filename.rsplit('.', 1)[0] if '.' in filename else filename
        base = base.lower()
        base = re.sub(r'[^a-z0-9\-_]', '-', base)  # Replace non-alphanumeric
        base = re.sub(r'-+', '-', base)  # Remove multiple dashes
        base = base.strip('-')[:50]  # Limit length
        
        # Generate unique filename with clean base
        unique_id = uuid.uuid4().hex[:8]
        
        return f"{base}-{unique_id}" if base else unique_id
    
    def _get_image_format(self, content_type: str, convert_to_webp: bool = False) -> Tuple[str, str]:
        """
        Determine output format and extension
        Returns: (format, extension)
        """
        if convert_to_webp:
            return ('WEBP', 'webp')
        
        format_map = {
            'image/jpeg': ('JPEG', 'jpg'),
            'image/png': ('PNG', 'png'),
            'image/gif': ('GIF', 'gif'),
            'image/webp': ('WEBP', 'webp'),
        }
        
        return format_map.get(content_type, ('JPEG', 'jpg'))
    
    def _resize_image(self, image: Image.Image, max_width: int = MAX_WIDTH, max_height: int = MAX_HEIGHT) -> Image.Image:
        """
        Resize image while maintaining aspect ratio
        Only downscales, never upscales
        """
        original_width, original_height = image.size
        
        # Don't upscale
        if original_width <= max_width and original_height <= max_height:
            return image
        
        # Calculate new dimensions
        ratio = min(max_width / original_width, max_height / original_height)
        new_width = int(original_width * ratio)
        new_height = int(original_height * ratio)
        
        # Use high-quality resampling
        return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    def _process_image(
        self, 
        image_data: bytes, 
        content_type: str,
        convert_to_webp: bool = False
    ) -> Tuple[bytes, str, str]:
        """
        Process image: resize and optionally convert
        Returns: (processed_bytes, format, extension)
        """
        try:
            # Open image
            image = Image.open(BytesIO(image_data))
            
            # Convert RGBA to RGB for JPEG (no alpha channel support)
            output_format, extension = self._get_image_format(content_type, convert_to_webp)
            
            if output_format == 'JPEG' and image.mode in ('RGBA', 'P'):
                # Create white background for transparency
                background = Image.new('RGB', image.size, (255, 255, 255))
                if image.mode == 'P':
                    image = image.convert('RGBA')
                background.paste(image, mask=image.split()[3] if len(image.split()) == 4 else None)
                image = background
            elif output_format != 'PNG' and image.mode == 'RGBA':
                image = image.convert('RGB')
            
            # Resize
            image = self._resize_image(image)
            
            # Save to bytes
            output = BytesIO()
            
            if output_format == 'JPEG':
                image.save(output, format='JPEG', quality=JPEG_QUALITY, optimize=True)
            elif output_format == 'WEBP':
                image.save(output, format='WEBP', quality=WEBP_QUALITY, optimize=True)
            elif output_format == 'PNG':
                image.save(output, format='PNG', optimize=True)
            else:
                image.save(output, format=output_format)
            
            return output.getvalue(), output_format, extension
            
        except Exception as e:
            logger.error(f"Image processing error: {e}")
            raise ValueError(f"Bildverarbeitung fehlgeschlagen: {str(e)}")
    
    async def upload_reference_image(
        self,
        file_data: bytes,
        original_filename: str,
        content_type: str,
        generate_webp: bool = True
    ) -> dict:
        """
        Upload and process a reference image.
        Always saves optimized original format.
        Optionally generates WebP version for modern browsers.
        
        Returns: {
            'url': str (primary - WebP if available),
            'url_webp': str | None,
            'url_fallback': str (original format),
            'filename': str,
            'size': int,
            'format': str
        }
        """
        # Validate content type
        if content_type not in self.ALLOWED_MIME_TYPES:
            raise ValueError(f"Ungültiger Dateityp: {content_type}")
        
        # Generate clean base filename
        base_name = self._sanitize_filename(original_filename)
        
        # Ensure unique base name
        counter = 1
        test_path = self.references_dir / f"{base_name}.webp"
        while test_path.exists():
            base_name_new = f"{base_name}-{counter}"
            test_path = self.references_dir / f"{base_name_new}.webp"
            counter += 1
        if counter > 1:
            base_name = f"{base_name}-{counter-1}"
        
        result = {
            'url': None,
            'url_webp': None,
            'url_fallback': None,
            'filename': base_name,
            'size': 0,
            'format': None,
            'width': 0,
            'height': 0
        }
        
        # 1. Process and save original format (optimized)
        original_data, original_format, original_ext = self._process_image(
            file_data, 
            content_type, 
            convert_to_webp=False
        )
        
        original_filename = f"{base_name}.{original_ext}"
        original_filepath = self.references_dir / original_filename
        
        with open(original_filepath, 'wb') as f:
            f.write(original_data)
        
        result['url_fallback'] = f"/media/references/{original_filename}"
        result['format'] = original_format.lower()
        result['size'] = len(original_data)
        
        # Get dimensions
        img = Image.open(BytesIO(original_data))
        result['width'] = img.size[0]
        result['height'] = img.size[1]
        
        logger.info(f"Original saved: {original_filename} ({len(original_data)} bytes)")
        
        # 2. Generate WebP version (if not already WebP)
        if generate_webp and original_format.upper() != 'WEBP':
            try:
                webp_data, _, _ = self._process_image(
                    file_data,
                    content_type,
                    convert_to_webp=True
                )
                
                webp_filename = f"{base_name}.webp"
                webp_filepath = self.references_dir / webp_filename
                
                with open(webp_filepath, 'wb') as f:
                    f.write(webp_data)
                
                result['url_webp'] = f"/media/references/{webp_filename}"
                logger.info(f"WebP saved: {webp_filename} ({len(webp_data)} bytes, {round((1 - len(webp_data)/len(original_data))*100)}% smaller)")
                
            except Exception as e:
                logger.warning(f"WebP generation failed, using original only: {e}")
        
        # Set primary URL (prefer WebP)
        result['url'] = result['url_webp'] if result['url_webp'] else result['url_fallback']
        
        return result
    
    def delete_reference_image(self, url: str) -> bool:
        """
        Delete a reference image by its URL.
        Also deletes associated WebP/fallback version if exists.
        """
        if not url or not url.startswith('/media/references/'):
            return False
        
        filename = url.split('/')[-1]
        filepath = self.references_dir / filename
        deleted = False
        
        # Delete the specified file
        if filepath.exists():
            try:
                filepath.unlink()
                logger.info(f"Image deleted: {filename}")
                deleted = True
            except Exception as e:
                logger.error(f"Failed to delete {filename}: {e}")
        
        # Also try to delete associated format
        base_name = filename.rsplit('.', 1)[0] if '.' in filename else filename
        ext = filename.rsplit('.', 1)[1] if '.' in filename else ''
        
        # If deleted WebP, try to delete original
        if ext == 'webp':
            for fallback_ext in ['jpg', 'jpeg', 'png']:
                fallback_path = self.references_dir / f"{base_name}.{fallback_ext}"
                if fallback_path.exists():
                    try:
                        fallback_path.unlink()
                        logger.info(f"Fallback deleted: {base_name}.{fallback_ext}")
                    except Exception as e:
                        logger.warning(f"Failed to delete fallback: {e}")
        # If deleted original, try to delete WebP
        else:
            webp_path = self.references_dir / f"{base_name}.webp"
            if webp_path.exists():
                try:
                    webp_path.unlink()
                    logger.info(f"WebP deleted: {base_name}.webp")
                except Exception as e:
                    logger.warning(f"Failed to delete WebP: {e}")
        
        return deleted
                filepath.unlink()
                logger.info(f"Image deleted: {filename}")
                return True
            except Exception as e:
                logger.error(f"Failed to delete {filename}: {e}")
                return False
        
        return False
    
    def get_media_stats(self) -> dict:
        """Get statistics about stored media"""
        total_size = 0
        file_count = 0
        
        for filepath in self.references_dir.glob('*'):
            if filepath.is_file():
                total_size += filepath.stat().st_size
                file_count += 1
        
        return {
            'references': {
                'count': file_count,
                'total_size_bytes': total_size,
                'total_size_mb': round(total_size / (1024 * 1024), 2)
            }
        }


# Singleton instance
media_service = MediaService()
