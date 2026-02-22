import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Building2, 
  Users, 
  Briefcase, 
  Star, 
  MapPin, 
  Clock, 
  Phone,
  MessageCircle,
  ArrowLeftRight,
  Filter,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';
import { projekte, projektKategorien } from '../data/projekte';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';

// Animated Stat Component
const AnimatedStat = ({ end, suffix = '', label, icon: Icon }) => {
  const { ref, count, isRevealed } = useAnimatedCounter(end, 1500);
  
  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1e328b]/10 rounded-full mb-3">
        <Icon className="h-6 w-6 text-[#1e328b]" />
      </div>
      <p className={`text-3xl font-bold text-gray-900 transition-all duration-300 ${isRevealed ? 'scale-100' : 'scale-90 opacity-0'}`}>
        {count}{suffix}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

// Vorher/Nachher Toggle Component
const BeforeAfterToggle = ({ images, altTexts }) => {
  const [showAfter, setShowAfter] = useState(true);
  
  return (
    <div className="relative">
      {/* Image Container */}
      <div className="relative h-64 md:h-72 overflow-hidden rounded-t-xl">
        <img
          src={showAfter ? images.after : images.before}
          alt={showAfter ? altTexts.after : altTexts.before}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${showAfter ? 'bg-green-600' : 'bg-orange-500'} text-white text-xs font-medium`}>
            {showAfter ? 'Nachher' : 'Vorher'}
          </Badge>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button
        onClick={() => setShowAfter(!showAfter)}
        className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
        data-testid="before-after-toggle"
      >
        <ArrowLeftRight className="h-4 w-4" />
        {showAfter ? 'Vorher zeigen' : 'Nachher zeigen'}
      </button>
    </div>
  );
};

// Vorher/Nachher Side by Side Component (für Desktop)
const BeforeAfterSideBySide = ({ images, altTexts }) => {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-t-xl overflow-hidden">
      {/* Vorher */}
      <div className="relative h-48 md:h-56">
        <img
          src={images.before}
          alt={altTexts.before}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-orange-500 text-white text-xs">Vorher</Badge>
        </div>
      </div>
      
      {/* Nachher */}
      <div className="relative h-48 md:h-56">
        <img
          src={images.after}
          alt={altTexts.after}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-green-600 text-white text-xs">Nachher</Badge>
        </div>
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({ isOpen, onClose, images, altTexts, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageArray = [
    { src: images.before, alt: altTexts.before, label: 'Vorher' },
    { src: images.after, alt: altTexts.after, label: 'Nachher' }
  ];
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <X className="h-8 w-8" />
      </button>
      
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        {/* Title */}
        <p className="text-white text-center mb-4 font-medium">{title}</p>
        
        {/* Image */}
        <div className="relative">
          <img
            src={imageArray[currentIndex].src}
            alt={imageArray[currentIndex].alt}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
          />
          
          {/* Label */}
          <Badge className={`absolute top-4 left-4 ${currentIndex === 0 ? 'bg-orange-500' : 'bg-green-600'} text-white`}>
            {imageArray[currentIndex].label}
          </Badge>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentIndex(0)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentIndex === 0 
                ? 'bg-orange-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="h-4 w-4 inline mr-1" />
            Vorher
          </button>
          <button
            onClick={() => setCurrentIndex(1)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentIndex === 1 
                ? 'bg-green-600 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Nachher
            <ChevronRight className="h-4 w-4 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Projekt Card Component
const ProjektCard = ({ projekt, onOpenLightbox }) => {
  return (
    <Card className="group overflow-hidden border hover:border-[#1e328b]/30 transition-colors h-full flex flex-col">
      {/* Desktop: Side by Side | Mobile: Toggle */}
      <div className="hidden md:block">
        <BeforeAfterSideBySide images={projekt.images} altTexts={projekt.altTexts} />
      </div>
      <div className="md:hidden">
        <BeforeAfterToggle images={projekt.images} altTexts={projekt.altTexts} />
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-[#1e328b]" />
          {projekt.location}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#1e328b] transition-colors">
          {projekt.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {projekt.description}
        </p>
        
        {/* Service Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {projekt.services.map((service, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-[#1e328b]/10 text-[#1e328b] text-xs hover:bg-[#1e328b]/20"
            >
              {service}
            </Badge>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {projekt.duration}
          </span>
          <button
            onClick={() => onOpenLightbox(projekt)}
            className="text-[#1e328b] hover:text-[#162567] font-medium transition-colors"
          >
            Bilder vergrößern
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const Referenzen = () => {
  const [filter, setFilter] = useState('alle');
  const [lightboxData, setLightboxData] = useState(null);
  
  const filteredProjekte = filter === 'alle' 
    ? projekte 
    : projekte.filter(p => p.category === filter);
  
  const featuredProjekte = projekte.filter(p => p.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-[#1e328b]/10 text-[#1e328b] mb-4">
                Unsere Arbeit
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Referenzen & Projekte
              </h1>
              <p className="text-lg text-gray-600">
                Echte Projekte aus Hamburg – von der Wohnungsrenovierung bis zur Fassadensanierung. 
                Überzeugen Sie sich selbst von unserer Arbeit.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <AnimatedStat end={200} suffix="+" label="Zufriedene Kunden" icon={Users} />
            <AnimatedStat end={500} suffix="+" label="Projekte" icon={Building2} />
            <AnimatedStat end={17} label="Jahre Erfahrung" icon={Briefcase} />
            <AnimatedStat end={5} suffix=".0" label="Google Bewertung" icon={Star} />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Ausgewählte Projekte
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Vorher/Nachher-Vergleiche unserer aktuellen Arbeiten in Hamburg und Umgebung.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProjekte.map((projekt, index) => (
              <ScrollReveal key={projekt.id} delay={index * 100}>
                <ProjektCard 
                  projekt={projekt} 
                  onOpenLightbox={(p) => setLightboxData(p)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects with Filter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Alle Projekte
                </h2>
                <p className="text-gray-600 mb-8">
                  Filtern Sie nach Kategorie, um passende Referenzen zu finden.
                </p>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-gray-400 mr-2 self-center hidden sm:block" />
                  {projektKategorien.map((category) => (
                    <Button
                      key={category.id}
                      variant={filter === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(category.id)}
                      data-testid={`filter-${category.id}`}
                      className={`${filter === category.id 
                        ? "bg-[#1e328b] hover:bg-[#162567] text-white" 
                        : "hover:border-[#1e328b] hover:text-[#1e328b]"
                      }`}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjekte.map((projekt, index) => (
                <ScrollReveal key={projekt.id} delay={index * 75}>
                  <ProjektCard 
                    projekt={projekt} 
                    onOpenLightbox={(p) => setLightboxData(p)}
                  />
                </ScrollReveal>
              ))}
            </div>

            {filteredProjekte.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Keine Projekte in dieser Kategorie gefunden.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
            <span className="font-medium">Datenschutz-Hinweis:</span> Aus Datenschutzgründen zeigen wir keine 
            vollständigen Adressdaten, Hausnummern oder persönlichen Informationen unserer Kunden.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e328b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#162567] to-[#1e328b]" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ähnliches Projekt geplant?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Ob Wohnungsrenovierung, Fassadenanstrich oder Balkonsanierung – 
                wir beraten Sie gerne und erstellen Ihnen ein unverbindliches Angebot.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rechner">
                  <Button 
                    size="lg" 
                    data-testid="cta-rechner-btn"
                    className="bg-amber-400 text-gray-900 hover:bg-amber-300 font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                  >
                    Angebot berechnen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <a href="tel:04018008888">
                  <Button 
                    size="lg" 
                    variant="outline"
                    data-testid="cta-telefon-btn"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#1e328b] font-semibold w-full sm:w-auto transition-all"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    040 1800 8888
                  </Button>
                </a>
                
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg"
                    data-testid="cta-whatsapp-btn"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxData && (
        <Lightbox
          isOpen={!!lightboxData}
          onClose={() => setLightboxData(null)}
          images={lightboxData.images}
          altTexts={lightboxData.altTexts}
          title={lightboxData.title}
        />
      )}
    </div>
  );
};

export default Referenzen;
