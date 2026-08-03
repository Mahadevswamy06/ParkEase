import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehiclePlate: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = register({ ...formData, role });
      addToast(`Account created as ${role === 'admin' ? 'System Admin' : 'Driver'}! Welcome, ${res.user.name}.`, 'success', 'Registration Complete');
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.5rem',
      backgroundColor: 'var(--bg)'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>Create ParkEase Account</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Choose your account role and register for instant access
          </p>
        </div>

        <Card padding="lg">
          {/* Account Type Selector: Register as User / Register as Admin */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
              Select Registration Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setRole('user')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${role === 'user' ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: role === 'user' ? 'var(--primary-light)' : 'var(--card-bg)',
                  color: role === 'user' ? 'var(--primary)' : 'var(--text)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <User size={18} />
                <span>Register as User</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${role === 'admin' ? 'var(--primary)' : 'var(--border)'}`,
                  backgroundColor: role === 'admin' ? 'var(--primary-light)' : 'var(--card-bg)',
                  color: role === 'admin' ? 'var(--primary)' : 'var(--text)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <Shield size={18} />
                <span>Register as Admin</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input
              label="Full Name"
              icon={User}
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder={role === 'admin' ? "admin@parkease.in" : "rahul@company.com"}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            {role === 'user' && (
              <Input
                label="Vehicle License Plate (ANPR Entry)"
                icon={Car}
                placeholder="e.g. DL-01-AB-1234"
                value={formData.vehiclePlate}
                onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                helperText="Used by barrier cameras for automatic gate entry"
                required
              />
            )}

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '0.25rem' }}>
              <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--primary)' }} />
              <span>I agree to the Terms of Service, Privacy Policy, and ANPR camera barrier usage terms.</span>
            </label>

            <Button type="submit" variant="primary" size="lg" icon={ArrowRight} iconPosition="right" loading={loading} fullWidth>
              {role === 'admin' ? 'Register as Admin' : 'Register as User'}
            </Button>
          </form>
        </Card>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
