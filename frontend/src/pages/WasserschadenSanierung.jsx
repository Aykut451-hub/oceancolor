/**
 * Wasserschaden Sanierung - Landing Page
 * Ocean Color GmbH - Premium Sanierungsfirma Hamburg
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, MapPin, Phone, MessageCircle, Droplets, AlertTriangle, Shield, Building } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

// Bilder für Vorher/Nachher Slider
const IMAGES = {
  before: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/mkiehrmc_WC_before.JPG',
  after: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/eom7knn2_WC_after.JPG'
};

// Hamburger Stadtteile
const STADTTEILE = [
  'Altona', 'Eimsbüttel', 'Ottensen', 'St. Pauli',
  'Bahrenfeld', 'Blankenese', 'Hafencity', 'und Umgebung'
];

// Leistungen
const LEISTUNGEN = [
  'Schadensbewertung',
  'Vorbereitung der Trocknung',
  'Wiederherstellung von Wand- und Deckenflächen',
  'Spachtel- und Malerarbeiten',
  'Isolierende Beschichtungen'
];

// Schadensarten
const SCHADENSARTEN = [
  { icon: Droplets, text: 'Rohrbruch' },
  { icon: AlertTriangle, text: 'Undichtigkeiten' },
  { icon: Droplets, text: 'Leckagen' },
  { icon: Shield, text: 'Feuchtigkeitsschäden' }
];

// Trust Punkte
const TRUST_POINTS = [
  'Schnelle Reaktion',
  'Fachgerechte Sanierung',
  'Saubere Ausführung'
];

const WasserschadenSanierung = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" data-testid="wasserschaden-page">
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-36 md:pb-16 lg:pt-40">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-500">
            <Link to="/" className="hover:text-[#003056] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/leistungen" className="hover:text-[#003056] transition-colors">Leistungen</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Wasserschaden Sanierung</span>
          </nav>

          {/* Haupt-Titel */}
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Hilfe bei Wasserschaden <span className="text-[#003056]">in Hamburg</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Schnelle Hilfe bei Feuchtigkeitsschäden, Rohrbruch oder Leckagen.
              </p>
            </div>
          </ScrollReveal>

          {/* Trust Block */}
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
        </div>
      </section>

      {/* Vorher/Nachher Referenz Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Projekt Titel */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Referenzprojekt
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Wasserschaden Sanierung in Hamburg
                </h2>
              </div>
            </ScrollReveal>

            {/* Premium Vorher/Nachher Slider */}
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8 card-hover">
                <BeforeAfterSlider 
                  beforeImage={IMAGES.before}
                  afterImage={IMAGES.after}
                  beforeAlt="Badezimmer vor der Wasserschaden-Sanierung mit Feuchtigkeitsspuren"
                  afterAlt="Badezimmer nach der professionellen Wiederherstellung"
                  beforeLabel="Vorher"
                  afterLabel="Nachher"
                  className="max-w-2xl mx-auto"
                />
              </div>
            </ScrollReveal>

            {/* Beschreibungstext */}
            <ScrollReveal delay={200}>
              <div className="mt-8 text-center">
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Die betroffenen Flächen wurden fachgerecht vorbereitet und dauerhaft wiederhergestellt.
                </p>
              </div>
            </ScrollReveal>

            {/* Bonus: Verwaltungen */}
            <ScrollReveal delay={300}>
              <div className="mt-8 bg-gradient-to-br from-[#003056]/5 to-[#003056]/10 rounded-2xl p-6 border border-[#003056]/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#003056] rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Für Eigentümer & Hausverwaltungen</h3>
                </div>
                <p className="text-slate-600 pl-13">
                  Wir unterstützen Eigentümer, Vermieter und Hausverwaltungen bei der Wiederherstellung nach Wasserschäden.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Schadensarten Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Wir kümmern uns um die Wiederherstellung nach:
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {SCHADENSARTEN.map((schaden, index) => {
                  const Icon = schaden.icon;
                  return (
                    <div key={index} className="bg-slate-50 rounded-2xl p-6 text-center card-hover">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-slate-800 font-medium">{schaden.text}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Info Box */}
            <ScrollReveal delay={150}>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 card-hover">
                <p className="text-slate-700 leading-relaxed">
                  <strong>Gerade in Hamburg</strong> entstehen Wasserschäden häufig durch Altbauleitungen oder undichte Anschlüsse.
                </p>
                <p className="text-slate-600 mt-4">
                  Wir sorgen für eine saubere und dauerhafte Wiederherstellung der betroffenen Flächen.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
                Unsere Leistungen bei Wasserschäden
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 card-hover">
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
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Ablauf Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
                So gehen wir vor
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Schadensbewertung', desc: 'Bestandsaufnahme und Dokumentation des Wasserschadens' },
                { step: '2', title: 'Sanierung', desc: 'Fachgerechte Wiederherstellung der betroffenen Flächen' },
                { step: '3', title: 'Fertigstellung', desc: 'Professionelle Oberflächen für ein perfektes Ergebnis' }
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-slate-50 rounded-2xl p-6 text-center card-hover h-full">
                    <div className="w-12 h-12 bg-[#003056] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GEO SEO Section */}
      <section className="py-16 bg-gradient-to-br from-[#003056] to-[#004a7c]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              {/* Header */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-white/80" />
                <span className="text-white/80 font-medium">Lokaler Fachbetrieb</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ihr Partner für Wasserschäden in Hamburg
              </h2>

              {/* Stadtteile */}
              <div className="mb-8">
                <p className="text-white/70 mb-4">Wir sind für Sie da in:</p>
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

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:04018008888"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 py-3 rounded-full font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  040 1800 8888
                </a>
              </div>
            </ScrollReveal>
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

      {/* Final CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Wasserschaden? Wir helfen schnell!
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Kontaktieren Sie uns für eine schnelle Schadensbewertung.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-[#003056] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#004a7c] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 btn-shine"
                  data-testid="cta-wasserschaden-anfragen"
                >
                  Wasserschaden beheben lassen
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a 
                  href="https://wa.me/4915128808304?text=Hallo,%20ich%20habe%20einen%20Wasserschaden%20und%20benötige%20Hilfe."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 btn-shine"
                >
                  <MessageCircle className="w-5 h-5" />
                  Per WhatsApp anfragen
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WasserschadenSanierung;
