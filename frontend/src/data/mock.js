// Mock-Daten für Ocean Color Website

export const services = [
  {
    id: 1,
    title: "Wände & Decken",
    slug: "waende-decken",
    description: "Professionelle Gestaltung von Innenwänden und Decken mit hochwertigen Farben und präziser Ausführung.",
    icon: "PaintBucket"
  },
  {
    id: 2,
    title: "Lackierarbeiten",
    slug: "lackierarbeiten",
    description: "Fachgerechte Lackierung von Türen, Fenstern, Heizkörpern und anderen Oberflächen für langlebigen Schutz.",
    icon: "Brush"
  },
  {
    id: 3,
    title: "Tapezierarbeiten",
    slug: "tapezierarbeiten",
    description: "Von klassischen bis modernen Tapeten – wir verlegen alle Arten fachgerecht und präzise.",
    icon: "Wallpaper"
  },
  {
    id: 4,
    title: "Spachtelarbeiten",
    slug: "spachtelarbeiten",
    description: "Professionelle Vorbehandlung für perfekt glatte Oberflächen als Basis für jede Wandgestaltung.",
    icon: "Wrench"
  },
  {
    id: 5,
    title: "Trockenbau",
    slug: "trockenbau",
    description: "Professioneller Innenausbau mit Gipskarton für flexible Raumgestaltung und Schallschutz.",
    icon: "Square"
  },
  {
    id: 6,
    title: "Fassadensanierung",
    slug: "fassadensanierung",
    description: "Professionelle Außenanstriche und Fassadenrenovierung für langlebigen Schutz und moderne Optik.",
    icon: "Building"
  },
  {
    id: 7,
    title: "Dekorative Wandgestaltung",
    slug: "dekorative-wandgestaltung",
    description: "Kreative Techniken wie Wischtechnik, Spachteltechnik und individuelle Gestaltungen.",
    icon: "Palette"
  },
  {
    id: 11,
    title: "Badsanierung",
    slug: "badsanierung",
    description: "Komplette Badmodernisierung vom Rückbau bis zur hochwertigen Neugestaltung – funktional, modern und aus einer Hand.",
    icon: "Droplets",
    customLink: "/badsanierung"
  },
  {
    id: 8,
    title: "Bodenbeläge",
    slug: "bodenbelaege",
    description: "Verlegung von PVC, Laminat und anderen Bodenbelägen mit präziser Ausführung.",
    icon: "Layers"
  },
  {
    id: 9,
    title: "Schimmelsanierung",
    slug: "schimmelsanierung",
    description: "Fachgerechte Entfernung und Sanierung von Schimmelbefall für ein gesundes Raumklima.",
    icon: "Shield"
  },
  {
    id: 10,
    title: "Epoxidharzbodenbeschichtungen",
    slug: "epoxidharzboden",
    description: "Fugenlose, strapazierfähige und moderne Bodenbeschichtung für Gewerbe- und Privatbereiche.",
    icon: "Droplets"
  }
];

