# Ocean Color GmbH - Malermeister Hamburg Website

## Original Problem Statement
Build a modern website for "Ocean Color" painting company in Hamburg, Germany. Primary goals:
- Generate qualified leads through an interactive price calculator
- Showcase services professionally with premium UI/UX

## User Personas
- **Homeowners** in Hamburg looking for painting/renovation services
- **Property managers** needing commercial painting work
- **Real estate agents** requiring quick renovation quotes

## Core Requirements
- **Pages:** Home, Services, Price Calculator, References, About Us, Contact, Legal
- **SEO Pages:** City district landing pages (e.g., /maler-hamburg-altona)
- **Design:** Modern, mobile-first, dark blue/white color scheme
- **Core Feature:** Multi-step price calculator with live price summary
- **Lead Management:** MongoDB storage + email notifications
- **Admin Dashboard:** Password-protected lead management (/admin)

## Tech Stack
- **Frontend:** React, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI, Pydantic, Motor
- **Database:** MongoDB
- **Integrations:** IONOS SMTP, Google Tag Manager, WhatsApp, Instagram

---

## What's Been Implemented

### Session: February 21, 2026
- [x] **Lackierarbeiten Logic Fix (P0):** Complete rewrite of varnishing work in price calculator
  - 4 element type options: Türen (120€), Heizkörper (150€), Fensterrahmen (150€), Sonstiges (Auf Anfrage)
  - Proper step skipping when only Lackierarbeiten selected
  - Updated validation and price calculation
- [x] **Icon Swap:** Exchanged Wohnung (Building) and Haus (Home) icons
- [x] **Testing:** All scenarios passed (100% pass rate)

### Previous Sessions
- [x] Price Calculator Overhaul with net-price structure
- [x] "Before/After" Slider on Schimmelsanierung page
- [x] Premium animations for slider component
- [x] UI/UX optimizations (hover effects, click animations)
- [x] Image optimization (lazy loading, shimmer placeholders)
- [x] Color theme management (blue scheme)

---

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- ~~Fix Lackierarbeiten logic in price calculator~~

### P1 (High Priority)
- None currently

### P2 (Medium Priority)
- Cloud Storage for Uploads: Migrate from /app/uploads to S3-compatible storage
- Admin Interface for References: Dynamic management of Referenzen page

### P3 (Low Priority)
- Refactoring of RechnerNeu.jsx (>1000 lines, should be split into sub-components)

---

## Key Files
- `frontend/src/pages/RechnerNeu.jsx` - Price calculator (main component)
- `frontend/src/components/ui/BeforeAfterSlider.jsx` - Image comparison slider
- `frontend/src/data/leistungen.js` - Service data
- `frontend/tailwind.config.js` - Theme configuration

## Credentials
- **Admin Dashboard:** /admin/login, Password: ocean2024
