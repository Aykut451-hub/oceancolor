/**
 * Step 3: Leistungen Selection with inline inputs for special services
 */

import React from 'react';
import { Paintbrush, Layers, Grid3X3, AlertTriangle } from 'lucide-react';
import { StepHeader, SelectionCard } from './SharedComponents';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const LEISTUNGEN = [
  { id: 'waende-decken', label: 'Wände & Decken streichen', icon: Paintbrush },
  { id: 'lackierung', label: 'Lackierarbeiten', icon: Layers },
  { id: 'tapezieren', label: 'Tapezierarbeiten', icon: Grid3X3 },
  { id: 'spachteln', label: 'Spachtelarbeiten', icon: Layers },
  { id: 'boden', label: 'Vinylboden verlegen', icon: Grid3X3 },
  { id: 'schimmel', label: 'Schimmelsanierung', icon: AlertTriangle },
  { id: 'epoxid', label: 'Epoxidharzbodenbeschichtung', icon: Layers }
];

const LACKIER_BAUTEILE = [
  { id: 'tueren', label: 'Türen inkl. Zarge', price: '120 €/Stk.' },
  { id: 'heizkoerper', label: 'Heizkörper', price: '150 €/Stk.' },
  { id: 'fensterrahmen', label: 'Fensterrahmen', price: '150 €/Stk.' },
  { id: 'sonstiges', label: 'Sonstiges', price: 'auf Anfrage' }
];

const StepLeistungen = ({ formData, setFormData }) => {
  const handleToggle = (leistungId) => {
    setFormData(prev => ({
      ...prev,
      leistungen: prev.leistungen.includes(leistungId)
        ? prev.leistungen.filter(id => id !== leistungId)
        : [...prev.leistungen, leistungId]
    }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const hasLackierung = formData.leistungen.includes('lackierung');
  const hasBoden = formData.leistungen.includes('boden');
  const hasEpoxid = formData.leistungen.includes('epoxid');
  const hasSchimmel = formData.leistungen.includes('schimmel');

  return (
    <div className="space-y-6" data-testid="step-leistungen">
      <StepHeader 
        title="Welche Leistungen benötigen Sie?"
        subtitle="Mehrfachauswahl möglich"
      />
      
      {/* Main selection */}
      <div className="space-y-3">
        {LEISTUNGEN.map((leistung) => (
          <SelectionCard
            key={leistung.id}
            selected={formData.leistungen.includes(leistung.id)}
            onClick={() => handleToggle(leistung.id)}
            icon={leistung.icon}
            title={leistung.label}
            testId={`leistung-${leistung.id}`}
          />
        ))}
      </div>

      {/* Vinylboden Input */}
      {hasBoden && (
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border-2 border-amber-300">
          <Label htmlFor="bodenFlaeche" className="text-amber-800 font-semibold">
            Bodenfläche für Vinylboden in m² * (25 €/m² netto exkl. Material)
          </Label>
          <Input
            id="bodenFlaeche"
            type="number"
            min="1"
            value={formData.bodenFlaeche || ''}
            onChange={(e) => handleChange('bodenFlaeche', e.target.value)}
            placeholder="z.B. 30"
            className="mt-2 text-lg"
            data-testid="input-boden-flaeche"
          />
        </div>
      )}

      {/* Epoxid Input */}
      {hasEpoxid && (
        <div className="mt-4 p-4 bg-[#1e328b]/5 rounded-xl border-2 border-[#1e328b]/30">
          <Label htmlFor="epoxidFlaeche" className="text-[#1e328b] font-semibold">
            Bodenfläche für Epoxidbeschichtung in m² * (150 €/m² netto)
          </Label>
          <Input
            id="epoxidFlaeche"
            type="number"
            min="1"
            value={formData.epoxidFlaeche || ''}
            onChange={(e) => handleChange('epoxidFlaeche', e.target.value)}
            placeholder="z.B. 50"
            className="mt-2 text-lg"
            data-testid="input-epoxid-flaeche"
          />
        </div>
      )}

      {/* Schimmel Input */}
      {hasSchimmel && (
        <div className="mt-4 p-4 bg-red-50 rounded-xl border-2 border-red-300">
          <Label htmlFor="schimmelFlaeche" className="text-red-800 font-semibold">
            Betroffene Fläche in m² * (ab 150 € + 35 €/m² netto)
          </Label>
          <Input
            id="schimmelFlaeche"
            type="number"
            min="1"
            value={formData.schimmelFlaeche || ''}
            onChange={(e) => handleChange('schimmelFlaeche', e.target.value)}
            placeholder="z.B. 5"
            className="mt-2 text-lg"
            data-testid="input-schimmel-flaeche"
          />
        </div>
      )}

      {/* Lackierung Options */}
      {hasLackierung && (
        <div className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-300 space-y-4">
          <div>
            <Label className="text-purple-800 font-semibold">
              Welche Bauteile sollen lackiert werden? *
            </Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {LACKIER_BAUTEILE.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleChange('lackierBauteile', option.id)}
                  className={`
                    p-3 rounded-lg text-left transition-all
                    ${formData.lackierBauteile === option.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-purple-200 hover:border-purple-400'
                    }
                  `}
                  data-testid={`lackier-${option.id}`}
                >
                  <p className="font-medium">{option.label}</p>
                  <p className={`text-xs mt-1 ${formData.lackierBauteile === option.id ? 'text-purple-200' : 'text-purple-600'}`}>
                    {option.price}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="anzahlLackierElemente" className="text-purple-800 font-semibold">
              Anzahl der Elemente *
            </Label>
            <Input
              id="anzahlLackierElemente"
              type="number"
              min="1"
              value={formData.anzahlLackierElemente || ''}
              onChange={(e) => handleChange('anzahlLackierElemente', e.target.value)}
              placeholder="z.B. 5"
              className="mt-2 text-lg"
              data-testid="input-lackier-anzahl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

StepLeistungen.validate = (formData) => {
  if (formData.leistungen.length === 0) return false;
  
  // Check required inputs for special services
  if (formData.leistungen.includes('epoxid') && !formData.epoxidFlaeche) return false;
  if (formData.leistungen.includes('boden') && !formData.bodenFlaeche) return false;
  if (formData.leistungen.includes('schimmel') && !formData.schimmelFlaeche) return false;
  if (formData.leistungen.includes('lackierung')) {
    if (!formData.lackierBauteile || !formData.anzahlLackierElemente) return false;
  }
  
  return true;
};

StepLeistungen.errorMessage = 'Bitte wählen Sie mindestens eine Leistung und füllen Sie alle Pflichtfelder aus';

export default StepLeistungen;
