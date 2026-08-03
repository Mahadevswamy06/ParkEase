import React, { useState } from 'react';
import { User, Mail, Phone, Car, Lock, ShieldCheck, Edit3, Save, MapPin, CreditCard, Sparkles } from 'lucide-react';
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
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    addToast('Profile details & vehicle plate updated successfully!', 'success', 'Profile Saved');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast('New passwords do not match.', 'danger', 'Validation Error');
      return;
    }
    addToast('Password updated successfully.', 'success', 'Security Updated');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="profile-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '960px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>User Profile & Vehicle Pass</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Manage your personal driver profile, registered ANPR license plates, and preferred parking cities.
        </p>
      </div>

      {/* User Header Profile Card */}
      <Card padding="lg" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={formData.avatar}
            alt={formData.name}
            style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-border)', boxShadow: 'var(--shadow-sm)' }}
          />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)' }}>{currentUser?.name || 'Alex Morgan'}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{currentUser?.email || 'alex.morgan@parkease.in'}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid var(--primary-border)' }}>
                Member since {currentUser?.memberSince || 'Jan 2024'}
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
                <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '3px' }} /> ANPR FastPass Verified
              </span>
            </div>
          </div>
        </div>

        <Button
          variant={isEditing ? "outline" : "primary"}
          icon={isEditing ? Save : Edit3}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Button>
      </Card>

      {/* Main Details Form */}
      <Card padding="lg">
        <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="var(--primary)" /> Driver & Vehicle Information
            </h3>
            {isEditing && <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Editing Mode Active</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
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

            <Input
              label="ANPR Vehicle Registration Plate"
              icon={Car}
              value={formData.vehiclePlate}
              disabled={!isEditing}
              helperText="Scanned by optical barrier gates (e.g. DL-01-AB-1234)"
              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
            />

            <Input
              label="Preferred Indian City"
              icon={MapPin}
              value={formData.city}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />

            <Input
              label="Avatar Image URL"
              icon={Sparkles}
              value={formData.avatar}
              disabled={!isEditing}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          {isEditing && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <Button type="submit" variant="primary" icon={Save} size="lg">
                Save Profile Changes
              </Button>
            </div>
          )}
        </form>
      </Card>

      {/* Security & Password Form */}
      <Card padding="lg">
        <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            <Lock size={18} color="var(--primary)" /> Security & Access Password
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
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
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="secondary">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
