import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { Progress } from '../components/ui/progress';
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
  User
} from 'lucide-react';
import { toast } from 'sonner';

const RechnerNeu = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Schritt 1
    plz: '',
    // Schritt 2
    objektart: '',
    // Schritt 3
    leistungen: [],
    // Schritt 4
    groesseOption: 'raeume', // 'raeume' oder 'flaeche'
    anzahlRaeume: '',
    wandflaeche: '',
    epoxidFlaeche: '', // Für Epoxidharzbodenbeschichtung
    bodenFlaeche: '', // Für Bodenbeläge
    // Schritt 5
    raumhoehe: '',
    // Schritt 6
    zustand: '',
    // Schritt 6b - Boden-spezifisch
    aktuellerBoden: '',
    // Schritt 7
    farbe: '',
    tapetenArt: '',
    // Schritt 8
    spachtelstufe: '',
    // Schritt 9
    zusatzoptionen: [],
    // Lead Form
    name: '',
    telefon: '',
    email: '',
    rueckrufZeit: '',
    foto: null
  });

  // Prüfen ob nur Bodenarbeiten ausgewählt sind
  const bodenLeistungen = ['boden', 'epoxid'];
  const wandLeistungen = ['waende-decken', 'lackierung', 'tapezieren', 'spachteln', 'schimmel'];
  
  const hasOnlyBodenarbeiten = formData.leistungen.length > 0 && 
    formData.leistungen.every(l => bodenLeistungen.includes(l));
  
  const hasBodenarbeiten = formData.leistungen.some(l => bodenLeistungen.includes(l));
  const hasWandarbeiten = formData.leistungen.some(l => wandLeistungen.includes(l));
  const hasTapezieren = formData.leistungen.includes('tapezieren');
  const needsColorQuestion = formData.leistungen.some(l => ['waende-decken', 'lackierung'].includes(l));

  const totalSteps = 9;
  const progress = (currentStep / totalSteps) * 100;

  const leistungenOptions = [
    { id: 'waende-decken', label: 'Wände & Decken streichen', preis: 20 },
    { id: 'lackierung', label: 'Lackierarbeiten', preis: 25 },
    { id: 'tapezieren', label: 'Tapezierarbeiten', preis: 15 },
    { id: 'spachteln', label: 'Spachtelarbeiten', preis: 18 },
    { id: 'boden', label: 'Bodenbeläge', preis: 30 },
    { id: 'schimmel', label: 'Schimmelsanierung', preis: 40 },
    { id: 'epoxid', label: 'Epoxidharzbodenbeschichtung', preis: 200 }
  ];

  // Zusatzoptionen für Wandarbeiten
  const zusatzoptionenWand = [
    { id: 'abkleben', label: 'Abkleben / Schutz', preis: 200 },
    { id: 'moebel', label: 'Möbel bewegen', preis: 150 },
    { id: 'tueren', label: 'Türen / Heizkörper lackieren', preis: 300 }
  ];

  // Zusatzoptionen für Bodenarbeiten
  const zusatzoptionenBoden = [
    { id: 'altbelag-entfernen', label: 'Altbelag entfernen', preis: 250 },
    { id: 'schleifen', label: 'Untergrund schleifen', preis: 200 },
    { id: 'ausgleichen', label: 'Untergrund ausgleichen / nivellieren', preis: 350 },
    { id: 'grundierung', label: 'Grundierung erforderlich', preis: 150 }
  ];

  // Dynamische Zusatzoptionen basierend auf Leistungen
  const zusatzoptionenOptions = hasOnlyBodenarbeiten 
    ? zusatzoptionenBoden 
    : hasBodenarbeiten && hasWandarbeiten 
      ? [...zusatzoptionenWand, ...zusatzoptionenBoden]
      : zusatzoptionenWand;

  // Aktuelle Boden-Optionen
  const aktuellerBodenOptionen = [
    { id: 'fliesen', label: 'Fliesen' },
    { id: 'teppich', label: 'Teppich' },
    { id: 'laminat', label: 'Laminat' },
    { id: 'vinyl', label: 'Vinyl' },
    { id: 'estrich', label: 'Estrich' },
    { id: 'rohbeton', label: 'Rohbeton' },
    { id: 'sonstiges', label: 'Sonstiges' }
  ];

  const calculatePrice = async () => {
    // Rufe Backend-API für Preisberechnung auf
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/calculate-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plz: formData.plz,
          objektart: formData.objektart,
          leistungen: formData.leistungen,
          groesse_typ: formData.groesseOption,
          anzahl_raeume: formData.anzahlRaeume ? parseInt(formData.anzahlRaeume) : null,
          wandflaeche_qm: formData.wandflaeche ? parseFloat(formData.wandflaeche) : null,
          epoxid_flaeche_qm: formData.epoxidFlaeche ? parseFloat(formData.epoxidFlaeche) : null,
          boden_flaeche_qm: formData.bodenFlaeche ? parseFloat(formData.bodenFlaeche) : null,
          raumhoehe: hasOnlyBodenarbeiten ? 'nicht-relevant' : formData.raumhoehe,
          zustand: formData.zustand,
          aktueller_boden: formData.aktuellerBoden,
          farbe: formData.farbe,
          tapeten_art: formData.tapetenArt,
          spachtelstufe: hasOnlyBodenarbeiten ? 'keine' : formData.spachtelstufe,
          zusatzoptionen: formData.zusatzoptionen
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        return { 
          min: data.preis_min, 
          max: data.preis_max,
          details: data.berechnungsdetails
        };
      } else {
        throw new Error('Preisberechnung fehlgeschlagen');
      }
    } catch (error) {
      console.error('Price calculation error:', error);
      // Fallback auf lokale Mock-Berechnung
      return { min: 500, max: 1000 };
    }
  };

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
        if (formData.leistungen.includes('epoxid') && !formData.epoxidFlaeche) {
          toast.error('Bitte geben Sie die Bodenfläche für die Epoxidbeschichtung ein');
          return false;
        }
        if (formData.leistungen.includes('boden') && !formData.bodenFlaeche) {
          toast.error('Bitte geben Sie die Bodenfläche ein');
          return false;
        }
        return true;
      case 4:
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
        // Bei reinen Bodenarbeiten Raumhöhe überspringen
        if (hasOnlyBodenarbeiten) {
          return true;
        }
        if (!formData.raumhoehe) {
          toast.error('Bitte wählen Sie die Raumhöhe');
          return false;
        }
        return true;
      case 6:
        // Bei Bodenarbeiten: aktueller Boden erforderlich
        if (hasBodenarbeiten && !formData.aktuellerBoden) {
          toast.error('Bitte wählen Sie den aktuellen Bodenbelag');
          return false;
        }
        if (!hasOnlyBodenarbeiten && !formData.zustand) {
          toast.error('Bitte wählen Sie den Zustand');
          return false;
        }
        return true;
      case 7:
        if (hasTapezieren && !formData.tapetenArt) {
          toast.error('Bitte wählen Sie eine Tapetenart');
          return false;
        }
        if (needsColorQuestion && !formData.farbe) {
          toast.error('Bitte wählen Sie eine Farboption');
          return false;
        }
        if (hasOnlyBodenarbeiten && !formData.farbe) {
          toast.error('Bitte wählen Sie eine Option');
          return false;
        }
        return true;
      case 8:
        // Bei reinen Bodenarbeiten Spachtelstufe überspringen
        if (hasOnlyBodenarbeiten) {
          return true;
        }
        if (!formData.spachtelstufe) {
          toast.error('Bitte wählen Sie eine Spachtelstufe');
          return false;
        }
        return true;
      case 9:
        // Zusatzoptionen sind optional
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === totalSteps) {
        // Berechne Preis und zeige Lead-Formular
        setLoading(true);
        const price = await calculatePrice();
        setCalculatedPrice(price);
        setLoading(false);
      } else {
        // Bei reinen Bodenarbeiten bestimmte Schritte überspringen
        let nextStep = currentStep + 1;
        
        // Schritt 5 (Raumhöhe) überspringen bei reinen Bodenarbeiten
        if (nextStep === 5 && hasOnlyBodenarbeiten) {
          nextStep = 6;
        }
        
        // Schritt 8 (Spachtelstufe) überspringen bei reinen Bodenarbeiten
        if (nextStep === 8 && hasOnlyBodenarbeiten) {
          nextStep = 9;
        }
        
        setCurrentStep(nextStep);
      }
    }
  };

  const handleBack = () => {
    if (calculatedPrice && !showSuccess) {
      setCalculatedPrice(null);
    } else {
      let prevStep = currentStep - 1;
      
      // Bei reinen Bodenarbeiten bestimmte Schritte überspringen
      if (prevStep === 8 && hasOnlyBodenarbeiten) {
        prevStep = 7;
      }
      if (prevStep === 5 && hasOnlyBodenarbeiten) {
        prevStep = 4;
      }
      
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
      // Prepare FormData for multipart upload
      const submitData = new FormData();
      
      // Calculator data
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
        spachtelstufe: formData.spachtelstufe,
        zusatzoptionen: formData.zusatzoptionen
      }));
      
      // Contact data
      submitData.append('contact_data', JSON.stringify({
        name: formData.name,
        telefon: formData.telefon,
        email: formData.email,
        rueckrufZeit: formData.rueckrufZeit
      }));
      
      // Price data
      submitData.append('price_data', JSON.stringify(calculatedPrice));
      
      // File upload
      if (formData.foto) {
        submitData.append('files', formData.foto);
      }
      
      // Send to backend
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
              <div className="bg-white rounded-2xl shadow-xl p-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Vielen Dank!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Wir melden uns telefonisch zur weiteren Abstimmung.
                </p>
                <div className="bg-gray-100 rounded-xl p-8 mb-8 border-2 border-gray-200">
                  <p className="text-sm text-gray-700 mb-3 font-medium">Ihre geschätzte Preisspanne:</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    {calculatedPrice.min.toLocaleString('de-DE')} € - {calculatedPrice.max.toLocaleString('de-DE')} €
                  </p>
                </div>
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-ocean-blue hover:bg-ocean-blue-dark text-white"
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

  // Lead Form
  if (calculatedPrice) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <div className="text-center mb-4">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl mb-4">Ihre geschätzte Preisspanne</CardTitle>
                    <div className="bg-gray-900 text-white rounded-xl p-8 shadow-lg">
                      <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {calculatedPrice.min.toLocaleString('de-DE')} € - {calculatedPrice.max.toLocaleString('de-DE')} €
                      </p>
                      <p className="text-sm text-gray-300 mt-3">
                        * Unverbindliche Schätzung. Genauer Preis nach Besichtigung.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Jetzt Rückruf anfordern
                  </h3>
                  <form onSubmit={handleSubmitLead} className="space-y-4">
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foto">Foto hochladen (optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-ocean-blue transition-colors">
                        <input
                          id="foto"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
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
                        onClick={handleBack}
                        variant="outline"
                        className="flex-1"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Zurück
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-ocean-blue hover:bg-ocean-blue-dark text-white"
                      >
                        Anfrage senden
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-ocean-blue/10 rounded-full mb-6">
              <Calculator className="h-8 w-8 text-ocean-blue" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Angebotsrechner
            </h1>
            <p className="text-lg text-gray-600">
              In wenigen Schritten zu Ihrer Preisspanne
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Schritt {currentStep} von {totalSteps}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Calculator Steps */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
                {/* Schritt 1: PLZ */}
                {currentStep === 1 && (
                  <div className="space-y-6">
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
                        className="text-lg"
                      />
                    </div>
                  </div>
                )}

                {/* Schritt 2: Objektart */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welche Objektart haben Sie?
                      </h2>
                      <p className="text-gray-600">Wählen Sie die passende Option</p>
                    </div>
                    <RadioGroup value={formData.objektart} onValueChange={(value) => setFormData(prev => ({ ...prev, objektart: value }))}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.objektart === 'wohnung' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="wohnung" id="wohnung" className="sr-only" />
                          <div className="text-center">
                            <HomeIcon className="h-12 w-12 mx-auto mb-3 text-ocean-blue" />
                            <p className="font-semibold">Wohnung</p>
                          </div>
                        </label>
                        <label className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.objektart === 'haus' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="haus" id="haus" className="sr-only" />
                          <div className="text-center">
                            <Building className="h-12 w-12 mx-auto mb-3 text-ocean-blue" />
                            <p className="font-semibold">Haus</p>
                          </div>
                        </label>
                        <label className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${formData.objektart === 'gewerbe' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="gewerbe" id="gewerbe" className="sr-only" />
                          <div className="text-center">
                            <Briefcase className="h-12 w-12 mx-auto mb-3 text-ocean-blue" />
                            <p className="font-semibold">Gewerbe</p>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Schritt 3: Leistungen */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welche Leistungen benötigen Sie?
                      </h2>
                      <p className="text-gray-600">Mehrfachauswahl möglich</p>
                    </div>
                    <div className="space-y-3">
                      {leistungenOptions.map((leistung) => (
                        <label
                          key={leistung.id}
                          className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            formData.leistungen.includes(leistung.id)
                              ? 'border-ocean-blue bg-ocean-blue/5'
                              : 'border-gray-200 hover:border-ocean-blue/50'
                          }`}
                        >
                          <Checkbox
                            checked={formData.leistungen.includes(leistung.id)}
                            onCheckedChange={() => handleLeistungToggle(leistung.id)}
                          />
                          <span className="flex-1 font-medium">{leistung.label}</span>
                        </label>
                      ))}
                    </div>
                    
                    {/* Bodenbelag-Flächen-Eingabe */}
                    {formData.leistungen.includes('boden') && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-400">
                        <Label htmlFor="bodenFlaeche" className="text-amber-700 font-semibold">
                          Bodenfläche für Bodenbelag in m² *
                        </Label>
                        <Input
                          id="bodenFlaeche"
                          type="number"
                          min="1"
                          value={formData.bodenFlaeche}
                          onChange={(e) => setFormData(prev => ({ ...prev, bodenFlaeche: e.target.value }))}
                          placeholder="z.B. 30"
                          className="mt-2 text-lg"
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Geben Sie die Gesamtfläche an, die mit neuem Bodenbelag versehen werden soll.
                        </p>
                      </div>
                    )}

                    {/* Epoxid-Flächen-Eingabe */}
                    {formData.leistungen.includes('epoxid') && (
                      <div className="mt-6 p-4 bg-ocean-blue/5 rounded-lg border-2 border-ocean-blue">
                        <Label htmlFor="epoxidFlaeche" className="text-ocean-blue font-semibold">
                          Bodenfläche für Epoxidbeschichtung in m² *
                        </Label>
                        <Input
                          id="epoxidFlaeche"
                          type="number"
                          min="1"
                          value={formData.epoxidFlaeche}
                          onChange={(e) => setFormData(prev => ({ ...prev, epoxidFlaeche: e.target.value }))}
                          placeholder="z.B. 50"
                          className="mt-2 text-lg"
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Geben Sie die Gesamtfläche an, die mit Epoxidharz beschichtet werden soll.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Schritt 4: Größe */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Wie groß ist das Projekt?
                      </h2>
                      <p className="text-gray-600">Wählen Sie eine Angabemöglichkeit</p>
                    </div>
                    
                    <RadioGroup value={formData.groesseOption} onValueChange={(value) => setFormData(prev => ({ ...prev, groesseOption: value }))}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.groesseOption === 'raeume' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="raeume" id="raeume" className="sr-only" />
                          <p className="font-semibold text-center">Anzahl Räume</p>
                        </label>
                        <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.groesseOption === 'flaeche' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200'}`}>
                          <RadioGroupItem value="flaeche" id="flaeche" className="sr-only" />
                          <p className="font-semibold text-center">Wandfläche in m²</p>
                        </label>
                      </div>
                    </RadioGroup>

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
                          className="text-lg"
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
                          className="text-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Schritt 5: Raumhöhe */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Wie hoch sind die Räume?
                      </h2>
                      <p className="text-gray-600">Wählen Sie die durchschnittliche Raumhöhe</p>
                    </div>
                    <RadioGroup value={formData.raumhoehe} onValueChange={(value) => setFormData(prev => ({ ...prev, raumhoehe: value }))}>
                      <div className="space-y-3">
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.raumhoehe === 'niedrig' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="niedrig" id="niedrig" />
                          <span className="ml-3 font-medium">unter 2,6m</span>
                        </label>
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.raumhoehe === 'normal' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="normal" id="normal" />
                          <span className="ml-3 font-medium">2,6m – 3m</span>
                        </label>
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.raumhoehe === 'hoch' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="hoch" id="hoch" />
                          <span className="ml-3 font-medium">über 3m</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Schritt 6: Zustand / Aktueller Boden */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    {/* Aktueller Boden - bei Bodenarbeiten */}
                    {hasBodenarbeiten && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Was befindet sich aktuell auf dem Boden?
                          </h2>
                          <p className="text-gray-600">Wählen Sie den vorhandenen Bodenbelag</p>
                        </div>
                        <RadioGroup value={formData.aktuellerBoden} onValueChange={(value) => setFormData(prev => ({ ...prev, aktuellerBoden: value }))}>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {aktuellerBodenOptionen.map((option) => (
                              <label 
                                key={option.id}
                                className={`flex items-center justify-center border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                  formData.aktuellerBoden === option.id 
                                    ? 'border-ocean-blue bg-ocean-blue/5' 
                                    : 'border-gray-200 hover:border-ocean-blue/50'
                                }`}
                              >
                                <RadioGroupItem value={option.id} id={`boden-${option.id}`} className="sr-only" />
                                <span className="font-medium text-center">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Raumzustand - bei Wandarbeiten */}
                    {!hasOnlyBodenarbeiten && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {hasBodenarbeiten ? 'Zustand der Wände' : 'In welchem Zustand sind die Räume?'}
                          </h2>
                          <p className="text-gray-600">Beschreiben Sie den aktuellen Zustand</p>
                        </div>
                        <RadioGroup value={formData.zustand} onValueChange={(value) => setFormData(prev => ({ ...prev, zustand: value }))}>
                          <div className="space-y-3">
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.zustand === 'normal' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="normal" id="zustand-normal" />
                              <div className="ml-3">
                                <p className="font-medium">Normal</p>
                                <p className="text-sm text-gray-600">Guter Zustand, keine besonderen Vorarbeiten nötig</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.zustand === 'altbau' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="altbau" id="altbau" />
                              <div className="ml-3">
                                <p className="font-medium">Altbau</p>
                                <p className="text-sm text-gray-600">Höhere Decken, eventuell unebene Wände</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.zustand === 'renovierung' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="renovierung" id="renovierung" />
                              <div className="ml-3">
                                <p className="font-medium">Renovierungsbedürftig</p>
                                <p className="text-sm text-gray-600">Umfangreiche Vorarbeiten erforderlich</p>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                )}

                {/* Schritt 7: Tapete / Farbe */}
                {currentStep === 7 && (
                  <div className="space-y-8">
                    {/* Tapetenauswahl bei Tapezierarbeiten */}
                    {hasTapezieren && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welche Tapete wünschen Sie?
                          </h2>
                          <p className="text-gray-600">Wählen Sie die gewünschte Tapetenart</p>
                        </div>
                        <RadioGroup value={formData.tapetenArt} onValueChange={(value) => setFormData(prev => ({ ...prev, tapetenArt: value }))}>
                          <div className="space-y-3">
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.tapetenArt === 'mustertapete' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="mustertapete" id="mustertapete" />
                              <div className="ml-3">
                                <p className="font-medium">Mustertapete</p>
                                <p className="text-sm text-gray-600">Tapete mit dekorativem Muster oder Design</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.tapetenArt === 'raufaser' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="raufaser" id="raufaser" />
                              <div className="ml-3">
                                <p className="font-medium">Raufaser</p>
                                <p className="text-sm text-gray-600">Klassische Raufasertapete zum Überstreichen</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.tapetenArt === 'glattvlies' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="glattvlies" id="glattvlies" />
                              <div className="ml-3">
                                <p className="font-medium">Glattvlies</p>
                                <p className="text-sm text-gray-600">Glatte Vliestapete für eine gleichmäßige Oberfläche</p>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Farbauswahl nur bei Streich-/Lackierarbeiten */}
                    {needsColorQuestion && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {hasTapezieren ? 'Welche Farbgebung für die Streicharbeiten?' : 'Welche Farbgebung wünschen Sie?'}
                          </h2>
                          <p className="text-gray-600">Wählen Sie Ihre bevorzugte Option</p>
                        </div>
                        <RadioGroup value={formData.farbe} onValueChange={(value) => setFormData(prev => ({ ...prev, farbe: value }))}>
                          <div className="space-y-3">
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.farbe === 'weiss' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="weiss" id="weiss" />
                              <div className="ml-3">
                                <p className="font-medium">Weiß</p>
                                <p className="text-sm text-gray-600">Standard Weiß</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.farbe === 'bunt' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="bunt" id="bunt" />
                              <div className="ml-3">
                                <p className="font-medium">Bunt / Farbig</p>
                                <p className="text-sm text-gray-600">Farbige Gestaltung</p>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {/* Bodenoptik bei reinen Bodenarbeiten */}
                    {hasOnlyBodenarbeiten && (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Welche Optik wünschen Sie?
                          </h2>
                          <p className="text-gray-600">Wählen Sie Ihre bevorzugte Option</p>
                        </div>
                        <RadioGroup value={formData.farbe} onValueChange={(value) => setFormData(prev => ({ ...prev, farbe: value }))}>
                          <div className="space-y-3">
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.farbe === 'schlicht' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="schlicht" id="schlicht" />
                              <div className="ml-3">
                                <p className="font-medium">Schlicht</p>
                                <p className="text-sm text-gray-600">Neutrale, dezente Optik (Grau, Beige, etc.)</p>
                              </div>
                            </label>
                            <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.farbe === 'farbig' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                              <RadioGroupItem value="farbig" id="farbig" />
                              <div className="ml-3">
                                <p className="font-medium">Farbig</p>
                                <p className="text-sm text-gray-600">Individuelle Farbgestaltung</p>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                )}

                {/* Schritt 8: Spachtelstufe */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welche Spachtelstufe benötigen Sie?
                      </h2>
                      <p className="text-gray-600">Je höher die Stufe, desto glatter die Oberfläche</p>
                    </div>
                    <RadioGroup value={formData.spachtelstufe} onValueChange={(value) => setFormData(prev => ({ ...prev, spachtelstufe: value }))}>
                      <div className="space-y-3">
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.spachtelstufe === 'keine' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="keine" id="keine" />
                          <div className="ml-3">
                            <p className="font-medium">Keine</p>
                            <p className="text-sm text-gray-600">Kein Spachteln erforderlich</p>
                          </div>
                        </label>
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.spachtelstufe === 'q2' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="q2" id="q2" />
                          <div className="ml-3">
                            <p className="font-medium">Q2</p>
                            <p className="text-sm text-gray-600">Standard für normale Räume</p>
                          </div>
                        </label>
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.spachtelstufe === 'q3' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="q3" id="q3" />
                          <div className="ml-3">
                            <p className="font-medium">Q3</p>
                            <p className="text-sm text-gray-600">Höhere Qualität, feinere Oberfläche</p>
                          </div>
                        </label>
                        <label className={`flex items-center border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.spachtelstufe === 'q4' ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200 hover:border-ocean-blue/50'}`}>
                          <RadioGroupItem value="q4" id="q4" />
                          <div className="ml-3">
                            <p className="font-medium">Q4</p>
                            <p className="text-sm text-gray-600">Höchste Qualität, perfekt glatte Oberfläche</p>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Schritt 9: Zusatzoptionen */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Benötigen Sie Zusatzleistungen?
                      </h2>
                      <p className="text-gray-600">Optional – Mehrfachauswahl möglich</p>
                    </div>
                    <div className="space-y-3">
                      {zusatzoptionenOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            formData.zusatzoptionen.includes(option.id)
                              ? 'border-ocean-blue bg-ocean-blue/5'
                              : 'border-gray-200 hover:border-ocean-blue/50'
                          }`}
                        >
                          <Checkbox
                            checked={formData.zusatzoptionen.includes(option.id)}
                            onCheckedChange={() => handleZusatzoptionToggle(option.id)}
                          />
                          <span className="flex-1 font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 italic">
                      * Sie können auch keine Zusatzoption wählen und direkt fortfahren
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Zurück
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-ocean-blue hover:bg-ocean-blue-dark text-white"
                  >
                    {currentStep === totalSteps ? 'Preis berechnen' : 'Weiter'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RechnerNeu;
