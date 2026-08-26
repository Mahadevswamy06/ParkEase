import React from 'react';
import { Bell, CheckCheck, Clock, ShieldCheck, Car } from 'lucide-react';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useParking } from '../../context/ParkingContext';

const Notifications = () => {
  const { notifications, markAllNotifsAsRead } = useParking();

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Notification Center
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time telemetry alerts, booking receipts, and barrier check-in logs
          </p>
        </div>

        {notifications.some(n => !n.read) && (
          <Button variant="outline" size="sm" onClick={markAllNotifsAsRead} icon={CheckCheck}>
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="You are all caught up! Automated parking notifications will appear here."
          icon={Bell}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              className="clean-card"
              style={{
                padding: '1.15rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: n.read ? 'var(--surface)' : 'var(--primary-light)',
                borderColor: n.read ? 'var(--card-border)' : 'var(--primary-border)'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: n.read ? 'var(--bg-subtle)' : 'var(--primary)',
                color: n.read ? 'var(--text-muted)' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bell size={18} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)' }}>{n.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.timestamp}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
