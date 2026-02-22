import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Download, 
  LogOut, 
  Filter,
  ArrowUpDown,
  Eye,
  Calendar,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem('adminToken');
  const MAX_SERVICE_DISTANCE = 200;

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, distanceFilter]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Fehler beim Laden der Leads');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.plz?.includes(searchTerm) ||
        lead.telefon?.includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Distance filter
    if (distanceFilter !== 'all') {
      filtered = filtered.filter(lead => {
        const distance = lead.distanceFromHamburg;
        if (distanceFilter === 'within') {
          return !distance || distance <= MAX_SERVICE_DISTANCE;
        } else if (distanceFilter === 'outside') {
          return distance && distance > MAX_SERVICE_DISTANCE;
        }
        return true;
      });
    }

    setFilteredLeads(filtered);
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/export`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success('Export erfolgreich');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export fehlgeschlagen');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
    toast.info('Abgemeldet');
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

  const formatPrice = (min, max) => {
    return `${min.toLocaleString('de-DE')} € - ${max.toLocaleString('de-DE')} €`;
  };

  // Format distance display
  const formatDistance = (distance, isOutsideServiceArea) => {
    if (!distance && distance !== 0) {
      return <span className="text-gray-400">–</span>;
    }
    
    if (isOutsideServiceArea || distance > MAX_SERVICE_DISTANCE) {
      return (
        <span className="text-amber-600 font-medium flex items-center gap-1">
          <AlertTriangle className="h-4 w-4" />
          {distance} km
        </span>
      );
    }
    
    return <span className="text-green-600">{distance} km</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Leads...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Verwaltung</h1>
              <p className="text-sm text-gray-600">Ocean Color Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/admin/references">
                <Button
                  variant="outline"
                  size="sm"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Referenzen
                </Button>
              </Link>
              <Link to="/admin/pricing">
                <Button
                  variant="outline"
                  size="sm"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Preisregeln
                </Button>
              </Link>
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                CSV Export
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gesamt</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Neu</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.neu}</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Kontaktiert</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.kontaktiert}</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gewonnen</p>
                    <p className="text-3xl font-bold text-green-600">{stats.gewonnen}</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Suche nach Name, PLZ, Telefon, E-Mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Status</SelectItem>
                    <SelectItem value="neu">Neu</SelectItem>
                    <SelectItem value="kontaktiert">Kontaktiert</SelectItem>
                    <SelectItem value="angebot">Angebot</SelectItem>
                    <SelectItem value="gewonnen">Gewonnen</SelectItem>
                    <SelectItem value="verloren">Verloren</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Entfernung filtern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Entfernungen</SelectItem>
                    <SelectItem value="within">≤ 200 km (Einsatzgebiet)</SelectItem>
                    <SelectItem value="outside">{">"} 200 km (Außerhalb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Leads ({filteredLeads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Keine Leads gefunden</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Datum
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Kontakt
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        PLZ / Objektart
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Entfernung
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Leistungen
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Preisspanne
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Aktion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(lead.created_at)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="font-medium text-gray-900">{lead.name}</div>
                          <div className="text-gray-500 text-xs">{lead.telefon}</div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <div className="font-medium text-gray-900">{lead.plz}</div>
                          <div className="text-gray-500 text-xs capitalize">{lead.objektart}</div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {formatDistance(lead.distanceFromHamburg, lead.isOutsideServiceArea)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          <div className="max-w-xs truncate">
                            {lead.leistungen?.slice(0, 2).join(', ')}
                            {lead.leistungen?.length > 2 && '...'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-ocean-blue">
                          {formatPrice(lead.preis_min, lead.preis_max)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <Link to={`/admin/leads/${lead.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ansehen
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLeads;
