/**
 * Step 8: Kontakt Form
 */

import React, { useState } from 'react';
import { User, Mail, Phone, Clock, Upload } from 'lucide-react';
import { StepHeader } from './SharedComponents';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const StepKontakt = ({ formData, setFormData, onFileChange }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      onFileChange(file);
    }
  };

  return (
    <div className="space-y-6" data-testid="step-kontakt">
      <StepHeader 
        title="Ihre Kontaktdaten"
        subtitle="Damit wir Sie für eine kostenlose Besichtigung erreichen können"
      />

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Vor- und Nachname *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Max Mustermann"
              className="pl-10"
              required
              data-testid="input-name"
            />
          </div>
        </div>

        {/* Telefon */}
        <div className="space-y-2">
          <Label htmlFor="telefon">Telefonnummer *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="telefon"
              type="tel"
              value={formData.telefon || ''}
              onChange={(e) => handleChange('telefon', e.target.value)}
              placeholder="040 123 456 78"
              className="pl-10"
              required
              data-testid="input-telefon"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail-Adresse *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ihre@email.de"
              className="pl-10"
              required
              data-testid="input-email"
            />
          </div>
        </div>

        {/* Rückruf-Zeit */}
        <div className="space-y-2">
          <Label htmlFor="rueckrufZeit">Gewünschtes Rückruf-Zeitfenster</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="rueckrufZeit"
              value={formData.rueckrufZeit || ''}
              onChange={(e) => handleChange('rueckrufZeit', e.target.value)}
              placeholder="z.B. Vormittags oder nach 18 Uhr"
              className="pl-10"
              data-testid="input-rueckrufzeit"
            />
          </div>
        </div>

        {/* Foto Upload */}
        <div className="space-y-2">
          <Label htmlFor="foto">Foto hochladen (optional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1e328b] transition-colors">
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              data-testid="input-foto"
            />
            <label htmlFor="foto" className="cursor-pointer">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {formData.foto ? formData.foto.name : 'Klicken Sie hier, um ein Foto hochzuladen'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Max. 5MB</p>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500">
        Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu. 
        Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
};

StepKontakt.validate = (formData) => {
  if (!formData.name || formData.name.trim().length < 2) return false;
  if (!formData.telefon || formData.telefon.trim().length < 6) return false;
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
  return true;
};

StepKontakt.errorMessage = 'Bitte füllen Sie alle Pflichtfelder korrekt aus';

export default StepKontakt;
