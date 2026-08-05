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
  TrendingUp,
  Heart,
  Search,
  UserCheck,
  Headphones,
  Check,
  X,
  FileText
} from 'lucide-react';
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

  // Active & Upcoming Bookings
  const activeBooking = bookings.find(b => b.status === 'active');
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  
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
    <div className="user-dashboard animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner Greeting Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#FFFFFF',
        padding: '1.75rem 2rem',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            <strong>Good Morning, {currentUser?.name || 'Mahadev'}! 👋</strong> Here's what's happening with your parking today.
          </p>
        </div>

        <Link to="/parking">
          <Button variant="primary" size="md" style={{ borderRadius: '10px', backgroundColor: '#2563EB', padding: '0.65rem 1.4rem' }}>
            + Book New Parking
          </Button>
        </Link>
      </div>

      {/* 4 Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Bookings</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', margin: '0.2rem 0' }}>24</div>
          <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={14} /> 12% this month
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Bookings</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', margin: '0.2rem 0' }}>2</div>
          <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }}></span> Currently active
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Spent</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', margin: '0.2rem 0' }}>₹2,450</div>
          <div style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <TrendingUp size={14} /> 8% this month
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Saved Locations</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', margin: '0.2rem 0' }}>6</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Heart size={13} color="#EF4444" fill="#EF4444" /> Your favorites
          </div>
        </div>

      </div>

      {/* Grid: Upcoming Booking & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Upcoming Booking Card */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Upcoming Booking</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#ECFDF5', color: '#059669', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
              ✓ Confirmed
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: 'var(--bg)', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Car size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>Connaught Place Central Deck</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>Slot A12 • DL-01-AB-1234</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} color="#2563EB" /> 10 Aug 2026
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} color="#2563EB" /> 10:00 AM - 01:00 PM (3 hrs)
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Amount</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)' }}>₹240.00</div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <Button variant="outline" size="sm" style={{ borderRadius: '8px' }}>
                View Details
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setQrModalBooking(upcomingBookings[0] || activeBooking || { bookingCode: 'PARK-CP-8842', slotId: 'A12', locationName: 'Connaught Place Central Deck', vehicleNumber: 'DL-01-AB-1234' })}
                style={{ borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}
              >
                Get Pass (QR)
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '20px', padding: '1.5rem', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Recent Activity</h3>
            <Link to="/user/bookings" style={{ fontSize: '0.85rem', color: '#2563EB', fontWeight: 600 }}>View All</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                <Check size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text)' }}>Booking Confirmed</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Connaught Place • Slot A12</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Today, 9:30 AM</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                ₹
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text)' }}>Payment Successful</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>₹240.00 Paid successfully</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Today, 9:30 AM</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                <X size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text)' }}>Booking Cancelled</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>DLF Cyber Hub • Slot B08</div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Yesterday, 6:20 PM</div>
            </div>

          </div>
        </div>

      </div>

      {/* Quick Actions Component Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        padding: '1.5rem 1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.15rem' }}>Quick Actions</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <Link to="/parking" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', transition: 'var(--transition)' }}>
              <Search size={20} color="#2563EB" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Find Parking</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Search nearby spots</div>
              </div>
            </div>
          </Link>

          <Link to="/user/bookings" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', transition: 'var(--transition)' }}>
              <Calendar size={20} color="#2563EB" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>My Bookings</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>View all bookings</div>
              </div>
            </div>
          </Link>

          <Link to="/user/profile" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', transition: 'var(--transition)' }}>
              <UserCheck size={20} color="#2563EB" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>My Profile</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Manage profile</div>
              </div>
            </div>
          </Link>

          <Link to="/user/settings" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', transition: 'var(--transition)' }}>
              <CreditCard size={20} color="#2563EB" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Wallet</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Check balance</div>
              </div>
            </div>
          </Link>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.9rem 1.1rem', borderRadius: '14px', border: '1px solid var(--border)', backgroundColor: 'var(--bg)', transition: 'var(--transition)' }}>
              <Headphones size={20} color="#2563EB" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Support</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Get help</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      <Modal
        isOpen={!!qrModalBooking}
        onClose={() => setQrModalBooking(null)}
        title="Gate Access Pass (ANPR Backup)"
        description="Scan this QR code at the entrance barrier scanner if automatic plate recognition camera is obstructed."
      >
        {qrModalBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '1rem 0' }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px dashed #E2E8F0',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <QrCode size={180} color="#0F172A" />
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Access Pass Code</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.05em' }}>{qrModalBooking.bookingCode}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginTop: '0.5rem' }}>
                Slot {qrModalBooking.slotId} • {qrModalBooking.locationName}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Vehicle: {qrModalBooking.vehicleNumber}
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default UserDashboard;
