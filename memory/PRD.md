# Ocean Color - Painting Company Website

## Original Problem Statement
Modern website for painting company "Ocean Color" based in Hamburg, Germany. Primary goals: generate qualified leads through an interactive price calculator and encourage callback requests.

## Core Requirements
- **Pages:** Home, Services (Leistungen), Price Calculator (Angebotsrechner), References (Referenzen), About Us (Uber Uns), Contact (Kontakt), Legal (Impressum, Datenschutz), Kleinauftrag-Service
- **10 Service Detail Pages:** Dynamic subpages for each core service
- **Price Calculator:** Multi-step form for project details, price range, and callback submission
- **Admin Dashboard:** Password-protected area (`/admin`, password: `ocean2024`) for lead and pricing management
- **Email Integration:** IONOS SMTP for real-time lead notification emails
- **File Uploads:** Users can attach photos to their requests
- **Design:** Modern, mobile-first, dark blue/white color scheme
- **Global Navigation:** Scroll-to-top on every page change
- **WhatsApp Integration:** Floating button + page buttons for quick inquiries

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, Shadcn UI, Axios
- **Backend:** FastAPI, Pydantic, Motor (async MongoDB)
- **Database:** MongoDB
- **Email:** Python smtplib (IONOS SMTP)

## What's Been Implemented
- All public pages (Home, Leistungen, Referenzen, Uber Uns, Kontakt, Impressum, Datenschutz, Kleinauftrag-Service)
- 10 dynamic service detail pages (`/leistungen/:slug`)
- Price calculator with multi-step form
- Admin dashboard (leads management, pricing config)
- IONOS SMTP email notifications
- File upload for lead requests
- Real Google Reviews integration
- Custom logo and images throughout
- Cookie consent banner
- ScrollToTop component for global scroll reset on navigation (verified 2026-02-18)
- "Uber uns" text optimized with emotional, high-quality copy (2026-02-18)
- WhatsApp quick inquiry feature (2026-02-18):
  - Floating WhatsApp button (bottom right, all pages)
  - WhatsApp button in Home page CTA section
  - WhatsApp card in Contact page info section
  - Pre-filled message with business number +4915120050008

## Backlog
- **P2:** Cloud Storage for Uploads - migrate from local `/app/uploads` to persistent cloud storage
- **P2:** Admin Interface for References - make Referenzen page dynamically manageable instead of hardcoded

## Key Credentials
- Admin password: `ocean2024`
- SMTP: IONOS (configured in backend/.env)
- WhatsApp Business: +4915120050008
