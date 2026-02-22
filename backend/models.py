from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Literal
from datetime import datetime


class LeadCalculatorData(BaseModel):
    """Calculator-spezifische Daten"""
    plz: str
    objektart: Literal["wohnung", "haus", "gewerbe"]
    leistungen: List[str]
    groesse_typ: Literal["raeume", "flaeche"]
    anzahl_raeume: Optional[int] = None
    wandflaeche_qm: Optional[float] = None
    raumhoehe: Literal["niedrig", "normal", "hoch"]
    zustand: Literal["normal", "altbau", "renovierung"]
    farbe: Literal["weiss", "bunt"]
    spachtelstufe: Literal["keine", "q2", "q3", "q4"]
    zusatzoptionen: List[str] = []


class LeadContactData(BaseModel):
    """Kontakt- und Lead-Daten"""
    name: str
    telefon: str
    email: EmailStr
    rueckruf_zeit: Optional[str] = None
    bemerkung: Optional[str] = None


class LeadPriceData(BaseModel):
    """Preis-Daten"""
    preis_min: float
    preis_max: float
    dauer_schaetzung: Optional[str] = None


class LeadCreate(BaseModel):
    """Request Model für neue Leads"""
    calculator_data: LeadCalculatorData
    contact_data: LeadContactData
    price_data: LeadPriceData


class Lead(BaseModel):
    """Vollständiges Lead Model für DB"""
    id: str = Field(default_factory=lambda: str(datetime.now().timestamp()))
    lead_type: str = "calculator"
    status: Literal["neu", "kontaktiert", "angebot", "gewonnen", "verloren"] = "neu"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Calculator Data
    plz: str
    objektart: str
    leistungen: List[str]
    groesse_typ: str
    anzahl_raeume: Optional[int] = None
    wandflaeche_qm: Optional[float] = None
    raumhoehe: str
    zustand: str
    farbe: str
    spachtelstufe: str
    zusatzoptionen: List[str] = []
    
    # Contact Data
    name: str
    telefon: str
    email: str
    rueckruf_zeit: Optional[str] = None
    bemerkung: Optional[str] = None
    
    # Price Data
    preis_min: float
    preis_max: float
    dauer_schaetzung: Optional[str] = None
    
    # Files
    foto_urls: List[str] = []
    
    # Distance data (from calculator)
    distanceFromHamburg: Optional[int] = None
    isOutsideServiceArea: Optional[bool] = None
    
    # Admin notes
    admin_notizen: str = ""
    
    class Config:
        json_schema_extra = {
            "example": {
                "lead_type": "calculator",
                "status": "neu",
                "plz": "20095",
                "objektart": "wohnung",
                "leistungen": ["waende-decken", "lackierung"],
                "groesse_typ": "raeume",
                "anzahl_raeume": 4,
                "name": "Max Mustermann",
                "telefon": "040 1234 5678",
                "email": "max@example.com",
                "preis_min": 3000,
                "preis_max": 4000
            }
        }


class LeadUpdate(BaseModel):
    """Update Model für Leads"""
    status: Optional[Literal["neu", "kontaktiert", "angebot", "gewonnen", "verloren"]] = None
    admin_notizen: Optional[str] = None


class LeadResponse(BaseModel):
    """Response Model"""
    success: bool
    lead_id: str
    message: str


class AdminLoginRequest(BaseModel):
    """Admin Login Request"""
    password: str


class AdminLoginResponse(BaseModel):
    """Admin Login Response"""
    success: bool
    token: str
    message: str
