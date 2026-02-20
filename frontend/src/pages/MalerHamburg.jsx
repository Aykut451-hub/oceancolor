import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, CheckCircle, Users, Building, Home, Wrench } from 'lucide-react';
import { stadtteile, kompetenzen } from '../data/stadtteile';

const kundengruppen = [
  { icon: Home, titel: 'Privatkunden', text: 'Wohnungen, Häuser und Eigentumswohnungen – wir gestalten Ihr Zuhause.' },
  { icon: Building, titel: 'Hausverwaltungen', text: 'Treppenhäuser, Fassaden und Wohnanlagen – termingerecht und zuverlässig.' },
  { icon: Users, titel: 'Vermieter', text: 'Wohnungsübergaben, Renovierungen und Instandhaltung für Ihre Mietobjekte.' },
  { icon: Wrench, titel: 'Sanierungsprojekte', text: 'Altbausanierung, Schimmelbeseitigung und umfassende Renovierungen.' },
];

const MalerHamburg = () => {
  useEffect(() => {
    document.title = 'Maler in Hamburg | Ocean Color – Malermeisterbetrieb';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'Ocean Color – Ihr Malermeisterbetrieb in Hamburg. Malerarbeiten, Trockenbau, Schimmelsanierung, Bodenverlegung und Fassadenarbeiten in allen Hamburger Stadtteilen.';
    return () => { document.title = 'Ocean Color – Malermeisterbetrieb Hamburg'; };
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ocean Color GmbH",
    "description": "Malermeisterbetrieb in Hamburg mit über 17 Jahren Erfahrung. Malerarbeiten, Trockenbau, Schimmelsanierung, Bodenverlegung und Fassadenarbeiten.",
    "url": "https://ocean-maler.de/maler-hamburg",
    "telephone": "+4915120050008",
    "priceRange": "$$",
    "address": { "@type": "PostalAddress", "addressLocality": "Hamburg", "addressRegion": "HH", "addressCountry": "DE" },
    "areaServed": stadtteile.map(s => ({ "@type": "Place", "name": s.name })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Leistungen",
      "itemListElement": kompetenzen.map(k => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": k.titel, "description": k.kurz }
      }))
    },
    "knowsAbout": ["Malerarbeiten", "Trockenbau", "Schimmelsanierung", "Bodenverlegung", "Fassadenarbeiten", "Tapezierarbeiten", "Lackierarbeiten", "Spachtelarbeiten", "Renovierung", "Innenausbau"]
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Hamburg & Umgebung
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Maler in Hamburg
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Ocean Color ist als Malermeisterbetrieb in ganz Hamburg tätig, insbesondere in 
              Altona, Wandsbek, Eppendorf, Lokstedt, Stellingen, Bahrenfeld, Osdorf, Lurup, 
              Bergedorf sowie im Umland wie Wedel und Rellingen.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Neben klassischen Malerarbeiten bieten wir auch Trockenbau, Schimmelsanierung, 
              Fassadenarbeiten und Bodenverlegung an – seit über 17 Jahren mit Meisterqualität.
            </p>
          </div>
        </div>
      </section>

      {/* Kompetenzen */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Unsere Kompetenzen in Hamburg
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {kompetenzen.map(k => (
              <Link
                key={k.slug}
                to={`/leistungen/${k.serviceSlug}`}
                className="group bg-white border-2 border-gray-100 hover:border-ocean-blue rounded-xl p-6 transition-all hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-ocean-blue transition-colors mb-2">{k.titel}</h3>
                <p className="text-sm text-gray-600">{k.kurz}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Für wen wir arbeiten */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Für wen wir arbeiten
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {kundengruppen.map((k, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center">
                <div className="bg-ocean-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <k.icon className="h-6 w-6 text-ocean-blue" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{k.titel}</h3>
                <p className="text-sm text-gray-600">{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stadtteile Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Unsere Einsatzgebiete
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Wir sind in ganz Hamburg und im Umkreis von ca. 15 km für Sie im Einsatz.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
            {stadtteile.map(s => (
              <Link
                key={s.slug}
                to={`/maler-hamburg-${s.slug}`}
                className="group bg-white border-2 border-gray-100 hover:border-ocean-blue rounded-xl px-4 py-3 text-center transition-all hover:shadow-md"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-ocean-blue transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leistung ↔ Ort Kreuzlinks */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Leistungen in Ihrem Stadtteil
          </h2>
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {['Altona', 'Wandsbek', 'Eppendorf', 'Lokstedt', 'Bahrenfeld', 'Bergedorf'].map(ort => (
              ['Malerarbeiten', 'Trockenbau', 'Schimmelsanierung'].map(leistung => {
                const slug = stadtteile.find(s => s.name === ort)?.slug;
                return (
                  <Link
                    key={`${leistung}-${ort}`}
                    to={`/maler-hamburg-${slug}`}
                    className="text-xs bg-white border border-gray-200 hover:border-ocean-blue text-gray-600 hover:text-ocean-blue px-3 py-1.5 rounded-full transition-colors"
                  >
                    {leistung} {ort}
                  </Link>
                );
              })
            ))}
          </div>
        </div>
      </section>

      {/* Tätigkeitsgebiet GEO Text */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white border-2 border-gray-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tätigkeitsgebiet</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ocean Color ist als Malermeisterbetrieb in ganz Hamburg tätig, insbesondere in: 
              Altona, Wandsbek, Eppendorf, Lokstedt, Stellingen, Bahrenfeld, Osdorf, Lurup, 
              Bergedorf sowie im Umland wie Wedel und Rellingen.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Neben klassischen Malerarbeiten bieten wir auch Trockenbau, Schimmelsanierung, 
              Fassadenarbeiten und Bodenverlegung an. Unser Team arbeitet für Privatkunden, 
              Vermieter, Hausverwaltungen und bei umfangreichen Sanierungsprojekten.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mit über 17 Jahren Erfahrung und einem klaren Fokus auf Qualität, Sauberkeit 
              und Zuverlässigkeit ist Ocean Color Ihr Ansprechpartner für alle Renovierungs- 
              und Innenausbauarbeiten in der Metropolregion Hamburg.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ocean-blue-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Malerarbeiten in Hamburg gesucht?</h2>
            <p className="text-lg text-white/90 mb-8">Berechnen Sie jetzt unverbindlich Ihre Preisspanne.</p>
            <Link to="/rechner">
              <Button size="lg" className="bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300">
                Angebot berechnen <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MalerHamburg;
