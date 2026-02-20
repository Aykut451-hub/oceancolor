import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { stadtteile } from '../data/stadtteile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import MalerStadtteil from './MalerStadtteil';

// Old stadtteil slugs → new SEO URLs
const stadtteilRedirects = {
  'altona': 'altona',
  'osdorf': 'osdorf',
  'lurup': 'lurup',
  'wandsbek': 'wandsbek',
  'rellingen': 'rellingen',
  'wedel': 'wedel',
  'bahrenfeld': 'bahrenfeld',
  'eppendorf': 'eppendorf',
  'lokstedt': 'lokstedt',
  'bergedorf': 'bergedorf',
  'stellingen': 'stellingen',
};

// Old misc pages → new pages
const miscRedirects = {
  'leistungen-2': '/leistungen',
  'ocean-color-hamburg': '/',
  'malern-tapezieren': '/leistungen/tapezierarbeiten',
  'bodenarbeiten': '/leistungen/bodenbelaege',
  'trockenbau': '/leistungen/trockenbauarbeiten',
  'kleinauftrag-service-malermeister': '/kleinauftrag-service',
};

const StadtteilRouter = () => {
  const { page } = useParams();

  // 1. Handle /maler-hamburg-[stadtteil] (new SEO URLs)
  if (page && page.startsWith('maler-hamburg-')) {
    const slug = page.replace('maler-hamburg-', '');
    const exists = stadtteile.some(s => s.slug === slug);
    if (exists) {
      return (
        <>
          <Header />
          <main><MalerStadtteil /></main>
          <Footer />
          <CookieConsent />
        </>
      );
    }
  }

  // 2. Handle old stadtteil redirects (/altona → /maler-hamburg-altona)
  if (page && stadtteilRedirects[page]) {
    return <Navigate to={`/maler-hamburg-${stadtteilRedirects[page]}`} replace />;
  }

  // 3. Handle old misc redirects
  if (page && miscRedirects[page]) {
    return <Navigate to={miscRedirects[page]} replace />;
  }

  return <Navigate to="/404" replace />;
};

export default StadtteilRouter;
