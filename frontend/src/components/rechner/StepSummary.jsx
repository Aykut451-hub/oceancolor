/**
 * Step 7: Summary / Zusammenfassung before contact
 */

import React from 'react';
import { Check, MapPin, Home, Paintbrush, Calendar, Euro } from 'lucide-react';
import { StepHeader, AnimatedPrice } from './SharedComponents';
import { computeEstimate, analyzeLeistungen, PRICES } from '../../lib/pricingEngine';

const OBJEKTART_LABELS = {
  wohnung: 'Wohnung',
  haus: 'Haus',
  gewerbe: 'Gewerbe'
};

const LEISTUNG_LABELS = {
  'waende-decken': 'Wände & Decken',
  'lackierung': 'Lackierarbeiten',
  'tapezieren': 'Tapezieren',
  'spachteln': 'Spachtelarbeiten',
  'boden': 'Vinylboden',
  'schimmel': 'Schimmelsanierung',
  'epoxid': 'Epoxidboden'
};

const StepSummary = ({ formData }) => {
  const estimate = computeEstimate(formData);
  const analysis = analyzeLeistungen(formData.leistungen);

  const formatWandflaeche = () => {
    if (formData.groesseOption === 'raeume' && formData.anzahlRaeume) {
      return `${formData.anzahlRaeume} Räume (~${parseInt(formData.anzahlRaeume) * PRICES.WANDFLAECHE_PRO_RAUM} m²)`;
    }
    if (formData.wandflaeche) {
      return `${formData.wandflaeche} m²`;
    }
    return '-';
  };

  return (
    <div className="space-y-6" data-testid="step-summary">
      <StepHeader 
        title="Ihre Zusammenfassung"
        subtitle="Prüfen Sie Ihre Angaben vor dem Absenden"
      />

      {/* Price Card */}
      {estimate && (
        <div className="bg-gradient-to-br from-[#1e328b] to-[#2a45b0] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <Euro className="h-5 w-5" />
            <span className="text-sm font-medium">Geschätzte Preisspanne (netto)</span>
          </div>
          <div className="text-3xl font-bold">
            <AnimatedPrice value={estimate.min} /> – <AnimatedPrice value={estimate.max} />
          </div>
          <p className="text-white/70 text-sm mt-2">
            * Unverbindliche Schätzung. Der finale Preis wird nach Besichtigung erstellt.
          </p>
        </div>
      )}

      {/* Summary List */}
      <div className="space-y-4">
        {/* PLZ */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="h-5 w-5 text-[#1e328b]" />
          <div>
            <span className="text-sm text-gray-500">Standort</span>
            <p className="font-medium">PLZ {formData.plz}</p>
          </div>
        </div>

        {/* Objektart */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Home className="h-5 w-5 text-[#1e328b]" />
          <div>
            <span className="text-sm text-gray-500">Objektart</span>
            <p className="font-medium">{OBJEKTART_LABELS[formData.objektart] || '-'}</p>
          </div>
        </div>

        {/* Leistungen */}
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Paintbrush className="h-5 w-5 text-[#1e328b] mt-0.5" />
          <div>
            <span className="text-sm text-gray-500">Leistungen</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.leistungen.map(l => (
                <span key={l} className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e328b]/10 text-[#1e328b] text-sm rounded-full">
                  <Check className="h-3 w-3" />
                  {LEISTUNG_LABELS[l] || l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fläche */}
        {analysis.needsGroessenFrage && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-[#1e328b]" />
            <div>
              <span className="text-sm text-gray-500">Fläche</span>
              <p className="font-medium">{formatWandflaeche()}</p>
            </div>
          </div>
        )}

        {/* Zustand */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Home className="h-5 w-5 text-[#1e328b]" />
          <div>
            <span className="text-sm text-gray-500">Gebäudezustand</span>
            <p className="font-medium">
              {formData.zustand === 'altbau' ? 'Altbau (+20%)' : 'Neubau / Saniert'}
            </p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>Nächster Schritt:</strong> Geben Sie Ihre Kontaktdaten ein, damit wir Sie für eine kostenlose Besichtigung kontaktieren können.
      </div>
    </div>
  );
};

StepSummary.validate = () => true;

export default StepSummary;
