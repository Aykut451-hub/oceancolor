from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header, Query
from fastapi.responses import StreamingResponse
from typing import List, Optional
import json
import os
import shutil
from pathlib import Path
import logging
from datetime import datetime
import csv
import io

from models import (
    LeadCreate, 
    Lead, 
    LeadResponse, 
    LeadUpdate,
    AdminLoginRequest,
    AdminLoginResponse
)
from pricing_models import (
    PricingConfig,
    PricingConfigUpdate,
    PriceCalculationRequest,
    PriceCalculationResponse
)
from pricing_calculator import (
    PricingCalculator,
    get_pricing_config,
    update_pricing_config
)
from email_service import email_service
from auth_service import auth_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")

# Upload directory
UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


# Helper: Get DB collection
def get_leads_collection(db):
    return db.leads


# Helper: Save uploaded files
async def save_uploaded_files(files: List[UploadFile]) -> List[str]:
    """Speichert hochgeladene Dateien und gibt URLs zurück"""
    file_urls = []
    
    for file in files:
        if file.filename:
            # Generiere einzigartigen Dateinamen
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            file_extension = Path(file.filename).suffix
            safe_filename = f"{timestamp}_{file.filename}"
            
            file_path = UPLOAD_DIR / safe_filename
            
            # Speichere Datei
            with file_path.open("wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # URL für Frontend (relative path)
            file_url = f"/uploads/{safe_filename}"
            file_urls.append(file_url)
            
            logger.info(f"File saved: {safe_filename}")
    
    return file_urls


@router.post("/leads", response_model=LeadResponse)
async def create_lead(
    calculator_data: str = Form(...),
    contact_data: str = Form(...),
    price_data: str = Form(...),
    files: Optional[List[UploadFile]] = File(None)
):
    """
    Erstellt einen neuen Calculator-Lead
    
    Accepts multipart/form-data with:
    - calculator_data: JSON string
    - contact_data: JSON string
    - price_data: JSON string
    - files: Optional list of image files (max 5)
    """
    try:
        # Parse JSON data
        calc_data = json.loads(calculator_data)
        cont_data = json.loads(contact_data)
        price_data_obj = json.loads(price_data)
        
        # Validate file count
        if files and len(files) > 5:
            raise HTTPException(status_code=400, detail="Maximum 5 files allowed")
        
        # Save uploaded files
        foto_urls = []
        if files:
            foto_urls = await save_uploaded_files(files)
        
        # Create Lead object
        lead_id = f"LEAD-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        lead = Lead(
            id=lead_id,
            # Calculator data
            plz=calc_data['plz'],
            objektart=calc_data['objektart'],
            leistungen=calc_data['leistungen'],
            groesse_typ=calc_data['groesseOption'],
            anzahl_raeume=calc_data.get('anzahlRaeume'),
            wandflaeche_qm=calc_data.get('wandflaeche'),
            raumhoehe=calc_data['raumhoehe'],
            zustand=calc_data['zustand'],
            farbe=calc_data['farbe'],
            spachtelstufe=calc_data['spachtelstufe'],
            zusatzoptionen=calc_data.get('zusatzoptionen', []),
            # Contact data
            name=cont_data['name'],
            telefon=cont_data['telefon'],
            email=cont_data['email'],
            rueckruf_zeit=cont_data.get('rueckrufZeit', ''),
            bemerkung=cont_data.get('bemerkung', ''),
            # Price data
            preis_min=price_data_obj['min'],
            preis_max=price_data_obj['max'],
            # Files
            foto_urls=foto_urls
        )
        
        # Save to database
        from server import db
        leads_collection = get_leads_collection(db)
        await leads_collection.insert_one(lead.dict())
        
        # Send email notification
        try:
            email_service.send_lead_notification(lead.dict())
        except Exception as e:
            logger.error(f"Failed to send email notification: {e}")
            # Continue anyway - lead is saved
        
        logger.info(f"Lead created: {lead_id}")
        
        return LeadResponse(
            success=True,
            lead_id=lead_id,
            message="Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen."
        )
        
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON data: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON data")
    except Exception as e:
        logger.error(f"Error creating lead: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= ADMIN ENDPOINTS =============

@router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(request: AdminLoginRequest):
    """Admin Login"""
    if not auth_service.verify_password(request.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    token = auth_service.generate_token()
    
    return AdminLoginResponse(
        success=True,
        token=token,
        message="Login successful"
    )


def verify_admin_token(authorization: Optional[str] = Header(None)):
    """Dependency to verify admin token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    # Extract token from "Bearer <token>"
    try:
        token = authorization.split(" ")[1]
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    if not auth_service.verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    return token


@router.get("/admin/leads")
async def get_all_leads(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    authorization: str = Header(None)
):
    """Get all leads with optional filtering"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        leads_collection = get_leads_collection(db)
        
        # Build query
        query = {}
        if status:
            query['status'] = status
        if search:
            # Search in PLZ, name, email
            query['$or'] = [
                {'plz': {'$regex': search, '$options': 'i'}},
                {'name': {'$regex': search, '$options': 'i'}},
                {'email': {'$regex': search, '$options': 'i'}}
            ]
        
        # Get leads sorted by created_at desc
        leads = await leads_collection.find(query).sort('created_at', -1).to_list(1000)
        
        return {
            "success": True,
            "count": len(leads),
            "leads": leads
        }
        
    except Exception as e:
        logger.error(f"Error fetching leads: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin/leads/{lead_id}")
async def get_lead_by_id(
    lead_id: str,
    authorization: str = Header(None)
):
    """Get single lead by ID"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        leads_collection = get_leads_collection(db)
        
        lead = await leads_collection.find_one({"id": lead_id}, {"_id": 0})
        
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return {
            "success": True,
            "lead": lead
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/admin/leads/{lead_id}")
async def update_lead(
    lead_id: str,
    update_data: LeadUpdate,
    authorization: str = Header(None)
):
    """Update lead status or notes"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        leads_collection = get_leads_collection(db)
        
        # Build update dict
        update_dict = {}
        if update_data.status:
            update_dict['status'] = update_data.status
        if update_data.admin_notizen is not None:
            update_dict['admin_notizen'] = update_data.admin_notizen
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No update data provided")
        
        result = await leads_collection.update_one(
            {"id": lead_id},
            {"$set": update_dict}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return {
            "success": True,
            "message": "Lead updated successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin/export")
async def export_leads_csv(
    authorization: str = Header(None)
):
    """Export all leads as CSV"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        leads_collection = get_leads_collection(db)
        
        leads = await leads_collection.find().sort('created_at', -1).to_list(1000)
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Header
        writer.writerow([
            'Lead ID', 'Status', 'Erstellt', 'PLZ', 'Objektart', 'Leistungen',
            'Größe', 'Raumhöhe', 'Zustand', 'Farbe', 'Spachtelstufe',
            'Preis Min', 'Preis Max', 'Name', 'Telefon', 'E-Mail', 'Rückruf Zeit'
        ])
        
        # Data
        for lead in leads:
            leistungen = ', '.join(lead.get('leistungen', []))
            groesse = f"{lead.get('anzahl_raeume', '')} Räume" if lead.get('groesse_typ') == 'raeume' else f"{lead.get('wandflaeche_qm', '')} m²"
            
            writer.writerow([
                lead.get('id', ''),
                lead.get('status', ''),
                lead.get('created_at', ''),
                lead.get('plz', ''),
                lead.get('objektart', ''),
                leistungen,
                groesse,
                lead.get('raumhoehe', ''),
                lead.get('zustand', ''),
                lead.get('farbe', ''),
                lead.get('spachtelstufe', ''),
                lead.get('preis_min', ''),
                lead.get('preis_max', ''),
                lead.get('name', ''),
                lead.get('telefon', ''),
                lead.get('email', ''),
                lead.get('rueckruf_zeit', '')
            ])
        
        output.seek(0)
        
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename=leads_export_{datetime.now().strftime('%Y%m%d')}.csv"
            }
        )
        
    except Exception as e:
        logger.error(f"Error exporting leads: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin/stats")
async def get_admin_stats(
    authorization: str = Header(None)
):
    """Get dashboard statistics"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        leads_collection = get_leads_collection(db)
        
        total_leads = await leads_collection.count_documents({})
        new_leads = await leads_collection.count_documents({"status": "neu"})
        kontaktiert = await leads_collection.count_documents({"status": "kontaktiert"})
        gewonnen = await leads_collection.count_documents({"status": "gewonnen"})
        
        return {
            "success": True,
            "stats": {
                "total": total_leads,
                "neu": new_leads,
                "kontaktiert": kontaktiert,
                "gewonnen": gewonnen
            }
        }
        
    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============= PRICING ENDPOINTS =============

@router.post("/calculate-price", response_model=PriceCalculationResponse)
async def calculate_price(request: PriceCalculationRequest):
    """
    Berechnet Preisspanne basierend auf konfigurierbaren Regeln
    """
    try:
        from server import db
        
        # Hole aktuelle Preiskonfiguration
        config = await get_pricing_config(db)
        
        # Berechne Preis
        calculator = PricingCalculator(config)
        result = calculator.calculate_price(request)
        
        return PriceCalculationResponse(
            success=True,
            preis_min=result["preis_min"],
            preis_max=result["preis_max"],
            berechnungsdetails=result["berechnungsdetails"]
        )
        
    except Exception as e:
        logger.error(f"Price calculation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin/pricing")
async def get_pricing_config_endpoint(
    authorization: str = Header(None)
):
    """Get current pricing configuration"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        config = await get_pricing_config(db)
        
        return {
            "success": True,
            "config": config.dict()
        }
        
    except Exception as e:
        logger.error(f"Error fetching pricing config: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/admin/pricing")
async def update_pricing_config_endpoint(
    updates: PricingConfigUpdate,
    authorization: str = Header(None)
):
    """Update pricing configuration"""
    verify_admin_token(authorization)
    
    try:
        from server import db
        
        # Nur nicht-None Werte updaten
        update_dict = {k: v for k, v in updates.dict().items() if v is not None}
        
        if not update_dict:
            raise HTTPException(status_code=400, detail="No updates provided")
        
        success = await update_pricing_config(db, update_dict)
        
        if success:
            return {
                "success": True,
                "message": "Preiskonfiguration aktualisiert"
            }
        else:
            raise HTTPException(status_code=500, detail="Update failed")
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating pricing config: {e}")
        raise HTTPException(status_code=500, detail=str(e))
