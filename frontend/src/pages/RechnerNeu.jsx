import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Home as HomeIcon,
  Building,
  Briefcase,
  Upload,
  Phone,
  Mail,
  User,
  Check,
  AlertTriangle,
  Paintbrush,
  Layers,
  Grid3X3
} from 'lucide-react';
import { toast } from 'sonner';
import { leistungsbilder } from '../data/leistungsbilder';

// Animated Price Component
const AnimatedPrice = ({ value, isGlowing }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimating(true);
      const startValue = displayValue;
      const endValue = value;
      const duration = 600;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * easeOut);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimating(false);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [value, displayValue]);

  return (
    <span className={`transition-all duration-300 ${animating || isGlowing ? 'text-ocean-primary scale-105' : ''}`}>
      {displayValue.toLocaleString('de-DE')} €
    </span>
  );
};

// Selection Card Component with Click Animation
const SelectionCard = ({ selected, onClick, icon: Icon, title, subtitle, large = false }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [showCheck, setShowCheck] = React.useState(selected);

  // Ripple effect on click
  const handleClick = (e) => {
    setIsClicked(true);
    onClick(e);
    
    // Reset animation after completion
    setTimeout(() => setIsClicked(false), 600);
  };

  // Animate checkmark when selected
  React.useEffect(() => {
    if (selected && !showCheck) {
      setShowCheck(true);
    } else if (!selected) {
      setShowCheck(false);
    }
  }, [selected, showCheck]);

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={`selection-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={`
        relative w-full text-left rounded-xl transition-all duration-300 click-ripple overflow-hidden
        ${large ? 'p-6' : 'p-4'}
        ${selected 
          ? 'bg-[#1e328b] text-white border-2 border-[#1e328b] shadow-lg selection-pulse' 
          : 'bg-white border-2 border-gray-200 hover:border-[#1e328b]/40 hover:bg-[#1e328b]/5 hover:shadow-md'
        }
        ${isClicked ? 'clicked' : ''}
      `}
      style={selected ? { animation: 'selection-pulse 0.4s ease-out' } : {}}
    >
      <div className={`flex ${large ? 'flex-col items-center text-center' : 'items-center'} gap-3 relative z-10`}>
        {Icon && (
          <div className={`
            ${large ? 'w-16 h-16' : 'w-10 h-10'} 
            rounded-lg flex items-center justify-center transition-all duration-300
            ${selected ? 'bg-white/20 scale-110' : 'bg-[#1e328b]/10'}
          `}>
            <Icon className={`${large ? 'h-8 w-8' : 'h-5 w-5'} ${selected ? 'text-white' : 'text-[#1e328b]'} transition-colors duration-300`} />
          </div>
        )}
        <div className="flex-1">
          <p className={`font-semibold ${large ? 'text-lg mt-2' : ''}`}>{title}</p>
          {subtitle && <p className={`text-sm mt-1 ${selected ? 'text-white/80' : 'text-gray-500'}`}>{subtitle}</p>}
        </div>
        {showCheck && (
          <div className={`
            ${large ? 'absolute top-3 right-3' : ''} 
            w-6 h-6 rounded-full bg-white flex items-center justify-center check-pop
          `}>
            <Check className="h-4 w-4 text-[#1e328b]" />
          </div>
        )}
      </div>
    </button>
  );
};

// Chip Component for options with click animation
const Chip = ({ selected, onClick, children, icon: Icon }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    onClick(e);
    setTimeout(() => setIsClicked(false), 400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        relative px-4 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 overflow-hidden
        ${selected 
          ? 'bg-[#1e328b] text-white shadow-md scale-105' 
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#1e328b]/40 hover:translate-y-[-2px] hover:shadow-sm'
        }
        ${isClicked ? 'scale-95' : ''}
      `}
      style={selected ? { 
        boxShadow: '0 4px 12px rgba(30, 50, 139, 0.3)',
        animation: 'selection-pulse 0.3s ease-out'
      } : {}}
    >
      {Icon && <Icon className={`h-4 w-4 ${selected ? 'text-white' : 'text-[#1e328b]'} transition-colors duration-200`} />}
      {children}
      {selected && <Check className="h-4 w-4 ml-1 check-pop" />}
    </button>
  );
};

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="text-sm font-semibold text-[#1e328b]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #1e328b, #2a45b0)'
          }}
        />
      </div>
    </div>
  );
};

