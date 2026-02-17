import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-ocean-blue mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Seite nicht gefunden
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Die gewünschte Seite existiert leider nicht oder wurde verschoben. 
          Kehren Sie zur Startseite zurück oder nutzen Sie unseren Angebotsrechner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-ocean-blue hover:bg-ocean-blue-dark text-white">
              <Home className="h-4 w-4 mr-2" />
              Zur Startseite
            </Button>
          </Link>
          <Link to="/rechner">
            <Button variant="outline">
              Zum Angebotsrechner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
