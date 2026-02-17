import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { PaintBucket, Brush, Wallpaper, Wrench, Layers, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { services } from '../data/mock';

const iconMap = {
  PaintBucket: PaintBucket,
  Brush: Brush,
  Wallpaper: Wallpaper,
  Wrench: Wrench,
  Layers: Layers,
  Shield: Shield
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
            
            <div className="space-y-8">
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
                <div key={index} className="flex items-start space-x-6">
                  <div className="bg-ocean-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
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
          <Card className="bg-gradient-to-br from-ocean-blue to-cyan-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Interessiert an unseren Leistungen?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Nutzen Sie unseren Angebotsrechner oder fordern Sie einen Rückruf an.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rechner">
                  <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100 w-full sm:w-auto">
                    Zum Angebotsrechner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
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
