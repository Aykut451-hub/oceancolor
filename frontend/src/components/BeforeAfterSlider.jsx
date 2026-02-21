import React, { useState, useRef, useEffect, useCallback } from 'react';

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  beforeAlt = 'Vorher Bild',
  afterAlt = 'Nachher Bild',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initial animation when component comes into view
  useEffect(() => {
    if (isInView && isLoaded && !hasAnimated) {
      // Start from 20%
      setSliderPosition(20);
      
      // Animate to 80%
      const timer1 = setTimeout(() => {
        setSliderPosition(80);
      }, 400);
      
      // Animate back to 50%
      const timer2 = setTimeout(() => {
        setSliderPosition(50);
        setHasAnimated(true);
      }, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isInView, isLoaded, hasAnimated]);

  // Calculate slider position based on mouse/touch position
  const calculatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Clamp between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPosition);
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    calculatePosition(e.clientX);
  }, [calculatePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  }, [isDragging, calculatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    calculatePosition(e.touches[0].clientX);
  }, [calculatePosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    calculatePosition(e.touches[0].clientX);
  }, [isDragging, calculatePosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse/touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Handle both images loaded
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);

  useEffect(() => {
    if (beforeLoaded && afterLoaded) {
      setIsLoaded(true);
    }
  }, [beforeLoaded, afterLoaded]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-2xl select-none ${className}`}
      style={{ aspectRatio: '1/1' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      data-testid="before-after-slider"
    >
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 img-placeholder z-10" />
      )}

      {/* After Image (Background - Full) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterAlt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setAfterLoaded(true)}
          draggable="false"
        />
      </div>

      {/* Before Image (Clipped by slider) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? 'none' : 'clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'brightness(0.92)' }}
          onLoad={() => setBeforeLoaded(true)}
          draggable="false"
        />
        {/* Slight dark overlay on "before" side */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          transition: isDragging ? 'none' : 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" 
             style={{ 
               left: '50%', 
               transform: 'translateX(-50%)',
               boxShadow: '0 0 20px rgba(0,0,0,0.3)'
             }} 
        />
        
        {/* Handle Button */}
        <div 
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-12 h-12 rounded-full bg-white
            flex items-center justify-center
            shadow-xl cursor-grab
            transition-all duration-300
            pointer-events-auto
            ${isDragging ? 'cursor-grabbing scale-110' : 'hover:scale-110'}
          `}
          style={{
            boxShadow: isDragging 
              ? '0 0 30px rgba(30, 50, 139, 0.6), 0 8px 32px rgba(0,0,0,0.3)'
              : '0 0 20px rgba(30, 50, 139, 0.3), 0 4px 16px rgba(0,0,0,0.2)'
          }}
        >
          {/* Arrows */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-[#1e328b]"
          >
            <path 
              d="M8 6L4 12L8 18" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M16 6L20 12L16 18" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Glow Effect Ring */}
        <div 
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-16 h-16 rounded-full
            transition-opacity duration-300
            pointer-events-none
            ${isDragging ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'radial-gradient(circle, rgba(30, 50, 139, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Labels */}
      <div 
        className={`
          absolute top-4 left-4 z-10
          px-4 py-2 rounded-full
          bg-black/60 backdrop-blur-sm
          text-white text-sm font-semibold
          transition-all duration-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
      >
        {beforeLabel}
      </div>
      <div 
        className={`
          absolute top-4 right-4 z-10
          px-4 py-2 rounded-full
          bg-[#1e328b]/90 backdrop-blur-sm
          text-white text-sm font-semibold
          transition-all duration-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
        style={{ transitionDelay: '100ms' }}
      >
        {afterLabel}
      </div>

      {/* Instructions (visible on first load) */}
      {isLoaded && !hasAnimated && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium animate-pulse">
          Ziehen Sie den Slider
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
