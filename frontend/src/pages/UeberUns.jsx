import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Award, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const UeberUns = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Über Ocean Color
            </h1>
            <p className="text-lg text-gray-600">
              Ihr zuverlässiger Partner für professionelle Malerarbeiten in Hamburg und Umgebung
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Wer wir sind
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Ocean Color ist Ihr Malermeisterbetrieb in Hamburg mit über 3 Jahren Erfahrung. 
                  Wir sind ein im Herzen Hamburgs ansässiger Meisterbetrieb und bieten 
                  professionelle Malerarbeiten, Renovierungen und Sanierungen an.
                </p>
                <p>
                  Bei uns erhalten Sie eine freundliche und hochqualifizierte Beratung bei der 
                  Gestaltung Ihrer Räume mit individuellen Anstrichen, modernen Farben und Tapeten.
                </p>
                <p>
                  Unser Fokus liegt auf Sauberkeit, Zuverlässigkeit und strukturierter Planung. 
                  Wir arbeiten mit festen Qualitätsstandards und planen jedes Projekt sorgfältig – 
                  so erhalten Sie ein sauberes und langlebiges Ergebnis.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1574359411659-15573a27fd0c"
                alt="Ocean Color Team"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Unsere Werte
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="bg-ocean-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-ocean-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Sauberkeit
                  </h3>
                  <p className="text-gray-600">
                    Wir legen größten Wert auf sauberes Arbeiten und hinterlassen 
                    Ihre Räume in einwandfreiem Zustand.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="bg-ocean-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-ocean-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Zuverlässigkeit
                  </h3>
                  <p className="text-gray-600">
                    Termingerechte Ausführung und verlässliche Kommunikation 
                    während des gesamten Projekts.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-ocean-blue transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="bg-ocean-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-ocean-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Strukturierte Planung
                  </h3>
                  <p className="text-gray-600">
                    Jedes Projekt wird sorgfältig geplant und mit festen 
                    Qualitätsstandards umgesetzt.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Unser Einsatzgebiet
            </h2>
            
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-lg text-gray-700">
                    Wir sind in ganz Hamburg und im Umkreis von ca. 15 km tätig
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  {[
                    'Altona', 'Bahrenfeld', 'Bergedorf', 'Eppendorf',
                    'Eimsbüttel', 'Harburg', 'Lokstedt', 'Ottensen',
                    'Stellingen', 'Wandsbek', 'Winterhude', 'und viele mehr...'
                  ].map((area, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-ocean-blue mr-2">•</span>
                      {area}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-ocean-blue to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Wir suchen Verstärkung!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Du möchtest Teil unseres internationalen Teams werden? 
              Bewirb dich jetzt als Auszubildende(r) zum Maler und Lackierer.
            </p>
            <p className="text-lg text-blue-100 mb-8">
              Bei uns lernst du nicht nur das Handwerk der Malerei, 
              sondern erhältst auch Einblicke im digitalen Marketing Bereich!
            </p>
            <a 
              href="mailto:info@oceancolor.de?subject=Bewerbung als Maler und Lackierer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100">
                Jetzt bewerben
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Überzeugt?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Kontaktieren Sie uns noch heute und lassen Sie sich unverbindlich beraten.
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

export default UeberUns;
