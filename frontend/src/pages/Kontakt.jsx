import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Star, HelpCircle } from 'lucide-react';
import { submitCallbackRequest, submitContactForm } from '../data/mock';
import { toast } from 'sonner';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';

// FAQ-Daten für Kontaktseite
const faqData = [
  {
    id: "faq-1",
    question: "Wie schnell erhalte ich ein Angebot?",
    answer: "In der Regel innerhalb von 24–48 Stunden nach Besichtigung bzw. nach Erhalt aller Informationen und Fotos. Bei Kleinaufträgen oft schneller."
  },
  {
    id: "faq-2",
    question: "In welchen Gebieten sind Sie tätig?",
    answer: "Wir sind in Hamburg und Umgebung tätig, besonders in Altona, Ottensen, St. Pauli, Eimsbüttel, Bahrenfeld, Blankenese und Hamburg-Mitte."
  },
  {
    id: "faq-3",
    question: "Machen Sie auch Kleinaufträge?",
    answer: "Ja, selbstverständlich. Kleine Reparaturen, einzelne Räume, Ausbesserungen oder kurzfristige Arbeiten sind möglich – je nach aktueller Auslastung."
  },
  {
    id: "faq-4",
    question: "Übernehmen Sie auch Balkonsanierungen und Fassadenarbeiten?",
    answer: "Ja. Balkonbeschichtungen, Abdichtungen, Untergrundvorbereitung, Korrosionsschutz sowie Fassadenanstriche gehören zu unseren Leistungen."
  },
  {
    id: "faq-5",
    question: "Arbeiten Sie mit Hausverwaltungen und Gewerbekunden?",
    answer: "Ja. Wir betreuen private Kunden, Hausverwaltungen und gewerbliche Objekte – inklusive professioneller Termin- und Ablaufkoordination."
  },
  {
    id: "faq-6",
    question: "Was benötigen Sie für ein Angebot?",
    answer: "Ideal sind Fotos oder Videos, Maße in Quadratmetern, gewünschte Ausführung und Farbton, Adresse mit Etage sowie der gewünschte Zeitraum. Optional bieten wir auch eine Besichtigung vor Ort an."
  },
  {
    id: "faq-7",
    question: "Wie läuft die Beauftragung ab?",
    answer: "Anfrage → Klärung der Details (ggf. Besichtigung) → Angebot → Terminplanung → Ausführung → Abnahme und Rechnung."
  },
  {
    id: "faq-8",
    question: "Bieten Sie Termine am Wochenende an?",
    answer: "In Ausnahmefällen ist das möglich. Unser Standard ist Montag bis Freitag; Wochenendtermine können nach Absprache vereinbart werden."
  }
];

