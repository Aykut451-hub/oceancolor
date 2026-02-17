import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Clock, CheckCircle, Users, Building2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const KleinauftragService = () => {
  useEffect(() => {
    // SEO: Update document title and meta description
    document.title = 'Kleinauftrag-Service | Ocean Color Hamburg';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Schneller Kleinauftrag-Service von Ocean Color Hamburg. Unkomplizierte Malerarbeiten ohne lange Angebotsphasen. Für Privathaushalte und Gewerbekunden.');
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              Ocean Color Hamburg
            </span>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Kleinauftrag-Service
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Nutzen Sie unseren exklusiven Kleinauftrag-Service für schnelle und unkomplizierte 
              Unterstützung – ohne lange Angebotsphasen. Vereinbaren Sie einfach einen Termin, 
              und wir sind für Sie da.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Unsere transparente Abrechnung basiert auf dem tatsächlichen Dienstleistungsumfang. 
              Vorab erstellen wir gerne eine Schätzung für Sie. Unser Kleinauftrag-Service steht 
              sowohl Privathaushalten als auch Gewerbekunden zur Verfügung.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-ocean-blue hover:bg-ocean-blue-dark text-white font-semibold px-8 py-6 text-lg
                             shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                             w-full sm:w-auto"
                >
                  Rückruf anfordern
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rechner">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white
                             font-semibold px-8 py-6 text-lg transition-all duration-300
                             w-full sm:w-auto"
                >
                  Angebot berechnen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Ihre Vorteile
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-7 w-7 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Schnelle Umsetzung</h3>
                  <p className="text-sm text-gray-600">Keine langen Wartezeiten – wir sind zeitnah für Sie da</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-7 w-7 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transparente Preise</h3>
                  <p className="text-sm text-gray-600">Abrechnung nach tatsächlichem Aufwand</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-7 w-7 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Für Privat</h3>
                  <p className="text-sm text-gray-600">Ideal für kleinere Arbeiten im Privathaushalt</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-7 w-7 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Für Gewerbe</h3>
                  <p className="text-sm text-gray-600">Auch für gewerbliche Kunden verfügbar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ocean-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Jetzt Termin vereinbaren
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white">
              Kontaktieren Sie uns noch heute und profitieren Sie von unserem schnellen Kleinauftrag-Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-amber-400 text-gray-900 font-semibold px-8 py-6 text-lg
                             hover:bg-amber-300 shadow-lg hover:shadow-xl 
                             transform hover:scale-105 transition-all duration-300 
                             border-2 border-amber-400 hover:border-amber-300
                             w-full sm:w-auto"
                >
                  Rückruf anfordern
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rechner">
                <Button 
                  size="lg" 
                  className="bg-transparent text-white font-semibold px-8 py-6 text-lg
                             hover:bg-white hover:text-ocean-blue-dark
                             border-2 border-white transition-all duration-300
                             w-full sm:w-auto"
                >
                  Angebot berechnen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KleinauftragService;
