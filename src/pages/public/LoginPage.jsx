import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, LogIn, Sparkles, Shield, User } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('alex.morgan@parkease.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = login(email, password);
      addToast(`Welcome back, ${res.user.name}!`, 'success', 'Authenticated');
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }, 500);
  };

  const quickLoginAs = (role) => {
    switchRole(role);
    if (role === 'admin') {
      addToast('Signed in as Admin (Rajesh Kumar)', 'success');
      navigate('/admin');
    } else {
      addToast('Signed in as User (Alex Morgan)', 'success');
      navigate('/user/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem'
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Car size={28} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>Sign in to ParkEase India</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Access your reservations and ANPR barrier gate pass
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="alex.morgan@parkease.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                Remember me
              </label>
              <a href="#forgot" style={{ color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
            </div>

            <Button type="submit" variant="primary" size="lg" icon={LogIn} loading={loading} fullWidth>
              Sign In
            </Button>
          </form>

          {/* Quick Demo Login Presets */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Quick Demo Login Presets
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Button variant="secondary" size="sm" icon={User} onClick={() => quickLoginAs('user')}>
                Demo Driver
              </Button>
              <Button variant="secondary" size="sm" icon={Shield} onClick={() => quickLoginAs('admin')}>
                Demo Admin
              </Button>
            </div>
          </div>
        </Card>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
