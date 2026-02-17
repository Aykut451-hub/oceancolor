import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/Home";
import Leistungen from "@/pages/Leistungen";
import Rechner from "@/pages/Rechner";
import Referenzen from "@/pages/Referenzen";
import UeberUns from "@/pages/UeberUns";
import Kontakt from "@/pages/Kontakt";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leistungen" element={<Leistungen />} />
            <Route path="/rechner" element={<Rechner />} />
            <Route path="/referenzen" element={<Referenzen />} />
            <Route path="/ueber-uns" element={<UeberUns />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
