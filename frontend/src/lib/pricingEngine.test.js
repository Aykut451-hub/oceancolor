/**
 * Pricing Engine Test Cases
 * Run: node src/lib/pricingEngine.test.js
 * 
 * These test cases ensure the refactored pricing logic matches the original behavior.
 */

import { computeEstimate, isValidPLZ, analyzeLeistungen, PRICES } from './pricingEngine.js';

// Test helper
function assertEqual(actual, expected, testName) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  if (pass) {
    console.log(`✓ ${testName}`);
    return true;
  } else {
    console.error(`✗ ${testName}`);
    console.error(`  Expected: ${JSON.stringify(expected)}`);
    console.error(`  Actual:   ${JSON.stringify(actual)}`);
    return false;
  }
}

function assertRange(actual, expectedMin, expectedMax, testName) {
  if (!actual) {
    console.error(`✗ ${testName} - Result is null`);
    return false;
  }
  if (actual.min === expectedMin && actual.max === expectedMax) {
    console.log(`✓ ${testName}: ${actual.min}€ - ${actual.max}€`);
    return true;
  } else {
    console.error(`✗ ${testName}`);
    console.error(`  Expected: ${expectedMin}€ - ${expectedMax}€`);
    console.error(`  Actual:   ${actual.min}€ - ${actual.max}€`);
    return false;
  }
}

// ============================================
// TEST CASES
// ============================================

console.log('\n=== PLZ Validation Tests ===\n');

assertEqual(isValidPLZ('20095'), true, 'Valid PLZ: 20095');
assertEqual(isValidPLZ('22761'), true, 'Valid PLZ: 22761');
assertEqual(isValidPLZ('1234'), false, 'Invalid PLZ: 1234 (4 digits)');
assertEqual(isValidPLZ('123456'), false, 'Invalid PLZ: 123456 (6 digits)');
assertEqual(isValidPLZ('abcde'), false, 'Invalid PLZ: abcde (letters)');
assertEqual(isValidPLZ(''), false, 'Invalid PLZ: empty');

console.log('\n=== Price Calculation Tests ===\n');

