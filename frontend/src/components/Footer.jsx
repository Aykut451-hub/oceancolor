import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  // Lazy load map when visible
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
    'Hamburg Altona', 'Eimsbüttel', 'Ottensen', 'St. Pauli', 'HafenCity',
    'Bahrenfeld', 'Blankenese', 'Wandsbek', 'Hamburg Mitte'
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer - Schema.org structured data is in index.html to avoid duplicates */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/5mxy73rt_Ocean_Color_Logo_m.Wischer.png"
              alt="Ocean Color Malermeister Logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm mb-4">
              Ihr Malermeisterbetrieb in Hamburg für professionelle Malerarbeiten, 
              Renovierungen und Sanierungen.
            </p>
            <a 
              href="https://www.instagram.com/ocean_maler/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm hover:text-ocean-blue transition-colors"
            >
              <Instagram className="h-5 w-5 mr-2" />
              @ocean_maler
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-ocean-blue transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-sm hover:text-ocean-blue transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/rechner" className="text-sm hover:text-ocean-blue transition-colors">
                  Angebotsrechner
                </Link>
              </li>
              <li>
                <Link to="/referenzen" className="text-sm hover:text-ocean-blue transition-colors">
                  Referenzen
                </Link>
              </li>
              <li>
                <Link to="/ueber-uns" className="text-sm hover:text-ocean-blue transition-colors">
                  Über uns
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Leistungen</h3>
            <ul className="space-y-2">
              <li className="text-sm">Wände & Decken</li>
              <li className="text-sm">Lackierarbeiten</li>
              <li className="text-sm">Tapezierarbeiten</li>
              <li className="text-sm">Spachtelarbeiten</li>
              <li className="text-sm">Bodenbeläge</li>
              <li className="text-sm">Epoxidharz</li>
              <li className="text-sm">Trockenbau</li>
              <li className="text-sm">Fassadensanierung</li>
              <li className="text-sm">Dekorative Wandgestaltung</li>
              <li className="text-sm">Schimmelsanierung</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Hamburg und Umgebung<br />(ca. 15 km Radius)</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="tel:04018008888" className="hover:text-ocean-blue transition-colors">
                  040 1800 8888
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="mailto:info@ocean-maler.de" className="hover:text-ocean-blue transition-colors">
                  info@ocean-maler.de
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Location Section - SEO optimized */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left: Location Info */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">
                  Unser Standort in Hamburg
                </h3>
                
                {/* Address */}
                <address className="not-italic text-gray-300 text-sm mb-4">
                  <strong className="text-white">Ocean Color GmbH</strong><br />
                  Schützenstraße 106<br />
                  22761 Hamburg
                </address>

                {/* SEO Text */}
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Ocean Color Malermeisterbetrieb ist Ihr zuverlässiger Partner für hochwertige 
                  Malerarbeiten, Renovierungen und Fassadengestaltung in Hamburg und Umgebung. 
                  Von unserem Standort in Hamburg Altona betreuen wir private, gewerbliche und 
                  institutionelle Kunden im gesamten Stadtgebiet.
                </p>

                {/* Service Areas */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Unser Einsatzgebiet:</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
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
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                  <a 
                    href="tel:04018008888"
                    className="inline-flex items-center px-4 py-2 bg-ocean-blue hover:bg-ocean-blue-dark text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* Right: Map */}
              <div ref={mapRef} className="relative">
                <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800">
                  {mapLoaded ? (
                    <iframe
                      src="https://www.google.com/maps?q=Schützenstraße+106,+22761+Hamburg&output=embed"
                      width="100%"
                      height="240"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      title="Ocean Color Standort in Hamburg"
                      className="w-full"
                    />
                  ) : (
                    <div className="w-full h-60 bg-gray-800 flex items-center justify-center">
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
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ocean Color. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              <Link to="/impressum" className="text-sm text-gray-400 hover:text-ocean-blue transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-sm text-gray-400 hover:text-ocean-blue transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
