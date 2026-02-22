import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';
import { references as mockReferences } from '../data/mock';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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

// Referenz Card Component
const ReferenzCard = ({ referenz }) => {
  // Determine image sources for <picture> element
  const imageWebp = referenz.image_webp;
  const imageFallback = referenz.image_fallback || referenz.image;
  const altText = `${referenz.title} - ${referenz.company}`;
  
  return (
    <Card className="group overflow-hidden border hover:border-[#1e328b]/30 transition-all duration-300 h-full flex flex-col hover:shadow-lg">
      {/* Bild mit WebP + Fallback */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <picture>
          {imageWebp && (
            <source 
              srcSet={imageWebp} 
              type="image/webp" 
            />
          )}
          <img
            src={imageFallback}
            alt={altText}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* Kategorie Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/95 backdrop-blur-sm text-[#1e328b] text-xs font-medium">
            {referenz.category}
          </Badge>
        </div>
        {/* Featured Badge */}
        {referenz.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500 text-white text-xs">
              <Star className="h-3 w-3 mr-1" />
              Top-Projekt
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Firma */}
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1e328b] transition-colors line-clamp-1">
          {referenz.company}
        </h3>
        
        {/* Titel */}
        <p className="text-sm text-[#1e328b] font-medium mb-2">
          {referenz.title}
        </p>
        
        {/* Beschreibung */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {referenz.description}
        </p>
        
        {/* Leistungs-Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {referenz.services.slice(0, 3).map((service, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-[#1e328b]/10 text-[#1e328b] text-xs"
            >
              {service}
            </Badge>
          ))}
          {referenz.services.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
              +{referenz.services.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {referenz.duration}
          </span>
          <span className="flex items-center text-green-600">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Abgeschlossen
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const Referenzen = () => {
  const [filter, setFilter] = useState('alle');
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch references from database or fallback to mock
  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/references?active_only=true`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setReferences(data);
          } else {
            // Fallback to mock data if no DB entries
            setReferences(mockReferences);
          }
        } else {
          setReferences(mockReferences);
        }
      } catch (error) {
        // Fallback to mock data on error
        setReferences(mockReferences);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferences();
  }, []);
  
  // Kategorien aus den Referenzen extrahieren
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
              <Badge className="bg-[#1e328b]/10 text-[#1e328b] mb-4">
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
                Einblicke in unsere aktuellen Arbeiten in Hamburg und Umgebung.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredReferences.map((referenz, index) => (
              <ScrollReveal key={referenz.id} delay={index * 100}>
                <ReferenzCard referenz={referenz} />
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
                  Alle Referenzen
                </h2>
                <p className="text-gray-600 mb-8">
                  Filtern Sie nach Kategorie, um passende Projekte zu finden.
                </p>
                
                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Filter className="h-5 w-5 text-gray-400 mr-2 self-center hidden sm:block" />
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(category)}
                      data-testid={`filter-${category}`}
                      className={`${filter === category 
                        ? "bg-[#1e328b] hover:bg-[#162567] text-white" 
                        : "hover:border-[#1e328b] hover:text-[#1e328b]"
                      }`}
                    >
                      {category === 'alle' ? 'Alle Projekte' : category}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReferences.map((referenz, index) => (
                <ScrollReveal key={referenz.id} delay={index * 75}>
                  <ReferenzCard referenz={referenz} />
                </ScrollReveal>
              ))}
            </div>

            {filteredReferences.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Keine Projekte in dieser Kategorie gefunden.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e328b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#162567] to-[#1e328b]" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ihr Projekt könnte hier stehen
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. 
                Fordern Sie jetzt ein unverbindliches Angebot an.
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
    </div>
  );
};

export default Referenzen;
