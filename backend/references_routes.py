from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, Header
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
import os
import uuid
import shutil
from pathlib import Path
from auth_service import auth_service

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'ocean_color')]

router = APIRouter(prefix="/api/references", tags=["references"])

# Upload directory
UPLOAD_DIR = Path("/app/backend/uploads/references")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Models
class ReferenceBase(BaseModel):
    company: str
    title: str
    description: str
    category: str
    location: Optional[str] = None
    services: List[str] = []
    duration: Optional[str] = None
    featured: bool = False
    active: bool = True
    order: int = 0
    # Optional Vorher/Nachher fields for future use
    before_image: Optional[str] = None
    after_image: Optional[str] = None

class ReferenceCreate(ReferenceBase):
    image: Optional[str] = None

class ReferenceUpdate(BaseModel):
    company: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    services: Optional[List[str]] = None
    duration: Optional[str] = None
    featured: Optional[bool] = None
    active: Optional[bool] = None
    order: Optional[int] = None
    image: Optional[str] = None
    before_image: Optional[str] = None
    after_image: Optional[str] = None

class ReferenceResponse(ReferenceBase):
    id: str
    image: Optional[str] = None
    created_at: str
    updated_at: str

# Helper: Verify admin token using AuthService
async def verify_admin_token(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Nicht autorisiert")
    
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
    
    # Use auth_service to verify token
    if not auth_service.verify_token(token):
        raise HTTPException(status_code=401, detail="Ungültiger Token")
    
    return True

# Routes
@router.get("", response_model=List[ReferenceResponse])
async def get_references(active_only: bool = False):
    """Get all references (public endpoint)"""
    query = {"active": True} if active_only else {}
    references = await db.references.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    return references

@router.get("/admin", response_model=List[ReferenceResponse])
async def get_references_admin(_: bool = Depends(verify_admin_token)):
    """Get all references including inactive (admin only)"""
    references = await db.references.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return references

@router.get("/{reference_id}", response_model=ReferenceResponse)
async def get_reference(reference_id: str):
    """Get single reference"""
    reference = await db.references.find_one({"id": reference_id}, {"_id": 0})
    if not reference:
        raise HTTPException(status_code=404, detail="Referenz nicht gefunden")
    return reference

@router.post("", response_model=ReferenceResponse)
async def create_reference(
    reference: ReferenceCreate,
    _: bool = Depends(verify_admin_token)
):
    """Create new reference (admin only)"""
    
    # Get max order
    max_order_ref = await db.references.find_one(sort=[("order", -1)])
    max_order = max_order_ref.get("order", 0) + 1 if max_order_ref else 0
    
    now = datetime.now(timezone.utc).isoformat()
    reference_dict = reference.model_dump()
    reference_dict["id"] = str(uuid.uuid4())
    reference_dict["order"] = max_order
    reference_dict["created_at"] = now
    reference_dict["updated_at"] = now
    
    await db.references.insert_one(reference_dict)
    
    # Remove MongoDB _id before returning
    reference_dict.pop("_id", None)
    
    return reference_dict

@router.put("/{reference_id}", response_model=ReferenceResponse)
async def update_reference(
    reference_id: str,
    reference: ReferenceUpdate,
    _: bool = Depends(verify_admin_token)
):
    """Update reference (admin only)"""
    
    existing = await db.references.find_one({"id": reference_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Referenz nicht gefunden")
    
    update_data = {k: v for k, v in reference.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.references.update_one(
        {"id": reference_id},
        {"$set": update_data}
    )
    
    updated = await db.references.find_one({"id": reference_id}, {"_id": 0})
    return updated

@router.delete("/{reference_id}")
async def delete_reference(reference_id: str, _: bool = Depends(verify_admin_token)):
    """Delete reference (admin only)"""
    
    existing = await db.references.find_one({"id": reference_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Referenz nicht gefunden")
    
    # Delete associated image if exists
    if existing.get("image") and existing["image"].startswith("/uploads/"):
        image_path = Path("/app/backend") / existing["image"].lstrip("/")
        if image_path.exists():
            image_path.unlink()
    
    await db.references.delete_one({"id": reference_id})
    return {"success": True, "message": "Referenz gelöscht"}

@router.post("/{reference_id}/toggle-active")
async def toggle_active(reference_id: str, _: bool = Depends(verify_admin_token)):
    """Toggle reference active status (admin only)"""
    
    existing = await db.references.find_one({"id": reference_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Referenz nicht gefunden")
    
    new_status = not existing.get("active", True)
    await db.references.update_one(
        {"id": reference_id},
        {"$set": {"active": new_status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"success": True, "active": new_status}

@router.post("/{reference_id}/toggle-featured")
async def toggle_featured(reference_id: str, _: bool = Depends(verify_admin_token)):
    """Toggle reference featured status (admin only)"""
    
    existing = await db.references.find_one({"id": reference_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Referenz nicht gefunden")
    
    new_status = not existing.get("featured", False)
    await db.references.update_one(
        {"id": reference_id},
        {"$set": {"featured": new_status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"success": True, "featured": new_status}

@router.post("/reorder")
async def reorder_references(order: List[str], _: bool = Depends(verify_admin_token)):
    """Reorder references (admin only)"""
    
    for index, ref_id in enumerate(order):
        await db.references.update_one(
            {"id": ref_id},
            {"$set": {"order": index, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
    
    return {"success": True}

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    authorization: str = Form(None)
):
    """Upload reference image (admin only)"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Nicht autorisiert")
    
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
    token_doc = await db.admin_tokens.find_one({"token": token})
    if not token_doc:
        raise HTTPException(status_code=401, detail="Ungültiger Token")
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Ungültiger Dateityp")
    
    # Generate unique filename
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    filename = f"{uuid.uuid4()}.{ext}"
    filepath = UPLOAD_DIR / filename
    
    # Save file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return the URL path
    return {"url": f"/uploads/references/{filename}"}

@router.get("/categories/list")
async def get_categories():
    """Get all unique categories"""
    categories = await db.references.distinct("category")
    return {"categories": categories}

# Initialize with default data from mock if collection is empty
@router.post("/init")
async def initialize_references(_: bool = Depends(verify_admin_token)):
    """Initialize references from mock data (admin only, one-time use)"""
    
    count = await db.references.count_documents({})
    if count > 0:
        return {"success": False, "message": "Referenzen existieren bereits", "count": count}
    
    # Default references from mock.js
    default_references = [
        {
            "id": str(uuid.uuid4()),
            "company": "Scheidt & Bachmann System Technik GmbH",
            "title": "Umfassende Sanierung & Ausbau",
            "description": "Im Rahmen einer umfassenden Sanierung wurden neue Trockenbau- und Brandschutzwände erstellt sowie Akustikdecken und OWA-Decken montiert. Zusätzlich erfolgte die Herstellung und Anpassung von Fensterbänken, der Einbau von Revisionsklappen sowie die Verlegung von Teppichböden. Abschließend wurden sämtliche Malerarbeiten ausgeführt.",
            "services": ["Trockenbau", "Brandschutz", "Akustikdecken", "Malerarbeiten", "Bodenbeläge"],
            "duration": "ca. 6 Monate",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/dvv84v33_scheidt.jpg.JPG",
            "category": "Gewerbe",
            "featured": True,
            "active": True,
            "order": 0,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "Hamburger Kinder- und Jugendhilfe e.V.",
            "title": "Renovierungsarbeiten",
            "description": "Für die Einrichtung werden regelmäßig Renovierungs- und Modernisierungsarbeiten durchgeführt – von Malerarbeiten bis hin zu Bodenbelägen und Kücheneinbauten.",
            "services": ["Malerarbeiten", "Bodenbeläge", "Küchenmontage"],
            "duration": "Laufende Zusammenarbeit",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/dsml5e51_kjh.jpg.png",
            "category": "Soziale Einrichtung",
            "featured": True,
            "active": True,
            "order": 1,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "Witt & Hirschfeld",
            "title": "Wohnungsrenovierungen & Schimmelsanierung",
            "description": "Renovierung von Mietwohnungen sowie fachgerechte Schimmelsanierungen im Bestand.",
            "services": ["Wohnungsrenovierung", "Schimmelsanierung"],
            "duration": "Laufende Zusammenarbeit",
            "image": "https://images.unsplash.com/photo-1735053142513-264440093036?w=800",
            "category": "Immobilienverwaltung",
            "featured": True,
            "active": True,
            "order": 2,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "TalkTools GmbH",
            "title": "Trockenbau-Trennwände & Malerarbeiten",
            "description": "Errichtung neuer Raumstrukturen durch Trockenbau sowie anschließende Oberflächenarbeiten.",
            "services": ["Trockenbau", "Malerarbeiten"],
            "duration": "ca. 3 Wochen",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/jdcc2d9u_talktools.jpg.png",
            "category": "Gewerbe",
            "featured": False,
            "active": True,
            "order": 3,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "Goldbeck",
            "title": "Malerarbeiten & Trockenbau",
            "description": "Ausführung von Ausbau- und Oberflächenarbeiten im gewerblichen Umfeld.",
            "services": ["Malerarbeiten", "Trockenbau"],
            "duration": "ca. 3–4 Monate",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/8df47gl4_goldbeck.jpg.png",
            "category": "Gewerbe",
            "featured": True,
            "active": True,
            "order": 4,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "Talyo Property Services GmbH",
            "title": "Malerarbeiten für Verwaltungsobjekte",
            "description": "Durchführung von Renovierungsmaßnahmen in betreuten Immobilien.",
            "services": ["Malerarbeiten", "Renovierung"],
            "duration": "ca. 4 Wochen",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/zh14r3cl_talyo.jpg.png",
            "category": "Immobilienverwaltung",
            "featured": False,
            "active": True,
            "order": 5,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "company": "Ahoi Hotel",
            "title": "Innenrenovierung Hotel",
            "description": "Innenrenovierung im Hotelbereich.",
            "services": ["Malerarbeiten"],
            "duration": "ca. 8 Wochen",
            "image": "https://customer-assets.emergentagent.com/job_a9b8075f-4653-4fae-a7fc-cfa2bb720c07/artifacts/x44gbhtv_moin-moin.png",
            "category": "Hotellerie",
            "featured": True,
            "active": True,
            "order": 6,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.references.insert_many(default_references)
    return {"success": True, "message": f"{len(default_references)} Referenzen initialisiert"}
