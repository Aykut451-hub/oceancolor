import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Home as HomeIcon,
  Calendar,
  Image as ImageIcon,
  Save,
  ExternalLink,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const AdminLeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/leads/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();
      if (data.success) {
        setLead(data.lead);
        setStatus(data.lead.status);
        setNotes(data.lead.admin_notizen || '');
      }
    } catch (error) {
      console.error('Error fetching lead:', error);
      toast.error('Fehler beim Laden des Leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: status,
          admin_notizen: notes
        })
      });

      if (response.ok) {
        toast.success('Änderungen gespeichert');
        fetchLead(); // Reload
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'neu': 'bg-blue-100 text-blue-800',
      'kontaktiert': 'bg-yellow-100 text-yellow-800',
      'angebot': 'bg-purple-100 text-purple-800',
      'gewonnen': 'bg-green-100 text-green-800',
      'verloren': 'bg-gray-100 text-gray-800'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-100'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLeistung = (key) => {
    const mapping = {
      'waende-decken': 'Wände & Decken streichen',
      'lackierung': 'Lackierarbeiten',
      'tapezieren': 'Tapezierarbeiten',
      'spachteln': 'Spachtelarbeiten',
      'boden': 'Bodenbeläge',
      'schimmel': 'Schimmelsanierung'
    };
    return mapping[key] || key;
  };

  const formatZusatzoption = (key) => {
    const mapping = {
      'abkleben': 'Abkleben / Schutz',
      'moebel': 'Möbel bewegen',
      'tueren': 'Türen / Heizkörper lackieren'
    };
    return mapping[key] || key;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Lead-Details...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">Lead nicht gefunden</p>
            <Link to="/admin/leads">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Liste
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/leads">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
                <p className="text-sm text-gray-600">Lead-ID: {lead.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {getStatusBadge(lead.status)}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-ocean-blue hover:bg-ocean-blue-dark text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Speichert...' : 'Speichern'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Kontakt & Rückruf */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Kontakt & Rückruf
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900 font-semibold">{lead.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                    <a href={`tel:${lead.telefon}`} className="text-ocean-blue hover:underline flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {lead.telefon}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">E-Mail</label>
                    <a href={`mailto:${lead.email}`} className="text-ocean-blue hover:underline flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {lead.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rückruf gewünscht</label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="h-4 w-4 mr-1" />
                      {lead.rueckruf_zeit || 'Nicht angegeben'}
                    </div>
                  </div>
                </div>
                {lead.bemerkung && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Bemerkung vom Kunden</label>
                    <p className="text-gray-900">{lead.bemerkung}</p>
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Eingegangen am</label>
                  <p className="text-gray-900">{formatDate(lead.created_at)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Projekt Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Projekt Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">PLZ</label>
                    <div className="flex items-center text-gray-900 font-semibold">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lead.plz}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Objektart</label>
                    <p className="text-gray-900 font-semibold capitalize">{lead.objektart}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Größe</label>
                    <p className="text-gray-900 font-semibold">
                      {lead.groesse_typ === 'raeume' 
                        ? `${lead.anzahl_raeume} Räume` 
                        : `${lead.wandflaeche_qm} m²`}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Gewünschte Leistungen</label>
                  <div className="flex flex-wrap gap-2">
                    {lead.leistungen?.map((leistung, idx) => (
                      <Badge key={idx} className="bg-ocean-blue/10 text-ocean-blue">
                        {formatLeistung(leistung)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Raumhöhe</label>
                    <p className="text-gray-900 capitalize">{lead.raumhoehe}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Zustand</label>
                    <p className="text-gray-900 capitalize">{lead.zustand}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Farbe</label>
                    <p className="text-gray-900 capitalize">{lead.farbe}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Spachtelstufe</label>
                    <p className="text-gray-900 uppercase">{lead.spachtelstufe}</p>
                  </div>
                </div>

                {lead.zusatzoptionen && lead.zusatzoptionen.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Zusatzoptionen</label>
                    <div className="flex flex-wrap gap-2">
                      {lead.zusatzoptionen.map((option, idx) => (
                        <Badge key={idx} variant="outline">
                          {formatZusatzoption(option)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preisspanne */}
            <Card>
              <CardHeader>
                <CardTitle>Kalkulierte Preisspanne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-ocean-blue to-cyan-600 text-white rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold">
                    {lead.preis_min?.toLocaleString('de-DE')} € - {lead.preis_max?.toLocaleString('de-DE')} €
                  </p>
                  <p className="text-sm text-blue-100 mt-2">
                    Automatisch berechnet basierend auf Eingaben
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Fotos */}
            {lead.foto_urls && lead.foto_urls.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Hochgeladene Fotos ({lead.foto_urls.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lead.foto_urls.map((url, idx) => (
                      <div 
                        key={idx} 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(`${BACKEND_URL}${url}`)}
                      >
                        <img
                          src={`${BACKEND_URL}${url}`}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:border-ocean-blue transition-colors"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center">
                          <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Status & Notes */}
          <div className="space-y-6">
            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Aktueller Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neu">Neu</SelectItem>
                      <SelectItem value="kontaktiert">Kontaktiert</SelectItem>
                      <SelectItem value="angebot">Angebot erstellt</SelectItem>
                      <SelectItem value="gewonnen">Gewonnen</SelectItem>
                      <SelectItem value="verloren">Verloren</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Notizen</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Interne Notizen zum Lead..."
                  rows={10}
                  className="resize-none"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href={`tel:${lead.telefon}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Anrufen
                  </Button>
                </a>
                <a href={`mailto:${lead.email}`} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    E-Mail senden
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Vollbild"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadDetail;
