/**
 * Step 2: Objektart Selection
 */

import React from 'react';
import { Building, Home as HomeIcon, Briefcase } from 'lucide-react';
import { StepHeader, SelectionCard } from './SharedComponents';

const OBJEKTARTEN = [
  { id: 'wohnung', label: 'Wohnung', icon: Building },
  { id: 'haus', label: 'Haus', icon: HomeIcon },
  { id: 'gewerbe', label: 'Gewerbe', icon: Briefcase }
];

const StepObjektart = ({ formData, setFormData }) => {
  const handleSelect = (objektart) => {
    setFormData(prev => ({ ...prev, objektart }));
  };

  return (
    <div className="space-y-6" data-testid="step-objektart">
      <StepHeader 
        title="Welche Objektart haben Sie?"
        subtitle="Wählen Sie die passende Option"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OBJEKTARTEN.map((option) => (
          <SelectionCard
            key={option.id}
            selected={formData.objektart === option.id}
            onClick={() => handleSelect(option.id)}
            icon={option.icon}
            title={option.label}
            large
            testId={`objektart-${option.id}`}
          />
        ))}
      </div>
    </div>
  );
};

StepObjektart.validate = (formData) => !!formData.objektart;
StepObjektart.errorMessage = 'Bitte wählen Sie eine Objektart';

export default StepObjektart;
