/**
 * Calculator Components Index
 * Central export point for all calculator-related components
 */

// Shared UI Components
export { 
  AnimatedPrice, 
  SelectionCard, 
  Chip, 
  ProgressBar, 
  StepHeader, 
  ValidatedInput 
} from './SharedComponents';

// Step Components
export { default as StepPLZ } from './StepPLZ';
export { default as StepObjektart } from './StepObjektart';
export { default as StepLeistungen } from './StepLeistungen';
export { default as StepFlaechen } from './StepFlaechen';
export { default as StepDetails } from './StepDetails';
export { default as StepZusatzoptionen } from './StepZusatzoptionen';
export { default as StepSummary } from './StepSummary';
export { default as StepKontakt } from './StepKontakt';

// Live Summary Panel
export { default as LiveSummaryPanel } from './LiveSummaryPanel';

// Step Configuration for dynamic routing
export const STEP_CONFIG = [
  { 
    id: 1, 
    component: 'StepPLZ', 
    title: 'Standort',
    alwaysShow: true 
  },
  { 
    id: 2, 
    component: 'StepObjektart', 
    title: 'Objektart',
    alwaysShow: true 
  },
  { 
    id: 3, 
    component: 'StepLeistungen', 
    title: 'Leistungen',
    alwaysShow: true 
  },
  { 
    id: 4, 
    component: 'StepFlaechen', 
    title: 'Fläche',
    showWhen: (formData) => {
      // Only show for standard wall services
      const standardServices = ['waende-decken', 'tapezieren', 'spachteln'];
      return formData.leistungen?.some(l => standardServices.includes(l));
    }
  },
  { 
    id: 5, 
    component: 'StepDetails', 
    title: 'Details',
    alwaysShow: true 
  },
  { 
    id: 6, 
    component: 'StepZusatzoptionen', 
    title: 'Extras',
    alwaysShow: true 
  },
  { 
    id: 7, 
    component: 'StepSummary', 
    title: 'Übersicht',
    alwaysShow: true 
  },
  { 
    id: 8, 
    component: 'StepKontakt', 
    title: 'Kontakt',
    alwaysShow: true 
  }
];

/**
 * Get active steps based on form data
 */
export function getActiveSteps(formData) {
  return STEP_CONFIG.filter(step => 
    step.alwaysShow || (step.showWhen && step.showWhen(formData))
  );
}

/**
 * Get step component by ID
 */
export function getStepComponent(stepId) {
  const steps = {
    1: StepPLZ,
    2: StepObjektart,
    3: StepLeistungen,
    4: StepFlaechen,
    5: StepDetails,
    6: StepZusatzoptionen,
    7: StepSummary,
    8: StepKontakt
  };
  return steps[stepId];
}
