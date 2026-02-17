import os
import secrets
import hashlib
from datetime import datetime, timedelta
from typing import Optional

# In-Memory Token Store (für Production sollte Redis verwendet werden)
_active_tokens = {}


class AuthService:
    def __init__(self):
        self.admin_password = os.environ.get('ADMIN_PASSWORD', 'ocean2024')
        self.token_expiry_hours = 24
    
    def verify_password(self, password: str) -> bool:
        """Verifiziert Admin-Password"""
        return password == self.admin_password
    
    def generate_token(self) -> str:
        """Generiert ein neues Auth-Token"""
        token = secrets.token_urlsafe(32)
        expiry = datetime.utcnow() + timedelta(hours=self.token_expiry_hours)
        _active_tokens[token] = expiry
        return token
    
    def verify_token(self, token: str) -> bool:
        """Verifiziert ein Auth-Token"""
        if token not in _active_tokens:
            return False
        
        expiry = _active_tokens[token]
        if datetime.utcnow() > expiry:
            # Token abgelaufen
            del _active_tokens[token]
            return False
        
        return True
    
    def invalidate_token(self, token: str):
        """Invalidiert ein Token (Logout)"""
        if token in _active_tokens:
            del _active_tokens[token]


# Singleton instance
auth_service = AuthService()
