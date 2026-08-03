import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, Mail, Lock, CreditCard, ArrowRight } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

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
      const res = register(formData);
      addToast(`Account created successfully! Welcome, ${res.user.name}.`, 'success', 'Registration Complete');
      navigate('/user/dashboard');
    }, 600);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'var(--bg)'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }} className="animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}>
            <Car size={26} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>Create ParkEase Account</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Register your vehicle for instant automatic barrier access
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Input
              label="Full Name"
              icon={User}
              placeholder="Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Vehicle License Plate (ANPR Entry)"
              icon={Car}
              placeholder="e.g. NY-7849-X"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
              helperText="Used by barrier cameras for automatic gate entry"
              required
            />

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
              Complete Registration
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
