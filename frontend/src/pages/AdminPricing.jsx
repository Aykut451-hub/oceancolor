import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Save, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const AdminPricing = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchPricingConfig();
  }, []);

  const fetchPricingConfig = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/pricing`, {
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
        setConfig(data.config);
      }
    } catch (error) {
      console.error('Error fetching pricing config:', error);
      toast.error('Fehler beim Laden der Preiskonfiguration');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/pricing`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('Preiskonfiguration gespeichert');
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

  const handleChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Preiskonfiguration...</p>
        </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Preisregeln</h1>
                <p className="text-sm text-gray-600">Konfiguration der automatischen Preisberechnung</p>
              </div>
            </div>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Basispreise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Basispreise (netto, pro m²)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wand_weiss">Wand weiß (€/m²)</Label>
                  <Input
                    id="wand_weiss"
                    type="number"
                    step="0.10"
                    value={config?.wand_weiss || 0}
                    onChange={(e) => handleChange('wand_weiss', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="decke_weiss">Decke weiß (€/m²)</Label>
                  <Input
                    id="decke_weiss"
                    type="number"
                    step="0.10"
                    value={config?.decke_weiss || 0}
                    onChange={(e) => handleChange('decke_weiss', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="aufschlag_bunt">Aufschlag bunt (€/m²)</Label>
                  <Input
                    id="aufschlag_bunt"
                    type="number"
                    step="0.10"
                    value={config?.aufschlag_bunt || 0}
                    onChange={(e) => handleChange('aufschlag_bunt', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Zusätzlich zu Wand/Decke wenn Farbe=bunt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spachtelstufen */}
          <Card>
            <CardHeader>
              <CardTitle>Spachtelstufen (€/m²)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="spachtel_q2">Q2</Label>
                  <Input
                    id="spachtel_q2"
                    type="number"
                    step="0.10"
                    value={config?.spachtel_q2 || 0}
                    onChange={(e) => handleChange('spachtel_q2', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="spachtel_q3">Q3</Label>
                  <Input
                    id="spachtel_q3"
                    type="number"
                    step="0.10"
                    value={config?.spachtel_q3 || 0}
                    onChange={(e) => handleChange('spachtel_q3', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="spachtel_q4">Q4</Label>
                  <Input
                    id="spachtel_q4"
                    type="number"
                    step="0.10"
                    value={config?.spachtel_q4 || 0}
                    onChange={(e) => handleChange('spachtel_q4', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aufschläge */}
          <Card>
            <CardHeader>
              <CardTitle>Prozentuale Aufschläge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zuschlag_altbau">Zustand "Altbau" (%)</Label>
                  <Input
                    id="zuschlag_altbau"
                    type="number"
                    step="0.01"
                    value={(config?.zuschlag_altbau * 100) || 0}
                    onChange={(e) => handleChange('zuschlag_altbau', parseFloat(e.target.value) / 100)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Aktuell: {((config?.zuschlag_altbau || 0) * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <Label htmlFor="zuschlag_raumhoehe_hoch">Raumhöhe "&gt;3m" (%)</Label>
                  <Input
                    id="zuschlag_raumhoehe_hoch"
                    type="number"
                    step="0.01"
                    value={(config?.zuschlag_raumhoehe_hoch * 100) || 0}
                    onChange={(e) => handleChange('zuschlag_raumhoehe_hoch', parseFloat(e.target.value) / 100)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Aktuell: {((config?.zuschlag_raumhoehe_hoch || 0) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weitere Regeln */}
          <Card>
            <CardHeader>
              <CardTitle>Weitere Regeln</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mindestauftrag">Mindestauftrag (€)</Label>
                  <Input
                    id="mindestauftrag"
                    type="number"
                    step="10"
                    value={config?.mindestauftrag || 0}
                    onChange={(e) => handleChange('mindestauftrag', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Wird angewendet wenn Berechnung darunter liegt</p>
                </div>
                <div>
                  <Label htmlFor="interne_pauschale">Interne Pauschale (€)</Label>
                  <Input
                    id="interne_pauschale"
                    type="number"
                    step="5"
                    value={config?.interne_pauschale || 0}
                    onChange={(e) => handleChange('interne_pauschale', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Wird intern addiert, nicht sichtbar für Kunden</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preisspanne */}
          <Card>
            <CardHeader>
              <CardTitle>Preisspanne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spanne_min_faktor">Min-Faktor</Label>
                  <Input
                    id="spanne_min_faktor"
                    type="number"
                    step="0.01"
                    value={config?.spanne_min_faktor || 0}
                    onChange={(e) => handleChange('spanne_min_faktor', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Basispreis × {config?.spanne_min_faktor || 0}</p>
                </div>
                <div>
                  <Label htmlFor="spanne_max_faktor">Max-Faktor</Label>
                  <Input
                    id="spanne_max_faktor"
                    type="number"
                    step="0.01"
                    value={config?.spanne_max_faktor || 0}
                    onChange={(e) => handleChange('spanne_max_faktor', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Basispreis × {config?.spanne_max_faktor || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Hinweise</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Alle Änderungen werden sofort nach dem Speichern wirksam</li>
                <li>• Die Preisberechnung erfolgt automatisch bei jedem neuen Lead</li>
                <li>• Kunde sieht nur Min/Max Preisspanne + Hinweis "Final nach Prüfung/Fotos"</li>
                <li>• Interne Pauschale wird nicht als separate Position angezeigt</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPricing;
