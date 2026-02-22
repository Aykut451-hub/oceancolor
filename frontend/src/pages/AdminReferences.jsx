import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  Upload,
  X,
  GripVertical,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Predefined categories
const CATEGORIES = [
  'Gewerbe',
  'Wohnung',
  'Immobilienverwaltung',
  'Soziale Einrichtung',
  'Hotellerie',
  'Balkon',
  'Fassade',
  'Logistik'
];

// Predefined services
const SERVICES = [
  'Malerarbeiten',
  'Trockenbau',
  'Bodenbeläge',
  'Brandschutz',
  'Akustikdecken',
  'Fassadensanierung',
  'Balkonsanierung',
  'Schimmelsanierung',
  'Lackierarbeiten',
  'Tapezierarbeiten',
  'Spachtelarbeiten',
  'Renovierung',
  'Küchenmontage',
  'Regalmontage'
];

// Reference Form Component
const ReferenceForm = ({ reference, onSave, onCancel, isNew }) => {
  const [formData, setFormData] = useState({
    company: reference?.company || '',
    title: reference?.title || '',
    description: reference?.description || '',
    category: reference?.category || 'Gewerbe',
    location: reference?.location || '',
    services: reference?.services || [],
    duration: reference?.duration || '',
    featured: reference?.featured || false,
    active: reference?.active !== false,
    image: reference?.image || ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Datei zu groß (max. 10MB)');
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('authorization', localStorage.getItem('adminToken') || '');
    formDataUpload.append('convert_to_webp', 'false'); // Can be made configurable

    try {
      const response = await fetch(`${BACKEND_URL}/api/references/upload-image`, {
        method: 'POST',
        body: formDataUpload
      });

      if (response.ok) {
        const data = await response.json();
        // Build full URL from relative path
        const imageUrl = data.url.startsWith('/') 
          ? `${BACKEND_URL}${data.url}` 
          : data.url;
        handleChange('image', imageUrl);
        toast.success(`Bild hochgeladen (${data.format?.toUpperCase()}, ${Math.round(data.size / 1024)}KB)`);
      } else {
        const error = await response.json();
        toast.error(error.detail || 'Fehler beim Hochladen');
      }
    } catch (error) {
      toast.error('Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.company || !formData.title) {
      toast.error('Bitte Firma und Titel ausfüllen');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Projektbild</Label>
        <div className="flex items-start gap-4">
          {formData.image ? (
            <div className="relative">
              <img 
                src={formData.image} 
                alt="Vorschau" 
                className="w-32 h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => handleChange('image', '')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-24 bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mb-2"
            >
              {uploading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Lädt...</>
              ) : (
                <><Upload className="h-4 w-4 mr-2" /> Bild hochladen</>
              )}
            </Button>
            <p className="text-xs text-gray-500">
              Oder Bild-URL einfügen:
            </p>
            <Input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Company & Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">Firma / Kunde *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="z.B. Musterfirma GmbH"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Projekttitel *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="z.B. Bürorenovierung"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Beschreibung</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Kurze Projektbeschreibung..."
          rows={3}
        />
      </div>

      {/* Category & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategorie</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Standort</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="z.B. Hamburg-Altona"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration">Projektdauer</Label>
        <Input
          id="duration"
          value={formData.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          placeholder="z.B. ca. 4 Wochen"
        />
      </div>

      {/* Services */}
      <div className="space-y-2">
        <Label>Leistungen</Label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map(service => (
            <Badge
              key={service}
              variant={formData.services.includes(service) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                formData.services.includes(service)
                  ? 'bg-[#1e328b] hover:bg-[#162567]'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleService(service)}
            >
              {service}
            </Badge>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">Als Top-Projekt markieren</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => handleChange('active', e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">Aktiv (öffentlich sichtbar)</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button 
          type="submit" 
          className="bg-[#1e328b] hover:bg-[#162567]"
          disabled={saving}
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Speichern...</>
          ) : (
            <><Save className="h-4 w-4 mr-2" /> {isNew ? 'Erstellen' : 'Speichern'}</>
          )}
        </Button>
      </div>
    </form>
  );
};

// Reference Card Component
const ReferenceCard = ({ reference, onEdit, onToggleActive, onToggleFeatured, onDelete }) => {
  return (
    <Card className={`overflow-hidden ${!reference.active ? 'opacity-60' : ''}`}>
      <div className="flex">
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0 bg-gray-100">
          {reference.image ? (
            <img 
              src={reference.image} 
              alt={reference.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{reference.company}</h3>
                {reference.featured && (
                  <Badge className="bg-amber-500 text-white text-xs flex-shrink-0">
                    <Star className="h-3 w-3 mr-1" /> Top
                  </Badge>
                )}
                {!reference.active && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0">
                    <EyeOff className="h-3 w-3 mr-1" /> Inaktiv
                  </Badge>
                )}
              </div>
              <p className="text-sm text-[#1e328b] mb-1">{reference.title}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{reference.description}</p>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFeatured(reference.id)}
                title={reference.featured ? "Top-Status entfernen" : "Als Top markieren"}
              >
                {reference.featured ? (
                  <StarOff className="h-4 w-4 text-amber-500" />
                ) : (
                  <Star className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleActive(reference.id)}
                title={reference.active ? "Deaktivieren" : "Aktivieren"}
              >
                {reference.active ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(reference)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(reference.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="outline" className="text-xs">{reference.category}</Badge>
            {reference.services?.slice(0, 3).map((service, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-gray-100">
                {service}
              </Badge>
            ))}
            {reference.services?.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-100">
                +{reference.services.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main Component
const AdminReferences = () => {
  const navigate = useNavigate();
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRef, setEditingRef] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchReferences();
  }, [token, navigate]);

  const fetchReferences = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/references/admin`, {
        headers: { 'Authorization': token }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReferences(data);
        setInitialized(data.length > 0);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeReferences = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/references/init`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });
      
      if (response.ok) {
        toast.success('Referenzen initialisiert');
        fetchReferences();
      }
    } catch (error) {
      toast.error('Initialisierung fehlgeschlagen');
    }
  };

  const handleSave = async (formData) => {
    const isNew = !editingRef;
    const url = isNew 
      ? `${BACKEND_URL}/api/references`
      : `${BACKEND_URL}/api/references/${editingRef.id}`;
    
    try {
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(isNew ? 'Referenz erstellt' : 'Referenz gespeichert');
        setEditingRef(null);
        setIsCreating(false);
        fetchReferences();
      } else {
        toast.error('Speichern fehlgeschlagen');
      }
    } catch (error) {
      toast.error('Fehler beim Speichern');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/references/${id}/toggle-active`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        const data = await response.json();
        setReferences(refs => 
          refs.map(r => r.id === id ? { ...r, active: data.active } : r)
        );
        toast.success(data.active ? 'Referenz aktiviert' : 'Referenz deaktiviert');
      }
    } catch (error) {
      toast.error('Fehler');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/references/${id}/toggle-featured`, {
        method: 'POST',
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        const data = await response.json();
        setReferences(refs => 
          refs.map(r => r.id === id ? { ...r, featured: data.featured } : r)
        );
        toast.success(data.featured ? 'Als Top markiert' : 'Top-Status entfernt');
      }
    } catch (error) {
      toast.error('Fehler');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Referenz wirklich löschen?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/references/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      });

      if (response.ok) {
        setReferences(refs => refs.filter(r => r.id !== id));
        toast.success('Referenz gelöscht');
      }
    } catch (error) {
      toast.error('Löschen fehlgeschlagen');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e328b]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/leads')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Referenzen verwalten</h1>
            </div>
            {!isCreating && !editingRef && (
              <Button
                onClick={() => setIsCreating(true)}
                className="bg-[#1e328b] hover:bg-[#162567]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Neue Referenz
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Create/Edit Form */}
        {(isCreating || editingRef) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {isCreating ? 'Neue Referenz erstellen' : 'Referenz bearbeiten'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReferenceForm
                reference={editingRef}
                onSave={handleSave}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingRef(null);
                }}
                isNew={isCreating}
              />
            </CardContent>
          </Card>
        )}

        {/* Initialize Button */}
        {!initialized && references.length === 0 && !isCreating && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Keine Referenzen vorhanden
              </h3>
              <p className="text-gray-600 mb-4">
                Möchten Sie die Standard-Referenzen importieren?
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={initializeReferences}
                  className="bg-[#1e328b] hover:bg-[#162567]"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Standard-Referenzen importieren
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Manuell erstellen
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* References List */}
        {!isCreating && !editingRef && references.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {references.length} Referenz{references.length !== 1 ? 'en' : ''} 
                {' '}({references.filter(r => r.active).length} aktiv)
              </p>
            </div>
            
            {references.map((reference) => (
              <ReferenceCard
                key={reference.id}
                reference={reference}
                onEdit={(ref) => setEditingRef(ref)}
                onToggleActive={handleToggleActive}
                onToggleFeatured={handleToggleFeatured}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReferences;
