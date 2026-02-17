import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const Impressum = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Impressum</h1>
            
            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <p className="text-gray-700">
                    Ocean Color GmbH<br />
                    Schützenstraße 106<br />
                    22761 Hamburg
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Vertreten durch
                  </h2>
                  <p className="text-gray-700">
                    Geschäftsführer: Cenk Deniz
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
                  <p className="text-gray-700">
                    Telefon: 040 1800 8888<br />
                    E-Mail: info@ocean-maler.de
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Registereintrag
                  </h2>
                  <p className="text-gray-700">
                    Registergericht: Hamburg<br />
                    Handelsregister: HRB 183244
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Umsatzsteuer-ID
                  </h2>
                  <p className="text-gray-700">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                    DE363946837
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <p className="text-gray-700">
                    Cenk Deniz<br />
                    Schützenstraße 106<br />
                    22761 Hamburg
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    EU-Streitschlichtung
                  </h2>
                  <p className="text-gray-700">
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                    <a 
                      href="https://ec.europa.eu/consumers/odr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ocean-blue hover:underline ml-1"
                    >
                      https://ec.europa.eu/consumers/odr/
                    </a>
                  </p>
                  <p className="text-gray-700 mt-2">
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Verbraucherstreitbeilegung / Universalschlichtungsstelle
                  </h2>
                  <p className="text-gray-700">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor 
                    einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Haftungsausschluss</h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
                      <p className="text-sm">
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
                        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir 
                        als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                        Tätigkeit hinweisen.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Haftung für Links</h3>
                      <p className="text-sm">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
                        keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                        Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                        Anbieter oder Betreiber der Seiten verantwortlich.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Urheberrecht</h3>
                      <p className="text-sm">
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
