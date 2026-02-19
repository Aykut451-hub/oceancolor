# Ocean Color - Painting Company Website

## Original Problem Statement
Modern website for painting company "Ocean Color" based in Hamburg, Germany. Primary goals: generate qualified leads through an interactive price calculator and encourage callback requests.

## Core Requirements
- **Pages:** Home, Services, Price Calculator, References, About Us, Contact, Legal, Kleinauftrag-Service
- **10 Service Detail Pages:** Dynamic subpages for each core service
- **21 SEO Stadtteil-Landingpages:** `/maler-hamburg-[stadtteil]` with FAQ, Schema.org, meta tags
- **Price Calculator:** Multi-step form with wallpaper type selection for Tapezierarbeiten
- **Admin Dashboard:** Password-protected (`/admin`, password: `ocean2024`)
- **Email Integration:** IONOS SMTP
- **Floating Contact Bar:** Phone, Instagram (original gradient), WhatsApp

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, Shadcn UI, Axios
- Backend: FastAPI, Pydantic, Motor (async MongoDB)
- Database: MongoDB
- Email: Python smtplib (IONOS SMTP)

## What's Been Implemented
- All public pages + 10 service detail pages + Kleinauftrag-Service
- 21 SEO Stadtteil-Landingpages with:
  - SEO URL format: /maler-hamburg-altona, /maler-hamburg-wandsbek etc.
  - Dynamic title & meta description per page
  - 6 core services listed (Maler, Tapezier, Spachtel, Schimmel, Boden, Lackier)
  - FAQ section with 4 local questions (accordion)
  - Schema.org LocalBusiness (areaServed: all 21 districts) + FAQPage markup
  - Availability note, CTA to calculator, internal links to other districts
- SEO section on homepage with clickable district grid
- Price calculator with Tapezierarbeiten-specific wallpaper type selection
- Floating contact bar (Phone, Instagram, WhatsApp)
- Google Reviews link: maps.app.goo.gl/tMLzNyo8MMk57YLk7
- Admin dashboard, IONOS SMTP, file uploads, ScrollToTop, Cookie consent

## Backlog
- **P2:** Cloud Storage for Uploads
- **P2:** Admin Interface for References

## Key Credentials
- Admin password: `ocean2024`
- WhatsApp Business: +4915120050008
- Instagram: instagram.com/ocean_maler/
