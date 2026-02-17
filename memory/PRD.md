# Ocean Color - Website PRD

## Projektübersicht
**Projektname:** Ocean Color Malerfirma Website  
**Typ:** Moderne Landing Page / Website  
**Ziel:** Mehr qualifizierte Anfragen über Angebotsrechner und Rückruf-Funktion generieren  
**Datum:** Februar 2026 (aktualisiert)

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
### ✅ Phase 2: Interaktiver Step-by-Step Angebotsrechner (ABGESCHLOSSEN)
### ✅ Phase 3: Backend-Integration & Admin Dashboard (ABGESCHLOSSEN)
### ✅ Phase 4: Konfigurierbare Preisberechnung (ABGESCHLOSSEN)

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
- `/rechner` - Interaktiver Angebotsrechner (NEU)
- `/referenzen` - Referenzen
- `/ueber-uns` - Über uns
- `/kontakt` - Kontakt
- `/impressum` - Impressum
- `/datenschutz` - Datenschutz

### Phase 3: Backend-Integration & Admin Dashboard

#### Backend APIs:
- **POST /api/leads** - Lead-Erstellung mit File Upload (multipart/form-data)
- **POST /api/admin/login** - Admin-Authentifizierung mit Token
- **GET /api/admin/leads** - Alle Leads abrufen (mit Filter/Suche)
- **GET /api/admin/leads/:id** - Einzelner Lead
- **PUT /api/admin/leads/:id** - Lead-Status & Notizen aktualisieren
- **GET /api/admin/stats** - Dashboard-Statistiken
- **GET /api/admin/export** - CSV Export aller Leads

#### MongoDB Schema:
- **Lead Collection** mit vollständigen Calculator-Daten:
  - Calculator: PLZ, Objektart, Leistungen, Größe, Raumhöhe, Zustand, Farbe, Spachtelstufe, Zusatzoptionen
  - Kontakt: Name, Telefon, E-Mail, Rückruf-Zeit, Bemerkung
  - Preis: Min/Max Preisspanne
  - Files: Foto-URLs Array
  - Admin: Status (neu/kontaktiert/angebot/gewonnen/verloren), admin_notizen
  - Meta: created_at, lead_type, id

#### File Upload System:
- File Upload Handler für bis zu 5 Bilder
- Speicherung in `/app/backend/uploads`
- Static File Serving unter `/uploads`
- File-URLs werden in Lead gespeichert

#### E-Mail-Benachrichtigung:
- Automatischer E-Mail-Versand bei neuen Leads
- Strukturierte Übersicht aller Lead-Daten
- Betreff: "Neue Anfrage – Angebotsrechner – {PLZ} – {Objektart}"
- Inkl. Preisspanne, alle Projektdetails, Kontaktdaten, Foto-Links
- SMTP konfigurierbar über .env (optional - ohne SMTP werden Emails geloggt)

#### Admin Dashboard (`/admin`):
**AdminLogin Seite:**
- Password-geschützter Login
- Token-basierte Authentifizierung
- Standard-Password: `ocean2024` (konfigurierbar via ADMIN_PASSWORD)

**AdminLeads Seite (`/admin/leads`):**
- Dashboard mit Statistik-Cards (Gesamt, Neu, Kontaktiert, Gewonnen)
- Leads-Tabelle mit Spalten: Datum, Kontakt, PLZ/Objektart, Leistungen, Preisspanne, Rückruf, Status, Aktionen
- Such-Funktion (Name, PLZ, Telefon, E-Mail)
- Status-Filter (Alle, Neu, Kontaktiert, Angebot, Gewonnen, Verloren)
- CSV Export Button
- Logout Button
- Klick auf Lead öffnet Detailseite

**AdminLeadDetail Seite (`/admin/leads/:id`):**
- Vollständige Lead-Ansicht in strukturierten Abschnitten:
  - Kontakt & Rückruf mit Quick-Actions (Anrufen, E-Mail)
  - Projekt Details (alle 9 Calculator-Schritte übersichtlich)
  - Kalkulierte Preisspanne (prominent dargestellt)
  - Foto-Galerie mit Click-to-Enlarge
- Bearbeitungs-Features:
  - Status ändern (Dropdown)
  - Admin-Notizen hinzufügen/bearbeiten (Textarea)
  - Speichern-Button
- Responsive Design für alle Geräte

**Protected Routes:**
- Automatische Weiterleitung zu `/admin/login` wenn nicht authentifiziert
- Token-Validierung bei jedem API-Call
- Logout bei abgelaufenem/ungültigem Token

#### Environment Variables:
```
ADMIN_PASSWORD=ocean2024
ADMIN_EMAIL=info@ocean-maler.de

# IONOS SMTP Configuration (NEU)
SMTP_HOST=smtp.ionos.de
SMTP_PORT=587
SMTP_USER=info@ocean-maler.de
SMTP_PASSWORD= (muss manuell eingetragen werden)
SMTP_FROM=info@ocean-maler.de
SMTP_USE_TLS=true
```

**E-Mail Versand:**
- Automatischer Versand bei jedem neuen Lead über IONOS SMTP
- STARTTLS Verschlüsselung (Port 587)
- Strukturierte Lead-Benachrichtigung
- Betreff: "Neue Anfrage – Angebotsrechner – {PLZ} – {Objektart}"
- Fallback: Bei SMTP-Fehler werden E-Mails geloggt
- Setup-Anleitung: `/app/SMTP_PASSWORD_SETUP.txt`
- Detaillierte Dokumentation: `/app/EMAIL_SETUP.md`

