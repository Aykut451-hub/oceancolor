import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_user = os.environ.get('SMTP_USER', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.admin_email = os.environ.get('ADMIN_EMAIL', 'info@oceancolor.de')
        self.from_email = os.environ.get('FROM_EMAIL', self.smtp_user)
        
    def send_lead_notification(self, lead_data: dict) -> bool:
        """
        Sendet E-Mail-Benachrichtigung für neuen Lead
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
            
            # E-Mail erstellen
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = self.admin_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain', 'utf-8'))
            
            # E-Mail senden
            if not self.smtp_user or not self.smtp_password:
                logger.warning("SMTP credentials not configured. Email not sent.")
                logger.info(f"Email would have been sent to: {self.admin_email}")
                logger.info(f"Subject: {subject}")
                logger.info(f"Body:\n{body}")
                return True  # Return True für Development ohne SMTP
            
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Lead notification email sent to {self.admin_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
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
