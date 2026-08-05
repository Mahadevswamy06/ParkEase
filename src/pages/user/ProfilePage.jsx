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
  Camera,
  Upload,
  Check
} from 'lucide-react';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'
];

const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Alex Morgan',
    email: currentUser?.email || 'alex.morgan@parkease.in',
    phone: currentUser?.phone || '+91 98765 43210',
    vehiclePlate: currentUser?.vehiclePlate || 'DL-01-AB-1234',
    city: currentUser?.city || 'New Delhi',
    evPreference: true,
    avatar: currentUser?.avatar || PRESET_AVATARS[0]
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setShowAvatarPicker(false);
    addToast('Profile & ANPR telemetry updated!', 'success', 'Saved');
  };

  const handleAvatarFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
        addToast('New profile photo loaded.', 'info');
      };
      reader.readAsDataURL(file);
    }
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
      
      {/* Top Cover Banner Container */}
      <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
        {/* Cover Image */}
        <div style={{
          height: '220px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Automotive Cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5, 8, 22, 0.1) 0%, rgba(5, 8, 22, 0.8) 100%)'
          }} />
        </div>

        {/* User Header Glass Card (Unclipped Profile Image + Camera Edit Button) */}
        <div className="glass-card" style={{
          marginTop: '-3.5rem',
          marginRight: '1.5rem',
          marginLeft: '1.5rem',
          padding: '1.75rem 2.25rem',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(124, 58, 237, 0.35)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            
            {/* Interactive User Profile Avatar Circle with Edit Camera Badge */}
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowAvatarPicker(!showAvatarPicker)}>
              <img
                src={formData.avatar}
                alt={formData.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--primary)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
                  backgroundColor: 'var(--bg)',
                  display: 'block'
                }}
              />

              {/* Camera Edit Badge Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.9,
                transition: 'var(--transition)'
              }}>
                <Camera size={24} color="#FFFFFF" />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)' }}>{formData.name}</h1>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(124, 58, 237, 0.3)'
                }}>
                  ANPR Verified Driver
                </span>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{formData.email}</p>
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <span>📍 {formData.city}</span>
                <span>🚗 {formData.vehiclePlate}</span>
                <span>⭐ Member since Jan 2024</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setShowAvatarPicker(!isEditing);
            }}
            className="btn-gradient"
            style={{
              padding: '0.7rem 1.6rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Edit3 size={16} />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile & Photo'}</span>
          </button>
        </div>
      </div>

      {/* Avatar Image Selector Dropdown Panel */}
      {(showAvatarPicker || isEditing) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <Card padding="lg">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={18} color="var(--primary)" /> Edit Profile Avatar Image
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              
              {/* Preset Avatar Selection */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem' }}>
                  Choose Preset Avatar
                </label>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: url })}
                      style={{
                        position: 'relative',
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <img
                        src={url}
                        alt={`Preset ${idx + 1}`}
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: formData.avatar === url ? '3px solid var(--primary)' : '2px solid var(--border)',
                          boxShadow: formData.avatar === url ? '0 0 12px var(--primary)' : 'none'
                        }}
                      />
                      {formData.avatar === url && (
                        <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'var(--primary)', borderRadius: '50%', padding: '2px', color: '#FFF' }}>
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Local File or Enter Image URL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Upload Custom Image File
                </label>
                <label className="btn-gradient" style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: 'fit-content'
                }}>
                  <Upload size={16} />
                  <span>Choose Photo File</span>
                  <input type="file" accept="image/*" onChange={handleAvatarFileUpload} style={{ display: 'none' }} />
                </label>
              </div>

            </div>
          </Card>
        </motion.div>
      )}

      {/* Main Profile Grid Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        
        {/* Section 1: Personal & Driver Info */}
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
