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
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* 1. Firmenangaben */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Angaben gemäß § 5 TMG
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Ocean Color GmbH<br />
                      Maler- und Lackiererbetrieb<br />
                      Schützenstraße 106<br />
                      22761 Hamburg
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Vertreten durch:</h3>
                    <p className="text-gray-700">
                      Geschäftsführer: Cenk Deniz
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Kontakt:</h3>
                    <p className="text-gray-700">
                      Telefon: 040 1800 8888<br />
                      E-Mail: info@ocean-maler.de
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Registereintrag:</h3>
                    <p className="text-gray-700">
                      Registergericht: Hamburg<br />
                      Handelsregister: HRB 183244
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Umsatzsteuer-ID:</h3>
                    <p className="text-gray-700">
                      USt-IdNr. gemäß § 27a UStG:<br />
                      DE363946837
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
                    </h3>
                    <p className="text-gray-700">
                      Cenk Deniz<br />
                      Schützenstraße 106<br />
                      22761 Hamburg
                    </p>
                  </div>
                </div>

                {/* Trennlinie */}
                <hr className="border-gray-200" />

                {/* 2. Verbraucherstreitbeilegung */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Verbraucherstreitbeilegung
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor 
                    einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>

                {/* Trennlinie */}
                <hr className="border-gray-200" />

                {/* 3. Haftung für Inhalte */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Haftung für Inhalte
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
                    Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind 
                    wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                    rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                {/* Trennlinie */}
                <hr className="border-gray-200" />

                {/* 4. Haftung für Links */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Haftung für Links
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte 
                    wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir keine 
                    Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                    Anbieter oder Betreiber verantwortlich.
                  </p>
                </div>

                {/* Trennlinie */}
                <hr className="border-gray-200" />

                {/* 5. Urheberrecht */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Urheberrecht
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors.
                  </p>
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
