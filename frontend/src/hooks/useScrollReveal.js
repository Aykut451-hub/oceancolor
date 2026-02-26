import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * Now returns isRevealed: true immediately for SEO/crawlers
 * Content is visible in initial render
 */
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  // Always revealed immediately - content visible on load
  const [isRevealed, setIsRevealed] = useState(true);

  return { ref, isRevealed };
};

/**
 * ScrollReveal Component
 * All content is now visible immediately on page load
 * Animations run on mount (load-based), not on scroll
 * This ensures full page capture tools and search engines can see all content
 */
export const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  ...props 
}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Trigger animation on mount (load-based)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 50); // Small delay to allow initial render
    
    return () => clearTimeout(timer);
  }, []);

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-20px)';
      case 'right': return 'translateX(20px)';
      case 'up': 
      default: return 'translateY(20px)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // Content is ALWAYS visible (opacity: 1 minimum for SEO)
        opacity: hasAnimated ? 1 : 1,
        // Transform animation still runs but content is visible
        transform: hasAnimated ? 'translate(0)' : getTransform(),
        transition: `transform 0.5s ease-out ${delay}ms`,
        // Ensure visibility for crawlers
        visibility: 'visible',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Hook for animated counter
 * Now triggers on mount instead of scroll
 */
export const useAnimatedCounter = (end, duration = 1000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isAnimating) return;
    
    // Start animation immediately on mount
    const timer = setTimeout(() => {
      setIsAnimating(true);
      const startTime = Date.now();
      const startValue = start;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (end - startValue) * easeOut);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [end, duration, start, isAnimating]);

  return { ref, count, isRevealed: true };
};

export default useScrollReveal;
