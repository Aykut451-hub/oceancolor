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
3. **Admin Dashboard:** Passwortgeschützter Bereich (/admin, Passwort: ocean2024)
4. **SEO-Seiten:** Dynamische Landingpages für Stadtteile

## Seiten
- Home, Leistungen, Preisrechner, Referenzen, Über uns, Kontakt
- Rechtliches (Impressum, Datenschutz)
- SEO-Landingpages pro Stadtteil

---

## Implementierte Features (Stand: 22.02.2026)

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
- **Refactoring Preisrechner:** `RechnerNeu.jsx` (>1000 Zeilen) in kleinere Komponenten aufteilen

### P2 - Mittel
- **Cloud Storage:** Datei-Uploads von `/app/uploads` auf Cloud-Speicher migrieren
- **Admin für Referenzen:** Dynamische Verwaltung der Referenzen-Projekte

---

## Dateien-Referenz
- `/app/frontend/public/index.html` - Schema.org JSON-LD
- `/app/frontend/src/components/Footer.jsx` - Footer mit Location Map
- `/app/frontend/src/pages/Kontakt.jsx` - Kontaktseite mit Location Map
- `/app/frontend/src/pages/RechnerNeu.jsx` - Preisrechner
- `/app/frontend/src/data/leistungen.js` - Leistungsdaten

## Admin-Zugang
- URL: `/admin/login`
- Passwort: `ocean2024`
