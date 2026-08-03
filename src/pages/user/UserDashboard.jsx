import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  MapPin,
  Calendar,
  CreditCard,
  PlusCircle,
  QrCode,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatisticsCard from '../../components/StatisticsCard';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { bookings, locations, cancelBooking } = useParking();
  const { addToast } = useToast();

  const [qrModalBooking, setQrModalBooking] = useState(null);
  const [extendModalBooking, setExtendModalBooking] = useState(null);
  const [extraHours, setExtraHours] = useState(1);

  // Active / Upcoming Bookings
  const activeBooking = bookings.find(b => b.status === 'active');
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const totalSpent = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
      addToast('Booking cancelled successfully.', 'warning', 'Cancelled');
    }
  };

  const handleExtendSubmit = () => {
    if (!extendModalBooking) return;
    addToast(`Session extended by ${extraHours} hour(s). Updated end time logged.`, 'success', 'Session Extended');
    setExtendModalBooking(null);
  };

  return (
    <div className="user-dashboard animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner Greeting */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'var(--card-bg)',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text)' }}>
            Welcome back, {currentUser?.name || 'Driver'} 👋
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Registered Vehicle: <strong style={{ color: 'var(--text)' }}>{currentUser?.vehiclePlate || 'DL-01-AB-1234'}</strong> • ANPR Gate Active
          </p>
        </div>

        <Link to="/parking">
          <Button variant="primary" size="md" icon={PlusCircle}>
            Book New Parking
          </Button>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatisticsCard
          title="Total Bookings"
          value={bookings.length}
          change="+3 this month"
          changeType="positive"
          icon={Car}
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
        <StatisticsCard
          title="Active Session"
          value={activeBooking ? activeBooking.slotId : 'None'}
          change={activeBooking ? 'Occupied' : 'No active session'}
          changeType={activeBooking ? 'positive' : 'neutral'}
          icon={Clock}
          iconBg={activeBooking ? 'var(--success-light)' : 'var(--bg)'}
          iconColor={activeBooking ? 'var(--success)' : 'var(--text-secondary)'}
        />
        <StatisticsCard
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          change="Updated live"
          changeType="neutral"
          icon={CreditCard}
          iconBg="var(--warning-light)"
          iconColor="var(--warning)"
        />
        <StatisticsCard
          title="Nearby Parking Hubs"
          value={locations.length}
          change="Available now"
          changeType="positive"
          icon={MapPin}
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
      </div>

      {/* Active Booking Banner */}
      {activeBooking && (
        <Card padding="lg" style={{ borderLeft: '6px solid var(--success)', backgroundColor: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--success-light)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <StatusBadge status="active">Active Session</StatusBadge>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Code: {activeBooking.bookingCode}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
                  {activeBooking.locationName} — Slot <span style={{ color: 'var(--primary)' }}>{activeBooking.slotId}</span>
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {activeBooking.address} • Vehicle: {activeBooking.vehicleNumber}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  <span>📅 {formatDate(activeBooking.date)}</span>
                  <span>⏰ Starts {activeBooking.startTime} ({activeBooking.durationHours} hrs)</span>
                  <span>💳 Total: {formatCurrency(activeBooking.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" size="sm" icon={QrCode} onClick={() => setQrModalBooking(activeBooking)}>
                Gate Pass QR
              </Button>
              <Button variant="primary" size="sm" onClick={() => setExtendModalBooking(activeBooking)}>
                Extend Session
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Main Grid: Upcoming & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* Upcoming Bookings */}
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Upcoming Reservations</h3>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{upcomingBookings.length} Scheduled</span>
          </div>

          {upcomingBookings.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No upcoming reservations. <Link to="/parking" style={{ color: 'var(--primary)', fontWeight: 600 }}>Find a spot</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingBookings.map((b) => (
                <div key={b.id} style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <StatusBadge status="upcoming" size="sm">Upcoming</StatusBadge>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>Slot {b.slotId}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{b.locationName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {formatDate(b.date)} at {b.startTime} ({b.durationHours}h)
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>{formatCurrency(b.totalAmount)}</span>
                    <Button variant="danger" size="sm" onClick={() => handleCancel(b.id)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Nearby Recommended Locations */}
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Recommended Nearby</h3>
            <Link to="/parking" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>View All</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {locations.slice(0, 3).map((loc) => (
              <div key={loc.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card-bg)'
              }}>
                <img src={loc.image} alt={loc.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {loc.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="var(--primary)" />
                    {loc.distance} • {loc.availableSlots} slots left
                  </div>
                </div>
                <Link to={`/parking/${loc.id}`}>
                  <Button variant="outline" size="sm">Book</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* QR Code Barrier Pass Modal */}
      <Modal
        isOpen={!!qrModalBooking}
        onClose={() => setQrModalBooking(null)}
        title="Gate Access Pass (ANPR Backup)"
        description="Scan this QR code at the entrance barrier scanner if camera plate recognition is obstructed."
      >
        {qrModalBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '1rem 0' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <QrCode size={180} color="#0F172A" />
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Access Pass Code</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>{qrModalBooking.bookingCode}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginTop: '0.5rem' }}>
                Slot {qrModalBooking.slotId} • {qrModalBooking.locationName}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Vehicle: {qrModalBooking.vehicleNumber}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Extend Session Modal */}
      <Modal
        isOpen={!!extendModalBooking}
        onClose={() => setExtendModalBooking(null)}
        title="Extend Active Parking Session"
        description="Add additional hours to your active reservation without moving your vehicle."
        footer={
          <>
            <Button variant="secondary" onClick={() => setExtendModalBooking(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleExtendSubmit}>
              Confirm Extension ({formatCurrency(extraHours * (extendModalBooking?.totalAmount / extendModalBooking?.durationHours || 80))})
            </Button>
          </>
        }
      >
        {extendModalBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--text)' }}>{extendModalBooking.locationName} (Slot {extendModalBooking.slotId})</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current Duration: {extendModalBooking.durationHours} hrs</div>
            </div>

            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                Select Extension Hours
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[1, 2, 3, 5].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setExtraHours(h)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${extraHours === h ? 'var(--primary)' : 'var(--border)'}`,
                      backgroundColor: extraHours === h ? 'var(--primary-light)' : 'var(--card-bg)',
                      color: extraHours === h ? 'var(--primary)' : 'var(--text)',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    +{h} hr{h > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserDashboard;
