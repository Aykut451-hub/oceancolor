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
