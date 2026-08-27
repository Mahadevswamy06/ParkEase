import React, { useState } from 'react';
import { Camera, CheckCircle2, ShieldCheck, Zap, ArrowRight, RefreshCw, Car } from 'lucide-react';
import Button from '../../components/Button';
import { anprService } from '../../services/anprService';
import { gateService } from '../../services/gateService';
import { useParking } from '../../context/ParkingContext';

const CheckInCheckout = ({ booking }) => {
  const { updateBookingStatus } = useParking();
  const [stage, setStage] = useState('IDLE'); // IDLE, SCANNING, VERIFIED, GATE_OPENING, IN_PARKING, CHECKED_OUT
  const [scanResult, setScanResult] = useState(null);
  const [gateResult, setGateResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const activePlate = booking?.vehicleNumber || 'KA-01-AB-1234';

  const handleStartANPRCheckIn = async () => {
    setIsProcessing(true);
    setStage('SCANNING');

    // 1. Scan plate via ANPR service
    const scan = await anprService.scanVehicle(activePlate);
    setScanResult(scan);

    setTimeout(async () => {
      setStage('VERIFIED');

      // 2. Trigger gate open
      setTimeout(async () => {
        setStage('GATE_OPENING');
        const gate = await gateService.openGate('Gate-1');
        setGateResult(gate);

        setTimeout(() => {
          setStage('IN_PARKING');
          setIsProcessing(false);
        }, 1500);
      }, 1200);
    }, 1200);
  };

  const handleCheckOut = async () => {
    setIsProcessing(true);
    await gateService.openGate('Exit-Gate-1');
    setStage('CHECKED_OUT');
    setIsProcessing(false);
  };

  return (
    <div className="clean-card" style={{ padding: '1.5rem', maxWidth: '540px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Camera size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
            Digital ANPR Kiosk Check-In
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Automated License Plate Barrier Control System
          </p>
        </div>
      </div>

      {/* Camera Viewport Simulation */}
      <div style={{
        position: 'relative',
        height: '180px',
        backgroundColor: '#0F172A',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        border: '2px solid var(--border)'
      }}>
        {stage === 'SCANNING' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Camera size={32} color="#38BDF8" className="pulse" />
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Optical Camera Scanning Plate...</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>High-Speed ANPR Lens #01</div>
          </div>
        )}

        {stage === 'VERIFIED' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={36} color="#22C55E" />
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#4ADE80' }}>Vehicle Detected & Verified!</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, backgroundColor: '#1E293B', padding: '4px 12px', borderRadius: '4px' }}>
              {scanResult?.licensePlate}
            </div>
          </div>
        )}

        {stage === 'GATE_OPENING' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={36} color="#38BDF8" />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38BDF8' }}>Barrier Arm Opening...</div>
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Gate 01 Main Entry — Proceed to Slot A12</div>
          </div>
        )}

        {stage === 'IN_PARKING' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Car size={36} color="#22C55E" />
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>Parking Session Active</div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Slot A12 • Timer Running</div>
          </div>
        )}

        {stage === 'CHECKED_OUT' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={36} color="#22C55E" />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4ADE80' }}>Checked Out Successfully!</div>
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>Exit Gate Barrier Raised • Receipt Emailed</div>
          </div>
        )}

        {stage === 'IDLE' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Camera size={32} color="#64748B" />
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>ANPR Kiosk Ready for Optical Entry Scan</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', backgroundColor: '#1E293B', padding: '4px 12px', borderRadius: '4px' }}>
              Target Vehicle: {activePlate}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center' }}>
        {stage === 'IDLE' && (
          <Button variant="primary" onClick={handleStartANPRCheckIn} isLoading={isProcessing} icon={Camera} fullWidth>
            Simulate ANPR Entry Scan
          </Button>
        )}

        {stage === 'IN_PARKING' && (
          <Button variant="primary" onClick={handleCheckOut} isLoading={isProcessing} icon={ShieldCheck} fullWidth>
            Complete Check-Out & Open Exit Gate
          </Button>
        )}

        {(stage === 'CHECKED_OUT' || stage === 'IN_PARKING') && (
          <Button variant="outline" size="sm" onClick={() => setStage('IDLE')} style={{ marginTop: '0.5rem' }}>
            Reset Kiosk Simulator
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckInCheckout;
