import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { stadtteile } from '../data/stadtteile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import MalerStadtteil from './MalerStadtteil';

const StadtteilRouter = () => {
  const { page } = useParams();

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

  return <Navigate to="/404" replace />;
};

export default StadtteilRouter;