export const references = [
  {
    id: 1,
    company: "Scheidt & Bachmann System Technik GmbH",
    title: "Umfassende Sanierung & Ausbau",
    description: "Im Rahmen einer umfassenden Sanierung wurden neue Trockenbau- und Brandschutzwände erstellt sowie Akustikdecken und OWA-Decken montiert. Zusätzlich erfolgte die Herstellung und Anpassung von Fensterbänken, der Einbau von Revisionsklappen sowie die Verlegung von Teppichböden. Abschließend wurden sämtliche Malerarbeiten ausgeführt.",
    services: ["Trockenbau", "Brandschutz", "Akustikdecken", "Malerarbeiten", "Bodenbeläge"],
    duration: "ca. 6 Monate",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/dvv84v33_scheidt.jpg.JPG",
    category: "Gewerbe",
    featured: true
  },
  {
    id: 2,
    company: "Hamburger Kinder- und Jugendhilfe e.V.",
    title: "Renovierungsarbeiten",
    description: "Für die Einrichtung werden regelmäßig Renovierungs- und Modernisierungsarbeiten durchgeführt – von Malerarbeiten bis hin zu Bodenbelägen und Kücheneinbauten.",
    services: ["Malerarbeiten", "Bodenbeläge", "Küchenmontage"],
    duration: "Laufende Zusammenarbeit",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/dsml5e51_kjh.jpg.png",
    category: "Soziale Einrichtung",
    featured: true
  },
  {
    id: 3,
    company: "Witt & Hirschfeld",
    title: "Wohnungsrenovierungen & Schimmelsanierung",
    description: "Renovierung von Mietwohnungen sowie fachgerechte Schimmelsanierungen im Bestand.",
    services: ["Wohnungsrenovierung", "Schimmelsanierung"],
    duration: "Laufende Zusammenarbeit",
    image: "https://images.unsplash.com/photo-1735053142513-264440093036?w=800",
    category: "Immobilienverwaltung",
    featured: true
  },
  {
    id: 4,
    company: "TalkTools GmbH",
    title: "Trockenbau-Trennwände & Malerarbeiten",
    description: "Errichtung neuer Raumstrukturen durch Trockenbau sowie anschließende Oberflächenarbeiten.",
    services: ["Trockenbau", "Malerarbeiten"],
    duration: "ca. 3 Wochen",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/jdcc2d9u_talktools.jpg.png",
    category: "Gewerbe",
    featured: false
  },
  {
    id: 5,
    company: "Goldbeck",
    title: "Malerarbeiten & Trockenbau",
    description: "Ausführung von Ausbau- und Oberflächenarbeiten im gewerblichen Umfeld.",
    services: ["Malerarbeiten", "Trockenbau"],
    duration: "ca. 3–4 Monate",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/8df47gl4_goldbeck.jpg.png",
    category: "Gewerbe",
    featured: true
  },
  {
    id: 6,
    company: "Talyo Property Services GmbH",
    title: "Malerarbeiten für Verwaltungsobjekte",
    description: "Durchführung von Renovierungsmaßnahmen in betreuten Immobilien.",
    services: ["Malerarbeiten", "Renovierung"],
    duration: "ca. 4 Wochen",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/zh14r3cl_talyo.jpg.png",
    category: "Immobilienverwaltung",
    featured: false
  },
  {
    id: 7,
    company: "NORDPUNKT Immobilien Management",
    title: "Malerarbeiten in Bestandsimmobilien",
    description: "Renovierung von Mietflächen im Rahmen der Objektverwaltung.",
    services: ["Malerarbeiten"],
    duration: "ca. 2 Wochen",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/qgk9o09f_nordpunkt.jpg.png",
    category: "Immobilienverwaltung",
    featured: false
  },
  {
    id: 8,
    company: "Feuervogel Wandsbek",
    title: "Innenrenovierung",
    description: "Innenrenovierung von gewerblich genutzten Flächen.",
    services: ["Malerarbeiten"],
    duration: "ca. 6 Wochen",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/js0ozn7j_feuervogel.jpg.png",
    category: "Gewerbe",
    featured: false
  },
  {
    id: 9,
    company: "Ströh E-Commerce GmbH",
    title: "Montage von Regalsystemen",
    description: "Fachgerechte Installation von Lager- und Regalsystemen.",
    services: ["Regalmontage"],
    duration: "ca. 2 Wochen",
    image: "https://images.unsplash.com/photo-1770910195585-825a1181a704?w=800",
    category: "Logistik",
    featured: false
  },
  {
    id: 10,
    company: "STAR Tankstelle",
    title: "Malerarbeiten",
    description: "Renovierungsarbeiten im laufenden Betrieb.",
    services: ["Malerarbeiten"],
    duration: "ca. 1 Woche",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/g83aqdmd_star.jpg.jpg",
    category: "Gewerbe",
    featured: false
  },
  {
    id: 11,
    company: "Ahoi Hotel",
    title: "Innenrenovierung Hotel",
    description: "Innenrenovierung im Hotelbereich.",
    services: ["Malerarbeiten"],
    duration: "ca. 8 Wochen",
    image: "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/x44gbhtv_moin-moin.png",
    category: "Hotellerie",
    featured: true
  }
];