// Test 1: Wände & Decken streichen - 3 Räume, Standard weiß
const test1 = computeEstimate({
  leistungen: ['waende-decken'],
  groesseOption: 'raeume',
  anzahlRaeume: '3',
  farbe: 'weiss',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 3 Räume × 25m² = 75m² Wandfläche
// Wand: 75 × 8.10 = 607.50
// Decke: 75 × 0.3 × 8.50 = 191.25
// Total: 798.75
// Min: 798.75 × 0.90 = 718.88 → 720
// Max: 798.75 × 1.15 = 918.56 → 920
assertRange(test1, 720, 920, 'Test 1: Wände & Decken - 3 Räume, weiß');

// Test 2: Wände & Decken mit Farbzuschlag
const test2 = computeEstimate({
  leistungen: ['waende-decken'],
  groesseOption: 'raeume',
  anzahlRaeume: '3',
  farbe: 'farbig',
  zustand: 'neubau',
  zusatzoptionen: []
});
// Wand: 75 × (8.10 + 2.50) = 795
// Decke: 22.5 × 8.50 = 191.25
// Total: 986.25
assertRange(test2, 890, 1130, 'Test 2: Wände & Decken - 3 Räume, farbig');

// Test 3: Lackierung - 5 Türen
const test3 = computeEstimate({
  leistungen: ['lackierung'],
  lackierBauteile: 'tueren',
  anzahlLackierElemente: '5',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 5 × 120 = 600
// Min: 600 × 0.90 = 540
// Max: 600 × 1.15 = 690
assertRange(test3, 540, 690, 'Test 3: Lackierung - 5 Türen à 120€');

// Test 4: Lackierung - 3 Heizkörper
const test4 = computeEstimate({
  leistungen: ['lackierung'],
  lackierBauteile: 'heizkoerper',
  anzahlLackierElemente: '3',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 3 × 150 = 450
assertRange(test4, 410, 520, 'Test 4: Lackierung - 3 Heizkörper à 150€');

// Test 5: Vinylboden - 40m²
const test5 = computeEstimate({
  leistungen: ['boden'],
  bodenFlaeche: '40',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 40 × 25 = 1000
assertRange(test5, 900, 1150, 'Test 5: Vinylboden - 40m² à 25€');

// Test 6: Vinylboden mit Zusatzoptionen
const test6 = computeEstimate({
  leistungen: ['boden'],
  bodenFlaeche: '40',
  zustand: 'neubau',
  zusatzoptionen: ['altbelag-entfernen', 'ausgleichen']
});
// 40 × (25 + 6 + 8) = 40 × 39 = 1560
assertRange(test6, 1400, 1790, 'Test 6: Vinylboden - 40m² mit Zusätzen');

// Test 7: Epoxid - 50m²
const test7 = computeEstimate({
  leistungen: ['epoxid'],
  epoxidFlaeche: '50',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 50 × 150 = 7500
assertRange(test7, 6750, 8630, 'Test 7: Epoxid - 50m² à 150€');

// Test 8: Schimmel - 5m²
const test8 = computeEstimate({
  leistungen: ['schimmel'],
  schimmelFlaeche: '5',
  zustand: 'neubau',
  zusatzoptionen: []
});
// 150 + (5 × 35) = 150 + 175 = 325
assertRange(test8, 290, 370, 'Test 8: Schimmel - 5m²');

// Test 9: Altbau-Zuschlag
const test9 = computeEstimate({
  leistungen: ['waende-decken'],
  groesseOption: 'raeume',
  anzahlRaeume: '3',
  farbe: 'weiss',
  zustand: 'altbau', // +20%
  zusatzoptionen: []
});
// Base: 798.75 × 1.20 = 958.50
assertRange(test9, 860, 1100, 'Test 9: Wände & Decken - Altbau (+20%)');

// Test 10: Kombination - Wände + Spachteln + Lackierung
const test10 = computeEstimate({
  leistungen: ['waende-decken', 'spachteln', 'lackierung'],
  groesseOption: 'raeume',
  anzahlRaeume: '2',
  farbe: 'weiss',
  spachtelstufe: 'q3',
  lackierBauteile: 'tueren',
  anzahlLackierElemente: '3',
  zustand: 'neubau',
  zusatzoptionen: ['abkleben']
});
// Wandfläche: 2 × 25 = 50m²
// Wand: 50 × 8.10 = 405
// Decke: 15 × 8.50 = 127.50
// Spachtel Q3: 50 × 10 = 500
// Lackierung: 3 × 120 = 360
// Abkleben: 120
// Total: 1512.50
assertRange(test10, 1360, 1740, 'Test 10: Kombination Wände + Spachteln + Lackierung');

console.log('\n=== Service Analysis Tests ===\n');

const analysis1 = analyzeLeistungen(['waende-decken', 'lackierung']);
assertEqual(analysis1.hasWaendeDecken, true, 'Analysis: hasWaendeDecken');
assertEqual(analysis1.hasLackierung, true, 'Analysis: hasLackierung');
assertEqual(analysis1.hasOnlySpecialLeistungen, false, 'Analysis: not only special');
assertEqual(analysis1.needsColorQuestion, true, 'Analysis: needs color question');

const analysis2 = analyzeLeistungen(['lackierung', 'schimmel']);
assertEqual(analysis2.hasOnlySpecialLeistungen, true, 'Analysis: only special services');
assertEqual(analysis2.needsGroessenFrage, false, 'Analysis: no size question needed');

console.log('\n=== Minimum Price Test ===\n');

const testMin = computeEstimate({
  leistungen: ['schimmel'],
  schimmelFlaeche: '0.5', // Very small area
  zustand: 'neubau',
  zusatzoptionen: []
});
// 150 + (0.5 × 35) = 167.50 → min 150 applies
// But: 167.50 × 0.90 = 150.75 → 150
// 167.50 × 1.15 = 192.63 → 190
assertRange(testMin, 150, 190, 'Test Min: Small job enforces minimum');

console.log('\n=== All Tests Complete ===\n');
