import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, ArrowLeft, CheckCircle, Phone } from 'lucide-react';
import { ServiceImage, GeoImageSection, ServiceGallery } from '../components/ServiceImage';
import { leistungsbilder, getServiceBilder } from '../data/leistungsbilder';
import { ScrollReveal } from '../hooks/useScrollReveal';

// Detaillierte Leistungsdaten
const leistungenData = {
  'waende-decken': {
    title: 'Wände & Decken',
    metaTitle: 'Wände & Decken streichen | Ocean Color Hamburg',
    metaDescription: 'Professionelle Wandgestaltung und Deckenanstriche in Hamburg. Hochwertige Farben, präzise Ausführung. Jetzt Angebot anfordern!',
    heroText: 'Professionelle Gestaltung von Innenwänden und Decken',
    description: 'Wände und Decken prägen maßgeblich die Atmosphäre eines Raumes. Mit unserer langjährigen Erfahrung sorgen wir für ein perfektes Finish, das Ihre Räume in neuem Glanz erstrahlen lässt.',
    images: ['streichen'],
    benefits: [
      'Hochwertige, langlebige Farben führender Hersteller',
      'Saubere Kanten und präzise Übergänge',
      'Gründliche Vorbereitung der Untergründe',
      'Schutz Ihrer Möbel und Böden während der Arbeiten',
      'Umweltfreundliche und geruchsarme Farben verfügbar'
    ],
    process: [
      'Besichtigung und Beratung vor Ort',
      'Farbberatung und Mustererstellung',
      'Professionelle Untergrundvorbereitung',
      'Sorgfältiger Anstrich in mehreren Schichten',
      'Qualitätskontrolle und saubere Übergabe'
    ],
    applications: ['Wohnräume', 'Büros', 'Treppenhäuser', 'Flure', 'Keller']
  },
  'lackierarbeiten': {
    title: 'Lackierarbeiten',
    metaTitle: 'Lackierarbeiten | Ocean Color Hamburg',
    metaDescription: 'Professionelle Lackierung von Türen, Fenstern und Heizkörpern in Hamburg. Langlebiger Schutz und perfekte Oberflächen.',
    heroText: 'Fachgerechte Lackierung für langlebigen Schutz',
    description: 'Lackierarbeiten erfordern höchste Präzision und Fachkenntnis. Wir lackieren Türen, Fenster, Heizkörper und andere Oberflächen mit hochwertigen Lacken für ein perfektes und dauerhaftes Ergebnis.',
    benefits: [
      'Verwendung hochwertiger Markenlacke',
      'Spritz- und Streichlackierung möglich',
      'Perfekte Oberflächen ohne Nasen und Läufer',
      'Beständig gegen Abrieb und Vergilbung',
      'Verschiedene Glanzgrade verfügbar'
    ],
    process: [
      'Begutachtung und Zustandsanalyse',
      'Abschleifen und Grundieren der Oberflächen',
      'Mehrschichtiger Lackaufbau',
      'Zwischenschliff für optimale Haftung',
      'Endlackierung und Qualitätsprüfung'
    ],
    applications: ['Türen & Zargen', 'Fenster & Rahmen', 'Heizkörper', 'Treppen & Geländer', 'Möbel']
  },
  'tapezierarbeiten': {
    title: 'Tapezierarbeiten',
    metaTitle: 'Tapezierarbeiten | Ocean Color Hamburg',
    metaDescription: 'Professionelle Tapezierarbeiten in Hamburg. Von klassisch bis modern - wir verlegen alle Tapetenarten fachgerecht.',
    heroText: 'Von klassisch bis modern – perfekt tapeziert',
    description: 'Tapeten verleihen Räumen Charakter und Individualität. Ob elegante Vliestapete, klassische Raufaser oder exklusive Designtapete – wir tapezieren präzise und mit Liebe zum Detail.',
    images: ['vlies'],
    benefits: [
      'Verarbeitung aller Tapetenarten',
      'Exakte Musteranpassung',
      'Saubere Übergänge und Ecken',
      'Professionelle Untergrundvorbereitung',
      'Beratung bei der Tapetenauswahl'
    ],
    process: [
      'Beratung und Tapetenauswahl',
      'Untergrundprüfung und Vorbereitung',
      'Alte Tapeten fachgerecht entfernen',
      'Präzises Zuschneiden und Tapezieren',
      'Saubere Nacharbeiten und Kontrolle'
    ],
    applications: ['Wohnzimmer', 'Schlafzimmer', 'Flure', 'Büroräume', 'Akzentwände']
  },
  'spachtelarbeiten': {
    title: 'Spachtelarbeiten',
    metaTitle: 'Spachtelarbeiten | Ocean Color Hamburg',
    metaDescription: 'Professionelle Spachtelarbeiten für glatte Wände in Hamburg. Perfekte Grundlage für Ihr Malerarbeiten.',
    heroText: 'Die perfekte Grundlage für makellose Wände',
    description: 'Eine glatte, ebene Oberfläche ist die Basis für ein perfektes Malergebnis. Mit unseren professionellen Spachtelarbeiten beseitigen wir Unebenheiten, Risse und Beschädigungen.',
    benefits: [
      'Verschiedene Spachtelstufen (Q1-Q4)',
      'Beseitigung von Rissen und Löchern',
      'Glättung unebener Untergründe',
      'Verwendung hochwertiger Spachtelmassen',
      'Perfekte Vorbereitung für Anstriche'
    ],
    process: [
      'Begutachtung des Untergrundes',
      'Auswahl der passenden Spachtelmasse',
      'Grobspachtelung bei starken Unebenheiten',
      'Feinspachtelung für glatte Oberflächen',
      'Schleifen und Entstauben'
    ],
    applications: ['Neubau-Feinspachtelung', 'Altbausanierung', 'Risssanierung', 'Deckenspachtelung', 'Wandbegradigung']
  },
  'trockenbau': {
    title: 'Trockenbau',
    metaTitle: 'Trockenbau | Ocean Color Hamburg',
    metaDescription: 'Professioneller Trockenbau in Hamburg. Raumteilung, abgehängte Decken und Schallschutz vom Fachmann.',
    heroText: 'Flexible Raumgestaltung mit Trockenbau',
    description: 'Trockenbau bietet vielfältige Möglichkeiten zur Raumgestaltung. Von Trennwänden über abgehängte Decken bis hin zu Schallschutzlösungen – wir setzen Ihre Ideen professionell um.',
    benefits: [
      'Schnelle und saubere Umsetzung',
      'Flexible Raumaufteilung',
      'Verbesserter Schall- und Wärmeschutz',
      'Integration von Beleuchtung und Technik',
      'Kostengünstiger als Massivbau'
    ],
    process: [
      'Planung und Beratung',
      'Aufbau der Unterkonstruktion',
      'Montage der Gipskartonplatten',
      'Verspachtelung der Fugen',
      'Oberflächenfinish'
    ],
    applications: ['Trennwände', 'Abgehängte Decken', 'Dachausbau', 'Installationswände', 'Akustikdecken']
  },
  'fassadensanierung': {
    title: 'Fassadensanierung',
    metaTitle: 'Fassadensanierung | Ocean Color Hamburg',
    metaDescription: 'Professionelle Fassadensanierung in Hamburg. Außenanstriche, Fassadenrenovierung und Betonschutz vom Fachmann.',
    heroText: 'Langfristiger Schutz und moderne Optik für Ihre Fassade',
    description: 'Eine professionell ausgeführte Fassade schützt das Gebäude langfristig vor Witterungseinflüssen und trägt entscheidend zur Optik bei. Wir bieten umfassende Lösungen für Außenputz, Fassadenanstriche und individuelle Farbgestaltung.',
    benefits: [
      'Langfristiger Schutz vor Witterungseinflüssen',
      'Wertsteigerung der Immobilie',
      'Individuelle Farbgestaltung',
      'Professionelle Fassadenaufbereitung',
      'Betonschutz und -sanierung'
    ],
    process: [
      'Fassadenanalyse und Schadensbewertung',
      'Reinigung und Vorbehandlung',
      'Risssanierung und Ausbesserungen',
      'Grundierung der Flächen',
      'Mehrschichtiger Fassadenanstrich'
    ],
    applications: ['Fassadenanstriche', 'Außenputzarbeiten', 'Betonschutz', 'Schutzanstriche', 'Farbgestaltung'],
    additionalSections: [
      {
        title: 'Fassadenaufbereitung',
        content: 'Exponierte Fassaden benötigen regelmäßige Pflege und Schutz. Wir kümmern uns um Reinigung, Schutzanstriche und die langfristige Erhaltung der Bausubstanz.'
      },
      {
        title: 'Betonschutz & -sanierung',
        content: 'Betonflächen sollten regelmäßig geschützt werden, um Schäden zu vermeiden.',
        list: ['Imprägnierungen', 'Rissverfüllung', 'Schutzbeschichtungen']
      }
    ]
  },
  'dekorative-wandgestaltung': {
    title: 'Dekorative Wandgestaltung',
    metaTitle: 'Dekorative Wandgestaltung | Ocean Color Hamburg',
    metaDescription: 'Kreative Wandgestaltung in Hamburg. Kalkspachtel, Wickeltechnik, Wandlasuren und mehr vom Profi.',
    heroText: 'Individuelle Akzente für Ihre Räume',
    description: 'Mit modernen Techniken lassen sich individuelle Akzente setzen – ob im Eingangsbereich, Kinderzimmer oder Wohnbereich. Wir bieten eine Vielzahl dekorativer Oberflächentechniken zur individuellen Raumgestaltung.',
    benefits: [
      'Individuelle und einzigartige Gestaltung',
      'Hochwertige Systeme der Firma Revidil (Italien)',
      'Oberflächen mit Struktur, Tiefe und Charakter',
      'Persönliche Beratung und Mustervorlagen',
      'Langjährige Erfahrung in Kreativtechniken'
    ],
    process: [
      'Beratungsgespräch und Ideenfindung',
      'Erstellung von Mustern',
      'Untergrundvorbereitung',
      'Ausführung der Kreativtechnik',
      'Versiegelung bei Bedarf'
    ],
    applications: ['Kalkspachtel', 'Wickeltechnik', 'Wandlasuren', 'Effekttechniken', 'Akzentwände'],
    additionalSections: [
      {
        title: 'Schmuck- & Effekttechniken',
        content: 'Durch Techniken wie Kalkspachtel, Wickeltechnik und Wandlasuren entstehen einzigartige Oberflächen mit Struktur, Tiefe und Charakter. Wir arbeiten mit den hochwertigen Systemen der italienischen Firma Revidil und bieten deren komplette Gestaltungstechniken an.'
      }
    ]
  },
  'bodenbelaege': {
    title: 'Bodenbeläge',
    metaTitle: 'Bodenbeläge verlegen | Ocean Color Hamburg',
    metaDescription: 'Professionelle Bodenverlegung in Hamburg. Laminat, Vinyl, PVC, Teppich und Bodenbeschichtungen vom Malermeister.',
    heroText: 'Perfekte Böden für Ihr Zuhause und Gewerbe',
    description: 'Ein Boden prägt maßgeblich die Wirkung eines Raumes. Material, Struktur und Oberfläche entscheiden über Atmosphäre, Funktionalität und Langlebigkeit. Wir beraten Sie umfassend bei der Auswahl des passenden Bodenbelags und bieten eine Vielzahl an Lösungen für private und gewerbliche Räume.',
    benefits: [
      'Umfassende Beratung bei der Materialauswahl',
      'Fachgerechte Verlegung aller Bodenarten',
      'Professionelle Untergrundvorbereitung',
      'Langlebige und hochwertige Ergebnisse',
      'Für private und gewerbliche Räume'
    ],
    process: [
      'Aufmaß und Beratung vor Ort',
      'Untergrundprüfung und Vorbereitung',
      'Fachgerechte Verlegung des Bodenbelags',
      'Saubere Übergänge und Randabschlüsse',
      'Endreinigung und Übergabe'
    ],
    applications: ['Laminat', 'Teppich', 'PVC', 'Vinyl', 'Bodenbeschichtungen'],
    additionalSections: [
      {
        title: 'Bodenverlegung',
        content: 'Bei Renovierungen von Wänden und Decken ist häufig auch eine Anpassung des Bodenbelags sinnvoll, um ein harmonisches Gesamtbild zu schaffen. Zusätzlich übernehmen wir vorbereitende Untergrundarbeiten, damit der neue Boden langfristig stabil und hochwertig bleibt.'
      },
      {
        title: 'Bodenbeschichtungen',
        content: 'Bodenbeschichtungen kommen in Garagen, Kellern, Balkonen oder auf Betonflächen zum Einsatz und müssen hohen mechanischen und chemischen Anforderungen standhalten. Neben einer ansprechenden Optik sorgen sie für Widerstandsfähigkeit, Schutz vor Abnutzung, Rutschhemmung und Langlebigkeit.',
        list: ['Imprägnierungen (transparenter Schutz)', 'Versiegelungen (Porenverschluss)', 'Beschichtungen (eigene Schutzschicht)']
      }
    ]
  },
  'schimmelsanierung': {
    title: 'Schimmelsanierung',
    metaTitle: 'Schimmelsanierung | Ocean Color Hamburg',
    metaDescription: 'Professionelle Schimmelsanierung in Hamburg. Fachgerechte Entfernung und dauerhafte Beseitigung von Schimmel.',
    heroText: 'Fachgerechte Schimmelbekämpfung für ein gesundes Raumklima',
    description: 'Schimmel stellt ein ernsthaftes Gesundheitsrisiko dar und sollte fachgerecht entfernt werden. Mögliche Folgen sind Atemwegsprobleme, Allergien und beeinträchtigte Raumluftqualität. Wir erkennen Ursachen frühzeitig und beseitigen Schimmel nachhaltig.',
    benefits: [
      'Fachgerechte Ursachenanalyse',
      'Professionelle Schimmelentfernung nach Richtlinien',
      'Dauerhafte Sanierungslösungen',
      'Renovierung nach Wasserschäden',
      'Gesundheitsschutz während der Arbeiten'
    ],
    process: [
      'Analyse des Schadens',
      'Fachgerechte Reinigung',
      'Neuverputzung',
      'Versiegelung',
      'Neugestaltung der Oberfläche'
    ],
    applications: ['Badezimmer', 'Keller', 'Schlafzimmer', 'Fensterlaibungen', 'Wasserschäden'],
    additionalSections: [
      {
        title: 'Schimmelpilzentfernung',
        content: 'Bestimmte Schimmelarten sind gesundheitsgefährdend und müssen nach klaren Richtlinien beseitigt werden. Wir erkennen Ursachen frühzeitig und beseitigen Schimmel nachhaltig.'
      },
      {
        title: 'Renovierung nach Wasserschäden',
        content: 'Je nach Schadensgrad führen wir Trocknung der Wände, Erneuerung von Putz und Neuanstrich durch. Wir sorgen für eine vollständige Wiederherstellung der betroffenen Bereiche.',
        result: 'Ein dauerhaft saniertes und optisch erneuertes Umfeld.'
      }
    ]
  },
  'epoxidharzboden': {
    title: 'Epoxidharzbodenbeschichtungen',
    metaTitle: 'Epoxidharzboden | Ocean Color Hamburg',
    metaDescription: 'Professionelle Epoxidharzbeschichtungen in Hamburg. Fugenlose, strapazierfähige Böden für Gewerbe und Privat.',
    heroText: 'Fugenlose Böden für höchste Ansprüche',
    description: 'Epoxidharzböden sind extrem belastbar, pflegeleicht und optisch ansprechend. Ob Garagenboden, Werkstatt oder modernes Wohndesign – wir beschichten Ihre Böden professionell.',
    benefits: [
      'Fugenlose, hygienische Oberfläche',
      'Extrem belastbar und langlebig',
      'Chemikalien- und ölbeständig',
      'Leicht zu reinigen',
      'Verschiedene Farben und Optiken'
    ],
    process: [
      'Untergrundprüfung und Vorbereitung',
      'Schleifen und Grundieren',
      'Auftragen der Epoxidharzschicht',
      'Einstreuen von Chips (optional)',
      'Versiegelung und Aushärtung'
    ],
    applications: ['Garagen', 'Werkstätten', 'Industriehallen', 'Wohnräume', 'Kellerboden']
  }
};

