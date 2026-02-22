/**
 * Step 5: Details - Farbe, Tapete, Spachtel, Zustand
 */

import React from 'react';
import { Sun, Palette, Sparkles, Ruler, Building, Home as HomeIcon, Layers } from 'lucide-react';
import { StepHeader, SelectionCard, Chip } from './SharedComponents';
import { analyzeLeistungen } from '../../lib/pricingEngine';

const FARB_OPTIONEN = [
  { id: 'weiss', label: 'Weiß / Standard', icon: Sun, subtitle: 'Wandfarbe weiß' },
  { id: 'farbig', label: 'Farbig', icon: Palette, subtitle: '+2,50 €/m²' },
  { id: 'premium', label: 'Premium / Effekt', icon: Sparkles, subtitle: '+4,00 €/m²' }
];

const TAPETEN_OPTIONEN = [
  { id: 'raufaser', label: 'Raufaser', price: '14 €/m²' },
  { id: 'glattvlies', label: 'Glatt-Vlies', price: '18 €/m²' },
  { id: 'mustertapete', label: 'Mustertapete', price: '22 €/m²' }
];

const SPACHTEL_OPTIONEN = [
  { id: 'q2', label: 'Q2 Standard', price: '6 €/m²' },
  { id: 'q3', label: 'Q3 Fein', price: '10 €/m²' },
  { id: 'q4', label: 'Q4 Premium', price: '15 €/m²' }
];

const StepDetails = ({ formData, setFormData }) => {
  const analysis = analyzeLeistungen(formData.leistungen);
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8" data-testid="step-details">
      <StepHeader 
        title="Details zu Ihrem Projekt"
        subtitle="Weitere Angaben für eine genaue Kalkulation"
      />

      {/* Farbauswahl - nur bei Wände/Decken oder Tapezieren */}
      {analysis.needsColorQuestion && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Welche Farbe wünschen Sie?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {FARB_OPTIONEN.map((option) => (
              <SelectionCard
                key={option.id}
                selected={formData.farbe === option.id}
                onClick={() => handleChange('farbe', option.id)}
                icon={option.icon}
                title={option.label}
                subtitle={option.subtitle}
                testId={`farbe-${option.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tapetenart */}
      {analysis.hasTapezieren && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Welche Tapetenart?</h3>
          <div className="flex flex-wrap gap-3">
            {TAPETEN_OPTIONEN.map((option) => (
              <Chip
                key={option.id}
                selected={formData.tapetenArt === option.id}
                onClick={() => handleChange('tapetenArt', option.id)}
              >
                {option.label} ({option.price})
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Spachtelstufe */}
      {analysis.needsSpachtelQuestion && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            <Layers className="inline h-5 w-5 mr-2 text-[#1e328b]" />
            Spachtelqualität
          </h3>
          <p className="text-sm text-gray-600">
            Q2 = Standard, Q3 = Fein, Q4 = Premium für anspruchsvolle Oberflächen
          </p>
          <div className="flex flex-wrap gap-3">
            {SPACHTEL_OPTIONEN.map((option) => (
              <Chip
                key={option.id}
                selected={formData.spachtelstufe === option.id}
                onClick={() => handleChange('spachtelstufe', option.id)}
              >
                {option.label} ({option.price})
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Gebäudezustand */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">
          <Ruler className="inline h-5 w-5 mr-2 text-[#1e328b]" />
          Gebäudezustand
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <SelectionCard
            selected={formData.zustand === 'neubau'}
            onClick={() => handleChange('zustand', 'neubau')}
            icon={Building}
            title="Neubau / Saniert"
            subtitle="Standard-Aufwand"
            testId="zustand-neubau"
          />
          <SelectionCard
            selected={formData.zustand === 'altbau'}
            onClick={() => handleChange('zustand', 'altbau')}
            icon={HomeIcon}
            title="Altbau"
            subtitle="+20% Aufwand"
            testId="zustand-altbau"
          />
        </div>
      </div>
    </div>
  );
};

StepDetails.validate = (formData) => {
  const analysis = analyzeLeistungen(formData.leistungen);
  
  // Farbe required for color-relevant services
  if (analysis.needsColorQuestion && !formData.farbe) return false;
  
  // Zustand is always required
  if (!formData.zustand) return false;
  
  return true;
};

StepDetails.errorMessage = 'Bitte füllen Sie alle Details aus';

export default StepDetails;
