# Ocean Color - Website PRD

## Projektübersicht
**Projektname:** Ocean Color Malerfirma Website  
**Typ:** Moderne Landing Page / Website  
**Ziel:** Mehr qualifizierte Anfragen über Angebotsrechner und Rückruf-Funktion generieren  
**Datum:** Dezember 2024

## Original Problem Statement
Moderne Website für Malerfirma "Ocean Color" in Hamburg mit Fokus auf:
- Angebotsrechner als Hauptfunktion
- Rückruf-Anforderung (primärer CTA)
- Telefonnummer klein/nicht prominent
- Einzugsgebiet: Hamburg + 15km Umgebung
- Design: modern, hochwertig, mobile-first, blau/weiß mit Akzent

## Technische Architektur
- **Frontend:** React 19 mit React Router
- **UI Library:** Shadcn/UI Components
- **Styling:** Tailwind CSS mit Custom Ocean Color Theme
- **Fonts:** Inter (Google Fonts)
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast)
- **Backend:** FastAPI (für spätere Integration vorbereitet)
- **Database:** MongoDB (für spätere Integration vorbereitet)

## User Personas
1. **Hausbesitzer/Mieter:** Suchen professionelle Malerarbeiten für Renovierung
2. **Gewerbliche Kunden:** Benötigen Büro- oder Geschäftsraumgestaltung
3. **Immobilienverwalter:** Regelmäßige Wartungs- und Renovierungsarbeiten

## Core Requirements (Static)

### Seitenstruktur (Alle implementiert ✓)
1. **Startseite:** Hero mit CTA, Services Preview, Why Choose Us, Testimonials
2. **Leistungen:** Alle 6 Services mit Details und Ablauf
3. **Angebotsrechner:** Interaktiver Rechner mit Mock-Berechnung
4. **Referenzen:** Projekt-Showcase mit 4 Beispielen
5. **Über uns:** Firmenprofil, Werte, Einsatzgebiet, Team-Recruiting
6. **Kontakt:** Rückruf-Formular (Priorität), Kontaktformular, Kontaktinfos
7. **Rechtliches:** Impressum, Datenschutz, Cookie-Consent

### Leistungen (Services)
- Wände & Decken
- Lackierarbeiten
- Tapezierarbeiten
- Spachtelarbeiten
- Bodenbeläge
- Schimmelsanierung

## Was wurde implementiert (Dezember 2024)

### ✅ Phase 1: Frontend mit Mock-Daten (ABGESCHLOSSEN)

#### Komponenten erstellt:
- `Header.jsx` - Responsive Navigation mit Logo, fixiert, scroll-effekt
- `Footer.jsx` - Footer mit Links, Services, Kontakt, Social Media
- `CookieConsent.jsx` - Cookie-Banner mit Accept/Decline

#### Seiten erstellt:
- `Home.jsx` - Hero, Services Preview, Why Us, Testimonials, CTA
- `Leistungen.jsx` - Services Grid (2x3), Ablauf (5 Schritte), CTA
- `Rechner.jsx` - Angebotsrechner mit Formular und Mock-Berechnung
- `Referenzen.jsx` - 4 Projekte, Stats, Testimonials
- `UeberUns.jsx` - Story, Werte, Einsatzgebiet, Team-Recruiting
- `Kontakt.jsx` - Rückruf-Formular (Priorität), Kontaktformular, Infos
- `Impressum.jsx` - Rechtliche Angaben
- `Datenschutz.jsx` - DSGVO-konforme Datenschutzerklärung

#### Mock-Daten (`data/mock.js`):
- Services mit Icons und Beschreibungen
- 4 Referenzprojekte mit Bildern
- 4 Testimonials mit Bewertungen
- About-Punkte (Sauberkeit, Zuverlässigkeit, Planung)
- Mock-Funktionen für Rückruf, Kontakt, Angebotsrechner

