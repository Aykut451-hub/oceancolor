# Ocean Color - Painting Company Website

## Original Problem Statement
Modern website for painting company "Ocean Color" based in Hamburg, Germany. Primary goals: generate qualified leads through an interactive price calculator and encourage callback requests.

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, Shadcn UI, Axios
- Backend: FastAPI, Pydantic, Motor (async MongoDB)
- Database: MongoDB | Email: Python smtplib (IONOS SMTP)

## What's Been Implemented
- All public pages + 10 service detail pages + Kleinauftrag-Service
- **GEO Structure (Generative Engine Optimization):**
  - Central hub: /maler-hamburg with competency grid, customer groups, area cross-links
  - 21 SEO Stadtteil-Landingpages (/maler-hamburg-[stadtteil]) with:
    - Problem context, customer types, service cross-links
    - FAQ sections with Schema.org FAQPage markup
    - Dynamic title & meta description
  - Schema.org LocalBusiness with areaServed (21 districts), hasOfferCatalog (8 services), knowsAbout
  - Tätigkeitsgebiet GEO-text section on homepage
  - Leistung↔Ort cross-linking (e.g. "Malerarbeiten in Altona")
- 301 Redirects: 11 stadtteil + 6 misc old URLs
- Price calculator with Tapezierarbeiten wallpaper type selection
- Floating contact bar (Phone, Instagram, WhatsApp)
- Google Tag Manager (GTM-KW78N2RC)
- Admin dashboard, IONOS SMTP, file uploads, ScrollToTop, Cookie consent

## Backlog
- **P2:** Cloud Storage for Uploads
- **P2:** Admin Interface for References

## Key Credentials
- Admin: ocean2024 | WhatsApp: +4915120050008 | Instagram: ocean_maler
