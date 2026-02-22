/**
 * Step 4: Flächen/Räume Input (only for standard wall services)
 */

import React from 'react';
import { StepHeader, Chip } from './SharedComponents';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const StepFlaechen = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isRaeumeMode = formData.groesseOption === 'raeume';
  const isFlaecheMode = formData.groesseOption === 'flaeche';

  return (
    <div className="space-y-6" data-testid="step-flaechen">
      <StepHeader 
        title="Wie groß ist der Bereich?"
        subtitle="Wählen Sie die Eingabeart"
      />

      {/* Mode Toggle */}
      <div className="flex gap-4 justify-center">
        <Chip 
          selected={isRaeumeMode}
          onClick={() => handleChange('groesseOption', 'raeume')}
        >
          Anzahl Räume
        </Chip>
        <Chip 
          selected={isFlaecheMode}
          onClick={() => handleChange('groesseOption', 'flaeche')}
        >
          Wandfläche in m²
        </Chip>
      </div>

      {/* Räume Input */}
      {isRaeumeMode && (
        <div className="space-y-2">
          <Label htmlFor="anzahlRaeume">Anzahl der Räume *</Label>
          <Input
            id="anzahlRaeume"
            type="number"
            min="1"
            max="50"
            value={formData.anzahlRaeume || ''}
            onChange={(e) => handleChange('anzahlRaeume', e.target.value)}
            placeholder="z.B. 4"
            className="text-lg h-12"
            data-testid="input-raeume"
          />
          <p className="text-sm text-gray-500">
            Wir rechnen ca. 25 m² Wandfläche pro Raum
          </p>
        </div>
      )}

      {/* Fläche Input */}
      {isFlaecheMode && (
        <div className="space-y-2">
          <Label htmlFor="wandflaeche">Wandfläche in m² *</Label>
          <Input
            id="wandflaeche"
            type="number"
            min="1"
            value={formData.wandflaeche || ''}
            onChange={(e) => handleChange('wandflaeche', e.target.value)}
            placeholder="z.B. 120"
            className="text-lg h-12"
            data-testid="input-wandflaeche"
          />
          <p className="text-sm text-gray-500">
            Gesamte zu bearbeitende Wandfläche
          </p>
        </div>
      )}
    </div>
  );
};

StepFlaechen.validate = (formData) => {
  if (formData.groesseOption === 'raeume') {
    return !!formData.anzahlRaeume && parseInt(formData.anzahlRaeume) > 0;
  }
  if (formData.groesseOption === 'flaeche') {
    return !!formData.wandflaeche && parseFloat(formData.wandflaeche) > 0;
  }
  return false;
};

StepFlaechen.errorMessage = 'Bitte geben Sie die Fläche oder Raumanzahl ein';

export default StepFlaechen;
