import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, Clock, CreditCard, CheckCircle2, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

const BookParkingModal = ({ isOpen, onClose, location, initialSlot = null }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createBooking } = useParking();
  const { addToast } = useToast();

  const [selectedSlot, setSelectedSlot] = useState(initialSlot || location?.slots?.[0]?.id || 'A1');
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00 AM');
  const [durationHours, setDurationHours] = useState(2);
  const [vehiclePlate, setVehiclePlate] = useState(currentUser?.vehiclePlate || 'NY-7849-X');
  const [paymentMethod, setPaymentMethod] = useState('Visa ending in 4242');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!location) return null;

  const currentSlotObj = location.slots.find(s => s.id === selectedSlot) || location.slots[0];
  const hourlyPrice = currentSlotObj?.price || location.pricePerHour;
  const subtotal = hourlyPrice * durationHours;
  const serviceFee = 1.50;
  const totalAmount = subtotal + serviceFee;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (currentSlotObj?.status === 'occupied') {
      addToast('Selected slot is occupied. Please select an available slot.', 'danger');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newBk = createBooking({
        locationId: location.id,
        locationName: location.name,
        address: location.address,
        slotId: selectedSlot,
        vehicleNumber: vehiclePlate,
        date: bookingDate,
        startTime: startTime,
        durationHours: Number(durationHours),
        totalAmount: totalAmount,
        paymentMethod: paymentMethod
      });

      addToast(`Booking confirmed! Reservation #${newBk.bookingCode} for Slot ${selectedSlot}.`, 'success', 'Reservation Successful');
      onClose();
      navigate('/user/dashboard');
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book Parking — ${location.name}`}
      description="Select slot, duration, and confirm your smart gate access pass."
      size="lg"
    >
      <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 1. VISUAL SLOT SELECTOR GRID */}
        <div>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span>1. Select Parking Slot</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Chosen: <strong style={{ color: 'var(--primary)' }}>Slot {selectedSlot}</strong> (${hourlyPrice}/hr)
            </span>
          </label>

          {/* Slot Grid Legend */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)' }} /> Available</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#E2E8F0' }} /> Occupied</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#FEF08A' }} /> EV Charger</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            gap: '0.65rem',
            maxHeight: '180px',
            overflowY: 'auto',
            padding: '0.75rem',
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            {location.slots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              const isAvailable = slot.status === 'available';
              const isEV = slot.type === 'ev';

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setSelectedSlot(slot.id)}
                  style={{
                    padding: '0.6rem 0.3rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `2px solid ${isSelected ? 'var(--primary)' : isAvailable ? 'var(--border)' : '#CBD5E1'}`,
                    backgroundColor: isSelected ? 'var(--primary)' : !isAvailable ? '#E2E8F0' : isEV ? '#FEF9C3' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : !isAvailable ? '#94A3B8' : 'var(--text)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                    transition: 'var(--transition)'
                  }}
                >
                  <span>{slot.id}</span>
                  {isEV && <Zap size={10} color={isSelected ? '#FFFFFF' : '#D97706'} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. DATE & TIME & DURATION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          <Input
            label="Reservation Date"
            type="date"
            icon={Calendar}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Duration (Hours)</label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              {[1, 2, 3, 4, 5, 6, 8, 12, 24].map(h => (
                <option key={h} value={h}>{h} Hour{h > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. VEHICLE PLATE & PAYMENT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Vehicle License Plate"
            icon={Car}
            placeholder="e.g. NY-7849-X"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            helperText="ANPR Camera Gate Scanner"
            required
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            >
              <option value="Visa ending in 4242">Visa ending in 4242</option>
              <option value="Mastercard ending in 8819">Mastercard ending in 8819</option>
              <option value="Apple Pay">Apple Pay</option>
            </select>
          </div>
        </div>

        {/* 4. PRICE BREAKDOWN SUMMARY CARD */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span>Parking Rate (${hourlyPrice}/hr × {durationHours} hrs)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <span>Service & Maintenance Fee</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
          <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.3rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
            <span>Total Payable</span>
            <span style={{ color: 'var(--primary)' }}>{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* SUBMIT ACTIONS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" icon={ShieldCheck} loading={isSubmitting}>
            Confirm & Pay {formatCurrency(totalAmount)}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BookParkingModal;
