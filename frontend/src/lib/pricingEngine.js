/**
 * Pricing Engine for Ocean Color Calculator
 * Pure functions for price calculation - no UI dependencies
 * All prices are NET (excluding VAT)
 */

// Price constants
export const PRICES = {
  // Wände & Decken
  WAND_BASE: 8.10,           // €/m²
  WAND_FARBIG: 2.50,         // Zuschlag €/m²
  WAND_PREMIUM: 4.00,        // Zuschlag €/m²
  DECKEN_BASE: 8.50,         // €/m²
  DECKEN_RATIO: 0.3,         // 30% der Wandfläche

  // Spachtelarbeiten
  SPACHTEL_Q2: 6,            // €/m²
  SPACHTEL_Q3: 10,           // €/m²
  SPACHTEL_Q4: 15,           // €/m²

  // Tapezieren
  TAPETE_RAUFASER: 14,       // €/m²
  TAPETE_GLATTVLIES: 18,     // €/m²
  TAPETE_MUSTER: 22,         // €/m²

  // Lackierung (pro Stück)
  LACK_TUER: 120,            // € pro Tür inkl. Zarge
  LACK_HEIZKOERPER: 150,     // € pro Heizkörper
  LACK_FENSTERRAHMEN: 150,   // € pro Fensterrahmen
  LACK_SONSTIGES: 0,         // Auf Anfrage

  // Schimmel
  SCHIMMEL_GRUNDPREIS: 150,  // € Mindestpreis
  SCHIMMEL_QM: 35,           // €/m²
  SCHIMMEL_DEFAULT_RATIO: 0.2, // 20% der Wandfläche als Schätzung

  // Boden
  VINYL_BASE: 25,            // €/m² exkl. Material
  VINYL_ALTBELAG: 6,         // €/m² Zuschlag
  VINYL_AUSGLEICHEN: 8,      // €/m² Zuschlag
  EPOXID_BASE: 150,          // €/m²

  // Zusatzoptionen
  ABKLEBEN: 120,             // € Pauschale
  MOEBEL: 120,               // € Pauschale

  // Faktoren
  ALTBAU_ZUSCHLAG: 1.20,     // +20%
  MIN_PRICE: 150,            // Mindestpreis
  
  // Spanne
  PRICE_RANGE_MIN: 0.90,     // -10%
  PRICE_RANGE_MAX: 1.15,     // +15%

  // Raum zu Wandfläche
  WANDFLAECHE_PRO_RAUM: 25   // ~25m² Wandfläche pro Raum
};

/**
 * Calculate wall area from room count or direct input
 */
export function calculateWandflaeche(formData) {
  if (formData.groesseOption === 'raeume' && formData.anzahlRaeume) {
    return parseInt(formData.anzahlRaeume) * PRICES.WANDFLAECHE_PRO_RAUM;
  }
  if (formData.wandflaeche) {
    return parseFloat(formData.wandflaeche);
  }
  return 0;
}

/**
 * Get spachtel price based on quality level
 */
export function getSpachtelPreis(stufe) {
  switch (stufe) {
    case 'q2': return PRICES.SPACHTEL_Q2;
    case 'q3': return PRICES.SPACHTEL_Q3;
    case 'q4': return PRICES.SPACHTEL_Q4;
    default: return 0;
  }
}

/**
 * Get tapeten price based on type
 */
export function getTapetenPreis(art) {
  switch (art) {
    case 'raufaser': return PRICES.TAPETE_RAUFASER;
    case 'glattvlies': return PRICES.TAPETE_GLATTVLIES;
    case 'mustertapete': return PRICES.TAPETE_MUSTER;
    default: return PRICES.TAPETE_RAUFASER;
  }
}

/**
 * Get lackierung price based on component type
 */
export function getLackierPreis(bauteil) {
  switch (bauteil) {
    case 'tueren': return PRICES.LACK_TUER;
    case 'heizkoerper': return PRICES.LACK_HEIZKOERPER;
    case 'fensterrahmen': return PRICES.LACK_FENSTERRAHMEN;
    case 'sonstiges': return PRICES.LACK_SONSTIGES;
    default: return PRICES.LACK_TUER;
  }
}

