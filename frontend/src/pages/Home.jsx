import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, CheckCircle, Star, ExternalLink } from 'lucide-react';
import { services, googleReviews } from '../data/mock';
import { stadtteile } from '../data/stadtteile';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';
import { ScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';
import { leistungsbilder } from '../data/leistungsbilder';
import { ServiceImage } from '../components/ServiceImage';
import BeforeAfterSection from '../components/BeforeAfterSection';

// Animated Counter Component
const AnimatedStat = ({ end, suffix = '', label }) => {
  const { ref, count, isRevealed } = useAnimatedCounter(end, 1500);
  
  return (
    <div ref={ref} className="text-center">
      <p className={`text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-300 ${isRevealed ? 'scale-100' : 'scale-90 opacity-0'}`}>
        {count}{suffix}
      </p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#1e328b]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="bg-[#1e328b]/10 text-[#1e328b] px-4 py-2 rounded-full text-sm font-medium">
                    Ihr Malermeisterbetrieb in Hamburg
                  </span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Saubere Arbeit, <span className="text-[#1e328b]">die lange hält</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Jedes Projekt wird sorgfältig geplant und mit festen Qualitätsstandards umgesetzt. 
                  So entstehen Ergebnisse, die nicht nur gut aussehen, sondern auch dauerhaft überzeugen.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/rechner">
                    <Button 
                      size="lg" 
                      className="bg-[#1e328b] hover:bg-[#162567] text-white w-full sm:w-auto btn-shine btn-tap"
                      data-testid="hero-calculator-btn"
                    >
                      Angebot in 2 Minuten
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/kontakt">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-[#1e328b] text-[#1e328b] hover:bg-[#1e328b]/5 w-full sm:w-auto btn-tap"
                    >
                      Rückruf anfordern
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center pt-4">
                  <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-100">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-700">200+ zufriedene Kunden</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Hero Image - Using new Streichen image with optimized loading */}
            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <figure 
                  className="relative rounded-2xl overflow-hidden shadow-2xl group lqip-container"
                  itemScope
                  itemType="https://schema.org/ImageObject"
                >
                  {/* Shimmer placeholder */}
                  <div className="absolute inset-0 img-placeholder" aria-hidden="true" />
                  
                  <img
                    src={leistungsbilder.streichen?.url || "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/ud2ks07n_IMG_4934.JPG"}
                    alt={leistungsbilder.streichen?.alt || "Ocean Color Malermeister bei der Arbeit"}
                    title={leistungsbilder.streichen?.title}
                    width={800}
                    height={500}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    className="w-full h-[500px] object-cover object-center transition-transform duration-500 group-hover:scale-105 img-fade-in"
                    itemProp="contentUrl"
                    onLoad={(e) => e.target.classList.add('loaded')}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                  <meta itemProp="description" content={leistungsbilder.streichen?.alt} />
                  <meta itemProp="width" content="800" />
                  <meta itemProp="height" content="500" />
                </figure>
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs card-hover">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 rounded-full p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">17 Jahre</p>
                      <p className="text-sm text-gray-600">Erfahrung</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <AnimatedStat end={17} suffix="+" label="Jahre Erfahrung" />
            <AnimatedStat end={200} suffix="+" label="Zufriedene Kunden" />
            <AnimatedStat end={500} suffix="+" label="Projekte" />
            <AnimatedStat end={5} suffix=".0" label="Google Bewertung" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Unsere Leistungen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Von der Wandgestaltung bis zur Schimmelsanierung – wir bieten Ihnen 
                professionelle Malerarbeiten aus einer Hand.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <Link to={`/leistungen/${service.slug}`}>
                  <Card className="group h-full border-2 relative overflow-hidden card-hover cursor-pointer">
                    <CardContent className="p-6">
                      <div className="bg-[#1e328b]/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1e328b] group-hover:scale-110 transition-all duration-300">
                        <div className="w-6 h-6 bg-[#1e328b] rounded group-hover:bg-white transition-colors duration-300"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#1e328b] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-[#1e328b] font-medium text-sm group-hover:translate-x-2 transition-transform">
                        Mehr erfahren
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="text-center mt-10">
              <Link to="/leistungen">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-[#1e328b] text-[#1e328b] hover:bg-[#1e328b]/5 btn-tap"
                >
                  Alle Leistungen ansehen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
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
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 card-hover"
                    >
                      <div className="bg-[#1e328b] rounded-full p-2 flex-shrink-0 mt-1">
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
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="relative">
                <img
                  src="https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/v0zxjrin_Ocean%20Color%20Firmenfahrzeug.png"
                  alt="Ocean Color Firmenfahrzeug in Hamburg"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vorher & Nachher Projekte */}
      <BeforeAfterSection />

      {/* Kundenstimmen - Das sagen unsere Kunden */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Das sagen unsere Kunden
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Echte Bewertungen von Kunden aus Hamburg und Umgebung.
              </p>
            </div>
          </ScrollReveal>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {googleReviews.reviews.map((review, index) => (
              <ScrollReveal key={review.id} delay={index * 80}>
                <Card className="bg-white border border-gray-200 hover:border-[#1e328b]/30 transition-colors h-full">
                  <CardContent className="p-5">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Review Text - Gekürzt */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                      "{review.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1e328b]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#1e328b] font-semibold text-sm">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{review.author}</span>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Summary & CTAs */}
          <ScrollReveal delay={300}>
            <div className="flex flex-col items-center mt-10 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
              {/* Google Rating Badge */}
              <div className="flex items-center gap-3 mb-6">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-700 font-medium">5,0</span>
                <span className="text-gray-500 text-sm">({googleReviews.totalReviews} Bewertungen)</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="https://maps.app.goo.gl/tMLzNyo8MMk57YLk7"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="all-reviews-btn"
                  className="inline-flex items-center px-5 py-2.5 bg-[#1e328b] hover:bg-[#162567] text-white font-medium rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Alle Bewertungen ansehen
                </a>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJgwoYpaqFsUcRPabmfur9qc4"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="write-review-btn"
                  className="inline-flex items-center px-4 py-2 text-[#1e328b] hover:text-[#162567] text-sm font-medium transition-colors"
                >
                  <Star className="h-4 w-4 mr-1.5" />
                  Jetzt selbst bewerten
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SEO Stadtteile */}
      <section id="stadtteile" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Maler in Hamburg & Umgebung
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professionelle Malerarbeiten in Ihrem Stadtteil – wir sind in ganz Hamburg und Umgebung für Sie da.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
              {stadtteile.map((s, index) => (
                <Link
                  key={s.slug}
                  to={`/maler-hamburg-${s.slug}`}
                  className="group bg-white border-2 border-gray-100 hover:border-[#1e328b] rounded-xl px-4 py-3 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  data-testid={`stadtteil-link-${s.slug}`}
                  style={{ transitionDelay: `${index * 20}ms` }}
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#1e328b] transition-colors">
                    {s.name}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tätigkeitsgebiet GEO-Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tätigkeitsgebiet</h2>
              <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Ocean Color ist als Malermeisterbetrieb in ganz Hamburg tätig, insbesondere in: 
                  Altona, Wandsbek, Eppendorf, Lokstedt, Stellingen, Bahrenfeld, Osdorf, Lurup, 
                  Bergedorf sowie im Umland wie Wedel und Rellingen.
                </p>
                <p>
                  Neben klassischen Malerarbeiten bieten wir auch Trockenbau, Schimmelsanierung, 
                  Fassadenarbeiten und Bodenverlegung an. Unser Team arbeitet für Privatkunden, 
                  Vermieter, Hausverwaltungen und bei umfangreichen Sanierungsprojekten.
                </p>
                <p>
                  Mit über 17 Jahren Erfahrung und einem klaren Fokus auf Qualität, Sauberkeit 
                  und Zuverlässigkeit ist Ocean Color Ihr Ansprechpartner für alle Renovierungs- 
                  und Innenausbauarbeiten in der Metropolregion Hamburg.
                </p>
                <div className="pt-2">
                  <Link to="/maler-hamburg" className="text-[#1e328b] hover:text-[#162567] font-medium transition-colors text-sm">
                    Mehr zu unseren Einsatzgebieten
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Spezialdienste Teaser */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Spezialleistungen für Notfälle & Sanierungen
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Schnelle und professionelle Hilfe bei Wasserschäden, Schimmelbefall und Badsanierungen.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Wasserschaden Teaser */}
            <ScrollReveal delay={100}>
              <Link to="/wasserschaden-sanierung" className="block group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full card-hover">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003056] transition-colors">
                    Wasserschaden Sanierung
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Schnelle Wiederherstellung nach Rohrbruch, Leckagen und Feuchtigkeitsschäden.
                  </p>
                  <span className="text-[#003056] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mehr erfahren
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Schimmelsanierung Teaser */}
            <ScrollReveal delay={200}>
              <Link to="/leistungen/schimmelsanierung" className="block group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full card-hover">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                    <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003056] transition-colors">
                    Schimmelsanierung
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Fachgerechte Beseitigung von Schimmelbefall für ein gesundes Raumklima.
                  </p>
                  <span className="text-[#003056] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mehr erfahren
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            {/* Badsanierung Teaser */}
            <ScrollReveal delay={300}>
              <Link to="/badsanierung" className="block group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full card-hover">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                    <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#003056] transition-colors">
                    Badsanierung
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Komplette Badmodernisierung – funktional, modern und wertsteigernd.
                  </p>
                  <span className="text-[#003056] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Mehr erfahren
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#162567] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Bereit für Ihr nächstes Projekt?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Fordern Sie jetzt einen kostenlosen Rückruf an und lassen Sie sich unverbindlich beraten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/rechner">
                  <Button 
                    size="lg" 
                    className="bg-amber-400 text-gray-900 font-semibold px-8 py-6 text-lg
                               hover:bg-amber-300 
                               shadow-lg hover:shadow-xl 
                               transform hover:scale-105 
                               transition-all duration-300 
                               border-2 border-amber-400 hover:border-amber-300
                               w-full sm:w-auto btn-shine btn-tap"
                    data-testid="cta-calculator-btn"
                  >
                    Angebot berechnen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button 
                    size="lg" 
                    className="bg-transparent text-white font-semibold px-8 py-6 text-lg
                               hover:bg-white hover:text-[#162567]
                               border-2 border-white
                               transition-all duration-300
                               w-full sm:w-auto btn-tap"
                  >
                    Rückruf anfordern
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    data-testid="home-whatsapp-button"
                    className="bg-[#25D366] text-white font-semibold px-8 py-6 text-lg
                               hover:bg-[#1fb855]
                               border-2 border-[#25D366] hover:border-[#1fb855]
                               shadow-lg hover:shadow-xl
                               transform hover:scale-105
                               transition-all duration-300
                               w-full sm:w-auto btn-shine btn-tap"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Anfrage
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

export default Home;
