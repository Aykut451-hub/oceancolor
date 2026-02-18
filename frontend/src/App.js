import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Leistungen from "@/pages/Leistungen";
import LeistungDetail from "@/pages/LeistungDetail";
import KleinauftragService from "@/pages/KleinauftragService";
import RechnerNeu from "@/pages/RechnerNeu";
import Referenzen from "@/pages/Referenzen";
import UeberUns from "@/pages/UeberUns";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminLeads from "@/pages/AdminLeads";
import AdminLeadDetail from "@/pages/AdminLeadDetail";
import AdminPricing from "@/pages/AdminPricing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Header />
              <main><Home /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/leistungen" element={
            <>
              <Header />
              <main><Leistungen /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/leistungen/:slug" element={
            <>
              <Header />
              <main><LeistungDetail /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/kleinauftrag-service" element={
            <>
              <Header />
              <main><KleinauftragService /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/rechner" element={
            <>
              <Header />
              <main><RechnerNeu /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/referenzen" element={
            <>
              <Header />
              <main><Referenzen /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/ueber-uns" element={
            <>
              <Header />
              <main><UeberUns /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/kontakt" element={
            <>
              <Header />
              <main><Kontakt /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/impressum" element={
            <>
              <Header />
              <main><Impressum /></main>
              <Footer />
              <CookieConsent />
            </>
          } />
          <Route path="/datenschutz" element={
            <>
              <Header />
              <main><Datenschutz /></main>
              <Footer />
              <CookieConsent />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/leads" element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          } />
          <Route path="/admin/leads/:id" element={
            <ProtectedRoute>
              <AdminLeadDetail />
            </ProtectedRoute>
          } />
          <Route path="/admin/pricing" element={
            <ProtectedRoute>
              <AdminPricing />
            </ProtectedRoute>
          } />

          {/* 404 Catch-all Route */}
          <Route path="*" element={
            <>
              <Header />
              <main><NotFound /></main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
