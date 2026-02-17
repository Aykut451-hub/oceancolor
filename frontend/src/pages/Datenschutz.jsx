import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const Datenschutz = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
            
            <Card className="border-2">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    1. Datenschutz auf einen Blick
                  </h2>
                  <h3 className="font-semibold text-gray-900 mb-2">Allgemeine Hinweise</h3>
                  <p className="text-sm text-gray-700">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                    Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    2. Datenerfassung auf dieser Website
                  </h2>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                    Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">Wie erfassen wir Ihre Daten?</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
                    Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                  </p>
                  <p className="text-sm text-gray-700">
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der 
                    Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten 
                    (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    3. Allgemeine Hinweise und Pflichtinformationen
                  </h2>
                  <h3 className="font-semibold text-gray-900 mb-2">Datenschutz</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                    Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der 
                    gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Hinweis zur verantwortlichen Stelle
                  </h3>
                  <p className="text-sm text-gray-700">
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Ocean Color<br />
                    Telefon: 040 1800 8888<br />
                    E-Mail: info@oceancolor.de
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    4. Datenerfassung auf dieser Website
                  </h2>
                  <h3 className="font-semibold text-gray-900 mb-2">Kontaktformular</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                    aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                    zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                  </p>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">Anfrage per E-Mail oder Telefon</h3>
                  <p className="text-sm text-gray-700">
                    Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive 
                    aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke 
                    der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    5. Ihre Rechte
                  </h2>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>Sie haben jederzeit das Recht:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                      <li>Berichtigung unrichtiger personenbezogener Daten zu verlangen</li>
                      <li>Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                      <li>Einschränkung der Datenverarbeitung zu verlangen</li>
                      <li>Widerspruch gegen die Verarbeitung einzulegen</li>
                      <li>Datenübertragbarkeit zu verlangen</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    6. Cookies
                  </h2>
                  <p className="text-sm text-gray-700">
                    Diese Website verwendet nur technisch notwendige Cookies, die für den Betrieb 
                    der Website erforderlich sind. Diese Cookies werden nach Beendigung Ihrer 
                    Browser-Sitzung automatisch gelöscht.
                  </p>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-xs text-gray-500">
                    Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
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

export default Datenschutz;
