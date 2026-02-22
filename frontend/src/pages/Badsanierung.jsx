/**
 * Badsanierung - Vorher & Nachher Referenzseite
 * Ocean Color GmbH - Premium Sanierungsfirma Hamburg
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, MapPin, Phone, MessageCircle } from 'lucide-react';

// Bilder - Originale Dateinamen beibehalten
const IMAGES = {
  before: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/503og5yz_bad_before.JPG',
  after: 'https://customer-assets.emergentagent.com/job_c75bc87b-67d3-488f-a48f-6666b0075614/artifacts/pk55vtsy_Bad_after.png'
};

// Vorher/Nachher Slider Komponente
const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onTouchMove={handleTouchMove}
      data-testid="before-after-slider"
    >
      {/* Nachher Bild (Hintergrund) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt="Nachher - Modernes Badezimmer nach Sanierung"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Nachher Label */}
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          Nachher
        </div>
      </div>

      {/* Vorher Bild (Vordergrund mit Clip) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Vorher - Badezimmer vor der Sanierung"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Vorher Label */}
        <div className="absolute top-4 left-4 bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          Vorher
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Slider Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-200 hover:border-[#003056] transition-colors">
          <div className="flex items-center gap-0.5">
            <ChevronRight className="w-4 h-4 text-slate-600 rotate-180" />
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Slider Hinweis */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
        Ziehen zum Vergleichen
      </div>
    </div>
  );
};

// Hamburger Stadtteile
const STADTTEILE = [
  'Hamburg Altona', 'Eimsbüttel', 'Ottensen', 'St. Pauli',
  'Bahrenfeld', 'Blankenese', 'Hafencity', 'und Umgebung'
];

// Leistungen
const LEISTUNGEN = [
  'Rückbau und Vorbereitung',
  'Wand- und Flächensanierung',
  'Moderne Fliesenarbeiten',
  'Gestaltung mit hochwertigen Materialien',
  'Optimierung der Raumwirkung',
  'Saubere und präzise Umsetzung'
];

const Badsanierung = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" data-testid="badsanierung-page">
      {/* Hero Section */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-500">
            <Link to="/" className="hover:text-[#003056] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/referenzen" className="hover:text-[#003056] transition-colors">Referenzen</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">Badsanierung</span>
          </nav>

          {/* Haupt-Titel */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#003056]/10 text-[#003056] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Referenzprojekt
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Badsanierung – Vorher & Nachher
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Erleben Sie die Transformation: Ein veraltetes Badezimmer wird zur modernen Wohlfühloase.
            </p>
          </div>

          {/* Vorher/Nachher Slider */}
          <div className="max-w-5xl mx-auto mb-16">
            <BeforeAfterSlider 
              beforeImage={IMAGES.before}
              afterImage={IMAGES.after}
            />
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* SEO Titel */}
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              Professionelle Badsanierung in Hamburg – Modernisierung aus einer Hand
            </h2>

            {/* SEO Text */}
            <div className="prose prose-lg prose-slate max-w-none mb-10">
              <p className="text-slate-700 leading-relaxed">
                Dieses Badezimmer wurde von unserem Team vollständig modernisiert und an heutige 
                Wohnstandards angepasst.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Aus einem schmalen, in die Jahre gekommenen Bad entstand eine moderne Wohlfühloase 
                mit klaren Linien, hochwertigen Oberflächen und optimaler Raumnutzung.
              </p>
            </div>

            {/* Leistungen Liste */}
            <div className="bg-slate-50 rounded-2xl p-8 mb-10">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Unsere Leistungen bei dieser Badsanierung umfassten:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {LEISTUNGEN.map((leistung, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{leistung}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weiterer SEO Text */}
            <div className="prose prose-lg prose-slate max-w-none mb-10">
              <p className="text-slate-700 leading-relaxed">
                Gerade in Hamburg sehen wir häufig Bäder mit älteren Grundrissen und veralteten 
                Oberflächen. Durch eine durchdachte Planung lässt sich selbst auf begrenztem Raum 
                ein modernes, stilvolles Badezimmer realisieren.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Als Fachbetrieb aus Hamburg begleiten wir unsere Kunden von der Planung bis zur 
                fertigen Umsetzung – zuverlässig, sauber und termingerecht.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-16 bg-gradient-to-br from-[#003056] to-[#004a7c]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Lokaler SEO Titel */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-white/80" />
              <span className="text-white/80 font-medium">Lokaler Fachbetrieb</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ihr Partner für Badsanierungen in Hamburg
            </h2>

            {/* Lokaler SEO Text */}
            <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto">
              Ocean Color ist Ihr Ansprechpartner für professionelle Badsanierungen in Hamburg 
              und Umgebung.
            </p>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Ob komplette Badmodernisierung, optische Aufwertung oder funktionale Anpassung – 
              wir schaffen langlebige Lösungen mit hochwertigem Finish.
            </p>

            {/* Stadtteile */}
            <div className="mb-10">
              <p className="text-white/70 mb-4">Unsere Projekte realisieren wir unter anderem in:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {STADTTEILE.map((stadtteil, index) => (
                  <span 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20"
                  >
                    {stadtteil}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/rechner"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#003056] px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                data-testid="cta-badsanierung-anfragen"
              >
                Jetzt Badsanierung anfragen
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a 
                href="tel:04018008888"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
              >
                <Phone className="w-5 h-5" />
                040 1800 8888
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-[#003056] mb-2">15+</div>
                <div className="text-slate-600">Jahre Erfahrung</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-[#003056] mb-2">500+</div>
                <div className="text-slate-600">Projekte realisiert</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-[#003056] mb-2">5.0</div>
                <div className="text-slate-600">Google Bewertung</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 mb-4">Schnelle Beratung gewünscht?</p>
          <a 
            href="https://wa.me/4915128808304?text=Hallo,%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Badsanierung."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Per WhatsApp anfragen
          </a>
        </div>
      </section>
    </div>
  );
};

export default Badsanierung;