/**
 * Determine which services are selected
 */
export function analyzeLeistungen(leistungen) {
  const specialLeistungen = ['boden', 'epoxid', 'schimmel', 'lackierung'];
  const standardWandLeistungen = ['waende-decken', 'tapezieren', 'spachteln'];
  const bodenLeistungen = ['boden', 'epoxid'];

  return {
    hasWaendeDecken: leistungen.includes('waende-decken'),
    hasSpachteln: leistungen.includes('spachteln'),
    hasTapezieren: leistungen.includes('tapezieren'),
    hasLackierung: leistungen.includes('lackierung'),
    hasSchimmel: leistungen.includes('schimmel'),
    hasVinylboden: leistungen.includes('boden'),
    hasEpoxid: leistungen.includes('epoxid'),
    hasBodenarbeiten: leistungen.some(l => bodenLeistungen.includes(l)),
    hasStandardWandarbeiten: leistungen.some(l => standardWandLeistungen.includes(l)),
    hasOnlySpecialLeistungen: leistungen.length > 0 && 
      leistungen.every(l => specialLeistungen.includes(l)),
    needsColorQuestion: leistungen.includes('waende-decken') || leistungen.includes('tapezieren'),
    needsRaumhoeheQuestion: leistungen.some(l => standardWandLeistungen.includes(l)),
    needsSpachtelQuestion: leistungen.some(l => standardWandLeistungen.includes(l)),
    needsGroessenFrage: leistungen.some(l => standardWandLeistungen.includes(l))
  };
}

/**
 * Calculate price breakdown for each service
 */
export function calculateBreakdown(formData) {
  const analysis = analyzeLeistungen(formData.leistungen);
  const wandFlaeche = calculateWandflaeche(formData);
  const isAltbau = formData.zustand === 'altbau';
  
  const breakdown = {
    waendeDecken: 0,
    spachteln: 0,
    tapezieren: 0,
    lackierung: 0,
    schimmel: 0,
    vinylboden: 0,
    epoxid: 0,
    zusatzoptionen: 0,
    altbauZuschlag: 0
  };

  // 1. Wände & Decken
  if (analysis.hasWaendeDecken && wandFlaeche > 0) {
    let wandPreis = PRICES.WAND_BASE;
    if (formData.farbe === 'farbig') wandPreis += PRICES.WAND_FARBIG;
    if (formData.farbe === 'premium') wandPreis += PRICES.WAND_PREMIUM;
    
    const deckenFlaeche = wandFlaeche * PRICES.DECKEN_RATIO;
    breakdown.waendeDecken = (wandFlaeche * wandPreis) + (deckenFlaeche * PRICES.DECKEN_BASE);
  }

  // 2. Spachtelarbeiten
  if (analysis.hasSpachteln && wandFlaeche > 0) {
    const spachtelPreis = getSpachtelPreis(formData.spachtelstufe || 'q2');
    breakdown.spachteln = wandFlaeche * spachtelPreis;
  } else if (analysis.hasStandardWandarbeiten && !analysis.hasSpachteln && formData.spachtelstufe) {
    // Spachtel als Zusatzoption
    const spachtelPreis = getSpachtelPreis(formData.spachtelstufe);
    if (spachtelPreis > 0 && wandFlaeche > 0) {
      breakdown.spachteln = wandFlaeche * spachtelPreis;
    }
  }

  // 3. Tapezieren
  if (analysis.hasTapezieren && wandFlaeche > 0) {
    const tapetenPreis = getTapetenPreis(formData.tapetenArt);
    breakdown.tapezieren = wandFlaeche * tapetenPreis;
  }

  // 4. Lackierung
  if (analysis.hasLackierung) {
    const anzahl = formData.anzahlLackierElemente ? parseInt(formData.anzahlLackierElemente) : 0;
    const einzelPreis = getLackierPreis(formData.lackierBauteile);
    if (anzahl > 0 && einzelPreis > 0) {
      breakdown.lackierung = anzahl * einzelPreis;
    }
  }

  // 5. Schimmel
  if (analysis.hasSchimmel) {
    const schimmelFlaeche = formData.schimmelFlaeche 
      ? parseFloat(formData.schimmelFlaeche)
      : (wandFlaeche > 0 ? wandFlaeche * PRICES.SCHIMMEL_DEFAULT_RATIO : 5);
    breakdown.schimmel = PRICES.SCHIMMEL_GRUNDPREIS + (schimmelFlaeche * PRICES.SCHIMMEL_QM);
  }

  // 6. Vinylboden
  if (analysis.hasVinylboden) {
    const bodenFlaeche = formData.bodenFlaeche ? parseFloat(formData.bodenFlaeche) : 0;
    if (bodenFlaeche > 0) {
      let vinylPreis = PRICES.VINYL_BASE;
      if (formData.zusatzoptionen?.includes('altbelag-entfernen')) vinylPreis += PRICES.VINYL_ALTBELAG;
      if (formData.zusatzoptionen?.includes('ausgleichen')) vinylPreis += PRICES.VINYL_AUSGLEICHEN;
      breakdown.vinylboden = bodenFlaeche * vinylPreis;
    }
  }

  // 7. Epoxid
  if (analysis.hasEpoxid) {
    const epoxidFlaeche = formData.epoxidFlaeche ? parseFloat(formData.epoxidFlaeche) : 0;
    if (epoxidFlaeche > 0) {
      breakdown.epoxid = epoxidFlaeche * PRICES.EPOXID_BASE;
    }
  }

  // 8. Zusatzoptionen (Pauschalen)
  if (formData.zusatzoptionen?.includes('abkleben')) {
    breakdown.zusatzoptionen += PRICES.ABKLEBEN;
  }
  if (formData.zusatzoptionen?.includes('moebel')) {
    breakdown.zusatzoptionen += PRICES.MOEBEL;
  }

  return breakdown;
}

