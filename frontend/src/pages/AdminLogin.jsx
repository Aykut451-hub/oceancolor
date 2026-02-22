import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      // Get attempts remaining from header
      const remaining = response.headers.get('X-Attempts-Remaining');
      if (remaining !== null) {
        setAttemptsRemaining(parseInt(remaining, 10));
      }

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        toast.success('Login erfolgreich');
        navigate('/admin/leads');
      } else {
        // Show specific error from backend (includes rate limiting messages)
        const errorMessage = data.detail || 'Login fehlgeschlagen';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
      toast.error('Verbindungsfehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-ocean-blue/10 p-4 rounded-full">
              <Lock className="h-8 w-8 text-ocean-blue" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin-Passwort eingeben"
                required
                autoComplete="current-password"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-ocean-blue hover:bg-ocean-blue-dark text-white"
              disabled={loading}
            >
              {loading ? 'Wird eingeloggt...' : 'Einloggen'}
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              Zugang nur für autorisierte Benutzer.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
