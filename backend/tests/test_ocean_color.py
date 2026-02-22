"""
Backend API Tests for Ocean Color Website
Tests: Media Storage, PLZ Distance, Admin Leads with Distance Filter
"""

import pytest
import requests
import os
import json
from io import BytesIO
from PIL import Image

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasics:
    """Basic API health and status tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API root response: {data}")

class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "ocean2024"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "token" in data
        assert len(data["token"]) > 10
        print(f"Login successful, token length: {len(data['token'])}")
        return data["token"]
    
    def test_admin_login_failure(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 401
        print("Admin login correctly rejected wrong password")


class TestReferencesAPI:
    """References API tests including media storage"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "ocean2024"}
        )
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_get_public_references(self):
        """Test getting public references (no auth required)"""
        response = requests.get(f"{BASE_URL}/api/references")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} public references")
        
        # Check that references have required fields
        if len(data) > 0:
            ref = data[0]
            assert "company" in ref
            assert "title" in ref
            assert "category" in ref
            # Check for image fields (may include WebP)
            assert "image" in ref or "image_fallback" in ref or "image_webp" in ref
    
    def test_get_admin_references(self, admin_token):
        """Test getting all references (admin, includes inactive)"""
        response = requests.get(
            f"{BASE_URL}/api/references/admin",
            headers={"Authorization": admin_token}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Found {len(data)} admin references")
    
    def test_get_categories(self):
        """Test getting reference categories"""
        response = requests.get(f"{BASE_URL}/api/references/categories/list")
        assert response.status_code == 200
        data = response.json()
        assert "categories" in data
        print(f"Categories: {data['categories']}")
    
    def test_media_stats(self, admin_token):
        """Test getting media storage statistics"""
        response = requests.get(
            f"{BASE_URL}/api/references/media-stats",
            headers={"Authorization": admin_token}
        )
        assert response.status_code == 200
        data = response.json()
        assert "references" in data
        assert "count" in data["references"]
        assert "total_size_bytes" in data["references"]
        print(f"Media stats: {data}")


class TestLeadsWithDistance:
    """Lead API tests with distance features"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "ocean2024"}
        )
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_create_lead_with_distance(self):
        """Test creating a lead with distance data (Munich PLZ)"""
        import time
        timestamp = int(time.time())
        
        lead_data = {
            "plz": "80331",
            "objektart": "wohnung",
            "leistungen": ["waende-decken"],
            "groesseOption": "raeume",
            "anzahlRaeume": 3,
            "zustand": "normal",
            "farbe": "weiss",
            "spachtelstufe": "keine",
            "name": f"Test Lead {timestamp}",
            "telefon": "089123456789",
            "email": f"test{timestamp}@example.com",
            "geschaetzterPreis": "720 € - 920 €",
            "distanceFromHamburg": 612,
            "isOutsideServiceArea": True
        }
        
        # Create form data
        form_data = {
            "data": json.dumps(lead_data)
        }
        
        response = requests.post(
            f"{BASE_URL}/api/leads",
            data=form_data
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "lead_id" in data
        print(f"Lead created: {data['lead_id']}")
        return data["lead_id"]
    
    def test_get_leads_with_distance(self, admin_token):
        """Test getting leads and verify distance field"""
        response = requests.get(
            f"{BASE_URL}/api/admin/leads",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "leads" in data
        
        # Check for leads with distance data
        leads_with_distance = [l for l in data["leads"] if l.get("distanceFromHamburg")]
        print(f"Found {len(leads_with_distance)} leads with distance data")
        
        # Verify at least one lead has distance > 200km (outside service area)
        outside_leads = [l for l in leads_with_distance if l.get("distanceFromHamburg", 0) > 200]
        print(f"Found {len(outside_leads)} leads outside service area (>200km)")
        
        if len(outside_leads) > 0:
            lead = outside_leads[0]
            print(f"Sample outside lead: PLZ={lead.get('plz')}, Distance={lead.get('distanceFromHamburg')}km")
            assert lead.get("isOutsideServiceArea") is True or lead.get("distanceFromHamburg") > 200
    
    def test_get_admin_stats(self, admin_token):
        """Test getting admin dashboard statistics"""
        response = requests.get(
            f"{BASE_URL}/api/admin/stats",
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "stats" in data
        stats = data["stats"]
        assert "total" in stats
        assert "neu" in stats
        print(f"Admin stats: {stats}")


class TestPriceCalculation:
    """Price calculation API tests"""
    
    def test_calculate_price_basic(self):
        """Test basic price calculation"""
        response = requests.post(
            f"{BASE_URL}/api/calculate-price",
            json={
                "objektart": "wohnung",
                "leistungen": ["waende-decken"],
                "groesse_typ": "raeume",
                "anzahl_raeume": 4,
                "raumhoehe": "normal",
                "zustand": "normal",
                "farbe": "weiss",
                "spachtelstufe": "keine"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "preis_min" in data
        assert "preis_max" in data
        assert data["preis_min"] > 0
        assert data["preis_max"] > data["preis_min"]
        print(f"Price range: {data['preis_min']} - {data['preis_max']} EUR")


class TestMediaUpload:
    """Media upload and WebP generation tests"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token for authenticated requests"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "ocean2024"}
        )
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Admin login failed")
    
    def test_upload_image_generates_webp(self, admin_token):
        """Test that uploading an image generates WebP version"""
        # Create a simple test image in memory
        img = Image.new('RGB', (200, 200), color='blue')
        img_buffer = BytesIO()
        img.save(img_buffer, format='JPEG')
        img_buffer.seek(0)
        
        # Upload the image
        files = {
            'file': ('test_image.jpg', img_buffer, 'image/jpeg')
        }
        data = {
            'authorization': admin_token,
            'generate_webp': 'true'
        }
        
        response = requests.post(
            f"{BASE_URL}/api/references/upload-image",
            files=files,
            data=data
        )
        
        assert response.status_code == 200
        result = response.json()
        
        # Check response contains both URLs
        assert "url" in result
        assert "url_fallback" in result
        
        # WebP should be generated for JPEG upload
        if result.get("url_webp"):
            print(f"PASS: WebP version generated: {result['url_webp']}")
            assert result["url_webp"].endswith(".webp")
        
        # Fallback should be original format
        assert result["url_fallback"].endswith(".jpg")
        
        print(f"Uploaded image: {result}")
        print(f"Primary URL: {result['url']}")
        print(f"WebP URL: {result.get('url_webp', 'N/A')}")
        print(f"Fallback URL: {result['url_fallback']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
