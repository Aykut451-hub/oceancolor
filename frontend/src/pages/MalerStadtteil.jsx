import React, { useEffect } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, MapPin, CheckCircle, Phone, Clock, ChevronDown, AlertTriangle, Users } from 'lucide-react';
import { stadtteile, kompetenzen } from '../data/stadtteile';

const kernLeistungen = [
  { titel: 'Malerarbeiten', text: 'Wände, Decken und Fassaden – professionell gestrichen mit hochwertigen Farben.' },
  { titel: 'Tapezierarbeiten', text: 'Raufaser, Glattvlies oder Mustertapete – fachgerecht tapeziert.' },
  { titel: 'Spachtelarbeiten', text: 'Glatte Oberflächen und Rissesanierung für ein perfektes Finish.' },
  { titel: 'Schimmelsanierung', text: 'Ursachenanalyse und nachhaltige Beseitigung von Schimmelbefall.' },
  { titel: 'Bodenbeschichtungen', text: 'Epoxid, PVC, Laminat – moderne Bodenbeläge fachgerecht verlegt.' },
  { titel: 'Lackierarbeiten', text: 'Türen, Fensterrahmen und Heizkörper – sauber lackiert und versiegelt.' },
];

const MalerStadtteil = () => {
  const { stadtteil } = useParams();
  const location = useLocation();

  // Support both /maler-hamburg/slug and /maler-hamburg-slug
  let slug = stadtteil;
  if (!slug) {
    const match = location.pathname.match(/^\/maler-hamburg-(.+)$/);
    if (match) slug = match[1];
  }

  const data = stadtteile.find(s => s.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = `Maler in ${data.name} | Ocean Color Hamburg`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = `Ihr Malermeister in ${data.name} für Renovierungen, Bodenarbeiten und Schimmelsanierung. Über 17 Jahre Erfahrung – jetzt Angebot berechnen.`;
    }
    return () => { document.title = 'Ocean Color – Malermeisterbetrieb Hamburg'; };
  }, [data]);

  if (!data) return <Navigate to="/404" replace />;

  const faqItems = [
    {
      frage: `Was kostet ein Maler in ${data.name}?`,
      antwort: `Die Kosten hängen von der Fläche, dem Zustand der Räume und der gewünschten Leistung ab. Für eine Wohnung mit 3 Zimmern beginnen die Preise bei ca. 1.200 €. Nutzen Sie unseren kostenlosen Angebotsrechner für eine unverbindliche Preisspanne.`
    },
    {
      frage: `Wie schnell können Sie in ${data.name} vor Ort sein?`,
      antwort: `Da wir in Hamburg ansässig sind, können wir in der Regel innerhalb von 1–3 Werktagen einen Besichtigungstermin in ${data.name} anbieten. Bei dringenden Anfragen kontaktieren Sie uns telefonisch.`
    },
    {
      frage: `Bieten Sie auch kleinere Malerarbeiten in ${data.name} an?`,
      antwort: `Ja, über unseren Kleinauftrag-Service übernehmen wir auch einzelne Räume, Ausbesserungen oder kleinere Renovierungen. Kein Auftrag ist uns zu klein.`
    },
    {
      frage: `Arbeiten Sie auch am Wochenende in ${data.name}?`,
      antwort: `Samstags sind wir von 09:00 bis 14:00 Uhr erreichbar. Für Notfälle wie Schimmelsanierung finden wir auch kurzfristig eine Lösung.`
    }
  ];

  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ocean Color GmbH",
    "description": `Malermeisterbetrieb in ${data.name} – professionelle Malerarbeiten, Renovierung und Sanierung.`,
    "url": `https://ocean-maler.de/maler-hamburg-${data.slug}`,
    "telephone": "+4915120050008",
    "address": { "@type": "PostalAddress", "addressLocality": "Hamburg", "addressRegion": "HH", "addressCountry": "DE" },
    "areaServed": stadtteile.map(s => ({ "@type": "Place", "name": s.name })),
    "priceRange": "€€"
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(f => ({
      "@type": "Question",
      "name": f.frage,
      "acceptedAnswer": { "@type": "Answer", "text": f.antwort }
    }))
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

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
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {data.beschreibung}
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-ocean-blue bg-ocean-blue/5 px-4 py-2 rounded-lg">
              <Clock className="h-4 w-4" />
              Schnelle Verfügbarkeit – in der Regel innerhalb von 1–3 Werktagen vor Ort
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              Unsere Leistungen in {data.name}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {kernLeistungen.map((l, i) => (
                <div key={i} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-ocean-blue/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0" />
                    <h3 className="font-semibold text-gray-900">{l.titel}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{l.text}</p>
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

      {/* FAQ */}
      <section className="py-16 bg-gray-50" data-testid="stadtteil-faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              Häufige Fragen – Maler in {data.name}
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <details key={i} className="group bg-white border-2 border-gray-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                    {faq.frage}
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.antwort}
                  </div>
                </details>
              ))}
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

      {/* Andere Stadtteile */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-4">Wir sind auch in diesen Stadtteilen für Sie da:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {stadtteile.filter(s => s.slug !== slug).slice(0, 10).map(s => (
              <Link
                key={s.slug}
                to={`/maler-hamburg-${s.slug}`}
                className="text-sm text-ocean-blue hover:text-ocean-blue-dark hover:underline transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MalerStadtteil;
