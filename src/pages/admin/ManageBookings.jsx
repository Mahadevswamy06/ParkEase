import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, FileText } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const ManageBookings = () => {
  const { bookings, cancelBooking, updateBookingStatus } = useParking();
  const { addToast } = useToast();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleForceStatus = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
    addToast(`Booking status updated to ${newStatus}.`, 'info');
  };

  return (
    <div className="manage-bookings-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Global Bookings Management</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Monitor, filter, and manually override reservation statuses across all facilities.
        </p>
      </div>

      <Card padding="md" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code, garage, or vehicle plate..."
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {['all', 'active', 'upcoming', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                border: `1px solid ${statusFilter === st ? 'var(--primary)' : 'var(--border)'}`,
                backgroundColor: statusFilter === st ? 'var(--primary-light)' : '#FFFFFF',
                color: statusFilter === st ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      <Card padding="none">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Booking Code</th>
                <th style={{ padding: '1rem 1.25rem' }}>Facility</th>
                <th style={{ padding: '1rem 1.25rem' }}>Slot & Plate</th>
                <th style={{ padding: '1rem 1.25rem' }}>Date & Duration</th>
                <th style={{ padding: '1rem 1.25rem' }}>Total</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {b.bookingCode}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{b.locationName}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700 }}>Slot {b.slotId}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.vehicleNumber}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                    <div>{formatDate(b.date)}</div>
                    <div style={{ fontSize: '0.8rem' }}>{b.startTime} ({b.durationHours} hrs)</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800 }}>{formatCurrency(b.totalAmount)}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <StatusBadge status={b.status} size="sm" />
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      {b.status === 'active' && (
                        <Button variant="secondary" size="sm" onClick={() => handleForceStatus(b.id, 'completed')}>
                          Complete
                        </Button>
                      )}
                      {(b.status === 'active' || b.status === 'upcoming') && (
                        <Button variant="danger" size="sm" onClick={() => handleForceStatus(b.id, 'cancelled')}>
                          Force Cancel
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ManageBookings;
