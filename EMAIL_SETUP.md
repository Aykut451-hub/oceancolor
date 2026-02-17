# Ocean Color - E-Mail Konfiguration

## IONOS SMTP Einrichtung

### Schritt 1: SMTP-Passwort eintragen

Öffnen Sie die Datei `/app/backend/.env` und tragen Sie das SMTP-Passwort ein:

```bash
SMTP_PASSWORD=IHR_PASSWORT_HIER
```

### Schritt 2: Backend neu starten

```bash
sudo supervisorctl restart backend
```

### Schritt 3: Testen

Erstellen Sie einen Test-Lead über den Angebotsrechner. Sie sollten eine E-Mail an `info@ocean-maler.de` erhalten.

## SMTP Konfiguration (Aktuell)

- **Host:** smtp.ionos.de
- **Port:** 587
- **Sicherheit:** STARTTLS
- **Benutzer:** info@ocean-maler.de
- **Von:** info@ocean-maler.de
- **An:** info@ocean-maler.de (konfigurierbar via ADMIN_EMAIL)

## E-Mail Format

**Betreff:**
```
Neue Anfrage – Angebotsrechner – {PLZ} – {Objektart}
```

**Inhalt:**
- Preisspanne
- Projektdetails (PLZ, Objektart, Größe, Leistungen, etc.)
- Kontaktdaten (Name, Telefon, E-Mail, Rückruf-Zeitfenster)
- Bemerkung (falls vorhanden)
- Foto-Links (falls hochgeladen)
- Lead-ID und Zeitstempel

## Fallback-Verhalten

Wenn SMTP nicht erreichbar ist oder Credentials fehlen:
- E-Mail wird NICHT versendet
- Vollständiger E-Mail-Inhalt wird in Backend-Logs geschrieben
- Lead wird trotzdem in Datenbank gespeichert
- Admin kann Lead über `/admin/leads` einsehen

## Logs anzeigen

Backend-Logs (inkl. E-Mail-Status):
```bash
tail -f /var/log/supervisor/backend.out.log
```

Bei SMTP-Fehlern:
```bash
tail -f /var/log/supervisor/backend.err.log
```

## Troubleshooting

### E-Mails werden nicht versendet

1. **Prüfen Sie SMTP_PASSWORD:**
   ```bash
   grep SMTP_PASSWORD /app/backend/.env
   ```
   Sollte NICHT leer sein.

2. **Prüfen Sie Backend-Logs:**
   ```bash
   tail -n 50 /var/log/supervisor/backend.out.log | grep -i smtp
   ```
   Suchen Sie nach "SMTP configured" oder Fehlermeldungen.

3. **Testen Sie SMTP-Verbindung manuell:**
   ```bash
   python3 -c "
   import smtplib
   try:
       with smtplib.SMTP('smtp.ionos.de', 587, timeout=5) as server:
           server.starttls()
           print('✓ SMTP-Verbindung erfolgreich')
   except Exception as e:
       print(f'✗ SMTP-Fehler: {e}')
   "
   ```

4. **Firewall-Probleme:**
   Stellen Sie sicher, dass ausgehende Verbindungen auf Port 587 erlaubt sind.

### Häufige Fehler

**SMTPAuthenticationError:**
- Falsches Passwort
- Falscher Benutzername
- 2FA aktiviert (deaktivieren oder App-Passwort verwenden)

**SMTPConnectError:**
- SMTP-Host falsch (sollte `smtp.ionos.de` sein)
- Port falsch (sollte `587` sein)
- Firewall blockiert Verbindung

**Timeout:**
- Netzwerkproblem
- IONOS SMTP-Server nicht erreichbar

## Alternative ADMIN_EMAIL

Wenn Sie Benachrichtigungen an eine andere E-Mail-Adresse senden möchten:

```bash
# In /app/backend/.env
ADMIN_EMAIL=ihre-andere-email@example.com
```

Dann Backend neu starten:
```bash
sudo supervisorctl restart backend
```

## Support

Bei Problemen mit der E-Mail-Konfiguration:
1. Prüfen Sie die Logs
2. Stellen Sie sicher, dass SMTP_PASSWORD gesetzt ist
3. Testen Sie die SMTP-Verbindung manuell
4. Kontaktieren Sie IONOS Support bei Problemen mit dem SMTP-Server
