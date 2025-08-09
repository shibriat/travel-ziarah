
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary/10 via-background to-mint/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-32 w-64 h-64 rounded-full bg-primary/5 backdrop-blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-mint/10 backdrop-blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 rounded-full bg-primary/8 backdrop-blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Left side - Branding/Info */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full glass-effect border border-white/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">A</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-mint bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Manage your business operations with our comprehensive admin dashboard
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ User Management</p>
            <p>✓ Analytics & Reports</p>
            <p>✓ Security Controls</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <Card className="w-full max-w-md glass-effect border border-white/20 backdrop-blur-xl bg-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="bg-white/5 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/90">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="bg-white/5 border-white/20 backdrop-blur-sm text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-2 rounded border border-destructive/20">{error}</p>
              )}
              <Button type="submit" className="w-full glass-button" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo credentials:</p>
              <div className="text-xs space-y-1 text-center">
                <p><span className="text-primary">Email:</span> admin@example.com</p>
                <p><span className="text-primary">Password:</span> password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
