// Mock-Daten für Ocean Color Website

export const services = [
  {
    id: 1,
    title: "Wände & Decken",
    description: "Professionelle Gestaltung von Innenwänden und Decken mit hochwertigen Farben und präziser Ausführung.",
    icon: "PaintBucket"
  },
  {
    id: 2,
    title: "Lackierarbeiten",
    description: "Fachgerechte Lackierung von Türen, Fenstern, Heizkörpern und anderen Oberflächen für langlebigen Schutz.",
    icon: "Brush"
  },
  {
    id: 3,
    title: "Tapezierarbeiten",
    description: "Von klassischen bis modernen Tapeten – wir verlegen alle Arten fachgerecht und präzise.",
    icon: "Wallpaper"
  },
  {
    id: 4,
    title: "Spachtelarbeiten",
    description: "Professionelle Vorbehandlung für perfekt glatte Oberflächen als Basis für jede Wandgestaltung.",
    icon: "Wrench"
  },
  {
    id: 5,
    title: "Bodenbeläge",
    description: "Verlegung von PVC, Laminat und anderen Bodenbelägen mit präziser Ausführung.",
    icon: "Layers"
  },
  {
    id: 6,
    title: "Schimmelsanierung",
    description: "Fachgerechte Entfernung und Sanierung von Schimmelbefall für ein gesundes Raumklima.",
    icon: "Shield"
  }
];

export const references = [
  {
    id: 1,
    title: "Wohnungsmodernisierung Eppendorf",
    description: "Komplette Renovierung einer 120m² Altbauwohnung mit Wand- und Deckengestaltung",
    image: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe",
    category: "Wohnraum"
  },
  {
    id: 2,
    title: "Bürogestaltung Hamburg Mitte",
    description: "Moderne Farbgestaltung für 300m² Bürofläche mit Akzentwänden",
    image: "https://images.unsplash.com/photo-1616697412153-7ad8ac8aa5d9",
    category: "Gewerbe"
  },
  {
    id: 3,
    title: "Fassadensanierung Altona",
    description: "Komplette Außenfassade eines Mehrfamilienhauses",
    image: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c",
    category: "Fassade"
  },
  {
    id: 4,
    title: "Schimmelsanierung Winterhude",
    description: "Professionelle Schimmelentfernung und Prävention in Badezimmer und Küche",
    image: "https://images.unsplash.com/photo-1630325459372-36f3f86281cf",
    category: "Sanierung"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Helmut K.",
    text: "Professionell und effizient! Wir hatten ein Problem mit Schimmel in unserem Badezimmer, und Ocean Color hat es schnell und gründlich behoben. Ihre Schimmelsanierungsdienste sind wirklich erstklassig.",
    rating: 5
  },
  {
    id: 2,
    name: "Tanja S.",
    text: "Ich bin absolut begeistert von der Arbeit! Sie haben nicht nur unsere Wände fantastisch gestaltet, sondern auch eine erstaunliche Wanddekoration geschaffen, die unserem Raum eine ganz neue Dimension verleiht.",
    rating: 5
  },
  {
    id: 3,
    name: "Michaela K.",
    text: "Fantastische Arbeit! Der Malerbetrieb hat unsere Wohnräume in echte Kunstwerke verwandelt. Ihre Fähigkeit, Wände zu gestalten und zu tapezieren, ist wirklich beeindruckend.",
    rating: 5
  },
  {
    id: 4,
    name: "Milan M.",
    text: "Ein fantastisches Team! Der Malerbetrieb hat unsere Erwartungen übertroffen. Ihre Trockenbauarbeiten waren makellos, und ihre Fassadensanierung hat unserem Haus neuen Glanz verliehen.",
    rating: 5
  }
];

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
