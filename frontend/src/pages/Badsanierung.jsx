/**
 * Badsanierung - Conversion-optimierte Landing Page
 * Ocean Color GmbH - Premium Sanierungsfirma Hamburg
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, MapPin, Phone, MessageCircle, TrendingUp, Home, Award } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { ScrollReveal } from '../hooks/useScrollReveal';

// Bilder - Originale Dateinamen beibehalten
const IMAGES = {
  before: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/503og5yz_bad_before.JPG',
  after: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/pk55vtsy_Bad_after.png'
};

// Hamburger Stadtteile
const STADTTEILE = [
  'Altona', 'Eimsbüttel', 'Ottensen', 'St. Pauli',
  'Bahrenfeld', 'Blankenese', 'Hafencity', 'und Umgebung'
];

// Leistungen - optimiert
const LEISTUNGEN = [
  'Rückbau und Vorbereitung',
  'Wand- und Flächensanierung',
  'Moderne Fliesenarbeiten',
  'Hochwertige Gestaltung',
  'Optimierung der Raumwirkung',
  'Saubere und präzise Umsetzung'
];

// Trust Punkte
const TRUST_POINTS = [
  'Fachbetrieb aus Hamburg',
  'Planung & Umsetzung aus einer Hand',
  'Saubere und termingerechte Ausführung'
];

// Mehrwert Punkte
const MEHRWERT_PUNKTE = [
  { icon: Home, text: 'den Immobilienwert' },
  { icon: TrendingUp, text: 'die Vermietbarkeit' },
  { icon: Award, text: 'die Attraktivität bei Verkauf' }
];

const Badsanierung = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" data-testid="badsanierung-page">
      {/* Hero Section - mit korrektem Offset für Fixed Header */}
      <section className="pt-32 pb-12 md:pt-36 md:pb-16 lg:pt-40">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-500">
            <Link to="/" className="hover:text-[#003056] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/leistungen" className="hover:text-[#003056] transition-colors">Leistungen</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Badsanierung</span>
          </nav>

          {/* Haupt-Titel - NEU mit Animation */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Aus alt wird modern – <span className="text-[#003056]">Ihre Badsanierung in Hamburg</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Verwandeln Sie ein veraltetes Badezimmer in eine moderne Wohlfühlumgebung – funktional, stilvoll und wertsteigernd.
              </p>
            </div>
          </ScrollReveal>

          {/* Trust Block - NEU mit Animation */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {TRUST_POINTS.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Premium Vorher/Nachher Slider - gleich wie Startseite */}
          <ScrollReveal delay={200}>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8 card-hover">
                <BeforeAfterSlider 
                  beforeImage={IMAGES.before}
                  afterImage={IMAGES.after}
                  beforeAlt="Altes Badezimmer vor der Sanierung in Hamburg"
                  afterAlt="Modernes Badezimmer nach der Sanierung durch Ocean Color"
                  objectFit="contain"
                  className="max-w-2xl mx-auto"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Übergangstext unter Slider - NEU mit Animation */}
          <ScrollReveal delay={300}>
            <p className="text-center text-slate-600 max-w-2xl mx-auto text-lg">
              Sehen Sie selbst, wie aus einem schmalen, in die Jahre gekommenen Badezimmer eine moderne und hochwertige Lösung entstehen kann.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Haupttext Section - NEU emotional + verkaufsstark */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-lg">
                <strong>Viele Badezimmer in Hamburg entsprechen nicht mehr den heutigen Wohnstandards.</strong>
              </p>
              <p className="text-slate-600 leading-relaxed">
                Enge Grundrisse, veraltete Fliesen und unpraktische Raumaufteilungen wirken sich nicht nur auf den Komfort, sondern auch auf den <strong>Wert der Immobilie</strong> aus.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Durch eine durchdachte Badsanierung lässt sich selbst auf begrenztem Raum eine moderne und stilvolle Lösung schaffen.
              </p>
            </div>

            {/* Ergebnis Box */}
            <div className="mt-10 bg-gradient-to-br from-[#003056]/5 to-[#003056]/10 rounded-2xl p-8 border border-[#003056]/10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Das Ergebnis:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003056] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Mehr Komfort im Alltag</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003056] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Zeitgemäße Optik</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003056] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Nachhaltige Wertsteigerung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Section - NEU Titel */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              So verwandeln wir Ihr Badezimmer
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="grid md:grid-cols-2 gap-4">
                {LEISTUNGEN.map((leistung, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{leistung}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mehrwert Block - NEU */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 md:p-10 border border-amber-100">
              <p className="text-lg text-slate-700 mb-6">
                Eine professionelle Badsanierung sorgt nicht nur für ein besseres Wohngefühl.
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Sie steigert auch:</h3>
              
              <div className="space-y-4 mb-8">
                {MEHRWERT_PUNKTE.map((punkt, index) => {
                  const Icon = punkt.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-800 font-medium text-lg">{punkt.text}</span>
                    </div>
                  );
                })}
              </div>
              
              <p className="text-slate-700 font-medium text-lg border-t border-amber-200 pt-6">
                Gerade in Hamburg kann ein modernes Bad entscheidend sein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GEO SEO Section - Conversion Version */}
      <section className="py-16 bg-gradient-to-br from-[#003056] to-[#004a7c]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-white/80" />
              <span className="text-white/80 font-medium">Lokaler Fachbetrieb</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ihr Partner für Badsanierungen in Hamburg
            </h2>

            {/* Text */}
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Ocean Color realisiert moderne Badlösungen in Hamburg und Umgebung.
            </p>

            {/* Stadtteile */}
            <div className="mb-8">
              <p className="text-white/70 mb-4">Unsere Projekte entstehen unter anderem in:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {STADTTEILE.map((stadtteil, index) => (
                  <span 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {stadtteil}
                  </span>
                ))}
              </div>
            </div>

            {/* Closing Statement */}
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Wir schaffen langlebige Lösungen mit hochwertigem Finish – individuell angepasst an Ihre Immobilie.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:04018008888"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-3 rounded-full font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                040 1800 8888
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-[#003056] mb-1">17+</div>
                <div className="text-slate-600 text-sm md:text-base">Jahre Erfahrung</div>
              </div>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-[#003056] mb-1">500+</div>
                <div className="text-slate-600 text-sm md:text-base">Projekte</div>
              </div>
              <div className="p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-[#003056] mb-1">5.0</div>
                <div className="text-slate-600 text-sm md:text-base">Google</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - NEU */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Planen Sie eine Badmodernisierung?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Wir unterstützen Sie von der Idee bis zur Umsetzung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rechner"
                className="inline-flex items-center justify-center gap-2 bg-[#003056] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#004a7c] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                data-testid="cta-badsanierung-anfragen"
              >
                Jetzt unverbindlich anfragen
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a 
                href="https://wa.me/4915128808304?text=Hallo,%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Badsanierung."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Per WhatsApp anfragen
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Badsanierung;