const Kontakt = () => {
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    preferredTime: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loadingCallback, setLoadingCallback] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false);
  
  // Lazy load map
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const serviceAreas = [
    'Hamburg Altona', 'Eimsbüttel', 'Ottensen', 'St. Pauli', 
    'Bahrenfeld', 'Blankenese', 'Hamburg-Mitte', 'Wandsbek'
  ];

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!callbackForm.name || !callbackForm.phone) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    setLoadingCallback(true);
    
    try {
      const response = await submitCallbackRequest(callbackForm);
      toast.success(response.message);
      setCallbackForm({ name: '', phone: '', preferredTime: '' });
    } catch (error) {
      toast.error('Fehler beim Senden der Anfrage');
    } finally {
      setLoadingCallback(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    setLoadingContact(true);
    
    try {
      const response = await submitContactForm(contactForm);
      toast.success(response.message);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Fehler beim Senden der Nachricht');
    } finally {
      setLoadingContact(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Kontakt
            </h1>
            <p className="text-lg text-gray-600">
              Wir freuen uns auf Ihre Anfrage! Nutzen Sie unser Rückruf-Formular 
              oder kontaktieren Sie uns direkt.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Callback Form - Priority */}
            <div>
              <Card className="border-2 border-ocean-blue shadow-lg">
                <CardHeader className="bg-ocean-blue/5">
                  <CardTitle className="text-2xl text-ocean-blue">
                    Rückruf anfordern
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Wir rufen Sie innerhalb von 24 Stunden zurück
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="callback-name">Name *</Label>
                      <Input
                        id="callback-name"
                        value={callbackForm.name}
                        onChange={(e) => setCallbackForm({...callbackForm, name: e.target.value})}
                        placeholder="Ihr Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="callback-phone">Telefonnummer *</Label>
                      <Input
                        id="callback-phone"
                        type="tel"
                        value={callbackForm.phone}
                        onChange={(e) => setCallbackForm({...callbackForm, phone: e.target.value})}
                        placeholder="040 1234 5678"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="callback-time">Bevorzugte Rückrufzeit (optional)</Label>
                      <Input
                        id="callback-time"
                        value={callbackForm.preferredTime}
                        onChange={(e) => setCallbackForm({...callbackForm, preferredTime: e.target.value})}
                        placeholder="z.B. Vormittags oder nach 18 Uhr"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-ocean-blue hover:bg-ocean-blue-dark text-white"
                      disabled={loadingCallback}
                    >
                      {loadingCallback ? 'Wird gesendet...' : 'Rückruf anfordern'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Nachricht senden</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Schreiben Sie uns Ihr Anliegen
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Ihr Name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-Mail *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="ihre@email.de"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Telefon (optional)</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        placeholder="040 1234 5678"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Nachricht *</Label>
                      <Textarea
                        id="contact-message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Beschreiben Sie Ihr Projekt..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-ocean-blue hover:bg-ocean-blue-dark text-white"
                      disabled={loadingContact}
                    >
                      {loadingContact ? 'Wird gesendet...' : 'Nachricht senden'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Kontaktinformationen
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center border-2 border-[#25D366] bg-[#25D366]/5">
                <CardContent className="p-6">
                  <div className="bg-[#25D366]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="h-6 w-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="kontakt-whatsapp-button"
                    className="inline-block mt-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    WhatsApp Anfrage senden
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
                  <a 
                    href="tel:04018008888" 
                    className="text-sm text-gray-600 hover:text-ocean-blue transition-colors"
                  >
                    040 1800 8888
                  </a>
                  <p className="text-xs text-gray-500 mt-2">
                    (Bitte bevorzugt Rückruf nutzen)
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">E-Mail</h3>
                  <a 
                    href="mailto:info@ocean-maler.de" 
                    className="text-sm text-gray-600 hover:text-ocean-blue transition-colors break-all"
                  >
                    info@ocean-maler.de
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-6">
                  <div className="bg-ocean-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Einsatzgebiet</h3>
                  <p className="text-sm text-gray-600">
                    Hamburg & Umgebung<br />
                    (ca. 15 km Radius)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Business Hours */}
            <Card className="mt-8 border-2">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-ocean-blue/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-ocean-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Erreichbarkeit</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Montag - Freitag: 08:00 - 18:00 Uhr</p>
                      <p>Samstag: 09:00 - 14:00 Uhr</p>
                      <p>Sonntag: Geschlossen</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      * Außerhalb dieser Zeiten nutzen Sie bitte unser Rückruf-Formular
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section - SEO optimized */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Unser Standort in Hamburg
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Ocean Color Malermeisterbetrieb – Ihr zuverlässiger Partner für hochwertige 
              Malerarbeiten in Hamburg und Umgebung.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left: Location Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                {/* Address */}
                <address className="not-italic mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">Ocean Color GmbH</h3>
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Schützenstraße 106</p>
                      <p>22761 Hamburg</p>
                    </div>
                  </div>
                </address>

                {/* Contact Details */}
                <div className="space-y-3 mb-6">
                  <a href="tel:04018008888" className="flex items-center space-x-3 text-gray-600 hover:text-ocean-blue transition-colors">
                    <Phone className="h-5 w-5 text-ocean-blue" />
                    <span>040 1800 8888</span>
                  </a>
                  <a href="mailto:info@ocean-maler.de" className="flex items-center space-x-3 text-gray-600 hover:text-ocean-blue transition-colors">
                    <Mail className="h-5 w-5 text-ocean-blue" />
                    <span>info@ocean-maler.de</span>
                  </a>
                </div>

                {/* Service Areas */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Unser Einsatzgebiet:</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-ocean-blue/10 text-ocean-blue px-2 py-1 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://wa.me/4915906850859"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="location-whatsapp-btn"
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                  <a 
                    href="tel:04018008888"
                    data-testid="location-call-btn"
                    className="inline-flex items-center px-4 py-2 bg-ocean-blue hover:bg-ocean-blue-dark text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* Right: Map */}
              <div ref={mapRef} className="relative">
                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100">
                  {mapLoaded ? (
                    <iframe
                      src="https://www.google.com/maps?q=Schützenstraße+106,+22761+Hamburg&output=embed"
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      title="Ocean Color Standort in Hamburg"
                      className="w-full"
                      data-testid="location-map-iframe"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                        <p className="text-sm">Karte wird geladen...</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Maler Hamburg | Malerbetrieb Altona | Renovierung Hamburg
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Review CTA Section */}
      <section className="py-12 bg-gradient-to-br from-ocean-blue/5 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Stars decoration */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-5 w-5 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Zufriedene Kunden? Bewerten Sie uns auf Google
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ihre Meinung hilft uns, unseren Service weiter zu verbessern und unterstützt 
              andere Kunden bei der Wahl eines zuverlässigen Malerbetriebs in Hamburg.
            </p>
            
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJgwoYpaqFsUcRPabmfur9qc4"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="google-review-btn"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 hover:border-ocean-blue hover:bg-ocean-blue/5 text-gray-800 font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform"
              >
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Jetzt auf Google bewerten
            </a>
            
            <p className="text-xs text-gray-400 mt-4">
              23 Bewertungen · 5,0 Sterne
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontakt;
