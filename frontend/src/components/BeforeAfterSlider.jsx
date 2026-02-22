import React, { useState, useRef, useEffect, useCallback } from 'react';

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Vorher',
  afterLabel = 'Nachher',
  beforeAlt = 'Vorher Bild',
  afterAlt = 'Nachher Bild',
  className = '',
  objectFit = 'cover' // 'cover', 'contain', or 'fill'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const containerRef = useRef(null);
  const lastPositionRef = useRef(50);
  const lastTimeRef = useRef(Date.now());
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

  // Premium initial animation - slow and smooth
  useEffect(() => {
    if (isInView && isLoaded && !hasAnimated) {
      // Start from center
      setSliderPosition(50);
      
      // Slow animation to the left (25%)
      const timer1 = setTimeout(() => {
        setSliderPosition(25);
      }, 600);
      
      // Slow animation to the right (75%)
      const timer2 = setTimeout(() => {
        setSliderPosition(75);
        setShowShine(true); // Trigger shine effect on "after" side
      }, 1800);
      
      // Hide shine
      const timer3 = setTimeout(() => {
        setShowShine(false);
      }, 2400);
      
      // Return to center with slight overshoot (elastic)
      const timer4 = setTimeout(() => {
        setSliderPosition(48);
      }, 3000);
      
      // Final position
      const timer5 = setTimeout(() => {
        setSliderPosition(50);
        setHasAnimated(true);
      }, 3400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }
  }, [isInView, isLoaded, hasAnimated]);

  // Calculate slider position with velocity tracking
  const calculatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Clamp between 2 and 98 for visual margin
    const clampedPosition = Math.max(2, Math.min(98, percentage));
    
    // Track velocity for elastic effect
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const positionDelta = clampedPosition - lastPositionRef.current;
      setVelocity(positionDelta / timeDelta * 100);
    }
    lastPositionRef.current = clampedPosition;
    lastTimeRef.current = now;
    
    setSliderPosition(clampedPosition);
  }, []);

  // Handle drag end with bounce effect
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    // Trigger bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
    
    // Apply elastic overshoot based on velocity
    if (Math.abs(velocity) > 5) {
      const overshoot = velocity * 0.15;
      const targetPosition = Math.max(2, Math.min(98, sliderPosition + overshoot));
      
      setSliderPosition(targetPosition);
      
      // Bounce back slightly
      setTimeout(() => {
        setSliderPosition(prev => {
          const correction = (targetPosition - prev) * 0.3;
          return Math.max(2, Math.min(98, prev - correction));
        });
      }, 150);
    }
    
    setVelocity(0);
  }, [velocity, sliderPosition]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    lastTimeRef.current = Date.now();
    calculatePosition(e.clientX);
  }, [calculatePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    calculatePosition(e.clientX);
  }, [isDragging, calculatePosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

  // Touch event handlers with haptic feedback attempt
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    lastTimeRef.current = Date.now();
    calculatePosition(e.touches[0].clientX);
    
    // Attempt haptic feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, [calculatePosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    calculatePosition(e.touches[0].clientX);
  }, [isDragging, calculatePosition]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      handleDragEnd();
    }
  }, [isDragging, handleDragEnd]);

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

  // Calculate label positions based on slider
  const beforeLabelOpacity = Math.min(1, sliderPosition / 30);
  const afterLabelOpacity = Math.min(1, (100 - sliderPosition) / 30);
  const beforeLabelTransform = `translateX(${Math.max(0, (50 - sliderPosition) * 0.3)}px)`;
  const afterLabelTransform = `translateX(${Math.min(0, (50 - sliderPosition) * 0.3)}px)`;

  // Transition timing
  const getTransition = () => {
    if (isDragging) return 'none';
    if (isBouncing) return 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (!hasAnimated) return 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    return 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl shadow-2xl select-none cursor-grab ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
      style={{ aspectRatio: '1/1' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-testid="before-after-slider"
    >
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 img-placeholder z-10" />
      )}

      {/* Background for contain mode */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"
        style={{ display: objectFit === 'contain' ? 'block' : 'none' }}
      />

      {/* After Image (Background - Full) with shine effect */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterAlt}
          className={`w-full h-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit, objectPosition: 'center' }}
          onLoad={() => setAfterLoaded(true)}
          draggable="false"
        />
        {/* Shine overlay effect */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${showShine ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)',
            animation: showShine ? 'shine-sweep 0.8s ease-out' : 'none'
          }}
        />
      </div>

      {/* Before Image (Clipped by slider) with dark overlay and subtle blur */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: getTransition()
        }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className={`w-full h-full transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            objectFit,
            objectPosition: 'center',
            filter: 'brightness(0.88) saturate(0.95)',
          }}
          onLoad={() => setBeforeLoaded(true)}
          draggable="false"
        />
        {/* Subtle vignette overlay on "before" side */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)'
          }}
        />
      </div>

      {/* Moving Shadow that follows slider */}
      <div 
        className="absolute top-0 bottom-0 w-32 pointer-events-none z-10"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.05) 100%)',
          transition: getTransition(),
          opacity: isDragging ? 0.8 : 0.4
        }}
      />

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          transition: getTransition()
        }}
      >
        {/* Vertical Line with glow */}
        <div 
          className={`absolute top-0 bottom-0 transition-all duration-300 ${isHovering || isDragging ? 'w-1' : 'w-0.5'}`}
          style={{ 
            left: '50%', 
            transform: 'translateX(-50%)',
            background: isHovering || isDragging 
              ? 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, #ffffff 50%, rgba(255,255,255,0.9) 100%)'
              : 'rgba(255,255,255,0.9)',
            boxShadow: isHovering || isDragging 
              ? '0 0 20px rgba(30, 50, 139, 0.5), 0 0 40px rgba(30, 50, 139, 0.3)'
              : '0 0 15px rgba(0,0,0,0.3)'
          }} 
        />
        
        {/* Handle Button with premium effects */}
        <div 
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            rounded-full bg-white
            flex items-center justify-center
            pointer-events-auto
            transition-all duration-300
            ${isDragging ? 'scale-125' : isHovering ? 'scale-110' : 'scale-100'}
            ${isBouncing ? 'animate-bounce-subtle' : ''}
          `}
          style={{
            width: isDragging ? '56px' : isHovering ? '52px' : '48px',
            height: isDragging ? '56px' : isHovering ? '52px' : '48px',
            boxShadow: isDragging 
              ? '0 0 0 4px rgba(30, 50, 139, 0.3), 0 0 40px rgba(30, 50, 139, 0.6), 0 8px 32px rgba(0,0,0,0.3)'
              : isHovering
                ? '0 0 0 3px rgba(30, 50, 139, 0.2), 0 0 30px rgba(30, 50, 139, 0.4), 0 6px 24px rgba(0,0,0,0.25)'
                : '0 0 20px rgba(30, 50, 139, 0.2), 0 4px 16px rgba(0,0,0,0.2)'
          }}
        >
          {/* Arrows with animation */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`text-[#1e328b] transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}
          >
            <path 
              d="M8 6L4 12L8 18" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 origin-center ${isHovering ? '-translate-x-0.5' : ''}`}
            />
            <path 
              d="M16 6L20 12L16 18" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 origin-center ${isHovering ? 'translate-x-0.5' : ''}`}
            />
          </svg>
        </div>

        {/* Outer glow ring */}
        <div 
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            rounded-full pointer-events-none
            transition-all duration-500
          `}
          style={{
            width: isDragging ? '80px' : '64px',
            height: isDragging ? '80px' : '64px',
            background: 'radial-gradient(circle, rgba(30, 50, 139, 0.25) 0%, transparent 70%)',
            opacity: isDragging ? 1 : isHovering ? 0.7 : 0
          }}
        />
        
        {/* Pulse ring on hover */}
        {isHovering && !isDragging && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none"
            style={{
              border: '2px solid rgba(30, 50, 139, 0.3)',
              animation: 'pulse-ring 2s ease-out infinite'
            }}
          />
        )}
      </div>

      {/* Labels with smooth animation */}
      <div 
        className={`
          absolute top-4 left-4 z-10
          px-4 py-2 rounded-full
          bg-black/70 backdrop-blur-md
          text-white text-sm font-semibold
          transition-all duration-700
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}
        `}
        style={{ 
          opacity: isLoaded ? beforeLabelOpacity : 0,
          transform: isLoaded ? beforeLabelTransform : 'translateY(-24px)',
          transitionDelay: '200ms'
        }}
      >
        {beforeLabel}
      </div>
      <div 
        className={`
          absolute top-4 right-4 z-10
          px-4 py-2 rounded-full
          bg-[#1e328b]/95 backdrop-blur-md
          text-white text-sm font-semibold
          transition-all duration-700
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}
        `}
        style={{ 
          opacity: isLoaded ? afterLabelOpacity : 0,
          transform: isLoaded ? afterLabelTransform : 'translateY(-24px)',
          transitionDelay: '400ms',
          boxShadow: '0 4px 15px rgba(30, 50, 139, 0.3)'
        }}
      >
        {afterLabel}
      </div>

      {/* Instructions hint (fades out after animation) */}
      {isLoaded && !hasAnimated && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md text-white text-sm font-medium"
          style={{
            animation: 'fade-pulse 2s ease-in-out infinite'
          }}
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ziehen Sie den Slider
          </span>
        </div>
      )}

      {/* Corner accent decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-30">
        <div className="absolute top-3 left-3 w-8 h-0.5 bg-white rounded-full" />
        <div className="absolute top-3 left-3 w-0.5 h-8 bg-white rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-30">
        <div className="absolute bottom-3 right-3 w-8 h-0.5 bg-white rounded-full" />
        <div className="absolute bottom-3 right-3 w-0.5 h-8 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