// Google-Bewertungen - Echte Kundenbewertungen
export const googleReviews = {
  averageRating: 5.0,
  totalReviews: 23,
  reviews: [
    {
      id: 1,
      author: "Chris",
      text: "Sehr freundlicher Kontakt und das seriöse Auftreten des Geschäftsführers hat sich in der geleisteten Arbeit zu 100% widergespiegelt. Der Außenanstrich meines Hauses ist Top-Qualität! Klare Empfehlung!",
      rating: 5,
      date: "Vor einem Jahr"
    },
    {
      id: 2,
      author: "Susmit J. Banerjee",
      text: "Den Malermeister kenne ich persönlich und weiß, dass er seine Aufträge sachkundig, präzise und zuverlässig umsetzt.",
      rating: 5,
      date: "Vor einem Jahr"
    },
    {
      id: 3,
      author: "Ferhat Yeltan",
      text: "Sehr guter Maler – unsere Wohnung sieht jetzt top aus. Ich bin positiv überrascht.",
      rating: 5,
      date: "Vor einem Jahr"
    },
    {
      id: 4,
      author: "Pit Vogelhubert",
      text: "Sehr sorgfältige Arbeit, schnell und sauber ausgeführt. Ich bin begeistert.",
      rating: 5,
      date: "Vor einem Jahr"
    }
  ]
};

// Alte Platzhalter-Bewertungen entfernt - werden durch echte Google-Bewertungen ersetzt

export const aboutPoints = [
  {
    icon: "CheckCircle",
    title: "Sauberkeit",
    description: "Wir legen größten Wert auf sauberes Arbeiten und hinterlassen Ihre Räume ordentlich."
  },
  {
    icon: "Clock",
    title: "Zuverlässigkeit",
    description: "Termingerechte Ausführung und verlässliche Kommunikation während des gesamten Projekts."
  },
  {
    icon: "ClipboardList",
    title: "Strukturierte Planung",
    description: "Jedes Projekt wird sorgfältig geplant und mit festen Qualitätsstandards umgesetzt."
  }
];

// Funktion für Mock-Rückruf-Anfrage
export const submitCallbackRequest = async (data) => {
  // Simuliere API-Call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Rückruf-Anfrage empfangen:", data);
      // In Produktiv: Daten an Backend senden
      resolve({ 
        success: true, 
        message: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen." 
      });
    }, 1000);
  });
};

// Funktion für Mock-Kontaktformular
export const submitContactForm = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Kontaktformular empfangen:", data);
      resolve({ 
        success: true, 
        message: "Ihre Nachricht wurde erfolgreich versendet!" 
      });
    }, 1000);
  });
};

// Funktion für Mock-Angebotsrechner (Legacy - wird von RechnerNeu.jsx nicht mehr verwendet)
export const calculateQuote = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Angebotsrechner Daten:", data);
      // Einfache Mock-Berechnung
      const basePrice = 1000;
      const areaPrice = data.area * 15;
      const total = basePrice + areaPrice;
      
      resolve({ 
        success: true, 
        estimatedPrice: total,
        message: "Dies ist eine unverbindliche Schätzung. Kontaktieren Sie uns für ein genaues Angebot." 
      });
    }, 1500);
  });
};

// Funktion für neuen interaktiven Angebotsrechner mit Lead-Daten
export const submitQuoteWithLead = async (quoteData, leadData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Komplett Angebots-Anfrage:", {
        quote: quoteData,
        lead: leadData,
        timestamp: new Date().toISOString()
      });
      
      // In Produktiv: 
      // 1. Daten in MongoDB speichern
      // 2. E-Mail an Firmenemail senden
      // 3. Bestätigungs-E-Mail an Kunden senden
      
      resolve({ 
        success: true, 
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen." 
      });
    }, 1500);
  });
};
