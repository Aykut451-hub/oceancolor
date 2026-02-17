import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { references } from '../data/mock';

const Referenzen = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Unsere Referenzen
            </h1>
            <p className="text-lg text-gray-600">
              Überzeugen Sie sich von der Qualität unserer Arbeit. 
              Hier finden Sie eine Auswahl unserer erfolgreich abgeschlossenen Projekte.
            </p>
          </div>
        </div>
      </section>

      {/* References Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {references.map((reference) => (
              <Card key={reference.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-ocean-blue">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={reference.image}
                    alt={reference.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-ocean-blue">
                      {reference.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {reference.title}
                  </h3>
                  <p className="text-gray-600">
                    {reference.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-ocean-blue to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-blue-100">Zufriedene Privatkunden</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">30+</p>
              <p className="text-blue-100">Abgeschlossene Gewerbekunden</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">3+</p>
              <p className="text-blue-100">Jahre Erfahrung</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Das sagen unsere Kunden
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Helmut K.",
                  text: "Professionell und effizient! Das Problem mit Schimmel wurde schnell und gründlich behoben."
                },
                {
                  name: "Tanja S.",
                  text: "Ich bin absolut begeistert von der Arbeit! Die Wandgestaltung hat unserem Raum eine ganz neue Dimension verliehen."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ihr Projekt könnte hier stehen
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. 
              Fordern Sie jetzt einen kostenlosen Rückruf an.
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

export default Referenzen;
