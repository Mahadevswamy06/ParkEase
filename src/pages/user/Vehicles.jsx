import React, { useState } from 'react';
import { Car, Plus, Trash2, CheckCircle, Zap } from 'lucide-react';
import Button from '../../components/Button';
import { useParking } from '../../context/ParkingContext';

const Vehicles = () => {
  const { vehicles, addVehicle, removeVehicle, setDefaultVehicle } = useParking();

  const [isAdding, setIsAdding] = useState(false);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [type, setType] = useState('Car');
  const [color, setColor] = useState('White');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!registrationNumber || !brand) return;

    addVehicle({
      brand,
      model: model || 'Standard',
      registrationNumber: registrationNumber.toUpperCase(),
      type,
      color,
      isDefault: vehicles.length === 0
    });

    setBrand('');
    setModel('');
    setRegistrationNumber('');
    setIsAdding(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            My Registered Vehicles
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage your vehicles for automatic ANPR barrier recognition and instant bookings
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsAdding(!isAdding)} icon={Plus}>
          Add New Vehicle
        </Button>
      </div>

      {/* Add Vehicle Form Drawer */}
      {isAdding && (
        <div className="clean-card" style={{ padding: '1.5rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Register New Vehicle
          </h3>

          <form onSubmit={handleAddSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Vehicle Registration Plate *
              </label>
              <input
                type="text"
                placeholder="e.g. KA-01-AB-1234"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Make / Brand *
              </label>
              <input
                type="text"
                placeholder="e.g. Tata, Mahindra, Hyundai"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Model Name
              </label>
              <input
                type="text"
                placeholder="e.g. Nexon EV, Thar, Creta"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Vehicle Class
              </label>
              <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%' }}>
                <option value="Car">Sedan / Hatchback</option>
                <option value="SUV">SUV / Cruiser</option>
                <option value="EV">Electric Vehicle (EV)</option>
                <option value="Bike">Two Wheeler / Bike</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Vehicle Color
              </label>
              <input
                type="text"
                placeholder="e.g. Pearl White"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
              <Button type="submit" variant="primary" size="md" fullWidth>
                Save Vehicle
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Vehicles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="vehicles-grid">
        {vehicles.map((v) => (
          <div key={v.id} className="clean-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {v.type === 'EV' ? <Zap size={22} color="#EAB308" /> : <Car size={22} />}
              </div>
              {v.isDefault ? (
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle size={11} /> Primary Vehicle
                </span>
              ) : (
                <button
                  onClick={() => setDefaultVehicle(v.id)}
                  style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Set Default
                </button>
              )}
            </div>

            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)' }}>
                {v.registrationNumber}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>
                {v.brand} {v.model} ({v.type})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Color: {v.color || 'Standard'}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => removeVehicle(v.id)}
                style={{ border: 'none', background: 'transparent', color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .vehicles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Vehicles;
