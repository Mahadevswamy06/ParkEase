import React, { useState } from 'react';
import { Bell, CreditCard, Shield, Moon, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useToast } from '../../context/ToastContext';

const SettingsPage = () => {
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState({ email: true, sms: true, promo: false });
  const [autoExtend, setAutoExtend] = useState(false);

  const handleSave = () => {
    addToast('Preferences saved successfully.', 'success');
  };

  return (
    <div className="settings-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Account Settings</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Configure notifications, automated session extensions, and saved payment preferences.
        </p>
      </div>

      {/* Notifications Card */}
      <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', color: 'var(--primary)' }}>
            <Bell size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>Notification Preferences</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Choose how you want to be alerted about active sessions.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Session Expiration SMS Alerts</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Receive SMS 15 minutes before your parking time expires.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Email Receipts & Confirmations</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Send instant PDF receipts for all completed bookings.</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
          </label>
        </div>
      </Card>

      {/* Auto-Extension Preference */}
      <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', color: 'var(--success)' }}>
            <Shield size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>Smart Auto-Extension</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Prevent overstay fines automatically.</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Auto-Extend Overstay (1 Hour Buffer)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Automatically add 1 hour if vehicle is still detected past reservation end.</div>
            </div>
            <input
              type="checkbox"
              checked={autoExtend}
              onChange={(e) => setAutoExtend(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
            />
          </label>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="primary" size="lg" onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
