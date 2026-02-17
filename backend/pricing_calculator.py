from pricing_models import PricingConfig, PriceCalculationRequest
import logging

logger = logging.getLogger(__name__)


class PricingCalculator:
    """
    Preisberechnung basierend auf konfigurierbaren Regeln
    """
    
    def __init__(self, config: PricingConfig):
        self.config = config
    
    def calculate_price(self, request: PriceCalculationRequest) -> dict:
        """
        Berechnet Preisspanne basierend auf Eingaben
        
        Returns:
            dict mit keys: preis_min, preis_max, berechnungsdetails
        """
        try:
            # 1. Berechne Fläche
            flaeche_qm = self._calculate_flaeche(request)
            
            # 2. Berechne Basis-Arbeitskosten
            arbeitskosten = self._calculate_arbeitskosten(request, flaeche_qm)
            
            # 3. Spachtelkosten
            spachtelkosten = self._calculate_spachtelkosten(request, flaeche_qm)
            
            # 4. Aufschläge (Zustand, Raumhöhe)
            aufschlaege = self._calculate_aufschlaege(request, arbeitskosten)
            
            # 5. Summe bilden
            basispreis = arbeitskosten + spachtelkosten + aufschlaege
            
            # 6. Interne Pauschale (unsichtbar)
            basispreis += self.config.interne_pauschale
            
            # 7. Mindestauftrag
            if basispreis < self.config.mindestauftrag:
                basispreis = self.config.mindestauftrag
            
            # 8. Preisspanne berechnen
            preis_min = round(basispreis * self.config.spanne_min_faktor, 2)
            preis_max = round(basispreis * self.config.spanne_max_faktor, 2)
            
            # Berechnungsdetails für Admin
            details = {
                "flaeche_qm": round(flaeche_qm, 2),
                "arbeitskosten": round(arbeitskosten, 2),
                "spachtelkosten": round(spachtelkosten, 2),
                "aufschlaege": round(aufschlaege, 2),
                "interne_pauschale": self.config.interne_pauschale,
                "basispreis_vor_mindest": round(arbeitskosten + spachtelkosten + aufschlaege + self.config.interne_pauschale, 2),
                "basispreis_final": round(basispreis, 2),
                "mindestauftrag_angewendet": basispreis == self.config.mindestauftrag
            }
            
            return {
                "preis_min": preis_min,
                "preis_max": preis_max,
                "berechnungsdetails": details
            }
            
        except Exception as e:
            logger.error(f"Price calculation error: {e}")
            raise
    
    def _calculate_flaeche(self, request: PriceCalculationRequest) -> float:
        """Berechnet Gesamtfläche in m²"""
        if request.groesse_typ == "raeume":
            # Durchschnittlich 30m² pro Raum (Wand + Decke kombiniert)
            return float(request.anzahl_raeume) * 30.0
        else:
            return float(request.wandflaeche_qm)
    
    def _calculate_arbeitskosten(self, request: PriceCalculationRequest, flaeche_qm: float) -> float:
        """Berechnet Basis-Arbeitskosten für Wände und Decken"""
        kosten = 0.0
        
        # Prüfe welche Leistungen ausgewählt wurden
        if "waende-decken" in request.leistungen:
            # Annahme: 70% Wand, 30% Decke
            wand_anteil = flaeche_qm * 0.7
            decke_anteil = flaeche_qm * 0.3
            
            # Basispreis
            preis_wand = self.config.wand_weiss
            preis_decke = self.config.decke_weiss
            
            # Aufschlag für bunt
            if request.farbe == "bunt":
                preis_wand += self.config.aufschlag_bunt
                preis_decke += self.config.aufschlag_bunt
            
            kosten += (wand_anteil * preis_wand) + (decke_anteil * preis_decke)
        
        # Andere Leistungen haben Pauschalpreise (vereinfacht)
        if "lackierung" in request.leistungen:
            kosten += flaeche_qm * 10.0  # Pauschal
        if "tapezieren" in request.leistungen:
            kosten += flaeche_qm * 12.0  # Pauschal
        if "spachteln" in request.leistungen:
            # Wird separat über Spachtelstufe berechnet
            pass
        if "boden" in request.leistungen:
            kosten += flaeche_qm * 15.0  # Pauschal
        if "schimmel" in request.leistungen:
            kosten += 250.0  # Pauschale für Schimmelsanierung
        
        return kosten
    
    def _calculate_spachtelkosten(self, request: PriceCalculationRequest, flaeche_qm: float) -> float:
        """Berechnet Spachtelkosten basierend auf Stufe"""
        if request.spachtelstufe == "keine":
            return 0.0
        elif request.spachtelstufe == "q2":
            return flaeche_qm * self.config.spachtel_q2
        elif request.spachtelstufe == "q3":
            return flaeche_qm * self.config.spachtel_q3
        elif request.spachtelstufe == "q4":
            return flaeche_qm * self.config.spachtel_q4
        return 0.0
    
    def _calculate_aufschlaege(self, request: PriceCalculationRequest, arbeitskosten: float) -> float:
        """Berechnet prozentuale Aufschläge"""
        aufschlaege = 0.0
        
        # Zustand Altbau
        if request.zustand == "altbau":
            aufschlaege += arbeitskosten * self.config.zuschlag_altbau
        elif request.zustand == "renovierung":
            aufschlaege += arbeitskosten * 0.25  # 25% für renovierungsbedürftig
        
        # Raumhöhe
        if request.raumhoehe == "hoch":
            aufschlaege += arbeitskosten * self.config.zuschlag_raumhoehe_hoch
        elif request.raumhoehe == "sehr-hoch":  # Falls es eine solche Option gibt
            aufschlaege += arbeitskosten * 0.20
        
        return aufschlaege


async def get_pricing_config(db):
    """Holt aktuelle Preiskonfiguration aus DB"""
    config_doc = await db.pricing_config.find_one({"id": "pricing_config"})
    
    if not config_doc:
        # Erstelle Default-Config
        default_config = PricingConfig()
        await db.pricing_config.insert_one(default_config.dict())
        return default_config
    
    return PricingConfig(**config_doc)


async def update_pricing_config(db, updates: dict):
    """Aktualisiert Preiskonfiguration"""
    result = await db.pricing_config.update_one(
        {"id": "pricing_config"},
        {"$set": updates}
    )
    return result.modified_count > 0
