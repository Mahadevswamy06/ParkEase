import React, { useState } from 'react';
import { Calendar, Clock, Car, Shield, CheckCircle, ArrowRight, ArrowLeft, CreditCard, Zap, Sparkles, AlertTriangle, Navigation, CheckCircle2 } from 'lucide-react';
import Button from '../Button';
import DigitalPass from './DigitalPass';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';
import { pricingService } from '../../services/pricingService';
import { paymentService } from '../../services/paymentService';

const BookingModal = ({ location, isOpen, onClose, initialSlot = null }) => {
  const { vehicles, createBooking, locations } = useParking();
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1); // 1: Select Slot & Duration, 2: Select Vehicle, 3: Summary, 4: Payment, 5: Success Pass
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [durationHours, setDurationHours] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0] || null);
  const [selectedSlot, setSelectedSlot] = useState(initialSlot?.slotNumber || initialSlot?.id || 'A01');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [conflictError, setConflictError] = useState(null);

  if (!isOpen || !location) return null;

  // Compute pricing
  const pricing = pricingService.calculatePrice({
    basePricePerHour: location.pricePerHour,
    durationHours,
    vehicleType: selectedVehicle?.type || 'Car'
  });

  const handleNext = () => {
    setConflictError(null);
    if (step === 1 && (!selectedDate || !selectedTime || !selectedSlot)) {
      alert('Please select slot, date and time.');
      return;
    }
    if (step === 2 && !selectedVehicle) {
      alert('Please select a vehicle.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setConflictError(null);
    setStep(prev => prev - 1);
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    setConflictError(null);

    try {
      // Check atomic conflict against current latest location data
      const currentLoc = locations.find(l => String(l.id) === String(location.id)) || location;
      const targetSlot = currentLoc.slots?.find(s => String(s.id) === String(selectedSlot) || s.slotNumber === selectedSlot);

      if (targetSlot && targetSlot.status && targetSlot.status.toUpperCase() !== 'AVAILABLE') {
        setConflictError(`Slot ${selectedSlot} was just reserved by another user. Please choose another slot.`);
        setIsProcessing(false);
        return;
      }

      // 1. Payment Simulation
      const order = await paymentService.createOrder({
        amount: pricing.total,
        bookingId: `bk_${Date.now()}`
      });

      await paymentService.verifyPayment({
        orderId: order.orderId,
        paymentMethod
      });

      // 2. Create Booking
      const bookingData = {
        userId: currentUser?.id || 'usr-1',
        userName: currentUser?.name || 'Mahadev Swamy',
        parkingLotId: location.id,
        parkingId: location.id,
        parkingName: location.name,
        address: location.address,
        slotId: selectedSlot,
        vehicleId: selectedVehicle?.id || 'v1',
        vehicleNumber: selectedVehicle?.registrationNumber || 'KA-01-AB-1234',
        vehicleDetails: `${selectedVehicle?.brand || 'Tata'} ${selectedVehicle?.model || 'Nexon'}`,
        date: selectedDate,
        startTime: selectedTime,
        durationHours,
        parkingFee: pricing.parkingFee,
        taxes: pricing.taxes,
        convenienceFee: pricing.convenienceFee,
        amount: pricing.total,
        paymentMethod
      };

      const newBooking = await createBooking(bookingData);
      setConfirmedBooking(newBooking);
      setStep(5); // Step 5: Success Digital Pass
    } catch (err) {
      setConflictError(err.message || 'Unable to confirm booking. Slot may no longer be available.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
      <div className="clean-card" style={{
        width: '100%',
        maxWidth: '580px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        backgroundColor: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
              Reserve Spot — {location.name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Step {step} of 5 — {step === 1 ? 'Slot & Timing' : step === 2 ? 'Vehicle' : step === 3 ? 'Booking Summary' : step === 4 ? 'Payment' : 'Pass Confirmed'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1.25rem',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div style={{ display: 'flex', height: '4px', backgroundColor: 'var(--border)' }}>
          <div style={{
            width: `${(step / 5) * 100}%`,
            backgroundColor: 'var(--primary)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
        </div>

        {/* Conflict Error Alert State */}
        {conflictError && (
          <div style={{
            margin: '1rem 1.5rem 0 1.5rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--danger-light)',
            border: '1px solid var(--danger-border)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--danger)',
            fontSize: '0.85rem'
          }}>
            <AlertTriangle size={20} style={{ shrink: 0 }} />
            <div style={{ flex: 1 }}>
              <strong>Reservation Conflict:</strong> {conflictError}
            </div>
            <Button variant="outline" size="sm" onClick={() => { setConflictError(null); setStep(1); }}>
              Choose Slot
            </Button>
          </div>
        )}

        {/* Modal Content Body */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          
          {/* STEP 1: Select Slot & Timing */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Selected Slot
                </label>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>Slot {selectedSlot}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>({location.name})</span>
                  </div>
                  <span className="badge badge-success">Available</span>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Date & Start Time
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Duration (Hours)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 6, 8, 12, 24].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setDurationHours(hrs)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid',
                        borderColor: durationHours === hrs ? 'var(--primary)' : 'var(--border)',
                        backgroundColor: durationHours === hrs ? 'var(--primary-light)' : 'var(--surface)',
                        color: durationHours === hrs ? 'var(--primary)' : 'var(--text)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      {hrs}h
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Select Vehicle */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>
                Select Vehicle to Register
              </label>
              {vehicles.length === 0 ? (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Default Vehicle: KA-01-AB-1234 (Tata Nexon)
                </div>
              ) : (
                vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: selectedVehicle?.id === v.id ? 'var(--primary)' : 'var(--border)',
                      backgroundColor: selectedVehicle?.id === v.id ? 'var(--primary-light)' : 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Car size={20} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>
                          {v.brand} {v.model}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {v.registrationNumber} • {v.type}
                        </div>
                      </div>
                    </div>
                    {selectedVehicle?.id === v.id && <CheckCircle size={18} color="var(--primary)" />}
                  </div>
                ))
              )}
            </div>
          )}

          {/* STEP 3: Booking Summary */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1.15rem', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Booking Summary</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginTop: '0.25rem' }}>{location.name}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Slot {selectedSlot} • {location.address}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
                  <span style={{ fontWeight: 700 }}>Today ({selectedTime})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Duration</span>
                  <span style={{ fontWeight: 700 }}>{durationHours} hours ({durationHours} × ₹{location.pricePerHour})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Vehicle Plate</span>
                  <span style={{ fontWeight: 700 }}>{selectedVehicle?.registrationNumber || 'KA-01-AB-1234'}</span>
                </div>

                <div style={{ borderTop: '1px dashed var(--border)', margin: '0.5rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                  <span>Total Amount</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Payment */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Tariff</div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>₹{pricing.total}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['UPI (Google Pay / PhonePe)', 'Credit / Debit Card', 'Razorpay', 'Netbanking'].map((pm) => (
                  <label
                    key={pm}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: paymentMethod === pm ? 'var(--primary)' : 'var(--border)',
                      backgroundColor: paymentMethod === pm ? 'var(--primary-light)' : 'var(--surface)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      value={pm}
                      checked={paymentMethod === pm}
                      onChange={() => setPaymentMethod(pm)}
                    />
                    {pm}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Success Pass */}
          {step === 5 && confirmedBooking && (
            <DigitalPass booking={confirmedBooking} onClose={onClose} />
          )}
        </div>

        {/* Modal Controls */}
        {step < 5 && (
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            {step > 1 ? (
              <Button variant="outline" size="sm" onClick={handleBack} icon={ArrowLeft}>
                Back
              </Button>
            ) : <div />}

            {step < 4 ? (
              <Button variant="primary" size="sm" onClick={handleNext}>
                Continue <ArrowRight size={14} />
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleConfirmBooking} isLoading={isProcessing}>
                Confirm Booking (₹{pricing.total})
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
