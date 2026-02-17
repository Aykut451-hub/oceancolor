import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('oceanColorCookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('oceanColorCookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('oceanColorCookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Cookie-Hinweis
            </h3>
            <p className="text-sm text-gray-600">
              Wir verwenden nur technisch notwendige Cookies, um Ihnen die bestmögliche Nutzung 
              unserer Website zu ermöglichen. Diese Cookies sind für die Grundfunktionen der 
              Website erforderlich. Weitere Informationen finden Sie in unserer{' '}
              <a 
                href="/datenschutz" 
                className="text-ocean-blue hover:underline"
              >
                Datenschutzerklärung
              </a>.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={declineCookies}
              variant="outline"
              size="sm"
              className="border-gray-300"
            >
              Ablehnen
            </Button>
            <Button
              onClick={acceptCookies}
              size="sm"
              className="bg-ocean-blue hover:bg-ocean-blue-dark text-white"
            >
              Akzeptieren
            </Button>
          </div>

          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
