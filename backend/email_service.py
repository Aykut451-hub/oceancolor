import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        # IONOS SMTP Configuration
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.ionos.de')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_user = os.environ.get('SMTP_USER', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.from_email = os.environ.get('SMTP_FROM', 'info@ocean-maler.de')
        self.admin_email = os.environ.get('ADMIN_EMAIL', 'info@ocean-maler.de')
        self.use_tls = os.environ.get('SMTP_USE_TLS', 'true').lower() == 'true'
        
        # Check if SMTP is properly configured
        self.smtp_configured = bool(self.smtp_user and self.smtp_password)
        
        if not self.smtp_configured:
            logger.warning("SMTP not fully configured. Emails will be logged only.")
            logger.info(f"Set SMTP_USER and SMTP_PASSWORD in .env to enable email sending.")
        else:
            logger.info(f"SMTP configured: {self.smtp_host}:{self.smtp_port} (TLS: {self.use_tls})")
        
    def send_lead_notification(self, lead_data: dict) -> bool:
        """
        Sendet E-Mail-Benachrichtigung für neuen Lead über IONOS SMTP
        """
        try:
            subject = f"Neue Anfrage – Angebotsrechner – {lead_data['plz']} – {lead_data['objektart'].title()}"
            
            # Leistungen formatieren
            leistungen_text = "\n    • ".join([
                self._format_leistung(l) for l in lead_data['leistungen']
            ])
            
            # Zusatzoptionen formatieren
            zusatzoptionen_text = "Keine"
            if lead_data.get('zusatzoptionen'):
                zusatzoptionen_text = "\n    • ".join([
                    self._format_zusatzoption(z) for z in lead_data['zusatzoptionen']
                ])
            
            # Größe formatieren
            if lead_data['groesse_typ'] == 'raeume':
                groesse_text = f"{lead_data['anzahl_raeume']} Räume"
            else:
                groesse_text = f"{lead_data['wandflaeche_qm']} m² Wandfläche"
            
            # Fotos formatieren
            foto_text = "Keine Fotos hochgeladen"
            if lead_data.get('foto_urls'):
                foto_links = "\n    ".join([f"• {url}" for url in lead_data['foto_urls']])
                foto_text = f"\n    {foto_links}"
            
            # E-Mail Body
            body = f"""
Neue Anfrage über den Angebotsrechner

═══════════════════════════════════════════════
PREISSPANNE
═══════════════════════════════════════════════
{lead_data['preis_min']:,.0f} € - {lead_data['preis_max']:,.0f} €

═══════════════════════════════════════════════
PROJEKTDETAILS
═══════════════════════════════════════════════
PLZ:              {lead_data['plz']}
Objektart:        {lead_data['objektart'].title()}
Größe:            {groesse_text}

Leistungen:
    • {leistungen_text}

Raumhöhe:         {self._format_raumhoehe(lead_data['raumhoehe'])}
Zustand:          {self._format_zustand(lead_data['zustand'])}
Farbe:            {lead_data['farbe'].title()}
Spachtelstufe:    {lead_data['spachtelstufe'].upper()}

Zusatzoptionen:
    • {zusatzoptionen_text}

═══════════════════════════════════════════════
KONTAKTDATEN
═══════════════════════════════════════════════
Name:             {lead_data['name']}
Telefon:          {lead_data['telefon']}
E-Mail:           {lead_data['email']}
Rückruf gewünscht: {lead_data.get('rueckruf_zeit', 'Nicht angegeben')}

"""
            
            # Add bemerkung if present
            if lead_data.get('bemerkung'):
                body += f"Bemerkung:\n{lead_data['bemerkung']}\n\n"
            
            body += f"""═══════════════════════════════════════════════
FOTOS
═══════════════════════════════════════════════
{foto_text}

═══════════════════════════════════════════════
Lead-ID: {lead_data['id']}
Erstellt: {lead_data['created_at'].strftime('%d.%m.%Y %H:%M')} Uhr
═══════════════════════════════════════════════

Diese Anfrage wurde über den Angebotsrechner auf oceancolor.de erstellt.
"""
            
            # Wenn SMTP nicht konfiguriert ist, nur loggen
            if not self.smtp_configured:
                logger.info("="*50)
                logger.info("EMAIL WOULD BE SENT (SMTP not configured)")
                logger.info(f"To: {self.admin_email}")
                logger.info(f"From: {self.from_email}")
                logger.info(f"Subject: {subject}")
                logger.info("="*50)
                logger.info(body)
                logger.info("="*50)
                return True  # Return True für Development ohne SMTP
            
            # E-Mail erstellen und senden
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = self.admin_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # IONOS SMTP mit STARTTLS
            try:
                with smtplib.SMTP(self.smtp_host, self.smtp_port, timeout=10) as server:
                    server.set_debuglevel(0)  # Set to 1 for debugging
                    
                    if self.use_tls:
                        # STARTTLS für IONOS
                        server.starttls()
                        logger.info("STARTTLS initiated")
                    
                    # Login
                    server.login(self.smtp_user, self.smtp_password)
                    logger.info(f"SMTP login successful as {self.smtp_user}")
                    
                    # Send
                    server.send_message(msg)
                    logger.info(f"✓ Lead notification email sent to {self.admin_email}")
                
                return True
                
            except smtplib.SMTPAuthenticationError as e:
                logger.error(f"SMTP Authentication failed: {e}")
                logger.error("Please check SMTP_USER and SMTP_PASSWORD in .env")
                self._log_fallback(subject, body)
                return False
                
            except smtplib.SMTPException as e:
                logger.error(f"SMTP error: {e}")
                self._log_fallback(subject, body)
                return False
                
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            self._log_fallback(subject if 'subject' in locals() else 'Unknown', 
                             body if 'body' in locals() else 'Error creating email body')
            return False
    
    def _log_fallback(self, subject: str, body: str):
        """Fallback: Log email wenn Versand fehlschlägt"""
        logger.info("="*50)
        logger.info("EMAIL FALLBACK (SMTP failed)")
        logger.info(f"Subject: {subject}")
        logger.info("="*50)
        logger.info(body)
        logger.info("="*50)
    
    def _format_leistung(self, leistung: str) -> str:
        mapping = {
            'waende-decken': 'Wände & Decken streichen',
            'lackierung': 'Lackierarbeiten',
            'tapezieren': 'Tapezierarbeiten',
            'spachteln': 'Spachtelarbeiten',
            'boden': 'Bodenbeläge',
            'schimmel': 'Schimmelsanierung'
        }
        return mapping.get(leistung, leistung)
    
    def _format_zusatzoption(self, option: str) -> str:
        mapping = {
            'abkleben': 'Abkleben / Schutz',
            'moebel': 'Möbel bewegen',
            'tueren': 'Türen / Heizkörper lackieren'
        }
        return mapping.get(option, option)
    
    def _format_raumhoehe(self, hoehe: str) -> str:
        mapping = {
            'niedrig': 'unter 2,6m',
            'normal': '2,6m – 3m',
            'hoch': 'über 3m'
        }
        return mapping.get(hoehe, hoehe)
    
    def _format_zustand(self, zustand: str) -> str:
        mapping = {
            'normal': 'Normal',
            'altbau': 'Altbau',
            'renovierung': 'Renovierungsbedürftig'
        }
        return mapping.get(zustand, zustand)


# Singleton instance
email_service = EmailService()
