import React, { useState, useRef, useEffect } from 'react';

// Standard-Dimensionen für verschiedene Bildtypen
const IMAGE_DIMENSIONS = {
  thumbnail: { width: 400, height: 300 },
  card: { width: 600, height: 400 },
  hero: { width: 1200, height: 800 },
  full: { width: 1920, height: 1080 }
};

// SEO-optimierte Bild-Komponente mit Lazy Loading, Blur-Placeholder und Hover-Effekten
export const ServiceImage = ({ 
  src, 
  alt, 
  title,
  geoText,
  className = '',
  aspectRatio = '16/9',
  showOverlay = true,
  priority = false,
  size = 'card' // thumbnail, card, hero, full
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  
  const dimensions = IMAGE_DIMENSIONS[size] || IMAGE_DIMENSIONS.card;

  // Lazy loading mit Intersection Observer
  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' } // Preload images 200px before they enter viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <figure 
      ref={imgRef}
      className={`relative overflow-hidden rounded-xl group lqip-container ${className}`}
      style={{ aspectRatio }}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      {/* Shimmer Placeholder während des Ladens */}
      <div 
        className={`absolute inset-0 img-placeholder transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      
      {/* Bild mit optimiertem Loading */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          title={title}
          width={dimensions.width}
          height={dimensions.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-500
            group-hover:scale-110
            img-fade-in ${isLoaded ? 'loaded' : ''}
          `}
          itemProp="contentUrl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      
      {/* Hover Overlay mit Titel */}
      {showOverlay && (
        <div className="
          absolute inset-0 
          bg-gradient-to-t from-black/70 via-black/20 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          flex items-end p-4
        ">
          <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-semibold text-lg" itemProp="name">{title}</h3>
            {geoText && (
              <p className="text-sm text-white/80 mt-1 line-clamp-2" itemProp="description">
                {geoText}
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Schema.org Metadaten */}
      <meta itemProp="description" content={alt} />
      <meta itemProp="width" content={dimensions.width} />
      <meta itemProp="height" content={dimensions.height} />
    </figure>
  );
};

// Galerie-Komponente mit Hover Cards
export const ServiceGallery = ({ 
  images, 
  columns = 3,
  gap = 'gap-4',
  className = ''
}) => {
  if (!images || images.length === 0) return null;
  
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div 
      className={`grid ${gridCols[columns] || gridCols[3]} ${gap} ${className}`}
      itemScope 
      itemType="https://schema.org/ImageGallery"
    >
      {images.map((image, index) => (
        <ServiceImage
          key={image.id || index}
          src={image.url}
          alt={image.alt}
          title={image.title}
          geoText={image.geoText}
          priority={index < 2}
          size="card"
        />
      ))}
    </div>
  );
};

// Hero-Bild mit GEO-Text-Sektion und optimiertem Loading
export const ServiceHeroImage = ({
  image,
  children,
  height = 'h-[400px]',
  overlay = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  if (!image?.url) return null;

  return (
    <section 
      className={`relative ${height} overflow-hidden lqip-container`}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      {/* Shimmer Placeholder */}
      <div 
        className={`absolute inset-0 img-placeholder transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      />
      
      <img
        src={image.url}
        alt={image.alt}
        title={image.title}
        width={1920}
        height={800}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover img-fade-in ${isLoaded ? 'loaded' : ''}`}
        itemProp="contentUrl"
        sizes="100vw"
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      )}
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>
      
      <meta itemProp="description" content={image.alt} />
      <meta itemProp="width" content="1920" />
      <meta itemProp="height" content="800" />
    </section>
  );
};

// Bild-Slider für mehrere Bilder
export const ServiceImageSlider = ({ images, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl" itemScope itemType="https://schema.org/ImageGallery">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={image.id || index} className="w-full flex-shrink-0">
            <ServiceImage
              src={image.url}
              alt={image.alt}
              title={image.title}
              geoText={image.geoText}
              aspectRatio="16/9"
              priority={index === 0}
              size="hero"
            />
          </div>
        ))}
      </div>
      
      {/* Slider Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}
              `}
              aria-label={`Bild ${index + 1} anzeigen`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// GEO-Text-Sektion mit Bild
export const GeoImageSection = ({
  image,
  heading,
  text,
  reverse = false,
  className = ''
}) => {
  if (!image?.url) return null;

  return (
    <section 
      className={`py-12 ${className}`}
      itemScope
      itemType="https://schema.org/Article"
    >
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-8 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <ServiceImage
              src={image.url}
              alt={image.alt}
              title={image.title}
              geoText={image.geoText}
              aspectRatio="4/3"
              size="card"
            />
          </div>
          
          <div className={reverse ? 'lg:order-1' : ''}>
            {heading && (
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4" itemProp="headline">
                {heading}
              </h2>
            )}
            {text && (
              <p className="text-gray-600 leading-relaxed" itemProp="articleBody">
                {text}
              </p>
            )}
            {image.geoText && !text && (
              <p className="text-gray-600 leading-relaxed" itemProp="articleBody">
                {image.geoText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceImage;
