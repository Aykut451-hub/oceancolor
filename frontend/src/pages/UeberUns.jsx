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
              Malermeisterbetrieb in Hamburg – seit über 17 Jahren für hochwertige Ergebnisse
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
                  Ocean Color ist Ihr Malermeisterbetrieb in Hamburg mit über 17 Jahren 
                  Erfahrung in hochwertigen Maler- und Renovierungsarbeiten.
                </p>
                <p>
                  Als Meisterbetrieb mit Sitz im Herzen Hamburgs stehen wir für saubere 
                  Ausführung, strukturierte Abläufe und langlebige Ergebnisse.
                </p>
                <p>
                  Wir begleiten Sie von der ersten Idee bis zur finalen Umsetzung – mit 
                  persönlicher Beratung, modernen Materialien und handwerklicher Präzision.
                </p>
                <p className="font-semibold text-gray-800 italic">
                  Unser Anspruch: Nicht nur streichen, sondern Räume sichtbar aufwerten.
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
                    Wir arbeiten präzise und hinterlassen Ihre Räume in einwandfreiem Zustand.
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
                    Klare Kommunikation und termingerechte Umsetzung.
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
                    Jedes Projekt wird sorgfältig vorbereitet und professionell umgesetzt.
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
              <CardContent className="p-8 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Wir sind in ganz Hamburg und im Umkreis von ca. 15 km für Sie tätig – unter anderem in:
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Altona, Eimsbüttel, Winterhude, Bergedorf, Hafen City, Wandsbek, Bahrenfeld, Ottensen, Harburg, Bergedorf und Umgebung.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-ocean-blue-dark relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Wir suchen Verstärkung!
            </h2>
            <p className="text-lg md:text-xl text-white mb-6 leading-relaxed">
              Du möchtest Teil unseres internationalen Teams werden? 
              Bewirb dich jetzt als Auszubildende(r) zum Maler und Lackierer.
            </p>
            <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed">
              Bei uns lernst du nicht nur das Handwerk der Malerei, 
              sondern erhältst auch Einblicke im digitalen Marketing Bereich!
            </p>
            <a 
              href="mailto:info@ocean-maler.de?subject=Bewerbung als Maler und Lackierer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-white text-ocean-blue-dark font-semibold px-8 py-6 text-lg 
                           hover:bg-amber-400 hover:text-gray-900 
                           shadow-lg hover:shadow-xl 
                           transform hover:scale-105 
                           transition-all duration-300 
                           border-2 border-white hover:border-amber-400"
              >
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
