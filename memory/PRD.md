# Ocean Color - Product Requirements Document

## Projektübersicht
Eine moderne Website für Ocean Color, einen Malermeisterbetrieb in Hamburg. Hauptziel ist die Generierung qualifizierter Leads durch einen interaktiven Preisrechner und professionelle Präsentation der Dienstleistungen.

## Unternehmensdaten
- **Name:** Ocean Color Malermeisterbetrieb
- **Firma:** Ocean Color GmbH
- **Adresse:** Schützenstraße 106, 22761 Hamburg
- **Telefon:** 040 1800 8888
- **E-Mail:** info@ocean-maler.de
- **Website:** https://oceancolor.de

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI
- **Datenbank:** MongoDB
- **E-Mail:** IONOS SMTP

## Kernfunktionen
1. **Preisrechner:** Multi-Step-Formular mit Live-Preisberechnung
2. **Lead Management:** MongoDB Speicherung + E-Mail-Benachrichtigung
3. **Admin Dashboard:** Passwortgeschützter Bereich (/admin)
4. **SEO-Seiten:** Dynamische Landingpages für Stadtteile

## Seiten
- Home, Leistungen, Preisrechner, Referenzen, Über uns, Kontakt
- Rechtliches (Impressum, Datenschutz)
- SEO-Landingpages pro Stadtteil

---

## Implementierte Features (Stand: 22.02.2026)

### ✅ Preisrechner Refactoring (22.02.2026) - P1 ABGESCHLOSSEN
- **RechnerNeu.jsx** von ~1500 Zeilen auf ~400 Zeilen reduziert
- Modulare Step-Komponenten in `/app/frontend/src/components/rechner/`:
  - `StepPLZ.jsx` - PLZ-Eingabe mit Validierung + **Entfernungsprüfung**
  - `StepObjektart.jsx` - Objektart-Auswahl
  - `StepLeistungen.jsx` - Leistungsauswahl mit Inline-Inputs
  - `StepFlaechen.jsx` - Raumanzahl/Wandfläche
  - `StepDetails.jsx` - Farbe, Tapete, Spachtel, Zustand
  - `StepZusatzoptionen.jsx` - Optionale Extras
  - `StepSummary.jsx` - Zusammenfassung vor Absenden
  - `StepKontakt.jsx` - Kontaktformular
  - `LiveSummaryPanel.jsx` - Live-Kalkulation rechts
  - `SharedComponents.jsx` - AnimatedPrice, SelectionCard, Chip, ProgressBar
- **Pricing Engine** in `/app/frontend/src/lib/pricingEngine.js`:
  - Pure Functions für Preisberechnung
  - `computeEstimate(state)` → {min, max, breakdown}
  - Alle Preiskonstanten zentralisiert
  - PLZ-Validierung (`isValidPLZ`)
- **Geo Service** in `/app/frontend/src/lib/geoService.js`:
  - PLZ → Koordinaten via OpenStreetMap Nominatim API
  - Haversine-Formel für Distanzberechnung
  - `checkDistanceFromHamburg(plz)` → {distance, isOutsideServiceArea}
- **PLZ-Validierung UX-Fix:**
  - Nur 5 Ziffern erlaubt (Regex `^\d{5}$`)
  - "Weiter" Button disabled bei ungültiger PLZ
  - Fehlermeldung: "Bitte eine gültige 5-stellige PLZ eingeben."
  - Hinweis: "Wir sind in Hamburg & Umgebung tätig."
  - Grünes Häkchen bei gültiger PLZ
- **Entfernungsprüfung (22.02.2026):**
  - Automatische Distanzberechnung zu Hamburg (Referenz: 20095)
  - Hamburg-Bereich (20xxx-22xxx): Soforterkennung ohne API
  - Andere PLZ: API-basierte Entfernungsberechnung
  - ≤200 km: Grünes Häkchen mit Distanzanzeige
  - >200 km: Gelber Warnhinweis ("außerhalb des regulären Einsatzgebietes")
  - Button bleibt aktiv - nur Info, keine Blockierung
- **Testfälle** in `/app/frontend/src/lib/pricingEngine.test.js`:
  - 10+ Testfälle für Preislogik
  - PLZ-Validierung Tests
  - Kombinationsberechnungen

### ✅ Schema.org LocalBusiness Structured Data
- Vollständiges JSON-LD Schema in `/app/frontend/public/index.html`
- Alle Einzugsgebiete: Hamburg, Altona, Ottensen, St. Pauli, Eimsbüttel, Bahrenfeld, Blankenese, Hamburg-Mitte
- Enthält: Öffnungszeiten, Service-Katalog, AggregateRating, Geo-Koordinaten

### ✅ SEO-optimierte Location Map
- Implementiert im Footer (`/app/frontend/src/components/Footer.jsx`)
- Implementiert auf der Kontakt-Seite (`/app/frontend/src/pages/Kontakt.jsx`)
- Lazy-Loading mit Intersection Observer
- Mobile-responsive Design
- CTA-Buttons (WhatsApp, Telefon)

