import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Activity, Calendar, Percent, Layers, AlertCircle, ArrowUpRight, ArrowDownRight, RefreshCw, Car } from 'lucide-react';
import Button from '../../components/Button';
import { StatSkeleton } from '../../components/common/Skeleton';
import { useParking } from '../../context/ParkingContext';
import { parkingService } from '../../services/parkingService';

const AdminDashboard = () => {
  const { bookings, locations, lastUpdatedTime } = useParking();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAdminMetrics = async () => {
    setLoading(true);
    const data = await parkingService.getAdminMetrics();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAdminMetrics();
  }, [bookings, locations]);

  if (loading || !stats) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Parking Operator Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time IoT occupancy telemetry and revenue oversight
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated {lastUpdatedTime}</span>
          <Button variant="outline" size="sm" onClick={loadAdminMetrics} icon={RefreshCw}>
            Refresh Engine
          </Button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }} className="admin-stats-grid">
        <div className="clean-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Today's Revenue</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', margin: '0.25rem 0' }}>
            ₹{stats.totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
            <ArrowUpRight size={14} /> +14.2% vs yesterday
          </div>
        </div>

        <div className="clean-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Parked Vehicles</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text)', margin: '0.25rem 0' }}>
            {stats.activeSessions}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Live in garage slots
          </div>
        </div>

        <div className="clean-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Occupancy Rate</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text)', margin: '0.25rem 0' }}>
            {stats.occupancyRate}%
          </div>
          <div style={{ fontSize: '0.75rem', color: stats.occupancyRate > 80 ? 'var(--danger)' : 'var(--success)', fontWeight: 700 }}>
            {stats.occupancyRate > 80 ? 'High Demand Zone' : 'Optimal Capacity'}
          </div>
        </div>

        <div className="clean-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Available Slots</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)', margin: '0.25rem 0' }}>
            {stats.availableSlots} / {stats.totalSlots}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Across all locations
          </div>
        </div>
      </div>

      {/* Interactive Slot Management CTA Banner */}
      <div className="clean-card" style={{
        padding: '1.5rem',
        backgroundColor: 'var(--primary-light)',
        borderColor: 'var(--primary-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
            Visual Slot Management Grid & Hardware Controls
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Override slot states (Available, Reserved, Occupied, Maintenance, Disabled) and inspect live ANPR sensors.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/slots" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              Open Visual Slot Matrix →
            </Button>
          </Link>
        </div>
      </div>

      {/* Live Garage Locations Overview Table */}
      <div className="clean-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)' }}>
            Facility Locations Overview
          </h3>
          <Link to="/admin/locations" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
            Manage Locations →
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Location Name</th>
                <th style={{ padding: '0.75rem' }}>City</th>
                <th style={{ padding: '0.75rem' }}>Tariff</th>
                <th style={{ padding: '0.75rem' }}>Capacity</th>
                <th style={{ padding: '0.75rem' }}>Free Slots</th>
                <th style={{ padding: '0.75rem' }}>Occupancy</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => {
                const occ = Math.round(((loc.totalSlots - loc.availableSlots) / loc.totalSlots) * 100);
                return (
                  <tr key={loc.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--text)' }}>{loc.name}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: 'var(--text-secondary)' }}>{loc.city}</td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: 'var(--primary)' }}>₹{loc.pricePerHour}/hr</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{loc.totalSlots}</td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700, color: loc.availableSlots > 0 ? 'var(--success)' : 'var(--danger)' }}>
                      {loc.availableSlots}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${occ}%`, height: '100%', backgroundColor: occ > 80 ? 'var(--danger)' : 'var(--primary)' }} />
                        </div>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{occ}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>OPERATIONAL</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
