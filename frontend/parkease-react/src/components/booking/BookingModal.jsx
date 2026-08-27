import React, { useState } from 'react';
import { Calendar, Clock, Car, Shield, CheckCircle, ArrowRight, ArrowLeft, CreditCard, Zap, Sparkles } from 'lucide-react';
import Button from '../Button';
import DigitalPass from './DigitalPass';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';
import { pricingService } from '../../services/pricingService';
import { paymentService } from '../../services/paymentService';

const BookingModal = ({ location, isOpen, onClose }) => {
  const { vehicles, createBooking } = useParking();
  const { currentUser } = useAuth();

  const [step, setStep] = useState(1); // 1: Date/Time, 2: Vehicle, 3: Slot, 4: Review, 5: Payment, 6: Pass
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [durationHours, setDurationHours] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0] || null);
  const [selectedSlot, setSelectedSlot] = useState(location?.slots?.find(s => s.status === 'available')?.id || 'A1');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !location) return null;

  // Compute pricing
  const pricing = pricingService.calculatePrice({
    basePricePerHour: location.pricePerHour,
    durationHours,
    vehicleType: selectedVehicle?.type || 'Car'
  });

  const handleNext = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      alert('Please select date and time.');
      return;
    }
    if (step === 2 && !selectedVehicle) {
      alert('Please select a vehicle or add one.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleConfirmAndPay = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order abstraction
      const order = await paymentService.createOrder({
        amount: pricing.total,
        bookingId: `bk_${Date.now()}`
      });

      // 2. Verify payment abstraction
      await paymentService.verifyPayment({
        orderId: order.orderId,
        paymentMethod
      });

      // 3. Save booking record
      const bookingData = {
        userId: currentUser?.id || 'usr-1',
        userName: currentUser?.name || 'Mahadev Swamy',
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
      setStep(6); // Step 6: Confirmation Pass
    } catch (err) {
      alert('Payment processing failed. Please try again.');
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
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        backgroundColor: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
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
              Step {step} of 6 — {step === 1 ? 'Date & Time' : step === 2 ? 'Select Vehicle' : step === 3 ? 'Choose Slot' : step === 4 ? 'Review' : step === 5 ? 'Payment' : 'Digital Pass'}
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

        {/* Step Indicator Bar */}
        <div style={{ display: 'flex', height: '4px', backgroundColor: 'var(--border)' }}>
          <div style={{
            width: `${(step / 6) * 100}%`,
            backgroundColor: 'var(--primary)',
            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} />
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Select Parking Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Select Entry Time
                </label>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} style={{ width: '100%' }}>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
                  Parking Duration (Hours)
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
                        border: '1px solid var(--border)',
                        backgroundColor: durationHours === hrs ? 'var(--primary-light)' : 'var(--surface)',
                        borderColor: durationHours === hrs ? 'var(--primary)' : 'var(--border)',
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
                Choose Vehicle for Registration
              </label>
              {vehicles.length === 0 ? (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No vehicles found. Adding default vehicle KA-01-AB-1234.</div>
              ) : (
                vehicles.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    style={{
                      padding: '1rem',
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
                          {v.brand} {v.model} ({v.type})
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {v.registrationNumber} • {v.color}
                        </div>
                      </div>
                    </div>
                    {selectedVehicle?.id === v.id && <CheckCircle size={18} color="var(--primary)" />}
                  </div>
                ))
              )}
            </div>
          )}

          {/* STEP 3: Choose Slot */}
          {step === 3 && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '0.75rem' }}>
                Select Preferred Slot
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                {location.slots?.map((slot) => {
                  const isAvail = slot.status === 'available';
                  const isSelected = selectedSlot === slot.id;
                  return (
                    <button
                      key={slot.id}
                      disabled={!isAvail}
                      onClick={() => setSelectedSlot(slot.id)}
                      style={{
                        padding: '0.65rem 0',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--primary)' : isAvail ? 'var(--border)' : 'transparent',
                        backgroundColor: isSelected ? 'var(--primary)' : isAvail ? 'var(--surface)' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : isAvail ? 'var(--text)' : 'var(--text-light)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: isAvail ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {slot.id}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Review Booking */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Booking Summary</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', marginTop: '0.25rem' }}>{location.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{location.address}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Vehicle</span>
                  <span style={{ fontWeight: 700 }}>{selectedVehicle?.registrationNumber || 'KA-01-AB-1234'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Slot Number</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedSlot}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Date & Entry</span>
                  <span style={{ fontWeight: 700 }}>{selectedDate} at {selectedTime} ({durationHours}h)</span>
                </div>

                <div style={{ borderTop: '1px dashed var(--border)', my: '0.5rem', paddingTop: '0.5rem' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Parking Fee</span>
                  <span>₹{pricing.parkingFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>GST Taxes (18%)</span>
                  <span>₹{pricing.taxes}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Convenience Fee</span>
                  <span>₹{pricing.convenienceFee}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                  <span>Total Amount</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Payment */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Amount Payable</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>₹{pricing.total}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['UPI (Google Pay / PhonePe / Paytm)', 'Credit / Debit Card', 'Razorpay Gateway', 'Netbanking'].map((pm) => (
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

          {/* STEP 6: Confirmation Pass */}
          {step === 6 && confirmedBooking && (
            <DigitalPass booking={confirmedBooking} />
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 6 && (
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

            {step < 5 ? (
              <Button variant="primary" size="sm" onClick={handleNext}>
                Continue <ArrowRight size={14} />
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={handleConfirmAndPay} isLoading={isProcessing}>
                Confirm & Pay ₹{pricing.total}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