### ✅ Google Bewertungs-Funktion (22.02.2026)
- Dezente Bewertungs-Sektion auf Kontakt-Seite unterhalb der Standort-Karte
- 5 goldene Sterne als visuelle Dekoration
- Überschrift: "Zufriedene Kunden? Bewerten Sie uns auf Google"
- CTA-Button mit Google-Logo verlinkt zu: `https://search.google.com/local/writereview?placeid=ChIJgwoYpaqFsUcRPabmfur9qc4`
- Statistik: "23 Bewertungen · 5,0 Sterne"
- Dezenter "Bewertung abgeben" Link im Footer
- Mobile-optimiertes Design ohne Pop-up oder Overlay

### ✅ Kundenstimmen Sektion auf Homepage (22.02.2026)
- Sektion "Das sagen unsere Kunden" unterhalb der Leistungsübersicht
- Subtext: "Echte Bewertungen von Kunden aus Hamburg und Umgebung."
- 4 ausgewählte Google-Bewertungen mit Sternebewertung, Kundenname (Initial-Avatar) und Kurztext
- Google-Rating-Badge: 5,0 Sterne (23 Bewertungen)
- CTA: "Alle Bewertungen ansehen" (blau) + "Jetzt selbst bewerten" (dezent)
- Modernes, dezentes Design ohne Slider-Autoplay
- Mobile-optimiert

### ✅ FAQ-Sektion auf Kontakt-Seite (22.02.2026)
- 8 häufig gestellte Fragen mit Accordion-Design (aufklappbar)
- Fragen zu: Angebotsdauer, Einsatzgebiete, Kleinaufträge, Balkonsanierung, Gewerbekunden, Angebotsanforderungen, Ablauf, Wochenendtermine
- FAQPage JSON-LD Schema in `index.html` für SEO
- Local-SEO Keywords: Hamburg, Malerbetrieb, Balkonsanierung, Fassadenarbeiten etc.
- CTA-Buttons: Telefon + WhatsApp
- Mobile-optimiert, keine Autoplay-Animationen

### ✅ Referenzen-Seite (22.02.2026) - Zurückgesetzt auf echte Bilder
- Authentische Referenzkarten mit echten Kundenbildern
- Struktur: Projektbild, Firmenname, Titel, Beschreibung, Leistungs-Tags, Dauer
- Filter nach Kategorie (Gewerbe, Soziale Einrichtung, Immobilienverwaltung, Hotellerie, Logistik)
- "Top-Projekt" Badges für featured Projekte
- "Abgeschlossen" Status-Indikator
- CTA-Block: "Ihr Projekt könnte hier stehen" mit Telefon, WhatsApp, Angebotsrechner
- Datenstruktur vorbereitet für spätere Vorher/Nachher-Erweiterung (optional)
- Keine Platzhalter-Bilder, nur echte Projektfotos
- Lädt Daten aus MongoDB (mit Fallback auf mock.js)

### ✅ Admin-Interface für Referenzen (22.02.2026)
- Neuer Admin-Bereich unter `/admin/references`
- CRUD-Funktionen: Erstellen, Bearbeiten, Löschen von Referenzen
- Bild-Upload oder URL-Eingabe für Projektbilder
- Toggle für Aktiv/Inaktiv-Status (öffentliche Sichtbarkeit)
- Toggle für Featured/Top-Projekt Status
- Kategorien: Gewerbe, Wohnung, Immobilienverwaltung, Soziale Einrichtung, Hotellerie, Balkon, Fassade, Logistik
- Leistungs-Tags auswählbar
- Backend: `/app/backend/references_routes.py`
- Frontend: `/app/frontend/src/pages/AdminReferences.jsx`
- Datenstruktur mit optionalen Feldern für Vorher/Nachher-Bilder (before_image, after_image)

### ✅ Admin-Sicherheit gehärtet (22.02.2026)
- Passwort aus Code entfernt, in `ADMIN_PASSWORD` ENV-Variable verschoben
- JWT-Secret als `JWT_SECRET` ENV-Variable
- Rate-Limiting: 5 Versuche pro 15 Minuten pro IP
- IP-basiertes Lockout nach zu vielen Fehlversuchen
- Sichere Logging (anonymisierte IPs, keine Passwörter)
- Backend Service: `/app/backend/auth_service.py`

### ✅ Lokaler Media Storage mit WebP-Optimierung (22.02.2026)
- Neuer lokaler Media-Ordner: `/media/references/`
- **WebP standardmäßig aktiviert** - generiert beide Formate automatisch
- Automatische Bildkomprimierung (JPEG 85%, WebP 80%)
- Automatisches Resizing auf max. 1600x1200 px
- **~70% kleinere Dateien** durch WebP-Konvertierung
- Saubere, SEO-freundliche Dateinamen
- Upload-Validierung: Max 10MB, JPG/PNG/WebP/GIF
- Löschen löscht beide Versionen (WebP + Fallback)
- Media-Statistiken Endpoint
- Backend: `/app/backend/media_service.py`
- Statische Dateien über `/media/` URL-Pfad erreichbar

