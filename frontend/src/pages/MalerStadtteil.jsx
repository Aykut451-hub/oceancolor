import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, CheckCircle, Phone } from 'lucide-react';
import { stadtteile } from '../data/stadtteile';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';

const MalerStadtteil = () => {
  const { stadtteil } = useParams();
  const data = stadtteile.find(s => s.slug === stadtteil);

  if (!data) return <Navigate to="/404" replace />;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ocean Color GmbH",
    "description": `Malermeisterbetrieb in ${data.name} – professionelle Malerarbeiten, Renovierung und Sanierung.`,
    "url": `https://ocean-maler.de/maler-hamburg-${data.slug}`,
    "telephone": "+4915120050008",
    "address": { "@type": "PostalAddress", "addressLocality": "Hamburg", "addressCountry": "DE" },
    "areaServed": { "@type": "Place", "name": data.name }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              {data.name}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" data-testid="stadtteil-title">
              Maler in {data.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data.beschreibung}
            </p>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Unsere Leistungen in {data.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {data.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 bg-white border-2 border-gray-100 rounded-xl p-5 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0" />
                  <span className="font-medium text-gray-800">{h}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Warum Ocean Color in {data.name}?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                  Über 17 Jahre Erfahrung als Malermeisterbetrieb in Hamburg
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                  Saubere Ausführung, termingerechte Umsetzung und faire Preise
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                  Persönliche Beratung und kostenlose Angebotserstellung
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                  Einsatz moderner Materialien für langlebige Ergebnisse
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ocean-blue-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Malerarbeiten in {data.name} gesucht?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Berechnen Sie jetzt unverbindlich Ihre Preisspanne oder kontaktieren Sie uns direkt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rechner">
                <Button size="lg" className="bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300 w-full sm:w-auto" data-testid="stadtteil-cta-rechner">
                  Angebot berechnen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:+4915120050008">
                <Button size="lg" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-ocean-blue-dark w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  Jetzt anrufen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to overview */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Link to="/#stadtteile" className="text-ocean-blue hover:text-ocean-blue-dark font-medium transition-colors">
            Alle Einsatzgebiete ansehen
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MalerStadtteil;
