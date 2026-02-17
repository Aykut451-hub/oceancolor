import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { services, testimonials } from '../data/mock';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-ocean-blue/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full text-sm font-medium">
                  Ihr Malermeisterbetrieb in Hamburg
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Qualität, die man <span className="text-ocean-blue">sieht</span> und <span className="text-ocean-blue">spürt</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Wir arbeiten mit festen Qualitätsstandards und planen jedes Projekt sorgfältig – 
                so erhalten Sie ein sauberes und langlebiges Ergebnis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/rechner">
                  <Button size="lg" className="bg-ocean-blue hover:bg-ocean-blue-dark text-white w-full sm:w-auto">
                    Angebot in 2 Minuten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="outline" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 w-full sm:w-auto">
                    Rückruf anfordern
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center text-yellow-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">50+ zufriedene Kunden</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1688372199140-cade7ae820fe"
                  alt="Professioneller Maler bei der Arbeit"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">3+ Jahre</p>
                    <p className="text-sm text-gray-600">Erfahrung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Wandgestaltung bis zur Schimmelsanierung – wir bieten Ihnen 
              professionelle Malerarbeiten aus einer Hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-ocean-blue">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-ocean-blue group-hover:scale-110 transition-all duration-300">
                    <div className="w-6 h-6 bg-ocean-blue rounded group-hover:bg-white"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/leistungen">
              <Button variant="outline" size="lg" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5">
                Alle Leistungen ansehen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Warum Ocean Color?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Sauberkeit",
                    description: "Wir legen größten Wert auf sauberes Arbeiten und hinterlassen Ihre Räume ordentlich."
                  },
                  {
                    title: "Zuverlässigkeit",
                    description: "Termingerechte Ausführung und verlässliche Kommunikation während des gesamten Projekts."
                  },
                  {
                    title: "Strukturierte Planung",
                    description: "Jedes Projekt wird sorgfältig geplant und mit festen Qualitätsstandards umgesetzt."
                  }
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-ocean-blue rounded-full p-2 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1616697412153-7ad8ac8aa5d9"
                alt="Professionelle Malerarbeiten"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Was unsere Kunden sagen
            </h2>
            <p className="text-lg text-gray-600">
              Überzeugen Sie sich von der Qualität unserer Arbeit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((testimonial) => (
              <Card key={testimonial.id} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-center text-yellow-500 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-blue to-cyan-600"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Bereit für Ihr nächstes Projekt?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Fordern Sie jetzt einen kostenlosen Rückruf an und lassen Sie sich unverbindlich beraten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rechner">
                <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100 w-full sm:w-auto">
                  Angebot berechnen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/kontakt">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Rückruf anfordern
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