### ✅ Frontend mit `<picture>` Element für WebP (22.02.2026)
- Referenzen-Seite nutzt `<picture>` Element mit WebP + Fallback
- Admin-Interface speichert `image`, `image_webp`, `image_fallback`
- Lazy Loading (`loading="lazy"`) und async decoding (`decoding="async"`)
- Alt-Texte beibehalten für SEO und Barrierefreiheit
- Verbesserte Core Web Vitals durch kleinere Bildgrößen

### ✅ Frühere Session-Implementierungen
- Preisrechner-Logik für "Lackierarbeiten" korrigiert
- "Über uns" und "Impressum" Seiten überarbeitet
- Rivedil Partner-Sektion auf Wandgestaltung-Seite
- Google Reviews auf Homepage aktualisiert (23 Bewertungen, 5/5 Sterne)
- Navigation zentriert
- Icons im Preisrechner getauscht

---

## Backlog

### P1 - Hoch
- ~~**Refactoring Preisrechner:** `RechnerNeu.jsx` (>1000 Zeilen) in kleinere Komponenten aufteilen~~ ✅ ERLEDIGT

### P2 - Mittel
- **Cloud Storage Migration (optional):** Bei Bedarf Migration auf S3/R2 für Produktionsumgebung
- **Admin Referenzen Erweiterungen:** Drag-and-Drop Sortierung, Before/After Bilder aktivieren

---

## Verifizierte Features (Stand: 22.02.2026)

### ✅ Media-Storage mit WebP-Optimierung - VERIFIZIERT
- Bild-Upload erstellt automatisch WebP + Fallback (JPG/PNG)
- Test-Bilder in `/app/backend/media/references/`: beide Formate vorhanden
- Öffentliche Referenzen-Seite nutzt `<picture>` Element (12x verifiziert)
- WebP ~70% kleiner als Original

### ✅ Preisrechner PLZ-Validierung & Distanz - VERIFIZIERT
- 5-stellige PLZ-Validierung funktioniert (nicht-numerische Zeichen gefiltert)
- **PLZ 22761 (Hamburg):** "PLZ erkannt – Hamburg & Umgebung" ✓
- **PLZ 28195 (Bremen ~95km):** "PLZ erkannt – ca. 95 km von Hamburg" ✓
- **PLZ 80331 (München ~612km):** Gelbe Warnung "außerhalb unseres regulären Einsatzgebietes" ✓
- "Weiter" Button korrekt deaktiviert bei ungültiger PLZ

### ✅ Admin-Lead Dashboard mit Entfernung - VERIFIZIERT
- "ENTFERNUNG" Spalte zeigt Distanz in km
- Warnsymbol bei >200km Entfernung
- Filter-Dropdown: "Alle", "≤200km", ">200km" funktioniert
- Test-Lead aus München zeigt 612 km mit Warnung

### ✅ Badsanierung Vorher/Nachher Seite (22.02.2026)
- Neue Referenz-Seite unter `/badsanierung`
- Interaktiver Vorher/Nachher-Slider (Touch & Maus-Drag)
- Labels "Vorher" und "Nachher" auf den Bildern
- SEO-optimierter Content für "Badsanierung Hamburg"
- Lokaler SEO-Bereich mit Hamburger Stadtteilen
- CTA: "Jetzt Badsanierung anfragen" → Preisrechner
- Mobile-optimiert, keine Autoplay-Animation

### ✅ Badsanierung in Leistungen-Übersicht (22.02.2026)
- Neue Leistungskachel "Badsanierung" hinzugefügt
- Position: Nach "Dekorative Wandgestaltung"
- Verlinkt direkt auf `/badsanierung` (nicht auf Standard-Leistungsseite)
- GEO-SEO Sektion am Ende der Leistungen-Seite:
  - 10 Hamburger Stadtteile als Tags
  - Interner SEO-Link "Badsanierung in Hamburg"

---

## Dateien-Referenz
- `/app/frontend/public/index.html` - Schema.org JSON-LD
- `/app/frontend/src/components/Footer.jsx` - Footer mit Location Map
- `/app/frontend/src/pages/Kontakt.jsx` - Kontaktseite mit Location Map
- `/app/frontend/src/pages/RechnerNeu.jsx` - Preisrechner
- `/app/frontend/src/pages/AdminReferences.jsx` - Admin Referenzen-Verwaltung
- `/app/frontend/src/data/leistungen.js` - Leistungsdaten
- `/app/backend/media_service.py` - Bild-Upload und Verarbeitung
- `/app/backend/references_routes.py` - Referenzen API
- `/app/backend/auth_service.py` - Authentifizierung mit Rate-Limiting

## Media Storage
- **Pfad:** `/app/backend/media/references/`
- **URL:** `{BACKEND_URL}/media/references/{filename}`
- **Formate:** JPG, PNG, WebP, GIF
- **Max Upload:** 10MB
- **Max Dimensionen:** 1600x1200 px (automatisch skaliert)

## Admin-Zugang
- URL: `/admin/login`
- Credentials: Über ENV-Variable `ADMIN_PASSWORD` konfiguriert (nicht im Code)
