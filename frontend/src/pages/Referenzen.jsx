import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Clock, CheckCircle2, Users, Briefcase, Star } from 'lucide-react';
import { references } from '../data/mock';
import { ScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';
import { leistungsbilder } from '../data/leistungsbilder';
import { ServiceImage } from '../components/ServiceImage';

// Animated Stat Component
const AnimatedStat = ({ end, suffix = '', label, icon: Icon }) => {
  const { ref, count, isRevealed } = useAnimatedCounter(end, 1500);
  
  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#E91E63]/10 rounded-full mb-3">
        <Icon className="h-6 w-6 text-[#E91E63]" />
      </div>
      <p className={`text-3xl font-bold text-gray-900 transition-all duration-300 ${isRevealed ? 'scale-100' : 'scale-90 opacity-0'}`}>
        {count}{suffix}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

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
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-[#E91E63]/10 text-[#E91E63] mb-4">
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
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedStat end={11} suffix="+" label="Referenzprojekte" icon={Building2} />
            <AnimatedStat end={50} suffix="+" label="Zufriedene Kunden" icon={Users} />
            <AnimatedStat end={17} label="Jahre Erfahrung" icon={Briefcase} />
            <AnimatedStat end={100} suffix="%" label="Kundenzufriedenheit" icon={Star} />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ausgewählte Projekte
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Hier finden Sie eine Auswahl unserer größten und bedeutendsten Projekte.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredReferences.slice(0, 4).map((reference, index) => (
                <ScrollReveal key={reference.id} delay={index * 150}>
                  <Card className="group overflow-hidden border-2 bg-white card-hover h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={reference.image}
                        alt={reference.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-white/95 text-[#E91E63] mb-2">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All References with Filter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
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
                      className={`btn-tap ${filter === category 
                        ? "bg-[#E91E63] hover:bg-[#162567] text-white" 
                        : "hover:border-[#E91E63] hover:text-[#E91E63]"
                      }`}
                    >
                      {category === 'alle' ? 'Alle Projekte' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* References Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReferences.map((reference, index) => (
                <ScrollReveal key={reference.id} delay={index * 75}>
                  <Card className="group overflow-hidden border card-hover h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={reference.image}
                        alt={reference.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/95 backdrop-blur-sm text-[#E91E63] text-xs">
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
                      <p className="text-sm text-[#E91E63] font-medium mb-2">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview with Kunde Image */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Das sagen unsere Kunden
              </h2>
            </ScrollReveal>
            
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Kunde Image with Hover Effect */}
              {leistungsbilder.kunde?.url && (
                <ScrollReveal className="lg:col-span-2">
                  <ServiceImage
                    src={leistungsbilder.kunde.url}
                    alt={leistungsbilder.kunde.alt}
                    title={leistungsbilder.kunde.title}
                    geoText={leistungsbilder.kunde.geoText}
                    aspectRatio="4/5"
                    priority={false}
                  />
                </ScrollReveal>
              )}
              
              {/* Testimonials */}
              <div className={`${leistungsbilder.kunde?.url ? 'lg:col-span-3' : ''} space-y-6`}>
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
                  <ScrollReveal key={index} delay={index * 150}>
                    <Card className="border-2 bg-white card-hover">
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
                  </ScrollReveal>
                ))}
                
                {/* GEO Text for AI visibility */}
                {leistungsbilder.kunde?.geoText && (
                  <p className="text-sm text-gray-500 italic border-l-4 border-[#E91E63] pl-4 mt-6">
                    {leistungsbilder.kunde.geoText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E91E63]/20 to-cyan-600/20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ihr Projekt könnte hier stehen
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. 
                Fordern Sie jetzt einen kostenlosen Rückruf an.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rechner">
                  <Button 
                    size="lg" 
                    className="bg-[#E91E63] text-white hover:bg-[#162567] border-2 border-[#E91E63] hover:border-[#162567] font-semibold w-full sm:w-auto transition-all duration-200 shadow-lg hover:shadow-xl btn-shine btn-tap"
                  >
                    Kostenlos kalkulieren
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold w-full sm:w-auto transition-all duration-200 btn-tap"
                  >
                    Rückruf anfordern
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Referenzen;
