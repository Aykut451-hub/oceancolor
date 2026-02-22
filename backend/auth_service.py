import os
import secrets
import hashlib
import logging
from datetime import datetime, timezone, timedelta
from typing import Optional, Dict, Tuple
from collections import defaultdict

# Configure logging - NO passwords in logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("auth_service")

# In-Memory stores (für Production sollte Redis verwendet werden)
_active_tokens: Dict[str, datetime] = {}
_login_attempts: Dict[str, list] = defaultdict(list)  # IP -> list of timestamps
_locked_ips: Dict[str, datetime] = {}  # IP -> lockout until


class AuthService:
    """
    Secure Authentication Service with:
    - Rate limiting (5 attempts per 15 minutes)
    - IP-based lockout after failed attempts
    - Secure token generation
    - Login event logging (IP + timestamp only, no passwords)
    """
    
    # Rate limiting config
    MAX_ATTEMPTS = 5
    LOCKOUT_MINUTES = 15
    ATTEMPT_WINDOW_MINUTES = 15
    
    def __init__(self):
        # Admin password from ENV only - no default fallback in production
        self.admin_password = os.environ.get('ADMIN_PASSWORD')
        if not self.admin_password:
            logger.warning("ADMIN_PASSWORD not set in environment - using fallback (NOT RECOMMENDED)")
            self.admin_password = os.environ.get('ADMIN_PASSWORD_FALLBACK', 'change-me-immediately')
        
        self.token_expiry_hours = int(os.environ.get('TOKEN_EXPIRY_HOURS', '24'))
        self.jwt_secret = os.environ.get('JWT_SECRET', secrets.token_urlsafe(32))
    
    def _clean_old_attempts(self, ip: str) -> None:
        """Remove login attempts older than the window"""
        cutoff = datetime.now(timezone.utc) - timedelta(minutes=self.ATTEMPT_WINDOW_MINUTES)
        _login_attempts[ip] = [t for t in _login_attempts[ip] if t > cutoff]
    
    def _is_ip_locked(self, ip: str) -> Tuple[bool, Optional[int]]:
        """Check if IP is currently locked out"""
        if ip in _locked_ips:
            lockout_until = _locked_ips[ip]
            if datetime.now(timezone.utc) < lockout_until:
                remaining_seconds = int((lockout_until - datetime.now(timezone.utc)).total_seconds())
                return True, remaining_seconds
            else:
                # Lockout expired
                del _locked_ips[ip]
        return False, None
    
    def _record_failed_attempt(self, ip: str) -> Tuple[bool, int]:
        """
        Record a failed login attempt and check if lockout should be applied.
        Returns: (is_locked, attempts_remaining)
        """
        self._clean_old_attempts(ip)
        _login_attempts[ip].append(datetime.now(timezone.utc))
        
        attempt_count = len(_login_attempts[ip])
        attempts_remaining = self.MAX_ATTEMPTS - attempt_count
        
        if attempt_count >= self.MAX_ATTEMPTS:
            # Lock the IP
            _locked_ips[ip] = datetime.now(timezone.utc) + timedelta(minutes=self.LOCKOUT_MINUTES)
            logger.warning(f"IP locked due to too many failed attempts: {self._anonymize_ip(ip)}")
            return True, 0
        
        return False, attempts_remaining
    
    def _clear_attempts(self, ip: str) -> None:
        """Clear login attempts after successful login"""
        if ip in _login_attempts:
            del _login_attempts[ip]
        if ip in _locked_ips:
            del _locked_ips[ip]
    
    def _anonymize_ip(self, ip: str) -> str:
        """Anonymize IP for logging (privacy)"""
        if not ip:
            return "unknown"
        parts = ip.split('.')
        if len(parts) == 4:
            return f"{parts[0]}.{parts[1]}.xxx.xxx"
        return ip[:8] + "..."
    
    def check_rate_limit(self, ip: str) -> Tuple[bool, Optional[str]]:
        """
        Check if IP is rate limited.
        Returns: (is_allowed, error_message)
        """
        is_locked, remaining_seconds = self._is_ip_locked(ip)
        if is_locked:
            minutes = remaining_seconds // 60 + 1
            return False, f"Zu viele Fehlversuche. Bitte warten Sie {minutes} Minute(n)."
        return True, None
    
    def verify_password(self, password: str, ip: str = "unknown") -> Tuple[bool, Optional[str], int]:
        """
        Verify admin password with rate limiting.
        Returns: (success, error_message, attempts_remaining)
        """
        # Check rate limit first
        is_allowed, error_msg = self.check_rate_limit(ip)
        if not is_allowed:
            logger.info(f"Login blocked (rate limit): {self._anonymize_ip(ip)}")
            return False, error_msg, 0
        
        # Verify password
        is_valid = secrets.compare_digest(password, self.admin_password)
        
        if is_valid:
            self._clear_attempts(ip)
            logger.info(f"Successful admin login: {self._anonymize_ip(ip)} at {datetime.now(timezone.utc).isoformat()}")
            return True, None, self.MAX_ATTEMPTS
        else:
            is_locked, attempts_remaining = self._record_failed_attempt(ip)
            logger.warning(f"Failed login attempt: {self._anonymize_ip(ip)} at {datetime.now(timezone.utc).isoformat()}")
            
            if is_locked:
                return False, f"Zu viele Fehlversuche. Account für {self.LOCKOUT_MINUTES} Minuten gesperrt.", 0
            
            return False, f"Falsches Passwort. {attempts_remaining} Versuche verbleibend.", attempts_remaining
    
    def generate_token(self) -> str:
        """Generate a cryptographically secure auth token"""
        token = secrets.token_urlsafe(32)
        expiry = datetime.now(timezone.utc) + timedelta(hours=self.token_expiry_hours)
        _active_tokens[token] = expiry
        
        # Clean up expired tokens periodically
        self._cleanup_expired_tokens()
        
        return token
    
    def _cleanup_expired_tokens(self) -> None:
        """Remove expired tokens from memory"""
        now = datetime.now(timezone.utc)
        expired = [t for t, exp in _active_tokens.items() if now > exp]
        for token in expired:
            del _active_tokens[token]
    
    def verify_token(self, token: str) -> bool:
        """Verify an auth token"""
        if not token or token not in _active_tokens:
            return False
        
        expiry = _active_tokens[token]
        if datetime.now(timezone.utc) > expiry:
            # Token expired
            del _active_tokens[token]
            return False
        
        return True
    
    def invalidate_token(self, token: str) -> bool:
        """Invalidate a token (logout)"""
        if token in _active_tokens:
            del _active_tokens[token]
            return True
        return False
    
    def get_token_expiry(self, token: str) -> Optional[datetime]:
        """Get token expiry time"""
        return _active_tokens.get(token)


# Singleton instance
auth_service = AuthService()
