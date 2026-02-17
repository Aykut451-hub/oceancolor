import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Clock, CheckCircle2, Users, Briefcase, Star } from 'lucide-react';
import { references } from '../data/mock';

const Referenzen = () => {
  const [filter, setFilter] = useState('alle');
  
  const categories = ['alle', ...new Set(references.map(r => r.category))];
  
  const filteredReferences = filter === 'alle' 
    ? references 
    : references.filter(r => r.category === filter);

  const featuredReferences = references.filter(r => r.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-ocean-blue/10 text-ocean-blue mb-4">
              Unsere Arbeit
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Referenzen & Projekte
            </h1>
            <p className="text-lg text-gray-600">
              Von Gewerbeobjekten bis hin zu sozialen Einrichtungen – wir realisieren Projekte 
              jeder Größe mit höchster Qualität und Zuverlässigkeit.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-blue/10 rounded-full mb-3">
                <Building2 className="h-6 w-6 text-ocean-blue" />
              </div>
              <p className="text-3xl font-bold text-gray-900">11+</p>
              <p className="text-sm text-gray-600">Referenzprojekte</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-blue/10 rounded-full mb-3">
                <Users className="h-6 w-6 text-ocean-blue" />
              </div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Zufriedene Kunden</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-blue/10 rounded-full mb-3">
                <Briefcase className="h-6 w-6 text-ocean-blue" />
              </div>
              <p className="text-3xl font-bold text-gray-900">3+</p>
              <p className="text-sm text-gray-600">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-ocean-blue/10 rounded-full mb-3">
                <Star className="h-6 w-6 text-ocean-blue" />
              </div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-600">Kundenzufriedenheit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ausgewählte Projekte
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hier finden Sie eine Auswahl unserer größten und bedeutendsten Projekte.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredReferences.slice(0, 4).map((reference) => (
                <Card 
                  key={reference.id} 
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-ocean-blue bg-white"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={reference.image}
                      alt={reference.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-white/95 text-ocean-blue mb-2">
                        {reference.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">
                        {reference.company}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {reference.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {reference.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {reference.services.slice(0, 3).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {reference.services.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{reference.services.length - 3} weitere
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {reference.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All References with Filter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Alle Referenzen
              </h2>
              <p className="text-gray-600 mb-8">
                Filtern Sie nach Kategorie, um passende Projekte zu finden.
              </p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(category)}
                    className={filter === category 
                      ? "bg-ocean-blue hover:bg-ocean-blue-dark text-white" 
                      : "hover:border-ocean-blue hover:text-ocean-blue"
                    }
                  >
                    {category === 'alle' ? 'Alle Projekte' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* References Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReferences.map((reference) => (
                <Card 
                  key={reference.id} 
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 border hover:border-ocean-blue/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={reference.image}
                      alt={reference.company}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 backdrop-blur-sm text-ocean-blue text-xs">
                        {reference.category}
                      </Badge>
                    </div>
                    {reference.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500 text-white text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Top-Projekt
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {reference.company}
                    </h3>
                    <p className="text-sm text-ocean-blue font-medium mb-2">
                      {reference.title}
                    </p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {reference.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {reference.duration}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                        Abgeschlossen
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-gray-50">
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
                <Card key={index} className="border-2 bg-white">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>
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
      <section className="py-16 bg-gradient-to-br from-ocean-blue to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ihr Projekt könnte hier stehen
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. 
              Fordern Sie jetzt einen kostenlosen Rückruf an.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rechner">
                <Button size="lg" className="bg-white text-ocean-blue hover:bg-gray-100 w-full sm:w-auto">
                  Kostenlos kalkulieren
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

export default Referenzen;