// Live Summary Component
const LiveSummary = ({ formData, calculatedPrice, leistungenOptions, isAltbau }) => {
  const selectedLeistungen = leistungenOptions.filter(l => formData.leistungen.includes(l.id));
  
  const getObjektLabel = () => {
    switch (formData.objektart) {
      case 'wohnung': return 'Wohnung';
      case 'haus': return 'Haus';
      case 'gewerbe': return 'Gewerbe';
      default: return '-';
    }
  };

  return (
    <div className="sticky-summary bg-white rounded-2xl border-2 border-gray-100 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e328b] to-[#2a45b0] p-6 text-white">
        <h3 className="text-lg font-bold mb-1">Live-Zusammenfassung</h3>
        <p className="text-white/80 text-sm">Ihre aktuelle Auswahl</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Altbau Badge */}
        {isAltbau && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Altbau-Modus aktiv</span>
          </div>
        )}

        {/* PLZ */}
        {formData.plz && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">PLZ</span>
            <span className="font-medium">{formData.plz}</span>
          </div>
        )}

        {/* Objektart */}
        {formData.objektart && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Objektart</span>
            <span className="font-medium">{getObjektLabel()}</span>
          </div>
        )}

        {/* Leistungen */}
        {selectedLeistungen.length > 0 && (
          <div className="py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm block mb-2">Leistungen</span>
            <div className="flex flex-wrap gap-2">
              {selectedLeistungen.map(l => (
                <span key={l.id} className="px-2 py-1 bg-[#1e328b]/10 text-[#1e328b] rounded text-xs font-medium">
                  {l.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Räume/Fläche */}
        {(formData.anzahlRaeume || formData.wandflaeche) && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">
              {formData.groesseOption === 'raeume' ? 'Räume' : 'Wandfläche'}
            </span>
            <span className="font-medium">
              {formData.groesseOption === 'raeume' 
                ? `${formData.anzahlRaeume} Räume`
                : `${formData.wandflaeche} m²`
              }
            </span>
          </div>
        )}

        {/* Tapeten/Farbe */}
        {formData.tapetenArt && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Tapete</span>
            <span className="font-medium capitalize">{formData.tapetenArt}</span>
          </div>
        )}
        {formData.farbe && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Farbe</span>
            <span className="font-medium capitalize">{formData.farbe === 'weiss' ? 'Weiß' : formData.farbe}</span>
          </div>
        )}

        {/* Price Display */}
        <div className="mt-6 p-4 bg-gray-900 rounded-xl text-white text-center">
          <p className="text-xs text-gray-400 mb-2">Geschätzte Preisspanne (netto)</p>
          <div className="text-2xl font-bold">
            {calculatedPrice ? (
              <>
                <AnimatedPrice value={calculatedPrice.min} isGlowing={false} />
                <span className="mx-2">-</span>
                <AnimatedPrice value={calculatedPrice.max} isGlowing={false} />
              </>
            ) : (
              <span className="text-gray-400">wird berechnet...</span>
            )}
          </div>
          <p className="text-xs text-amber-400 mt-2 font-medium">
            zzgl. 19% MwSt.
          </p>
        </div>

        {/* CTA */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Alle Preise verstehen sich netto zzgl. gesetzlicher MwSt.
        </p>
      </div>
    </div>
  );
};

const RechnerNeu = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priceGlowing, setPriceGlowing] = useState(false);
  
  const [formData, setFormData] = useState({
    plz: '',
    objektart: '',
    leistungen: [],
    groesseOption: 'raeume',
    anzahlRaeume: '',
    wandflaeche: '',
    epoxidFlaeche: '',
    bodenFlaeche: '',
    schimmelFlaeche: '',
    anzahlTueren: '',
    raumhoehe: '',
    zustand: '',
    aktuellerBoden: '',
    farbe: '',
    tapetenArt: '',
    spachtelstufe: '',
    zusatzoptionen: [],
    name: '',
    telefon: '',
    email: '',
    rueckrufZeit: '',
    foto: null,
    // Lackierung spezifisch
    lackierBauteile: '',
    anzahlLackierElemente: ''
  });

  // Prüfen ob spezielle Leistungen ausgewählt sind (ohne Raumhöhe, Spachtel, Farbe)
  // LACKIERUNG ist jetzt auch eine spezielle Leistung!
  const specialLeistungen = ['boden', 'epoxid', 'schimmel', 'lackierung'];
  const standardWandLeistungen = ['waende-decken', 'tapezieren', 'spachteln'];
  
  // Nur spezielle Leistungen - keine Raumhöhe, Spachtel, Farbe
  const hasOnlySpecialLeistungen = formData.leistungen.length > 0 && 
    formData.leistungen.every(l => specialLeistungen.includes(l));
  
  // Bodenarbeiten
  const bodenLeistungen = ['boden', 'epoxid'];
  const hasBodenarbeiten = formData.leistungen.some(l => bodenLeistungen.includes(l));
  const hasVinylboden = formData.leistungen.includes('boden');
  const hasEpoxid = formData.leistungen.includes('epoxid');
  const hasSchimmel = formData.leistungen.includes('schimmel');
  const hasLackierung = formData.leistungen.includes('lackierung');
  
  // Standard Wandarbeiten (brauchen Raumhöhe, Spachtel, Farbe) - OHNE Lackierung!
  const hasStandardWandarbeiten = formData.leistungen.some(l => standardWandLeistungen.includes(l));
  const hasTapezieren = formData.leistungen.includes('tapezieren');
  const hasWaendeDecken = formData.leistungen.includes('waende-decken');
  const hasSpachteln = formData.leistungen.includes('spachteln');
  
  // Farb-Frage nur bei Wände & Decken
  const needsColorQuestion = hasWaendeDecken;
  
  // Raumhöhe und Spachtel nur bei Standard-Wandarbeiten (NICHT bei Lackierung!)
  const needsRaumhoeheQuestion = hasStandardWandarbeiten;
  const needsSpachtelQuestion = hasStandardWandarbeiten;
  
  // Braucht Größen-Frage? (Nur wenn Standard-Wandarbeiten)
  const needsGroessenFrage = hasStandardWandarbeiten;
  
  const isAltbau = formData.zustand === 'altbau';

  const totalSteps = 9;

  const leistungenOptions = [
    { id: 'waende-decken', label: 'Wände & Decken streichen', icon: Paintbrush },
    { id: 'lackierung', label: 'Lackierarbeiten', icon: Layers },
    { id: 'tapezieren', label: 'Tapezierarbeiten', icon: Grid3X3 },
    { id: 'spachteln', label: 'Spachtelarbeiten', icon: Layers },
    { id: 'boden', label: 'Vinylboden verlegen', icon: Grid3X3 },
    { id: 'schimmel', label: 'Schimmelsanierung', icon: AlertTriangle },
    { id: 'epoxid', label: 'Epoxidharzbodenbeschichtung', icon: Layers }
  ];

  // Lackier-Bauteile Optionen mit korrekten Preisen
  const lackierBauteileOptionen = [
    { id: 'tueren', label: 'Türen inkl. Zarge', price: 120 },
    { id: 'heizkoerper', label: 'Heizkörper', price: 150 },
    { id: 'fensterrahmen', label: 'Fensterrahmen', price: 15 },
    { id: 'sonstiges', label: 'Sonstiges', price: null } // Auf Anfrage
  ];

  // Zusatzoptionen für Wandarbeiten
  const zusatzoptionenWand = [
    { id: 'abkleben', label: 'Abkleben / Schutz', price: 120 },
    { id: 'moebel', label: 'Möbel bewegen', price: 120 }
  ];

  // Zusatzoptionen für Bodenarbeiten (Vinyl)
  const zusatzoptionenBoden = [
    { id: 'altbelag-entfernen', label: 'Altbelag entfernen (+6 €/m²)', pricePerSqm: 6 },
    { id: 'ausgleichen', label: 'Untergrund ausgleichen (+8 €/m²)', pricePerSqm: 8 }
  ];

  // Dynamische Zusatzoptionen basierend auf Auswahl
  const getZusatzoptionen = () => {
    let options = [];
    if (hasStandardWandarbeiten) {
      options = [...options, ...zusatzoptionenWand];
    }
    if (hasVinylboden) {
      options = [...options, ...zusatzoptionenBoden];
    }
    return options;
  };
  
  const zusatzoptionenOptions = getZusatzoptionen();

  const aktuellerBodenOptionen = [
    { id: 'fliesen', label: 'Fliesen' },
    { id: 'teppich', label: 'Teppich' },
    { id: 'laminat', label: 'Laminat' },
    { id: 'vinyl', label: 'Vinyl' },
    { id: 'estrich', label: 'Estrich' },
    { id: 'rohbeton', label: 'Rohbeton' },
    { id: 'sonstiges', label: 'Sonstiges' }
  ];

  // ============================================
  // NEUE PREISLOGIK - ALLE PREISE NETTO
  // ============================================
  const calculateLivePrice = useCallback(() => {
    if (formData.leistungen.length === 0) return null;
    
    let totalPrice = 0;
    
    // Fläche berechnen
    let wandFlaeche = 0;
    if (formData.groesseOption === 'raeume' && formData.anzahlRaeume) {
      wandFlaeche = parseInt(formData.anzahlRaeume) * 25; // ~25m² Wandfläche pro Raum
    } else if (formData.wandflaeche) {
      wandFlaeche = parseFloat(formData.wandflaeche);
    }
    
    const bodenFlaeche = formData.bodenFlaeche ? parseFloat(formData.bodenFlaeche) : 0;
    const epoxidFlaeche = formData.epoxidFlaeche ? parseFloat(formData.epoxidFlaeche) : 0;
    const schimmelFlaeche = formData.schimmelFlaeche ? parseFloat(formData.schimmelFlaeche) : 0;
    const anzahlTueren = formData.anzahlTueren ? parseInt(formData.anzahlTueren) : 0;
    
    // 1. WÄNDE & DECKEN STREICHEN
    if (hasWaendeDecken && wandFlaeche > 0) {
      // Basispreis Wände: 8,10 €/m²
      let wandPreis = 8.10;
      
      // Farbzuschlag
      if (formData.farbe === 'farbig') {
        wandPreis += 2.50;
      } else if (formData.farbe === 'premium') {
        wandPreis += 4.00;
      }
      
      // Decken: ca. 30% der Wandfläche als Deckenfläche (vereinfacht)
      const deckenFlaeche = wandFlaeche * 0.3;
      const deckenPreis = 8.50;
      
      totalPrice += (wandFlaeche * wandPreis) + (deckenFlaeche * deckenPreis);
    }
    
    // 2. SPACHTELARBEITEN
    if (hasSpachteln && wandFlaeche > 0) {
      let spachtelPreis = 0;
      switch (formData.spachtelstufe) {
        case 'q2': spachtelPreis = 6; break;
        case 'q3': spachtelPreis = 10; break;
        case 'q4': spachtelPreis = 15; break;
        default: spachtelPreis = 6; // Q2 als Standard
      }
      totalPrice += wandFlaeche * spachtelPreis;
    } else if (hasStandardWandarbeiten && !hasSpachteln && formData.spachtelstufe) {
      // Spachtel-Zuschlag auch wenn nur als Option gewählt
      let spachtelPreis = 0;
      switch (formData.spachtelstufe) {
        case 'q2': spachtelPreis = 6; break;
        case 'q3': spachtelPreis = 10; break;
        case 'q4': spachtelPreis = 15; break;
        default: spachtelPreis = 0;
      }
      if (spachtelPreis > 0 && wandFlaeche > 0) {
        totalPrice += wandFlaeche * spachtelPreis;
      }
    }
    
    // 3. TAPEZIEREN
    if (hasTapezieren && wandFlaeche > 0) {
      let tapetenPreis = 14; // Raufaser Standard
      switch (formData.tapetenArt) {
        case 'raufaser': tapetenPreis = 14; break;
        case 'glattvlies': tapetenPreis = 18; break;
        case 'mustertapete': tapetenPreis = 22; break;
        default: tapetenPreis = 14;
      }
      totalPrice += wandFlaeche * tapetenPreis;
    }
    
    // 4. LACKIERARBEITEN (eigenständige Leistung)
    if (hasLackierung) {
      const anzahl = formData.anzahlLackierElemente ? parseInt(formData.anzahlLackierElemente) : 0;
      if (anzahl > 0) {
        // Preis basierend auf Bauteil - korrigierte Preise
        let einzelPreis = 120; // Standard: Türen inkl. Zarge
        switch (formData.lackierBauteile) {
          case 'tueren': einzelPreis = 120; break;
          case 'heizkoerper': einzelPreis = 150; break;
          case 'fensterrahmen': einzelPreis = 15; break;
          case 'sonstiges': einzelPreis = 0; break; // "Auf Anfrage" - kein Preis
          default: einzelPreis = 120;
        }
        if (einzelPreis > 0) {
          totalPrice += anzahl * einzelPreis;
        }
      }
    }
    
    // 5. SCHIMMELSANIERUNG
    if (hasSchimmel) {
      const schimmelGrundpreis = 150; // Mindestpreis
      const schimmelQmPreis = 35;
      const flaeche = schimmelFlaeche > 0 ? schimmelFlaeche : (wandFlaeche > 0 ? wandFlaeche * 0.2 : 5);
      totalPrice += schimmelGrundpreis + (flaeche * schimmelQmPreis);
    }
    
    // 6. VINYLBODEN
    if (hasVinylboden && bodenFlaeche > 0) {
      let vinylPreis = 25; // 25 €/m² inkl. Material
      
      // Zusatzoptionen für Boden
      if (formData.zusatzoptionen.includes('altbelag-entfernen')) {
        vinylPreis += 6;
      }
      if (formData.zusatzoptionen.includes('ausgleichen')) {
        vinylPreis += 8;
      }
      
      totalPrice += bodenFlaeche * vinylPreis;
    }
    
    // 7. EPOXIDHARZBESCHICHTUNG
    if (hasEpoxid && epoxidFlaeche > 0) {
      totalPrice += epoxidFlaeche * 150; // 150 €/m²
    }
    
    // 8. ALTBAU-ZUSCHLAG (+20%)
    if (isAltbau) {
      totalPrice *= 1.20;
    }
    
    // 9. ZUSATZOPTIONEN (Festpreise)
    if (formData.zusatzoptionen.includes('abkleben')) {
      totalPrice += 120;
    }
    if (formData.zusatzoptionen.includes('moebel')) {
      totalPrice += 120;
    }
    
    // Mindestpreis
    if (totalPrice < 150) {
      totalPrice = 150;
    }
    
    // Preisspanne: -10% bis +15% für Min/Max
    const min = Math.round((totalPrice * 0.90) / 10) * 10;
    const max = Math.round((totalPrice * 1.15) / 10) * 10;
    
    return { min, max };
  }, [formData, isAltbau, hasWaendeDecken, hasSpachteln, hasTapezieren, hasLackierung, hasSchimmel, hasVinylboden, hasEpoxid, hasStandardWandarbeiten]);

  // Update live price when form changes
  useEffect(() => {
    const newPrice = calculateLivePrice();
    if (newPrice && JSON.stringify(newPrice) !== JSON.stringify(calculatedPrice)) {
      setCalculatedPrice(newPrice);
      setPriceGlowing(true);
      setTimeout(() => setPriceGlowing(false), 800);
    }
  }, [calculateLivePrice, calculatedPrice]);

  const handleLeistungToggle = (leistungId) => {
    setFormData(prev => ({
      ...prev,
      leistungen: prev.leistungen.includes(leistungId)
        ? prev.leistungen.filter(id => id !== leistungId)
        : [...prev.leistungen, leistungId]
    }));
  };

  const handleZusatzoptionToggle = (optionId) => {
    setFormData(prev => ({
      ...prev,
      zusatzoptionen: prev.zusatzoptionen.includes(optionId)
        ? prev.zusatzoptionen.filter(id => id !== optionId)
        : [...prev.zusatzoptionen, optionId]
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Datei ist zu groß. Maximal 5MB erlaubt.');
        return;
      }
      setFormData(prev => ({ ...prev, foto: file }));
      toast.success('Foto hochgeladen');
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.plz || formData.plz.length !== 5) {
          toast.error('Bitte geben Sie eine gültige PLZ ein');
          return false;
        }
        return true;
      case 2:
        if (!formData.objektart) {
          toast.error('Bitte wählen Sie eine Objektart');
          return false;
        }
        return true;
      case 3:
        if (formData.leistungen.length === 0) {
          toast.error('Bitte wählen Sie mindestens eine Leistung');
          return false;
        }
        // Epoxid benötigt Fläche
        if (hasEpoxid && !formData.epoxidFlaeche) {
          toast.error('Bitte geben Sie die Bodenfläche für die Epoxidbeschichtung ein');
          return false;
        }
        // Vinyl/Boden benötigt Fläche
        if (hasVinylboden && !formData.bodenFlaeche) {
          toast.error('Bitte geben Sie die Bodenfläche ein');
          return false;
        }
        // Schimmel benötigt Fläche
        if (hasSchimmel && !formData.schimmelFlaeche) {
          toast.error('Bitte geben Sie die betroffene Fläche ein');
          return false;
        }
        // Lackierung benötigt Anzahl Türen
        if (hasLackierung && !formData.anzahlTueren) {
          toast.error('Bitte geben Sie die Anzahl der Türen ein');
          return false;
        }
        return true;
      case 4:
        // Nur bei Standard-Wandarbeiten nötig
        if (!hasStandardWandarbeiten) return true;
        if (formData.groesseOption === 'raeume' && !formData.anzahlRaeume) {
          toast.error('Bitte geben Sie die Anzahl der Räume ein');
          return false;
        }
        if (formData.groesseOption === 'flaeche' && !formData.wandflaeche) {
          toast.error('Bitte geben Sie die Wandfläche ein');
          return false;
        }
        return true;
      case 5:
        // Raumhöhe nur bei Standard-Wandarbeiten
        if (!needsRaumhoeheQuestion) return true;
        if (!formData.raumhoehe) {
          toast.error('Bitte wählen Sie die Raumhöhe');
          return false;
        }
        return true;
      case 6:
        // Zustand nur bei Wandarbeiten
        if (hasBodenarbeiten && !hasStandardWandarbeiten && !formData.aktuellerBoden) {
          toast.error('Bitte wählen Sie den aktuellen Bodenbelag');
          return false;
        }
        if (hasStandardWandarbeiten && !formData.zustand) {
          toast.error('Bitte wählen Sie den Zustand');
          return false;
        }
        return true;
      case 7:
        // Tapete oder Farbe
        if (hasTapezieren && !formData.tapetenArt) {
          toast.error('Bitte wählen Sie eine Tapetenart');
          return false;
        }
        if (needsColorQuestion && !formData.farbe) {
          toast.error('Bitte wählen Sie eine Farboption');
          return false;
        }
        // Bei nur Spezial-Leistungen keine Farbe nötig
        if (hasOnlySpecialLeistungen) return true;
        return true;
      case 8:
        // Spachtel nur bei Standard-Wandarbeiten
        if (!needsSpachtelQuestion) return true;
        if (!formData.spachtelstufe) {
          toast.error('Bitte wählen Sie eine Spachtelstufe');
          return false;
        }
        return true;
      case 9:
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === totalSteps) {
        setLoading(true);
        // Use live calculation for final price
        const price = calculateLivePrice();
        setCalculatedPrice(price);
        setLoading(false);
      } else {
        let nextStep = currentStep + 1;
        // Skip Raumhöhe bei speziellen Leistungen
        if (nextStep === 5 && !needsRaumhoeheQuestion) nextStep = 6;
        // Skip Farbe bei speziellen Leistungen
        if (nextStep === 7 && hasOnlySpecialLeistungen) nextStep = 8;
        // Skip Spachtel bei speziellen Leistungen
        if (nextStep === 8 && !needsSpachtelQuestion) nextStep = 9;
        setCurrentStep(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (showSuccess) {
      setShowSuccess(false);
    } else if (currentStep === 1) {
      return;
    } else {
      let prevStep = currentStep - 1;
      if (prevStep === 8 && hasOnlyBodenarbeiten) prevStep = 7;
      if (prevStep === 5 && hasOnlyBodenarbeiten) prevStep = 4;
      setCurrentStep(prevStep);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.telefon || !formData.email) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      
      submitData.append('calculator_data', JSON.stringify({
        plz: formData.plz,
        objektart: formData.objektart,
        leistungen: formData.leistungen,
        groesseOption: formData.groesseOption,
        anzahlRaeume: formData.anzahlRaeume,
        wandflaeche: formData.wandflaeche,
        raumhoehe: formData.raumhoehe,
        zustand: formData.zustand,
        farbe: formData.farbe,
        tapetenArt: formData.tapetenArt,
        spachtelstufe: formData.spachtelstufe,
        zusatzoptionen: formData.zusatzoptionen
      }));
      
      submitData.append('contact_data', JSON.stringify({
        name: formData.name,
        telefon: formData.telefon,
        email: formData.email,
        rueckrufZeit: formData.rueckrufZeit
      }));
      
      submitData.append('price_data', JSON.stringify(calculatedPrice));
      
      if (formData.foto) {
        submitData.append('files', formData.foto);
      }
      
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/leads`, {
        method: 'POST',
        body: submitData
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setShowSuccess(true);
        toast.success(result.message);
      } else {
        throw new Error(result.detail || 'Fehler beim Senden');
      }
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-12" data-testid="success-screen">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Vielen Dank!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Wir melden uns telefonisch zur weiteren Abstimmung.
                </p>
                <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
                  <p className="text-sm text-gray-300 mb-3">Ihre geschätzte Preisspanne:</p>
                  <p className="text-4xl md:text-5xl font-extrabold">
                    {calculatedPrice?.min?.toLocaleString('de-DE')} € - {calculatedPrice?.max?.toLocaleString('de-DE')} €
                  </p>
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-[#1e328b] hover:bg-[#162567] text-white btn-shine btn-tap"
                  data-testid="back-to-home-btn"
                >
                  Zur Startseite
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Lead Form (Final Step)
  if (currentStep === totalSteps && calculatedPrice) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-3">
                  <Card className="border-2 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-[#1e328b] to-[#2a45b0] p-6 text-white">
                      <h2 className="text-2xl font-bold">Rückruf anfordern</h2>
                      <p className="text-white/80 mt-1">Wir melden uns zeitnah bei Ihnen</p>
                    </div>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmitLead} className="space-y-5" data-testid="lead-form">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Ihr Name"
                              className="pl-10"
                              required
                              data-testid="input-name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telefon">Telefonnummer *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="telefon"
                              type="tel"
                              value={formData.telefon}
                              onChange={(e) => setFormData(prev => ({ ...prev, telefon: e.target.value }))}
                              placeholder="040 1234 5678"
                              className="pl-10"
                              required
                              data-testid="input-telefon"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">E-Mail *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="ihre@email.de"
                              className="pl-10"
                              required
                              data-testid="input-email"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rueckrufZeit">Gewünschtes Rückruf-Zeitfenster</Label>
                          <Input
                            id="rueckrufZeit"
                            value={formData.rueckrufZeit}
                            onChange={(e) => setFormData(prev => ({ ...prev, rueckrufZeit: e.target.value }))}
                            placeholder="z.B. Vormittags oder nach 18 Uhr"
                            data-testid="input-rueckrufzeit"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="foto">Foto hochladen (optional)</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1e328b] transition-colors">
                            <input
                              id="foto"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                              data-testid="input-foto"
                            />
                            <label htmlFor="foto" className="cursor-pointer">
                              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                {formData.foto ? formData.foto.name : 'Klicken Sie hier, um ein Foto hochzuladen'}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">Max. 5MB</p>
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(8)}
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
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Column */}
                <div className="lg:col-span-2">
                  <LiveSummary 
                    formData={formData}
                    calculatedPrice={calculatedPrice}
                    leistungenOptions={leistungenOptions}
                    isAltbau={isAltbau}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Main Calculator UI with 2-Column Layout
  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Hero with Messen Image - Extra padding to avoid header overlap */}
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
              {/* GEO Text for AI visibility */}
              <p className="text-sm text-gray-500 italic hidden lg:block">
                {leistungsbilder.messen?.geoText}
              </p>
            </div>
            
            {/* Messen Image with Hover Effect - Positioned below header */}
            {leistungsbilder.messen?.url && (
              <div className="hidden lg:block">
                <figure 
                  className="relative overflow-hidden rounded-2xl shadow-xl group"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  <img
                    src={leistungsbilder.messen.url}
                    alt={leistungsbilder.messen.alt}
                    title={leistungsbilder.messen.title}
                    loading="eager"
                    className="w-full h-72 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    itemProp="contentUrl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium">{leistungsbilder.messen.title}</p>
                  </div>
                  <meta itemProp="description" content={leistungsbilder.messen.alt} />
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
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-3">
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-6 lg:p-8">
                    {/* Step 1: PLZ */}
                    {currentStep === 1 && (
                      <div className="space-y-6" data-testid="step-1">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Wo soll das Projekt durchgeführt werden?
                          </h2>
                          <p className="text-gray-600">Geben Sie Ihre Postleitzahl ein</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plz">Postleitzahl *</Label>
                          <Input
                            id="plz"
                            type="text"
                            maxLength="5"
                            value={formData.plz}
                            onChange={(e) => setFormData(prev => ({ ...prev, plz: e.target.value.replace(/\D/g, '') }))}
                            placeholder="z.B. 20095"
                            className="text-lg h-12"
                            data-testid="input-plz"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Objektart */}
                    {currentStep === 2 && (
                      <div className="space-y-6" data-testid="step-2">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welche Objektart haben Sie?
                          </h2>
                          <p className="text-gray-600">Wählen Sie die passende Option</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <SelectionCard
                            selected={formData.objektart === 'wohnung'}
                            onClick={() => setFormData(prev => ({ ...prev, objektart: 'wohnung' }))}
                            icon={HomeIcon}
                            title="Wohnung"
                            large
                          />
                          <SelectionCard
                            selected={formData.objektart === 'haus'}
                            onClick={() => setFormData(prev => ({ ...prev, objektart: 'haus' }))}
                            icon={Building}
                            title="Haus"
                            large
                          />
                          <SelectionCard
                            selected={formData.objektart === 'gewerbe'}
                            onClick={() => setFormData(prev => ({ ...prev, objektart: 'gewerbe' }))}
                            icon={Briefcase}
                            title="Gewerbe"
                            large
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Leistungen */}
                    {currentStep === 3 && (
                      <div className="space-y-6" data-testid="step-3">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welche Leistungen benötigen Sie?
                          </h2>
                          <p className="text-gray-600">Mehrfachauswahl möglich</p>
                        </div>
                        <div className="space-y-3">
                          {leistungenOptions.map((leistung) => (
                            <SelectionCard
                              key={leistung.id}
                              selected={formData.leistungen.includes(leistung.id)}
                              onClick={() => handleLeistungToggle(leistung.id)}
                              icon={leistung.icon}
                              title={leistung.label}
                            />
                          ))}
                        </div>
                        
                        {/* Bodenbelag-Flächen-Eingabe */}
                        {formData.leistungen.includes('boden') && (
                          <div className="mt-6 p-4 bg-amber-50 rounded-xl border-2 border-amber-300">
                            <Label htmlFor="bodenFlaeche" className="text-amber-800 font-semibold">
                              Bodenfläche für Vinylboden in m² * (25 €/m² netto inkl. Material)
                            </Label>
                            <Input
                              id="bodenFlaeche"
                              type="number"
                              min="1"
                              value={formData.bodenFlaeche}
                              onChange={(e) => setFormData(prev => ({ ...prev, bodenFlaeche: e.target.value }))}
                              placeholder="z.B. 30"
                              className="mt-2 text-lg"
                              data-testid="input-boden-flaeche"
                            />
                          </div>
                        )}

                        {/* Epoxid-Flächen-Eingabe */}
                        {formData.leistungen.includes('epoxid') && (
                          <div className="mt-4 p-4 bg-[#1e328b]/5 rounded-xl border-2 border-[#1e328b]/30">
                            <Label htmlFor="epoxidFlaeche" className="text-[#1e328b] font-semibold">
                              Bodenfläche für Epoxidbeschichtung in m² * (150 €/m² netto)
                            </Label>
                            <Input
                              id="epoxidFlaeche"
                              type="number"
                              min="1"
                              value={formData.epoxidFlaeche}
                              onChange={(e) => setFormData(prev => ({ ...prev, epoxidFlaeche: e.target.value }))}
                              placeholder="z.B. 50"
                              className="mt-2 text-lg"
                              data-testid="input-epoxid-flaeche"
                            />
                          </div>
                        )}

                        {/* Schimmel-Flächen-Eingabe */}
                        {formData.leistungen.includes('schimmel') && (
                          <div className="mt-4 p-4 bg-red-50 rounded-xl border-2 border-red-300">
                            <Label htmlFor="schimmelFlaeche" className="text-red-800 font-semibold">
                              Betroffene Fläche in m² * (ab 150 € + 35 €/m² netto)
                            </Label>
                            <Input
                              id="schimmelFlaeche"
                              type="number"
                              min="1"
                              value={formData.schimmelFlaeche}
                              onChange={(e) => setFormData(prev => ({ ...prev, schimmelFlaeche: e.target.value }))}
                              placeholder="z.B. 5"
                              className="mt-2 text-lg"
                              data-testid="input-schimmel-flaeche"
                            />
                          </div>
                        )}

                        {/* Türen/Zargen-Eingabe */}
                        {formData.leistungen.includes('lackierung') && (
                          <div className="mt-4 p-4 bg-purple-50 rounded-xl border-2 border-purple-300">
                            <Label htmlFor="anzahlTueren" className="text-purple-800 font-semibold">
                              Anzahl Türen inkl. Zargen * (120 € netto pro Stück)
                            </Label>
                            <Input
                              id="anzahlTueren"
                              type="number"
                              min="1"
                              value={formData.anzahlTueren}
                              onChange={(e) => setFormData(prev => ({ ...prev, anzahlTueren: e.target.value }))}
                              placeholder="z.B. 5"
                              className="mt-2 text-lg"
                              data-testid="input-anzahl-tueren"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 4: Größe */}
                    {currentStep === 4 && (
                      <div className="space-y-6" data-testid="step-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Wie groß ist das Projekt?
                          </h2>
                          <p className="text-gray-600">Wählen Sie eine Angabemöglichkeit</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <SelectionCard
                            selected={formData.groesseOption === 'raeume'}
                            onClick={() => setFormData(prev => ({ ...prev, groesseOption: 'raeume' }))}
                            title="Anzahl Räume"
                          />
                          <SelectionCard
                            selected={formData.groesseOption === 'flaeche'}
                            onClick={() => setFormData(prev => ({ ...prev, groesseOption: 'flaeche' }))}
                            title="Wandfläche in m²"
                          />
                        </div>

                        {formData.groesseOption === 'raeume' && (
                          <div className="space-y-2">
                            <Label htmlFor="anzahlRaeume">Anzahl der Räume *</Label>
                            <Input
                              id="anzahlRaeume"
                              type="number"
                              min="1"
                              value={formData.anzahlRaeume}
                              onChange={(e) => setFormData(prev => ({ ...prev, anzahlRaeume: e.target.value }))}
                              placeholder="z.B. 4"
                              className="text-lg h-12"
                              data-testid="input-anzahl-raeume"
                            />
                          </div>
                        )}

                        {formData.groesseOption === 'flaeche' && (
                          <div className="space-y-2">
                            <Label htmlFor="wandflaeche">Wandfläche in m² *</Label>
                            <Input
                              id="wandflaeche"
                              type="number"
                              min="1"
                              step="0.1"
                              value={formData.wandflaeche}
                              onChange={(e) => setFormData(prev => ({ ...prev, wandflaeche: e.target.value }))}
                              placeholder="z.B. 120"
                              className="text-lg h-12"
                              data-testid="input-wandflaeche"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 5: Raumhöhe */}
                    {currentStep === 5 && (
                      <div className="space-y-6" data-testid="step-5">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Wie hoch sind die Räume?
                          </h2>
                          <p className="text-gray-600">Wählen Sie die durchschnittliche Raumhöhe</p>
                        </div>
                        <div className="space-y-3">
                          <SelectionCard
                            selected={formData.raumhoehe === 'niedrig'}
                            onClick={() => setFormData(prev => ({ ...prev, raumhoehe: 'niedrig' }))}
                            title="unter 2,6m"
                          />
                          <SelectionCard
                            selected={formData.raumhoehe === 'normal'}
                            onClick={() => setFormData(prev => ({ ...prev, raumhoehe: 'normal' }))}
                            title="2,6m – 3m"
                          />
                          <SelectionCard
                            selected={formData.raumhoehe === 'hoch'}
                            onClick={() => setFormData(prev => ({ ...prev, raumhoehe: 'hoch' }))}
                            title="über 3m"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 6: Zustand / Aktueller Boden */}
                    {currentStep === 6 && (
                      <div className="space-y-8" data-testid="step-6">
                        {/* Aktueller Boden */}
                        {hasBodenarbeiten && (
                          <div className="space-y-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Was befindet sich aktuell auf dem Boden?
                              </h2>
                              <p className="text-gray-600">Wählen Sie den vorhandenen Bodenbelag</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {aktuellerBodenOptionen.map((option) => (
                                <Chip
                                  key={option.id}
                                  selected={formData.aktuellerBoden === option.id}
                                  onClick={() => setFormData(prev => ({ ...prev, aktuellerBoden: option.id }))}
                                >
                                  {option.label}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Raumzustand */}
                        {hasStandardWandarbeiten && (
                          <div className="space-y-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {hasBodenarbeiten ? 'Zustand der Wände' : 'In welchem Zustand sind die Räume?'}
                              </h2>
                              <p className="text-gray-600">Beschreiben Sie den aktuellen Zustand</p>
                            </div>
                            <div className="space-y-3">
                              <SelectionCard
                                selected={formData.zustand === 'normal'}
                                onClick={() => setFormData(prev => ({ ...prev, zustand: 'normal' }))}
                                title="Normal / Neubau"
                                subtitle="Guter Zustand, keine besonderen Vorarbeiten nötig"
                              />
                              <SelectionCard
                                selected={formData.zustand === 'altbau'}
                                onClick={() => setFormData(prev => ({ ...prev, zustand: 'altbau' }))}
                                title="Altbau"
                                subtitle="Höhere Decken, eventuell unebene Wände (+20% Aufschlag)"
                              />
                              <SelectionCard
                                selected={formData.zustand === 'renovierung'}
                                onClick={() => setFormData(prev => ({ ...prev, zustand: 'renovierung' }))}
                                title="Renovierungsbedürftig"
                                subtitle="Umfangreiche Vorarbeiten erforderlich"
                              />
                            </div>

                            {/* Altbau-Modus Hinweis */}
                            {isAltbau && (
                              <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-amber-800">Altbau-Zuschlag: +20%</p>
                                  <p className="text-sm text-amber-700 mt-1">
                                    Bei Altbauten rechnen wir mit zusätzlichem Aufwand für Abkleben, 
                                    Spachteln und eventuell Stuckarbeiten.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Nur spezielle Leistungen - Hinweis */}
                        {hasOnlySpecialLeistungen && (
                          <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl text-center">
                            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                              Zustandsbewertung nicht erforderlich
                            </h2>
                            <p className="text-gray-600">
                              Für die gewählten Leistungen (Vinyl, Epoxid, Schimmel) ist keine separate Zustandsbewertung nötig.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 7: Tapete / Farbe */}
                    {currentStep === 7 && (
                      <div className="space-y-8" data-testid="step-7">
                        {/* Tapetenauswahl */}
                        {hasTapezieren && (
                          <div className="space-y-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Welche Tapete wünschen Sie?
                              </h2>
                              <p className="text-gray-600">Wählen Sie die gewünschte Tapetenart</p>
                            </div>
                            <div className="space-y-3">
                              <SelectionCard
                                selected={formData.tapetenArt === 'raufaser'}
                                onClick={() => setFormData(prev => ({ ...prev, tapetenArt: 'raufaser' }))}
                                title="Raufaser"
                                subtitle="14 €/m² netto"
                              />
                              <SelectionCard
                                selected={formData.tapetenArt === 'glattvlies'}
                                onClick={() => setFormData(prev => ({ ...prev, tapetenArt: 'glattvlies' }))}
                                title="Glattvlies"
                                subtitle="18 €/m² netto"
                              />
                              <SelectionCard
                                selected={formData.tapetenArt === 'mustertapete'}
                                onClick={() => setFormData(prev => ({ ...prev, tapetenArt: 'mustertapete' }))}
                                title="Mustertapete"
                                subtitle="22 €/m² netto"
                              />
                            </div>
                          </div>
                        )}

                        {/* Farbauswahl */}
                        {needsColorQuestion && (
                          <div className="space-y-4">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {hasTapezieren ? 'Welche Farbgebung für die Wände?' : 'Welche Farbgebung wünschen Sie?'}
                              </h2>
                              <p className="text-gray-600">Wählen Sie Ihre bevorzugte Option</p>
                            </div>
                            <div className="space-y-3">
                              <SelectionCard
                                selected={formData.farbe === 'weiss'}
                                onClick={() => setFormData(prev => ({ ...prev, farbe: 'weiss' }))}
                                title="Weiß"
                                subtitle="8,10 €/m² netto"
                              />
                              <SelectionCard
                                selected={formData.farbe === 'farbig'}
                                onClick={() => setFormData(prev => ({ ...prev, farbe: 'farbig' }))}
                                title="Farbig"
                                subtitle="10,60 €/m² netto (+2,50 €)"
                              />
                              <SelectionCard
                                selected={formData.farbe === 'premium'}
                                onClick={() => setFormData(prev => ({ ...prev, farbe: 'premium' }))}
                                title="Premium (abwaschbar)"
                                subtitle="12,10 €/m² netto (+4 €)"
                              />
                            </div>
                          </div>
                        )}

                        {/* Nur spezielle Leistungen - Skip Message */}
                        {hasOnlySpecialLeistungen && (
                          <div className="space-y-4">
                            <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl text-center">
                              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                              <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Keine Farbauswahl erforderlich
                              </h2>
                              <p className="text-gray-600">
                                Für die gewählten Leistungen ist keine separate Farbauswahl nötig.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 8: Spachtelstufe */}
                    {currentStep === 8 && (
                      <div className="space-y-6" data-testid="step-8">
                        {needsSpachtelQuestion ? (
                          <>
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Welche Spachtelstufe benötigen Sie?
                              </h2>
                              <p className="text-gray-600">Je höher die Stufe, desto glatter die Oberfläche</p>
                            </div>
                            <div className="space-y-3">
                              <SelectionCard
                                selected={formData.spachtelstufe === 'keine'}
                                onClick={() => setFormData(prev => ({ ...prev, spachtelstufe: 'keine' }))}
                                title="Keine"
                                subtitle="Kein Spachteln erforderlich"
                              />
                              <SelectionCard
                                selected={formData.spachtelstufe === 'q2'}
                                onClick={() => setFormData(prev => ({ ...prev, spachtelstufe: 'q2' }))}
                                title="Q2 – Standard"
                                subtitle="+6 €/m² netto"
                              />
                              <SelectionCard
                                selected={formData.spachtelstufe === 'q3'}
                                onClick={() => setFormData(prev => ({ ...prev, spachtelstufe: 'q3' }))}
                                title="Q3 – Hochwertig"
                                subtitle="+10 €/m² netto"
                              />
                              <SelectionCard
                                selected={formData.spachtelstufe === 'q4'}
                                onClick={() => setFormData(prev => ({ ...prev, spachtelstufe: 'q4' }))}
                                title="Q4 – Premium (Glanz)"
                                subtitle="+15 €/m² netto"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl text-center">
                            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                              Keine Spachtelarbeiten erforderlich
                            </h2>
                            <p className="text-gray-600">
                              Für die gewählten Leistungen sind keine Spachtelarbeiten nötig.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 9: Zusatzoptionen */}
                    {currentStep === 9 && !calculatedPrice && (
                      <div className="space-y-6" data-testid="step-9">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Benötigen Sie Zusatzleistungen?
                          </h2>
                          <p className="text-gray-600">Optional – Mehrfachauswahl möglich</p>
                        </div>
                        {zusatzoptionenOptions.length > 0 ? (
                          <div className="space-y-3">
                            {zusatzoptionenOptions.map((option) => (
                              <label
                                key={option.id}
                                className={`
                                  flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all
                                  ${formData.zusatzoptionen.includes(option.id)
                                    ? 'border-[#1e328b] bg-[#1e328b]/5'
                                    : 'border-gray-200 hover:border-[#1e328b]/40'
                                  }
                                `}
                              >
                                <div className="flex items-center space-x-3">
                                  <Checkbox
                                    checked={formData.zusatzoptionen.includes(option.id)}
                                    onCheckedChange={() => handleZusatzoptionToggle(option.id)}
                                  />
                                  <span className="font-medium">{option.label}</span>
                                </div>
                                {option.price && (
                                  <span className="text-sm text-[#1e328b] font-semibold">
                                    +{option.price} € netto
                                  </span>
                                )}
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-xl text-center text-gray-600">
                            Keine Zusatzleistungen für die gewählten Arbeiten verfügbar.
                          </div>
                        )}
                        <p className="text-sm text-gray-500 italic">
                          * Sie können auch ohne Zusatzoption fortfahren
                        </p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4 mt-8 pt-6 border-t">
                      {currentStep > 1 && (
                        <Button
                          onClick={handleBack}
                          variant="outline"
                          className="flex-1 h-12"
                          data-testid="btn-back"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />
                          Zurück
                        </Button>
                      )}
                      <Button
                        onClick={handleNext}
                        disabled={loading}
                        className="flex-1 h-12 bg-[#1e328b] hover:bg-[#162567] text-white btn-shine btn-tap"
                        data-testid="btn-next"
                      >
                        {loading ? 'Berechne...' : currentStep === totalSteps ? 'Preis berechnen' : 'Weiter'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Summary Column - Desktop only */}
              <div className="hidden lg:block lg:col-span-2">
                <LiveSummary 
                  formData={formData}
                  calculatedPrice={calculatedPrice}
                  leistungenOptions={leistungenOptions}
                  isAltbau={isAltbau}
                />
              </div>
            </div>

            {/* Mobile Summary - Shows below form on mobile */}
            <div className="lg:hidden mt-8">
              <LiveSummary 
                formData={formData}
                calculatedPrice={calculatedPrice}
                leistungenOptions={leistungenOptions}
                isAltbau={isAltbau}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RechnerNeu;
