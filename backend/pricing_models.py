from pydantic import BaseModel
from typing import Optional


class PricingConfig(BaseModel):
    """Preisregeln Konfiguration"""
    id: str = "pricing_config"
    
    # Basispreise (netto)
    wand_weiss: float = 8.10
    decke_weiss: float = 8.50
    aufschlag_bunt: float = 2.50
    
    # Spachtelstufen
    spachtel_q2: float = 7.00
    spachtel_q3: float = 13.00
    spachtel_q4: float = 21.00
    
    # Aufschläge (Prozent als Dezimalzahl, z.B. 0.15 = 15%)
    zuschlag_altbau: float = 0.15
    zuschlag_raumhoehe_hoch: float = 0.10
    
    # Weitere Regeln
    mindestauftrag: float = 300.00
    interne_pauschale: float = 60.00
    
    # Preisspanne
    spanne_min_faktor: float = 0.95
    spanne_max_faktor: float = 1.15
    
    class Config:
        json_schema_extra = {
            "example": {
                "wand_weiss": 8.10,
                "decke_weiss": 8.50,
                "aufschlag_bunt": 2.50,
                "spachtel_q2": 7.00,
                "spachtel_q3": 13.00,
                "spachtel_q4": 21.00,
                "zuschlag_altbau": 0.15,
                "zuschlag_raumhoehe_hoch": 0.10,
                "mindestauftrag": 300.00,
                "interne_pauschale": 60.00,
                "spanne_min_faktor": 0.95,
                "spanne_max_faktor": 1.15
            }
        }


class PricingConfigUpdate(BaseModel):
    """Update Model für Preisregeln"""
    wand_weiss: Optional[float] = None
    decke_weiss: Optional[float] = None
    aufschlag_bunt: Optional[float] = None
    spachtel_q2: Optional[float] = None
    spachtel_q3: Optional[float] = None
    spachtel_q4: Optional[float] = None
    zuschlag_altbau: Optional[float] = None
    zuschlag_raumhoehe_hoch: Optional[float] = None
    mindestauftrag: Optional[float] = None
    interne_pauschale: Optional[float] = None
    spanne_min_faktor: Optional[float] = None
    spanne_max_faktor: Optional[float] = None


class PriceCalculationRequest(BaseModel):
    """Request für Preisberechnung"""
    plz: str
    objektart: str
    leistungen: list[str]
    groesse_typ: str
    anzahl_raeume: Optional[int] = None
    wandflaeche_qm: Optional[float] = None
    epoxid_flaeche_qm: Optional[float] = None
    raumhoehe: str
    zustand: str
    farbe: str
    spachtelstufe: str
    zusatzoptionen: list[str] = []


class PriceCalculationResponse(BaseModel):
    """Response für Preisberechnung"""
    success: bool
    preis_min: float
    preis_max: float
    berechnungsdetails: dict
    hinweis: str = "Unverbindliche Schätzung. Finaler Preis nach kurzer Prüfung/Fotos."