/**
 * Main pricing function - computes estimate from form state
 * @param {Object} formData - Complete form state
 * @returns {Object|null} - { min, max, breakdown } or null if no services
 */
export function computeEstimate(formData) {
  if (!formData.leistungen || formData.leistungen.length === 0) {
    return null;
  }

  const breakdown = calculateBreakdown(formData);
  const isAltbau = formData.zustand === 'altbau';

  // Sum all components
  let subtotal = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  // Apply Altbau surcharge
  if (isAltbau) {
    const altbauZuschlag = subtotal * (PRICES.ALTBAU_ZUSCHLAG - 1);
    breakdown.altbauZuschlag = altbauZuschlag;
    subtotal *= PRICES.ALTBAU_ZUSCHLAG;
  }

  // Apply minimum price
  if (subtotal < PRICES.MIN_PRICE) {
    subtotal = PRICES.MIN_PRICE;
  }

  // Calculate range (round to nearest 10)
  const min = Math.round((subtotal * PRICES.PRICE_RANGE_MIN) / 10) * 10;
  const max = Math.round((subtotal * PRICES.PRICE_RANGE_MAX) / 10) * 10;

  return {
    min,
    max,
    breakdown,
    subtotal: Math.round(subtotal)
  };
}

/**
 * Validate PLZ (German postal code)
 * @param {string} plz - Postal code to validate
 * @returns {boolean} - True if valid 5-digit German PLZ
 */
export function isValidPLZ(plz) {
  return /^\d{5}$/.test(plz);
}

/**
 * Check if PLZ is in Hamburg area (optional - for info only)
 */
export function isHamburgArea(plz) {
  if (!isValidPLZ(plz)) return false;
  const prefix = parseInt(plz.substring(0, 2));
  // Hamburg area: 20xxx, 21xxx, 22xxx, 23xxx (parts)
  return prefix >= 20 && prefix <= 23;
}