#### Multi-Step Calculator (`RechnerNeu.jsx`):
**9-Schritte Prozess:**
1. **PLZ Eingabe** - Postleitzahl zur Standortbestimmung
2. **Objektart** - Wohnung / Haus / Gewerbe (Icon-Cards)
3. **Leistungen** - Mehrfachauswahl:
   - Wände & Decken streichen
   - Lackierarbeiten
   - Tapezierarbeiten
   - Spachtelarbeiten
   - Bodenbeläge
   - Schimmelsanierung
4. **Größe** - Flexible Eingabe:
   - Option A: Anzahl Räume
   - Option B: Wandfläche in m²
5. **Raumhöhe** - unter 2,6m / 2,6m-3m / über 3m
6. **Zustand** - Normal / Altbau / Renovierungsbedürftig
7. **Farbe** - Weiß / Bunt
8. **Spachtelstufe** - Keine / Q2 / Q3 / Q4
9. **Zusatzoptionen** - Mehrfachauswahl (optional):
   - Abkleben / Schutz
   - Möbel bewegen
   - Türen / Heizkörper lackieren

#### Features:
- **Progress Bar** - Visueller Fortschritt (Schritt X von 9, %)
- **Step Validation** - Prüfung vor jedem Weiter-Klick
- **Back Navigation** - Zurück zu vorherigen Schritten
- **Smart Calculation** - Dynamische Preisberechnung basierend auf:
  - Grundfläche (Räume x 30m² oder direkte m² Eingabe)
  - Ausgewählte Leistungen (unterschiedliche €/m²)
  - Raumhöhe Zuschlag (bis zu +30%)
  - Zustand Zuschlag (bis zu +25%)
  - Farbe Zuschlag (+15% für bunt)
  - Spachtelstufe Zuschlag (5-12€/m²)
  - Zusatzoptionen (Festpreise)
- **Preisspanne** - Min/Max Berechnung mit 20% Varianz
- **Lead-Formular** nach Berechnung:
  - Name, Telefon, E-Mail (Pflichtfelder)
  - Gewünschtes Rückruf-Zeitfenster
  - Foto-Upload (optional, max 5MB)
  - Icons für bessere UX
- **Success Screen** - "Vielen Dank" Seite mit:
  - Grünes Success-Icon
  - Anzeige der berechneten Preisspanne
  - "Zur Startseite" Button
- **Mobile Responsive** - Funktioniert auf allen Geräten
- **Toast Notifications** - Feedback für User-Aktionen

## Prioritized Backlog

### P0 (Produktions-Optimierungen)
- [ ] SMTP-Credentials konfigurieren für echten E-Mail-Versand
- [ ] Passwort-Hashing für Admin-Login (aktuell plain-text)
- [ ] Redis für Token-Storage (aktuell in-memory)
- [ ] Image-Optimierung & Thumbnails für hochgeladene Fotos
- [ ] Rate Limiting für API-Endpoints
- [ ] Error Monitoring & Logging

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

### POST /api/quote-calculator (AKTUALISIERT)
```json
Request:
{
  "calculatorData": {
    "plz": "string",
    "objektart": "wohnung|haus|gewerbe",
    "leistungen": ["waende-decken", "lackierung", ...],
    "groesseOption": "raeume|flaeche",
    "anzahlRaeume": "number (optional)",
    "wandflaeche": "number (optional)",
    "raumhoehe": "niedrig|normal|hoch",
    "zustand": "normal|altbau|renovierung",
    "farbe": "weiss|bunt",
    "spachtelstufe": "keine|q2|q3|q4",
    "zusatzoptionen": ["abkleben", "moebel", "tueren"]
  },
  "leadData": {
    "name": "string",
    "telefon": "string",
    "email": "string",
    "rueckrufZeit": "string (optional)",
    "foto": "file (optional)"
  },
  "calculatedPrice": {
    "min": "number",
    "max": "number"
  }
}

Response:
{
  "success": true,
  "leadId": "string",
  "message": "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen."
}
```

## Notes
- Alle Formulare arbeiten aktuell mit Mock-Daten (Browser-only, keine Backend-Speicherung)
- **Neuer Angebotsrechner** ist vollständig funktional mit Client-Side Berechnung
- **Preis-Kalkulation** verwendet realistische Faktoren (Mock, kann später durch Backend-Logik ersetzt werden)
- **Foto-Upload** im Lead-Formular ist bereit für Backend-Integration
- Cookie-Consent speichert Präferenz in localStorage
- Telefonnummer bewusst klein dargestellt (nicht als Haupt-CTA)
- Rückruf-Formular hat visuell höhere Priorität als normales Kontaktformular
- Mobile Navigation mit Hamburger Menu
- Alle Links und Buttons funktional
- SEO-freundliche Struktur vorbereitet
- **Step-by-Step UX** optimiert für Conversion (kleine Schritte, klare Fragen)

## Success Metrics (für spätere Messung)
- Anzahl Rückruf-Anfragen pro Woche
- Conversion Rate Angebotsrechner
- Bounce Rate < 50%
- Mobile Traffic > 60%
- Durchschnittliche Session-Dauer > 2 Minuten
