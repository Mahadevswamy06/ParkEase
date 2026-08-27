import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';
import Button from '../../components/Button';
import { useParking } from '../../context/ParkingContext';

const ManageLocations = () => {
  const { locations, addLocation, deleteLocation } = useParking();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [address, setAddress] = useState('');
  const [pricePerHour, setPricePerHour] = useState(50);
  const [totalSlots, setTotalSlots] = useState(40);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !address) return;

    addLocation({
      name,
      city,
      address,
      pricePerHour: Number(pricePerHour),
      totalSlots: Number(totalSlots),
      image
    });

    setName('');
    setAddress('');
    setIsAdding(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Parking Locations & Garages
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage parking facilities, hourly tariffs, and slot capacity limits
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsAdding(!isAdding)} icon={Plus}>
          Add Parking Location
        </Button>
      </div>

      {/* Create Location Form */}
      {isAdding && (
        <div className="clean-card" style={{ padding: '1.5rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
            Register New Parking Facility
          </h3>

          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Facility Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Orion Mall Multi-Level Parking"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Target City *
              </label>
              <select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%' }}>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Hourly Price (₹/hr) *
              </label>
              <input
                type="number"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Total Slot Capacity *
              </label>
              <input
                type="number"
                value={totalSlots}
                onChange={(e) => setTotalSlots(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Street Address *
              </label>
              <input
                type="text"
                placeholder="Full address string"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
              <Button type="submit" variant="primary" size="md" fullWidth>
                Save Facility
              </Button>
              <Button type="button" variant="outline" size="md" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Locations Table */}
      <div className="clean-card" style={{ padding: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Facility Name</th>
                <th style={{ padding: '0.75rem' }}>City</th>
                <th style={{ padding: '0.75rem' }}>Hourly Rate</th>
                <th style={{ padding: '0.75rem' }}>Total Bays</th>
                <th style={{ padding: '0.75rem' }}>Available Bays</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--text)' }}>
                    <div>{loc.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{loc.address}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-secondary)' }}>{loc.city}</td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--primary)' }}>₹{loc.pricePerHour}/hr</td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>{loc.totalSlots}</td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: loc.availableSlots > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {loc.availableSlots}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right' }}>
                    <button
                      onClick={() => deleteLocation(loc.id)}
                      style={{ border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLocations;
