/**
 * RechnerNeu - Refactored Version
 * Modular calculator with separated concerns:
 * - pricingEngine.js for all price calculations
 * - Step components in /components/rechner/
 * - This file handles routing and state management
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { leistungsbilder } from '../data/leistungsbilder';

// Import calculator components
import {
  ProgressBar,
  StepPLZ,
  StepObjektart,
  StepLeistungen,
  StepFlaechen,
  StepDetails,
  StepZusatzoptionen,
  StepSummary,
  StepKontakt,
  LiveSummaryPanel,
  getActiveSteps
} from '../components/rechner';

// Import pricing engine
import { computeEstimate, analyzeLeistungen, isValidPLZ } from '../lib/pricingEngine';

// Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// CSS for animations (preserved from original)
const animationStyles = `
  @keyframes selection-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  @keyframes check-pop {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  
  @keyframes price-glow {
    0%, 100% { text-shadow: 0 0 0 transparent; }
    50% { text-shadow: 0 0 20px rgba(30, 50, 139, 0.5); }
  }
  
  .selection-pulse { animation: selection-pulse 0.4s ease-out; }
  .check-pop { animation: check-pop 0.3s ease-out forwards; }
  .price-glowing { animation: price-glow 0.8s ease-in-out; }
  
  .click-ripple { position: relative; overflow: hidden; }
  .click-ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(30, 50, 139, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
  }
  .click-ripple.clicked::after {
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
  }
  
  .btn-shine {
    background: linear-gradient(135deg, #1e328b 0%, #2a45b0 50%, #1e328b 100%);
    background-size: 200% 200%;
    transition: all 0.3s ease;
  }
  .btn-shine:hover {
    background-position: 100% 0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 50, 139, 0.4);
  }
  
  .btn-tap { transition: transform 0.15s ease; }
  .btn-tap:active { transform: scale(0.98); }
`;

// Initial form state
const INITIAL_FORM_STATE = {
  plz: '',
  objektart: '',
  leistungen: [],
  groesseOption: 'raeume',
  anzahlRaeume: '',
  wandflaeche: '',
  epoxidFlaeche: '',
  bodenFlaeche: '',
  schimmelFlaeche: '',
  zustand: '',
  farbe: '',
  tapetenArt: '',
  spachtelstufe: '',
  zusatzoptionen: [],
  lackierBauteile: '',
  anzahlLackierElemente: '',
  name: '',
  telefon: '',
  email: '',
  rueckrufZeit: '',
  foto: null
};

// Step components map
const STEPS = {
  1: StepPLZ,
  2: StepObjektart,
  3: StepLeistungen,
  4: StepFlaechen,
  5: StepDetails,
  6: StepZusatzoptionen,
  7: StepSummary,
  8: StepKontakt
};

const RechnerNeu = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Calculate total steps dynamically based on selected services
  const analysis = analyzeLeistungen(formData.leistungen);
  const needsFlaechenStep = analysis.needsGroessenFrage;
  
  // Build active step sequence
  const getStepSequence = useCallback(() => {
    const sequence = [1, 2, 3]; // PLZ, Objektart, Leistungen always shown
    
    // Step 4 (Flächen) only for standard wall services
    if (needsFlaechenStep) {
      sequence.push(4);
    }
    
    // Always show: Details, Zusatz, Summary, Kontakt
    sequence.push(5, 6, 7, 8);
    
    return sequence;
  }, [needsFlaechenStep]);

  const stepSequence = getStepSequence();
  const totalSteps = stepSequence.length;
  const currentStepIndex = stepSequence.indexOf(currentStep);
  const displayStep = currentStepIndex + 1;

  // Get current step component
  const CurrentStepComponent = STEPS[currentStep];

  // Validate current step
  const validateCurrentStep = () => {
    const StepComponent = STEPS[currentStep];
    if (StepComponent && StepComponent.validate) {
      return StepComponent.validate(formData);
    }
    return true;
  };

  // Get validation error message
  const getValidationError = () => {
    const StepComponent = STEPS[currentStep];
    if (StepComponent && StepComponent.errorMessage) {
      return StepComponent.errorMessage;
    }
    return 'Bitte füllen Sie alle Pflichtfelder aus';
  };

  // Navigation handlers
  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast.error(getValidationError());
      return;
    }

    const currentIndex = stepSequence.indexOf(currentStep);
    if (currentIndex < stepSequence.length - 1) {
      setCurrentStep(stepSequence[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const currentIndex = stepSequence.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepSequence[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // File upload handler
  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, foto: file }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast.error(getValidationError());
      return;
    }

    setLoading(true);

    try {
      const estimate = computeEstimate(formData);
      
      const submitData = new FormData();
      
      // Build submission data
      const leadData = {
        plz: formData.plz,
        objektart: formData.objektart,
        leistungen: formData.leistungen,
        groesseOption: formData.groesseOption,
        anzahlRaeume: formData.anzahlRaeume,
        wandflaeche: formData.wandflaeche,
        bodenFlaeche: formData.bodenFlaeche,
        epoxidFlaeche: formData.epoxidFlaeche,
        schimmelFlaeche: formData.schimmelFlaeche,
        zustand: formData.zustand,
        farbe: formData.farbe,
        tapetenArt: formData.tapetenArt,
        spachtelstufe: formData.spachtelstufe,
        zusatzoptionen: formData.zusatzoptionen,
        lackierBauteile: formData.lackierBauteile,
        anzahlLackierElemente: formData.anzahlLackierElemente,
        name: formData.name,
        telefon: formData.telefon,
        email: formData.email,
        rueckrufZeit: formData.rueckrufZeit,
        geschaetzterPreis: estimate ? `${estimate.min}€ - ${estimate.max}€` : 'Auf Anfrage',
        quelle: 'Angebotsrechner',
        // Distance data
        distanceFromHamburg: formData.distanceFromHamburg || null,
        isOutsideServiceArea: formData.isOutsideServiceArea || false
      };

      submitData.append('data', JSON.stringify(leadData));
      
      if (formData.foto) {
        submitData.append('foto', formData.foto);
      }

      const response = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Es gab einen Fehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <style>{animationStyles}</style>
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-2 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vielen Dank für Ihre Anfrage!
              </h2>
              <p className="text-gray-600 mb-6">
                Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
                In der Regel antworten wir innerhalb von 24 Stunden.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-[#1e328b] hover:bg-[#162567] text-white btn-shine"
              >
                Zurück zur Startseite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if this is the final step (Kontakt)
  const isFinalStep = currentStep === 8;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <style>{animationStyles}</style>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e328b]/10 rounded-full mb-4">
                <Calculator className="h-8 w-8 text-[#1e328b]" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Angebotsrechner
              </h1>
              <p className="text-gray-600 mb-4">
                In wenigen Schritten zu Ihrer unverbindlichen Preisspanne
              </p>
              <p className="text-sm text-gray-500 italic hidden lg:block">
                {leistungsbilder.messen?.geoText}
              </p>
            </div>
            
            {/* Hero Image */}
            {leistungsbilder.messen?.url && (
              <div className="hidden lg:block">
                <figure className="relative overflow-hidden rounded-2xl shadow-xl group">
                  <img
                    src={leistungsbilder.messen.url}
                    alt={leistungsbilder.messen.alt}
                    title={leistungsbilder.messen.title}
                    loading="eager"
                    className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{leistungsbilder.messen.title}</p>
                  </div>
                </figure>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8 max-w-3xl mx-auto lg:mx-0">
              <ProgressBar currentStep={displayStep} totalSteps={totalSteps} />
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-3">
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-6 lg:p-8">
                    {/* Render Current Step */}
                    {isFinalStep ? (
                      <form onSubmit={handleSubmit}>
                        <CurrentStepComponent 
                          formData={formData} 
                          setFormData={setFormData}
                          onFileChange={handleFileChange}
                        />
                        
                        {/* Navigation for final step */}
                        <div className="flex gap-4 pt-6 mt-6 border-t">
                          <Button
                            type="button"
                            onClick={handleBack}
                            variant="outline"
                            className="flex-1"
                            data-testid="btn-back"
                          >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Zurück
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#1e328b] hover:bg-[#162567] text-white btn-shine btn-tap"
                            data-testid="btn-submit"
                          >
                            {loading ? 'Wird gesendet...' : 'Anfrage senden'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <CurrentStepComponent 
                          formData={formData} 
                          setFormData={setFormData}
                        />
                        
                        {/* Navigation */}
                        <div className="flex gap-4 pt-6 mt-6 border-t">
                          {currentStep > 1 && (
                            <Button
                              type="button"
                              onClick={handleBack}
                              variant="outline"
                              className="flex-1"
                              data-testid="btn-back"
                            >
                              <ArrowLeft className="mr-2 h-5 w-5" />
                              Zurück
                            </Button>
                          )}
                          <Button
                            type="button"
                            onClick={handleNext}
                            disabled={!validateCurrentStep()}
                            className={`flex-1 bg-[#1e328b] hover:bg-[#162567] text-white btn-shine btn-tap ${!validateCurrentStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
                            data-testid="btn-next"
                          >
                            Weiter
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Summary Column */}
              <div className="lg:col-span-2">
                <LiveSummaryPanel 
                  formData={formData}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RechnerNeu;
