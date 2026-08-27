import React, { useState } from 'react';
import { History, Calendar, Clock, MapPin, Car, QrCode, Navigation, XCircle, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button';
import DigitalPass from '../../components/booking/DigitalPass';
import EmptyState from '../../components/EmptyState';
import { useParking } from '../../context/ParkingContext';

const BookingHistory = () => {
  const { bookings, cancelBooking } = useParking();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'upcoming', 'active', 'completed', 'cancelled'
  const [selectedPassBooking, setSelectedPassBooking] = useState(null);

  const filtered = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          My Bookings & Digital Passes
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage your upcoming reservations, active sessions, and digital parking passes
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'All Bookings' },
          { id: 'active', label: 'Active Sessions' },
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No bookings found"
          description={`You do not have any ${activeTab === 'all' ? '' : activeTab} parking reservations.`}
          icon={History}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="bookings-grid">
          {filtered.map((b) => (
            <div key={b.id} className="clean-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className={`badge ${
                    b.status === 'active' ? 'badge-success' :
                    b.status === 'upcoming' ? 'badge-primary' :
                    b.status === 'completed' ? 'badge-muted' : 'badge-danger'
                  }`} style={{ fontSize: '0.75rem' }}>
                    {b.status.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', marginTop: '0.35rem' }}>
                    {b.parkingName}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.address}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>₹{b.amount || b.totalAmount}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{b.bookingCode || b.id}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Slot: </span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{b.slotId}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Vehicle: </span>
                  <span style={{ fontWeight: 700 }}>{b.vehicleNumber}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Date: </span>
                  <span style={{ fontWeight: 700 }}>{b.date}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Time: </span>
                  <span style={{ fontWeight: 700 }}>{b.startTime}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <Button variant="primary" size="sm" onClick={() => setSelectedPassBooking(b)} icon={QrCode} style={{ flex: 1 }}>
                  View Pass
                </Button>
                {b.status !== 'cancelled' && (
                  <Button variant="outline" size="sm" onClick={() => cancelBooking(b.id)} style={{ color: 'var(--danger)' }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Pass Modal Drawer */}
      {selectedPassBooking && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <button
              onClick={() => setSelectedPassBooking(null)}
              style={{
                position: 'absolute',
                top: '-35px',
                right: 0,
                color: '#FFFFFF',
                border: 'none',
                background: 'transparent',
                fontSize: '1.25rem',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
            <DigitalPass booking={selectedPassBooking} onCancel={cancelBooking} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .bookings-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default BookingHistory;
