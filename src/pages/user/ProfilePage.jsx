import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Car,
  Lock,
  ShieldCheck,
  Edit3,
  Save,
  MapPin,
  Sparkles,
  Zap,
  Activity,
  History,
  Award
} from 'lucide-react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Alex Morgan',
    email: currentUser?.email || 'alex.morgan@parkease.in',
    phone: currentUser?.phone || '+91 98765 43210',
    vehiclePlate: currentUser?.vehiclePlate || 'DL-01-AB-1234',
    city: currentUser?.city || 'New Delhi',
    evPreference: true,
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    addToast('Profile & ANPR telemetry updated!', 'success', 'Saved');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('New passwords do not match.', 'danger');
      return;
    }
    addToast('Security password updated.', 'success');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }} className="animate-fade-in">
      
      {/* Top Cover Banner */}
      <div style={{
        position: 'relative',
        height: '240px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(124, 58, 237, 0.3)',
        boxShadow: 'var(--shadow-lg)',
        marginBottom: '4rem'
      }}>
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Automotive Cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5, 8, 22, 0.2) 0%, rgba(5, 8, 22, 0.85) 100%)'
        }} />

        {/* User Profile Avatar Floating Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '-2.5rem',
          left: '2.5rem',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1.5rem'
        }}>
          <img
            src={formData.avatar}
            alt={formData.name}
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid var(--bg)',
              boxShadow: 'var(--shadow-lg)',
              backgroundColor: 'var(--bg)'
            }}
          />
          <div style={{ marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF' }}>{formData.name}</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{formData.email}</p>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          display: 'flex',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-gradient"
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Edit3 size={16} />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Grid Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        
        {/* Section 1: Personal & Vehicle Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card padding="lg">
            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <User size={18} color="var(--primary)" /> Personal & Driver Info
              </h3>

              <Input
                label="Full Name"
                icon={User}
                value={formData.name}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Phone Number"
                icon={Phone}
                value={formData.phone}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              {isEditing && (
                <Button type="submit" variant="primary" icon={Save}>
                  Save Information
                </Button>
              )}
            </form>
          </Card>
        </motion.div>

        {/* Section 2: Vehicle & ANPR Gate Pass */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card padding="lg">
            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <Car size={18} color="var(--accent)" /> Vehicle & ANPR Pass
              </h3>

              <Input
                label="ANPR Vehicle License Plate"
                icon={Car}
                value={formData.vehiclePlate}
                disabled={!isEditing}
                helperText="Scanned by optical barrier cameras for automatic gate entry"
                onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
              />

              <Input
                label="Preferred Indian Metro"
                icon={MapPin}
                value={formData.city}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
                <Zap size={20} color="var(--warning)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>EV Fast-Charging Slot Priority</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Automatically reserve spots with active chargers</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.evPreference}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, evPreference: e.target.checked })}
                  style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                />
              </div>

              {isEditing && (
                <Button type="submit" variant="primary" icon={Save}>
                  Save Vehicle Telemetry
                </Button>
              )}
            </form>
          </Card>
        </motion.div>

        {/* Section 3: Security & Password Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card padding="lg">
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <Lock size={18} color="var(--danger)" /> Security & Password
              </h3>

              <Input
                label="Current Password"
                type="password"
                icon={Lock}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                required
              />

              <Input
                label="New Password"
                type="password"
                icon={Lock}
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                icon={Lock}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
              />

              <Button type="submit" variant="secondary">
                Update Security Password
              </Button>
            </form>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default ProfilePage;
