import React, { useState } from 'react';
import { User, Plus, Trash2, Shield, Search } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import SearchBar from '../../components/SearchBar';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';

const ManageUsers = () => {
  const { users, addUser, deleteUser, toggleUserStatus } = useParking();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehiclePlate: '',
    role: 'user'
  });

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    addToast(`New user ${formData.name} created successfully.`, 'success');
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', phone: '', vehiclePlate: '', role: 'user' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete user ${name}?`)) {
      deleteUser(id);
      addToast(`User ${name} deleted.`, 'warning');
    }
  };

  return (
    <div className="manage-users-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Manage Registered Users</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            System accounts, roles, vehicle plates, and active permissions.
          </p>
        </div>

        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Add User Account
        </Button>
      </div>

      <Card padding="md">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by user name, email, or vehicle plate..."
        />
      </Card>

      <Card padding="none">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem 1.25rem' }}>User</th>
                <th style={{ padding: '1rem 1.25rem' }}>Contact</th>
                <th style={{ padding: '1rem 1.25rem' }}>Vehicle Plate</th>
                <th style={{ padding: '1rem 1.25rem' }}>Role</th>
                <th style={{ padding: '1rem 1.25rem' }}>Total Bookings</th>
                <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={u.avatar} alt={u.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text)' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Since {u.memberSince}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div>{u.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {u.vehiclePlate || 'N/A'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: u.role === 'admin' ? '#EFF6FF' : '#F1F5F9',
                      color: u.role === 'admin' ? 'var(--primary)' : 'var(--text-secondary)'
                    }}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>
                    {u.totalBookings}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <StatusBadge status={u.status === 'Active' ? 'active' : 'inactive'} size="sm" />
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" onClick={() => { toggleUserStatus(u.id); addToast(`Toggled ${u.name} status.`, 'info'); }}>
                        Toggle Status
                      </Button>
                      <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(u.id, u.name)}>
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

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User Account"
        description="Register a new driver or administrator account."
      >
        <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Full Name"
            placeholder="e.g. John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="Vehicle License Plate"
              placeholder="e.g. CA-4412-B"
              value={formData.vehiclePlate}
              onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              style={{ height: '42px', padding: '0 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', outline: 'none' }}
            >
              <option value="user">Standard User</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Create User</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
