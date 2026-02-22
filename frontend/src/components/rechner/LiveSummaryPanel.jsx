/**
 * Live Summary Panel - Shows real-time calculation
 * Displayed on the right side (desktop) or bottom (mobile)
 */

import React from 'react';
import { Euro, Check, AlertCircle, Paintbrush, Layers, Grid3X3, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AnimatedPrice } from './SharedComponents';
import { computeEstimate, calculateWandflaeche, analyzeLeistungen, PRICES } from '../../lib/pricingEngine';

const LEISTUNG_ICONS = {
  'waende-decken': Paintbrush,
  'lackierung': Layers,
  'tapezieren': Grid3X3,
  'spachteln': Layers,
  'boden': Grid3X3,
  'schimmel': AlertTriangle,
  'epoxid': Layers
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

const OBJEKTART_LABELS = {
  wohnung: 'Wohnung',
  haus: 'Haus',
  gewerbe: 'Gewerbe'
};

const LiveSummaryPanel = ({ formData, currentStep }) => {
  const estimate = computeEstimate(formData);
  const analysis = analyzeLeistungen(formData.leistungen || []);
  const wandFlaeche = calculateWandflaeche(formData);
  const isAltbau = formData.zustand === 'altbau';
  const hasData = formData.leistungen?.length > 0;

  return (
    <Card className="sticky top-28 border-2 shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-[#1e328b] to-[#2a45b0] rounded-t-lg">
        <CardTitle className="text-white flex items-center gap-2">
          <Euro className="h-5 w-5" />
          Live-Kalkulation
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        {/* Price Display */}
        {estimate ? (
          <div className="text-center py-4 border-b">
            <p className="text-sm text-gray-500 mb-1">Geschätzte Preisspanne (netto)</p>
            <div className="text-2xl font-bold text-[#1e328b]">
              <AnimatedPrice value={estimate.min} /> – <AnimatedPrice value={estimate.max} />
            </div>
          </div>
        ) : (
          <div className="text-center py-4 border-b">
            <p className="text-sm text-gray-500">
              Wählen Sie Leistungen aus, um eine Schätzung zu erhalten
            </p>
          </div>
        )}

        {/* Selected Data Summary */}
        <div className="space-y-3">
          {/* PLZ */}
          {formData.plz && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">PLZ</span>
              <span className="font-medium">{formData.plz}</span>
            </div>
          )}

          {/* Objektart */}
          {formData.objektart && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Objektart</span>
              <span className="font-medium">{OBJEKTART_LABELS[formData.objektart]}</span>
            </div>
          )}

          {/* Leistungen */}
          {hasData && (
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600 mb-2">Ausgewählte Leistungen:</p>
              <div className="space-y-1">
                {formData.leistungen.map((l) => {
                  const Icon = LEISTUNG_ICONS[l] || Check;
                  return (
                    <div key={l} className="flex items-center gap-2 text-sm">
                      <Icon className="h-4 w-4 text-[#1e328b]" />
                      <span>{LEISTUNG_LABELS[l] || l}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fläche */}
          {wandFlaeche > 0 && (
            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-gray-600">Wandfläche</span>
              <span className="font-medium">{wandFlaeche} m²</span>
            </div>
          )}

          {/* Boden Flächen */}
          {formData.bodenFlaeche && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Bodenfläche</span>
              <span className="font-medium">{formData.bodenFlaeche} m²</span>
            </div>
          )}

          {formData.epoxidFlaeche && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Epoxid-Fläche</span>
              <span className="font-medium">{formData.epoxidFlaeche} m²</span>
            </div>
          )}

          {/* Altbau Hinweis */}
          {isAltbau && (
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded text-sm text-amber-800 mt-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Altbau-Zuschlag: +20%</span>
            </div>
          )}

          {/* Zusatzoptionen */}
          {formData.zusatzoptionen?.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-600 mb-1">Zusatzoptionen:</p>
              <div className="space-y-1 text-sm">
                {formData.zusatzoptionen.includes('abkleben') && (
                  <div className="flex justify-between">
                    <span>Abkleben & Abdecken</span>
                    <span className="text-[#1e328b]">+120 €</span>
                  </div>
                )}
                {formData.zusatzoptionen.includes('moebel') && (
                  <div className="flex justify-between">
                    <span>Möbel rücken</span>
                    <span className="text-[#1e328b]">+120 €</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 pt-3 border-t">
          * Unverbindliche Schätzung. Der finale Preis wird nach einer kostenlosen Vor-Ort-Besichtigung erstellt.
        </p>
      </CardContent>
    </Card>
  );
};

export default LiveSummaryPanel;
