import React, { useState } from 'react';
import { QrCode, FileText, XCircle, Search, Filter } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import SearchBar from '../../components/SearchBar';
import EmptyState from '../../components/EmptyState';
import Modal from '../../components/Modal';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const BookingHistory = () => {
  const { bookings, cancelBooking } = useParking();
  const { addToast } = useToast();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [receiptBooking, setReceiptBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = b.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.slotId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCancel = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
      addToast('Booking cancelled.', 'warning', 'Cancelled');
    }
  };

  return (
    <div className="booking-history-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Booking History</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          View, manage, and download receipts for all your past and active parking reservations.
        </p>
      </div>

      {/* Filters & Search */}
      <Card padding="md" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: '260px' }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by booking code or garage name..."
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
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Bookings Table / List */}
      {filteredBookings.length === 0 ? (
        <EmptyState
          title="No bookings found"
          description="You haven't made any parking reservations matching this criteria yet."
        />
      ) : (
        <Card padding="none">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Booking Code</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Location</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Slot</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Date & Time</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Amount</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {b.bookingCode}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text)' }}>{b.locationName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Plate: {b.vehicleNumber}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>
                      <span style={{ backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        Slot {b.slotId}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                      <div>{formatDate(b.date)}</div>
                      <div style={{ fontSize: '0.8rem' }}>{b.startTime} ({b.durationHours} hrs)</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: 'var(--text)' }}>
                      {formatCurrency(b.totalAmount)}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <StatusBadge status={b.status} size="sm" />
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Button variant="ghost" size="sm" icon={FileText} onClick={() => setReceiptBooking(b)}>
                          Receipt
                        </Button>
                        {(b.status === 'active' || b.status === 'upcoming') && (
                          <Button variant="danger" size="sm" onClick={() => handleCancel(b.id)}>
                            Cancel
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
      )}

      {/* Receipt Modal */}
      <Modal
        isOpen={!!receiptBooking}
        onClose={() => setReceiptBooking(null)}
        title="Official Reservation Receipt"
        description="ParkEase Smart Parking System Transaction Record"
        footer={
          <Button variant="primary" onClick={() => { addToast('Receipt downloaded as PDF.', 'info'); setReceiptBooking(null); }}>
            Download PDF
          </Button>
        }
      >
        {receiptBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Booking ID</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{receiptBooking.bookingCode}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Location:</span>
                <span style={{ fontWeight: 700 }}>{receiptBooking.locationName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Reserved Slot:</span>
                <span style={{ fontWeight: 700 }}>Slot {receiptBooking.slotId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Date & Time:</span>
                <span style={{ fontWeight: 700 }}>{formatDate(receiptBooking.date)} @ {receiptBooking.startTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Vehicle Plate:</span>
                <span style={{ fontWeight: 700 }}>{receiptBooking.vehicleNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Payment Method:</span>
                <span style={{ fontWeight: 700 }}>{receiptBooking.paymentMethod}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
                <span>Total Amount Paid:</span>
                <span style={{ color: 'var(--primary)' }}>{formatCurrency(receiptBooking.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingHistory;
