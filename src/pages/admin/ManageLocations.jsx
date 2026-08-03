import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Search } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import SearchBar from '../../components/SearchBar';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/formatters';

const ManageLocations = () => {
  const { locations, addLocation, updateLocation, deleteLocation } = useParking();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLoc, setEditingLoc] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: 'New York',
    pricePerHour: 8.50,
    totalSlots: 40,
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (editingLoc) {
      updateLocation(editingLoc.id, formData);
      addToast('Location updated successfully.', 'success');
      setEditingLoc(null);
    } else {
      addLocation(formData);
      addToast('New parking location created successfully!', 'success');
    }
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      address: '',
      city: 'New York',
      pricePerHour: 8.50,
      totalSlots: 40,
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      description: ''
    });
  };

  const handleEditClick = (loc) => {
    setEditingLoc(loc);
    setFormData({
      name: loc.name,
      address: loc.address,
      city: loc.city,
      pricePerHour: loc.pricePerHour,
      totalSlots: loc.totalSlots,
      image: loc.image,
      description: loc.description || ''
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteLocation(id);
      addToast(`${name} deleted.`, 'warning');
    }
  };

  return (
    <div className="manage-locations-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Manage Parking Locations</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Add, update, or remove enterprise parking facilities across regions.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => { setEditingLoc(null); setIsAddModalOpen(true); }}>
          Add New Facility
        </Button>
      </div>

      <Card padding="md">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by facility name or city..."
        />
      </Card>

      <Card padding="none">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Facility</th>
                <th style={{ padding: '1rem 1.25rem' }}>City</th>
                <th style={{ padding: '1rem 1.25rem' }}>Capacity</th>
                <th style={{ padding: '1rem 1.25rem' }}>Rate/hr</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((loc) => (
                <tr key={loc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img src={loc.image} alt={loc.name} style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text)' }}>{loc.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{loc.address}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>{loc.city}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{loc.availableSlots}</span> / {loc.totalSlots} free
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800 }}>{formatCurrency(loc.pricePerHour)}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <StatusBadge status={loc.isOpen ? 'open' : 'closed'} size="sm" />
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" icon={Edit2} onClick={() => handleEditClick(loc)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(loc.id, loc.name)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Location Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={editingLoc ? "Edit Facility Details" : "Add New Parking Facility"}
        description="Enter garage metadata, pricing, and initial slot capacity."
      >
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Facility Name"
            placeholder="e.g. Skyline Central Deck"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Street Address"
              placeholder="e.g. 100 Main St"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ height: '42px', padding: '0 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
              >
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Los Angeles">Los Angeles</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Price Per Hour ($)"
              type="number"
              step="0.5"
              value={formData.pricePerHour}
              onChange={(e) => setFormData({ ...formData, pricePerHour: Number(e.target.value) })}
              required
            />

            <Input
              label="Total Capacity Slots"
              type="number"
              value={formData.totalSlots}
              onChange={(e) => setFormData({ ...formData, totalSlots: Number(e.target.value) })}
              required
            />
          </div>

          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">
              {editingLoc ? "Save Changes" : "Create Location"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageLocations;
