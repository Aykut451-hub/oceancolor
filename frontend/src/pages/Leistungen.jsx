import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { PaintBucket, Brush, Wallpaper, Wrench, Layers, Shield, Droplets, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { services } from '../data/mock';

const iconMap = {
  PaintBucket: PaintBucket,
  Brush: Brush,
  Wallpaper: Wallpaper,
  Wrench: Wrench,
  Layers: Layers,
  Shield: Shield,
  Droplets: Droplets
};

const Leistungen = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Unsere Leistungen
            </h1>
            <p className="text-lg text-gray-600">
              Von der professionellen Wandgestaltung bis zur Schimmelsanierung – 
              wir bieten Ihnen ein umfassendes Leistungsspektrum rund um Malerarbeiten.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-ocean-blue">
                  <CardContent className="p-8">
                    <div className="bg-ocean-blue/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-ocean-blue group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-ocean-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Unser Ablauf
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Kontaktaufnahme",
                  description: "Sie kontaktieren uns per Rückruf-Anfrage oder Kontaktformular. Wir melden uns innerhalb von 24 Stunden."
                },
                {
                  step: "2",
                  title: "Besichtigung vor Ort",
                  description: "Wir besichtigen Ihr Projekt kostenlos und unverbindlich. Dabei analysieren wir den Umfang und besprechen Ihre Wünsche."
                },
                {
                  step: "3",
                  title: "Angebot",
                  description: "Sie erhalten ein detailliertes, transparentes Angebot mit Festpreis und Zeitplan."
                },
                {
                  step: "4",
                  title: "Durchführung",
                  description: "Unser erfahrenes Team führt die Arbeiten termingerecht, sauber und professionell aus."
                },
                {
                  step: "5",
                  title: "Abnahme",
                  description: "Gemeinsame Endabnahme und Übergabe. Ihre Zufriedenheit ist unser Ziel."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="bg-ocean-blue text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gray-900 border-0 overflow-hidden relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/20 to-cyan-600/20" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Interessiert an unseren Leistungen?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Nutzen Sie unseren Angebotsrechner oder fordern Sie einen Rückruf an.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rechner">
                  <Button 
                    size="lg" 
                    className="bg-ocean-blue text-white hover:bg-ocean-blue-dark border-2 border-ocean-blue hover:border-ocean-blue-dark font-semibold w-full sm:w-auto transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Zum Angebotsrechner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold w-full sm:w-auto transition-all duration-200"
                  >
                    Rückruf anfordern
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Leistungen;
