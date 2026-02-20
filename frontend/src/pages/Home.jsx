import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, CheckCircle, Star, ExternalLink } from 'lucide-react';
import { services, googleReviews } from '../data/mock';
import { stadtteile } from '../data/stadtteile';
import { WHATSAPP_URL } from '../components/FloatingWhatsApp';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 -z-10"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-ocean-blue/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-ocean-blue/10 text-ocean-blue px-4 py-2 rounded-full text-sm font-medium">
                  Ihr Malermeisterbetrieb in Hamburg
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Qualität, die man <span className="text-ocean-blue">sieht</span> und <span className="text-ocean-blue">spürt</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Wir arbeiten mit festen Qualitätsstandards und planen jedes Projekt sorgfältig – 
                so erhalten Sie ein sauberes und langlebiges Ergebnis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/rechner">
                  <Button size="lg" className="bg-ocean-blue hover:bg-ocean-blue-dark text-white w-full sm:w-auto">
                    Angebot in 2 Minuten
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button size="lg" variant="outline" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5 w-full sm:w-auto">
                    Rückruf anfordern
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center pt-4">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-100">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="ml-3 text-sm font-medium text-gray-700">200+ zufriedene Kunden</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/ud2ks07n_IMG_4934.JPG"
                  alt="Ocean Color Malermeister bei der Arbeit"
                  className="w-full h-[500px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">17 Jahre</p>
                    <p className="text-sm text-gray-600">Erfahrung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Von der Wandgestaltung bis zur Schimmelsanierung – wir bieten Ihnen 
              professionelle Malerarbeiten aus einer Hand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.id} to={`/leistungen/${service.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-ocean-blue cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className="bg-ocean-blue/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-ocean-blue group-hover:scale-110 transition-all duration-300">
                      <div className="w-6 h-6 bg-ocean-blue rounded group-hover:bg-white"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-ocean-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-ocean-blue font-medium text-sm group-hover:translate-x-2 transition-transform">
                      Mehr erfahren
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/leistungen">
              <Button variant="outline" size="lg" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue/5">
                Alle Leistungen ansehen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Warum Ocean Color?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Sauberkeit",
                    description: "Wir legen größten Wert auf sauberes Arbeiten und hinterlassen Ihre Räume ordentlich."
                  },
                  {
                    title: "Zuverlässigkeit",
                    description: "Termingerechte Ausführung und verlässliche Kommunikation während des gesamten Projekts."
                  },
                  {
                    title: "Strukturierte Planung",
                    description: "Jedes Projekt wird sorgfältig geplant und mit festen Qualitätsstandards umgesetzt."
                  }
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-ocean-blue rounded-full p-2 flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/v0zxjrin_Ocean%20Color%20Firmenfahrzeug.png"
                alt="Ocean Color Firmenfahrzeug in Hamburg"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Bewertungen */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kundenbewertungen
            </h2>
            <p className="text-lg text-gray-600">
              Echte Bewertungen unserer Kunden auf Google
            </p>
          </div>

          {/* Google Review Summary */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  {/* Google Logo */}
                  <div className="mb-6">
                    <svg viewBox="0 0 272 92" width="120" height="40" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
                    </svg>
                  </div>

                  {/* Rating Display */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-8 w-8 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-4xl font-bold text-gray-900">5,0</p>
                    <p className="text-gray-600 mt-1">Durchschnittliche Bewertung</p>
                  </div>

                  {/* Placeholder for reviews count */}
                  {googleReviews.reviews.length > 0 ? (
                    <p className="text-gray-600 mb-6">
                      Basierend auf {googleReviews.totalReviews} Bewertungen
                    </p>
                  ) : (
                    <p className="text-gray-500 mb-6 italic">
                      Bewertungen werden in Kürze hinzugefügt
                    </p>
                  )}

                  {/* Link to Google */}
                  <a 
                    href="https://maps.app.goo.gl/tMLzNyo8MMk57YLk7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-ocean-blue hover:text-ocean-blue-dark font-medium transition-colors"
                  >
                    Alle Bewertungen auf Google ansehen
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Individual Reviews - will be populated with real reviews */}
          {googleReviews.reviews.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {googleReviews.reviews.map((review) => (
                <Card key={review.id} className="border-2 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{review.text}"</p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Stadtteile */}
      <section id="stadtteile" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Maler in Hamburg & Umgebung
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professionelle Malerarbeiten in Ihrem Stadtteil – wir sind in ganz Hamburg und Umgebung für Sie da.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 max-w-6xl mx-auto">
            {stadtteile.map((s) => (
              <Link
                key={s.slug}
                to={`/maler-hamburg-${s.slug}`}
                className="group bg-white border-2 border-gray-100 hover:border-ocean-blue rounded-xl px-4 py-3 text-center transition-all duration-200 hover:shadow-md"
                data-testid={`stadtteil-link-${s.slug}`}
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-ocean-blue transition-colors">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tätigkeitsgebiet GEO-Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tätigkeitsgebiet</h2>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ocean Color ist als Malermeisterbetrieb in ganz Hamburg tätig, insbesondere in: 
                Altona, Wandsbek, Eppendorf, Lokstedt, Stellingen, Bahrenfeld, Osdorf, Lurup, 
                Bergedorf sowie im Umland wie Wedel und Rellingen.
              </p>
              <p>
                Neben klassischen Malerarbeiten bieten wir auch Trockenbau, Schimmelsanierung, 
                Fassadenarbeiten und Bodenverlegung an. Unser Team arbeitet für Privatkunden, 
                Vermieter, Hausverwaltungen und bei umfangreichen Sanierungsprojekten.
              </p>
              <p>
                Mit über 17 Jahren Erfahrung und einem klaren Fokus auf Qualität, Sauberkeit 
                und Zuverlässigkeit ist Ocean Color Ihr Ansprechpartner für alle Renovierungs- 
                und Innenausbauarbeiten in der Metropolregion Hamburg.
              </p>
              <div className="pt-2">
                <Link to="/maler-hamburg" className="text-ocean-blue hover:text-ocean-blue-dark font-medium transition-colors text-sm">
                  Mehr zu unseren Einsatzgebieten
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Bereit für Ihr nächstes Projekt?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white">
              Fordern Sie jetzt einen kostenlosen Rückruf an und lassen Sie sich unverbindlich beraten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rechner">
                <Button 
                  size="lg" 
                  className="bg-amber-400 text-gray-900 font-semibold px-8 py-6 text-lg
                             hover:bg-amber-300 
                             shadow-lg hover:shadow-xl 
                             transform hover:scale-105 
                             transition-all duration-300 
                             border-2 border-amber-400 hover:border-amber-300
                             w-full sm:w-auto"
                >
                  Angebot berechnen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/kontakt">
                <Button 
                  size="lg" 
                  className="bg-transparent text-white font-semibold px-8 py-6 text-lg
                             hover:bg-white hover:text-ocean-blue-dark
                             border-2 border-white
                             transition-all duration-300
                             w-full sm:w-auto"
                >
                  Rückruf anfordern
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  data-testid="home-whatsapp-button"
                  className="bg-[#25D366] text-white font-semibold px-8 py-6 text-lg
                             hover:bg-[#1fb855]
                             border-2 border-[#25D366] hover:border-[#1fb855]
                             shadow-lg hover:shadow-xl
                             transform hover:scale-105
                             transition-all duration-300
                             w-full sm:w-auto"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Anfrage
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
