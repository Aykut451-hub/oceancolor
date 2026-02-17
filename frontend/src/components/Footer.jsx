import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://oceancolor.de/wp-content/uploads/2024/04/Ocean_Color_Logo_m.Wischer.png"
              alt="Ocean Color Logo"
              className="h-12 w-auto mb-4 brightness-0 invert"
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
                <a href="mailto:info@oceancolor.de" className="hover:text-ocean-blue transition-colors">
                  info@oceancolor.de
                </a>
              </li>
            </ul>
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
