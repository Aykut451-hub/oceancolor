/**
 * Step 1: PLZ Input with Validation
 */

import React from 'react';
import { StepHeader, ValidatedInput } from './SharedComponents';
import { isValidPLZ } from '../../lib/pricingEngine';

const StepPLZ = ({ formData, setFormData }) => {
  const plz = formData.plz || '';
  const hasInput = plz.length > 0;
  const isValid = isValidPLZ(plz);
  const showError = hasInput && !isValid;

  const handleChange = (e) => {
    // Only allow digits, max 5 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, plz: value }));
  };

  return (
    <div className="space-y-6" data-testid="step-plz">
      <StepHeader 
        title="Wo soll das Projekt durchgeführt werden?"
        subtitle="Geben Sie Ihre Postleitzahl ein"
      />
      
      <ValidatedInput
        id="plz"
        label="Postleitzahl"
        value={plz}
        onChange={handleChange}
        placeholder="z.B. 20095"
        maxLength={5}
        inputMode="numeric"
        pattern="[0-9]*"
        required
        error={showError ? 'Bitte eine gültige 5-stellige PLZ eingeben.' : null}
        hint="Wir sind in Hamburg & Umgebung tätig."
        data-testid="input-plz"
      />

      {/* Visual feedback for valid PLZ */}
      {isValid && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          PLZ erkannt
        </div>
      )}
    </div>
  );
};

// Validation function for this step
StepPLZ.validate = (formData) => {
  return isValidPLZ(formData.plz);
};

// Error message for validation
StepPLZ.errorMessage = 'Bitte geben Sie eine gültige 5-stellige PLZ ein';

export default StepPLZ;
