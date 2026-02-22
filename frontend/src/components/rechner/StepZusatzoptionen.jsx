/**
 * Step 6: Zusatzoptionen
 */

import React from 'react';
import { Shield, Armchair, Ruler } from 'lucide-react';
import { StepHeader, SelectionCard } from './SharedComponents';
import { analyzeLeistungen } from '../../lib/pricingEngine';

const ZUSATZOPTIONEN = [
  { 
    id: 'abkleben', 
    label: 'Abkleben & Abdecken', 
    subtitle: '+120 € Pauschale', 
    icon: Shield 
  },
  { 
    id: 'moebel', 
    label: 'Möbel rücken', 
    subtitle: '+120 € Pauschale', 
    icon: Armchair 
  }
];

const BODEN_OPTIONEN = [
  { id: 'altbelag-entfernen', label: 'Altbelag entfernen', price: '+6 €/m²' },
  { id: 'ausgleichen', label: 'Untergrund ausgleichen', price: '+8 €/m²' }
];

const StepZusatzoptionen = ({ formData, setFormData }) => {
  const analysis = analyzeLeistungen(formData.leistungen);
  const zusatzoptionen = formData.zusatzoptionen || [];

  const handleToggle = (optionId) => {
    setFormData(prev => ({
      ...prev,
      zusatzoptionen: zusatzoptionen.includes(optionId)
        ? zusatzoptionen.filter(id => id !== optionId)
        : [...zusatzoptionen, optionId]
    }));
  };

  return (
    <div className="space-y-6" data-testid="step-zusatzoptionen">
      <StepHeader 
        title="Zusatzoptionen"
        subtitle="Optionale Leistungen (Mehrfachauswahl möglich)"
      />

      {/* Allgemeine Zusatzoptionen */}
      <div className="space-y-3">
        {ZUSATZOPTIONEN.map((option) => (
          <SelectionCard
            key={option.id}
            selected={zusatzoptionen.includes(option.id)}
            onClick={() => handleToggle(option.id)}
            icon={option.icon}
            title={option.label}
            subtitle={option.subtitle}
            testId={`zusatz-${option.id}`}
          />
        ))}
      </div>

      {/* Boden-spezifische Optionen */}
      {analysis.hasVinylboden && (
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Optionen für Vinylboden
          </h3>
          <div className="space-y-2">
            {BODEN_OPTIONEN.map((option) => (
              <label 
                key={option.id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-amber-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={zusatzoptionen.includes(option.id)}
                  onChange={() => handleToggle(option.id)}
                  className="w-5 h-5 rounded border-gray-300 text-[#1e328b] focus:ring-[#1e328b]"
                />
                <div className="flex-1">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-amber-600 text-sm ml-2">{option.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Info text */}
      <p className="text-sm text-gray-500 mt-4">
        Diese Optionen sind optional und können jederzeit im persönlichen Gespräch angepasst werden.
      </p>
    </div>
  );
};

// This step is always valid (all options are optional)
StepZusatzoptionen.validate = () => true;

export default StepZusatzoptionen;
