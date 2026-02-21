import React, { useState, useRef, useEffect } from 'react';

// SEO-optimierte Bild-Komponente mit Lazy Loading und Hover-Effekten
export const ServiceImage = ({ 
  src, 
  alt, 
  title,
  geoText,
  className = '',
  aspectRatio = '16/9',
  showOverlay = true,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

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
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <figure 
      ref={imgRef}
      className={`relative overflow-hidden rounded-xl group ${className}`}
      style={{ aspectRatio }}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      {/* Placeholder während des Ladens */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Bild mit Lazy Loading */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          title={title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-500
            group-hover:scale-110
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          itemProp="contentUrl"
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
          <div className="text-white">
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
        />
      ))}
    </div>
  );
};

// Hero-Bild mit GEO-Text-Sektion
export const ServiceHeroImage = ({
  image,
  children,
  height = 'h-[400px]',
  overlay = true
}) => {
  if (!image?.url) return null;

  return (
    <section 
      className={`relative ${height} overflow-hidden`}
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <img
        src={image.url}
        alt={image.alt}
        title={image.title}
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        itemProp="contentUrl"
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
