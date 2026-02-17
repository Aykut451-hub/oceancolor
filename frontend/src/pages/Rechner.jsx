import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateQuote } from '../data/mock';
import { toast } from 'sonner';

const Rechner = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    area: '',
    rooms: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.area) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    setLoading(true);
    
    try {
      const response = await calculateQuote({
        serviceType: formData.serviceType,
        area: parseFloat(formData.area),
        rooms: parseInt(formData.rooms) || 1
      });
      
      setResult(response);
      toast.success('Schätzung berechnet!');
    } catch (error) {
      toast.error('Fehler bei der Berechnung');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-ocean-blue/10 rounded-full mb-6">
              <Calculator className="h-8 w-8 text-ocean-blue" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Angebotsrechner
            </h1>
            <p className="text-lg text-gray-600">
              Erhalten Sie in wenigen Minuten eine erste Kostenschätzung für Ihr Projekt. 
              Kostenlos und unverbindlich.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Projektdetails eingeben</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                  {/* Service Type */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Art der Leistung *</Label>
                    <Select 
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({...formData, serviceType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie eine Leistung" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waende-decken">Wände & Decken</SelectItem>
                        <SelectItem value="lackierung">Lackierarbeiten</SelectItem>
                        <SelectItem value="tapezieren">Tapezierarbeiten</SelectItem>
                        <SelectItem value="spachteln">Spachtelarbeiten</SelectItem>
                        <SelectItem value="boden">Bodenbeläge</SelectItem>
                        <SelectItem value="schimmel">Schimmelsanierung</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area */}
                  <div className="space-y-2">
                    <Label htmlFor="area">Fläche in m² *</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="z.B. 50"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      min="1"
                      step="0.1"
                    />
                  </div>

                  {/* Number of Rooms */}
                  <div className="space-y-2">
                    <Label htmlFor="rooms">Anzahl der Räume (optional)</Label>
                    <Input
                      id="rooms"
                      type="number"
                      placeholder="z.B. 3"
                      value={formData.rooms}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                      min="1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-ocean-blue hover:bg-ocean-blue-dark text-white"
                    disabled={loading}
                  >
                    {loading ? 'Berechne...' : 'Schätzung berechnen'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Result */}
                {result && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-ocean-blue/5 to-cyan-50 rounded-xl border-2 border-ocean-blue/20">
                    <div className="flex items-start space-x-3 mb-4">
                      <Info className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        {result.message}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Geschätzte Kosten</p>
                      <p className="text-4xl font-bold text-ocean-blue">
                        {result.estimatedPrice.toLocaleString('de-DE', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-8 bg-gray-50 border-2">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Wichtige Hinweise</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>Diese Schätzung basiert auf Durchschnittswerten und dient nur zur Orientierung</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>Der tatsächliche Preis kann je nach Zustand, Material und Aufwand variieren</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>Für ein verbindliches Angebot vereinbaren Sie bitte einen Besichtigungstermin</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Möchten Sie ein verbindliches Angebot?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Fordern Sie jetzt einen kostenlosen Rückruf an. Wir besichtigen Ihr Projekt 
              vor Ort und erstellen ein detailliertes Festpreisangebot.
            </p>
            <Link to="/kontakt">
              <Button size="lg" className="bg-ocean-blue hover:bg-ocean-blue-dark text-white">
                Rückruf anfordern
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rechner;
