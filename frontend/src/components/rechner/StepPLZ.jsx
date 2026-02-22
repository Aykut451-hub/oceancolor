/**
 * Step 1: PLZ Input with Validation and Distance Check
 */

import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { StepHeader, ValidatedInput } from './SharedComponents';
import { isValidPLZ } from '../../lib/pricingEngine';
import { 
  checkDistanceFromHamburg, 
  isHamburgAreaPLZ, 
  estimateDistanceByPLZ,
  MAX_SERVICE_DISTANCE 
} from '../../lib/geoService';

const StepPLZ = ({ formData, setFormData }) => {
  const plz = formData.plz || '';
  const hasInput = plz.length > 0;
  const isValid = isValidPLZ(plz);
  const showError = hasInput && !isValid;

  // Distance check state
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [checkingDistance, setCheckingDistance] = useState(false);

  // Debounced distance check
  const checkDistance = useCallback(async (plzValue) => {
    if (!isValidPLZ(plzValue)) {
      setDistanceInfo(null);
      return;
    }

    // Quick check for Hamburg area - no API needed
    if (isHamburgAreaPLZ(plzValue)) {
      setDistanceInfo({ 
        distance: 0, 
        isOutsideServiceArea: false,
        isHamburgArea: true 
      });
      return;
    }

    // For other PLZ, check distance via API
    setCheckingDistance(true);
    
    try {
      const result = await checkDistanceFromHamburg(plzValue);
      
      if (result) {
        setDistanceInfo({
          ...result,
          isHamburgArea: false
        });
      } else {
        // Fallback to estimate if API fails
        const estimate = estimateDistanceByPLZ(plzValue);
        setDistanceInfo({
          ...estimate,
          isHamburgArea: false
        });
      }
    } catch (error) {
      // Use fallback estimate
      const estimate = estimateDistanceByPLZ(plzValue);
      setDistanceInfo({
        ...estimate,
        isHamburgArea: false
      });
    } finally {
      setCheckingDistance(false);
    }
  }, []);

  // Check distance when PLZ changes (with debounce)
  useEffect(() => {
    if (!isValid) {
      setDistanceInfo(null);
      return;
    }

    const timer = setTimeout(() => {
      checkDistance(plz);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [plz, isValid, checkDistance]);

  // Store distance info in formData for later use
  useEffect(() => {
    if (distanceInfo) {
      setFormData(prev => ({
        ...prev,
        distanceFromHamburg: distanceInfo.distance,
        isOutsideServiceArea: distanceInfo.isOutsideServiceArea
      }));
    }
  }, [distanceInfo, setFormData]);

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
        hint={!isValid ? "Wir sind in Hamburg & Umgebung tätig." : null}
        data-testid="input-plz"
      />

      {/* Loading state while checking distance */}
      {checkingDistance && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Standort wird geprüft...
        </div>
      )}

      {/* Valid PLZ - Hamburg area */}
      {isValid && !checkingDistance && distanceInfo?.isHamburgArea && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Check className="w-5 h-5" />
          <span>PLZ erkannt – Hamburg & Umgebung</span>
        </div>
      )}

      {/* Valid PLZ - Within service area (≤200km) */}
      {isValid && !checkingDistance && distanceInfo && !distanceInfo.isHamburgArea && !distanceInfo.isOutsideServiceArea && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Check className="w-5 h-5" />
          <span>
            PLZ erkannt – ca. {distanceInfo.distance} km von Hamburg
            {distanceInfo.isEstimate && ' (geschätzt)'}
          </span>
        </div>
      )}

      {/* Valid PLZ - Outside service area (>200km) */}
      {isValid && !checkingDistance && distanceInfo?.isOutsideServiceArea && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-amber-800">
                Hinweis zur Entfernung
              </p>
              <p className="text-sm text-amber-700">
                Das Projekt liegt außerhalb unseres regulären Einsatzgebietes 
                (ca. {distanceInfo.distance} km{distanceInfo.isEstimate ? ' geschätzt' : ''} – über {MAX_SERVICE_DISTANCE} km Entfernung).
              </p>
              <p className="text-sm text-amber-700">
                Eine Durchführung ist möglich, jedoch nur nach individueller Absprache.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Service area info */}
      {isValid && !checkingDistance && distanceInfo && !distanceInfo.isOutsideServiceArea && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Wir sind in Hamburg & Umgebung (bis {MAX_SERVICE_DISTANCE} km) tätig.</span>
        </div>
      )}
    </div>
  );
};

// Validation function for this step - PLZ valid is enough, distance is just info
StepPLZ.validate = (formData) => {
  return isValidPLZ(formData.plz);
};

// Error message for validation
StepPLZ.errorMessage = 'Bitte geben Sie eine gültige 5-stellige PLZ ein';

export default StepPLZ;
