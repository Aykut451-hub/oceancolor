/**
 * Shared UI Components for Calculator
 * Reusable across all steps
 */

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

/**
 * Animated Price Display
 */
export const AnimatedPrice = ({ value, isGlowing }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimating(true);
      const startValue = displayValue;
      const endValue = value;
      const duration = 600;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * easeOut);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimating(false);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [value, displayValue]);

  return (
    <span className={`transition-all duration-300 ${animating || isGlowing ? 'text-ocean-primary scale-105' : ''}`}>
      {displayValue.toLocaleString('de-DE')} €
    </span>
  );
};

/**
 * Selection Card - For single/multi select options
 */
export const SelectionCard = ({ selected, onClick, icon: Icon, title, subtitle, large = false, testId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showCheck, setShowCheck] = useState(selected);

  const handleClick = (e) => {
    setIsClicked(true);
    onClick(e);
    setTimeout(() => setIsClicked(false), 600);
  };

  useEffect(() => {
    if (selected && !showCheck) {
      setShowCheck(true);
    } else if (!selected) {
      setShowCheck(false);
    }
  }, [selected, showCheck]);

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={testId || `selection-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`
        relative w-full text-left rounded-xl transition-all duration-300 click-ripple overflow-hidden
        ${large ? 'p-6' : 'p-4'}
        ${selected 
          ? 'bg-[#1e328b] text-white border-2 border-[#1e328b] shadow-lg selection-pulse' 
          : 'bg-white border-2 border-gray-200 hover:border-[#1e328b]/40 hover:bg-[#1e328b]/5 hover:shadow-md'
        }
        ${isClicked ? 'clicked' : ''}
      `}
      style={selected ? { animation: 'selection-pulse 0.4s ease-out' } : {}}
    >
      <div className={`flex ${large ? 'flex-col items-center text-center' : 'items-center'} gap-3 relative z-10`}>
        {Icon && (
          <div className={`
            ${large ? 'w-16 h-16' : 'w-10 h-10'} 
            rounded-lg flex items-center justify-center transition-all duration-300
            ${selected ? 'bg-white/20 scale-110' : 'bg-[#1e328b]/10'}
          `}>
            <Icon className={`${large ? 'h-8 w-8' : 'h-5 w-5'} ${selected ? 'text-white' : 'text-[#1e328b]'} transition-colors duration-300`} />
          </div>
        )}
        <div className="flex-1">
          <p className={`font-semibold ${large ? 'text-lg mt-2' : ''}`}>{title}</p>
          {subtitle && <p className={`text-sm mt-1 ${selected ? 'text-white/80' : 'text-gray-500'}`}>{subtitle}</p>}
        </div>
        {showCheck && (
          <div className={`
            ${large ? 'absolute top-3 right-3' : ''} 
            w-6 h-6 rounded-full bg-white flex items-center justify-center check-pop
          `}>
            <Check className="h-4 w-4 text-[#1e328b]" />
          </div>
        )}
      </div>
    </button>
  );
};

/**
 * Chip - For toggle options
 */
export const Chip = ({ selected, onClick, children, icon: Icon }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    onClick(e);
    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        relative px-4 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 overflow-hidden
        ${selected 
          ? 'bg-[#1e328b] text-white shadow-md scale-105' 
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#1e328b]/40 hover:translate-y-[-2px] hover:shadow-sm'
        }
        ${isClicked ? 'scale-95' : ''}
      `}
      style={selected ? { 
        boxShadow: '0 4px 12px rgba(30, 50, 139, 0.3)',
        animation: 'selection-pulse 0.3s ease-out'
      } : {}}
    >
      {Icon && <Icon className={`h-4 w-4 ${selected ? 'text-white' : 'text-[#1e328b]'} transition-colors duration-200`} />}
      {children}
      {selected && <Check className="h-4 w-4 ml-1 check-pop" />}
    </button>
  );
};

/**
 * Progress Bar
 */
export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="text-sm font-semibold text-[#1e328b]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #1e328b, #2a45b0)'
          }}
        />
      </div>
    </div>
  );
};

/**
 * Step Header
 */
export const StepHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

/**
 * Input with validation error
 */
export const ValidatedInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  error, 
  hint, 
  required, 
  ...props 
}) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      id={id}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 text-lg rounded-lg border-2 transition-colors
        ${error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-200 focus:border-[#1e328b] focus:ring-[#1e328b]/20'
        }
        focus:outline-none focus:ring-2
      `}
      {...props}
    />
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
    {hint && !error && (
      <p className="text-sm text-gray-500">{hint}</p>
    )}
  </div>
);