const LeistungDetail = () => {
  const { slug } = useParams();
  const leistung = leistungenData[slug];

  useEffect(() => {
    if (leistung) {
      document.title = leistung.metaTitle;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', leistung.metaDescription);
      }
    }
    window.scrollTo(0, 0);
  }, [leistung]);

  if (!leistung) {
    return <Navigate to="/leistungen" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/leistungen" 
              className="inline-flex items-center text-ocean-blue hover:text-ocean-blue-dark mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zu allen Leistungen
            </Link>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {leistung.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              {leistung.heroText}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-ocean-blue hover:bg-ocean-blue-dark text-white font-semibold w-full sm:w-auto"
                >
                  Kostenlos beraten lassen
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rechner">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 w-full sm:w-auto"
                >
                  Angebot berechnen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              {leistung.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vorteile */}
              <Card className="border-2 border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ihre Vorteile</h2>
                  <ul className="space-y-4">
                    {leistung.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Ablauf */}
              <Card className="border-2 border-gray-100">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Unser Ablauf</h2>
                  <ol className="space-y-4">
                    {leistung.process.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-ocean-blue text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Anwendungsbereiche */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Anwendungsbereiche</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {leistung.applications.map((app, index) => (
                <span 
                  key={index}
                  className="bg-white px-5 py-2 rounded-full text-gray-700 border border-gray-200 shadow-sm"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zusätzliche Sektionen */}
      {leistung.additionalSections && leistung.additionalSections.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {leistung.additionalSections.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                  {section.list && (
                    <ul className="space-y-2 mt-4">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.result && (
                    <p className="mt-4 font-semibold text-ocean-blue">{section.result}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-ocean-blue-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Interesse an {leistung.title}?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Kontaktieren Sie uns für ein unverbindliches Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-amber-400 text-gray-900 font-semibold hover:bg-amber-300 w-full sm:w-auto"
                >
                  Rückruf anfordern
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rechner">
                <Button 
                  size="lg" 
                  className="bg-transparent text-white font-semibold border-2 border-white hover:bg-white hover:text-ocean-blue-dark w-full sm:w-auto"
                >
                  Angebot berechnen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeistungDetail;
