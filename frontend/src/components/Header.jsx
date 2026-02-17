import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Startseite', path: '/' },
    { name: 'Leistungen', path: '/leistungen' },
    { name: 'Angebotsrechner', path: '/rechner' },
    { name: 'Referenzen', path: '/referenzen' },
    { name: 'Über uns', path: '/ueber-uns' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://oceancolor.de/wp-content/uploads/2024/04/Ocean_Color_Logo_m.Wischer.png"
              alt="Ocean Color Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                  ${location.pathname === link.path
                    ? 'text-ocean-blue bg-ocean-blue/5'
                    : 'text-gray-700 hover:text-ocean-blue hover:bg-gray-50'
                  }
                  ${index !== navLinks.length - 1 ? 'mr-1' : ''}
                `}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-ocean-blue rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:04018008888" 
              className="flex items-center text-sm text-gray-600 hover:text-ocean-blue transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-xs">040 1800 8888</span>
            </a>
            <Link to="/kontakt">
              <Button className="bg-ocean-blue hover:bg-ocean-blue-dark text-white">
                Rückruf anfordern
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-ocean-blue transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-ocean-blue'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 space-y-3">
              <a 
                href="tel:04018008888" 
                className="flex items-center text-sm text-gray-600"
              >
                <Phone className="h-4 w-4 mr-2" />
                040 1800 8888
              </a>
              <Link to="/kontakt" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-ocean-blue hover:bg-ocean-blue-dark text-white">
                  Rückruf anfordern
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