#### Design Features:
- **Farbschema:** Ocean Blue (#0891b2) als Primärfarbe, Weiß, dezente Gradienten
- **Typography:** Inter Font Family
- **Responsive:** Mobile-first Design, funktioniert auf allen Geräten
- **Animationen:** Hover-Effekte, Card-Transforms, Smooth Scrolling
- **Images:** 5 professionelle Bilder von Unsplash (Maler bei der Arbeit)
- **Icons:** Lucide React Icons (kein Emoji verwendet)
- **UX:** Rückruf-CTA prominent, Telefon klein, klare Hierarchie

#### Routing:
- `/` - Startseite
- `/leistungen` - Leistungen
- `/rechner` - Angebotsrechner
- `/referenzen` - Referenzen
- `/ueber-uns` - Über uns
- `/kontakt` - Kontakt
- `/impressum` - Impressum
- `/datenschutz` - Datenschutz

## Prioritized Backlog

### P0 (Next Phase - Backend Development)
- [ ] Backend API für Rückruf-Anfragen
- [ ] Backend API für Kontaktformular
- [ ] Backend API für Angebotsrechner-Daten speichern
- [ ] MongoDB Integration für Anfragen
- [ ] E-Mail-Benachrichtigungen bei Anfragen
- [ ] Admin-Dashboard für Anfragenverwaltung

### P1 (Enhancement Features)
- [ ] Erweiteter Angebotsrechner mit mehr Optionen
- [ ] Bild-Upload für Projekt-Anfragen
- [ ] Referenzen-Galerie mit Lightbox
- [ ] SEO-Optimierung (Meta-Tags, Schema.org)
- [ ] Google Analytics Integration
- [ ] Performance-Optimierung (Image Lazy Loading)

### P2 (Nice-to-have)
- [ ] Blog/Ratgeber Sektion
- [ ] FAQ Sektion mit Accordion
- [ ] Terminbuchungs-System
- [ ] Live-Chat Integration
- [ ] Mehrsprachigkeit (EN)
- [ ] Google Maps Integration

## Next Action Items
1. **Backend Development:** API-Endpoints für Formulare und Angebotsrechner
2. **Database Models:** MongoDB Schemas für Anfragen, Kontakte
3. **E-Mail Service:** Integration für Benachrichtigungen
4. **Testing:** E2E Tests für alle Formulare
5. **Deployment:** Production Deployment vorbereiten

## Design Assets
- **Logo URL:** https://oceancolor.de/wp-content/uploads/2024/04/Ocean_Color_Logo_m.Wischer.png
- **Hero Images:** Professionelle Maler-Bilder von Unsplash
- **Color Palette:**
  - Primary: `hsl(197, 71%, 39%)` - Ocean Blue
  - Primary Dark: `hsl(197, 71%, 29%)`
  - Primary Light: `hsl(197, 71%, 89%)`
  - Background: White
  - Text: Gray-900

## API Contracts (für Backend-Phase)

### POST /api/callback-request
```json
Request:
{
  "name": "string",
  "phone": "string",
  "preferredTime": "string (optional)"
}

Response:
{
  "success": true,
  "message": "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen."
}
```

### POST /api/contact
```json
Request:
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Ihre Nachricht wurde erfolgreich versendet!"
}
```

### POST /api/quote-calculator
```json
Request:
{
  "serviceType": "string",
  "area": "number",
  "rooms": "number"
}

Response:
{
  "success": true,
  "estimatedPrice": "number",
  "message": "string"
}
```

## Notes
- Alle Formulare arbeiten aktuell mit Mock-Daten (Browser-only, keine Backend-Speicherung)
- Cookie-Consent speichert Präferenz in localStorage
- Telefonnummer bewusst klein dargestellt (nicht als Haupt-CTA)
- Rückruf-Formular hat visuell höhere Priorität als normales Kontaktformular
- Mobile Navigation mit Hamburger Menu
- Alle Links und Buttons funktional
- SEO-freundliche Struktur vorbereitet

## Success Metrics (für spätere Messung)
- Anzahl Rückruf-Anfragen pro Woche
- Conversion Rate Angebotsrechner
- Bounce Rate < 50%
- Mobile Traffic > 60%
- Durchschnittliche Session-Dauer > 2 Minuten
