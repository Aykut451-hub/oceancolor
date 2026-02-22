/**
 * Geo Service - PLZ to Coordinates and Distance Calculation
 * Uses OpenStreetMap Nominatim API (free, no API key required)
 */

// Hamburg reference coordinates (PLZ 20095)
export const HAMBURG_CENTER = {
  lat: 53.5511,
  lng: 9.9937,
  plz: '20095'
};

// Maximum distance for regular service area (in km)
export const MAX_SERVICE_DISTANCE = 200;

/**
 * Haversine formula - calculate distance between two coordinates
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Get coordinates for a German PLZ using OpenStreetMap Nominatim
 * @param {string} plz - German postal code (5 digits)
 * @returns {Promise<{lat: number, lng: number} | null>}
 */
export async function getCoordinatesForPLZ(plz) {
  if (!/^\d{5}$/.test(plz)) {
    return null;
  }

  try {
    // Use OpenStreetMap Nominatim API (free, no API key)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=Germany&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'OceanColor-Calculator/1.0'
        }
      }
    );

    if (!response.ok) {
      console.warn('Geocoding API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }

    return null;
  } catch (error) {
    console.warn('Geocoding failed:', error);
    return null;
  }
}

/**
 * Calculate distance from Hamburg to a given PLZ
 * @param {string} plz - German postal code
 * @returns {Promise<{distance: number, isOutsideServiceArea: boolean, coordinates: object} | null>}
 */
export async function checkDistanceFromHamburg(plz) {
  const coords = await getCoordinatesForPLZ(plz);
  
  if (!coords) {
    return null;
  }

  const distance = calculateDistance(
    HAMBURG_CENTER.lat,
    HAMBURG_CENTER.lng,
    coords.lat,
    coords.lng
  );

  return {
    distance: Math.round(distance),
    isOutsideServiceArea: distance > MAX_SERVICE_DISTANCE,
    coordinates: coords
  };
}

/**
 * Quick check if PLZ is in Hamburg area (no API call)
 * Hamburg PLZ ranges: 20xxx, 21xxx, 22xxx, 23xxx (partial)
 */
export function isHamburgAreaPLZ(plz) {
  if (!/^\d{5}$/.test(plz)) return false;
  const prefix = parseInt(plz.substring(0, 2));
  return prefix >= 20 && prefix <= 22;
}

/**
 * Fallback: Estimate distance based on PLZ prefix
 * Used when API is unavailable
 */
export function estimateDistanceByPLZ(plz) {
  if (!/^\d{5}$/.test(plz)) return null;

  const prefix = parseInt(plz.substring(0, 2));
  
  // Hamburg area
  if (prefix >= 20 && prefix <= 22) {
    return { distance: 0, isOutsideServiceArea: false, isEstimate: true };
  }
  
  // Northern Germany (roughly)
  const northernGermany = [23, 24, 25, 26, 27, 28, 29, 30, 31, 38, 39, 49];
  if (northernGermany.includes(prefix)) {
    return { distance: 100, isOutsideServiceArea: false, isEstimate: true };
  }
  
  // Rest of Germany - likely outside service area
  return { distance: 300, isOutsideServiceArea: true, isEstimate: true };
}
