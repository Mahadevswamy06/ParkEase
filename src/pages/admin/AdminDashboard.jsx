import React from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  Car,
  MapPin,
  TrendingUp,
  Users,
  PlusCircle,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import StatisticsCard from '../../components/StatisticsCard';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { ADMIN_STATS } from '../../utils/dummyData';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AdminDashboard = () => {
  const { locations, bookings, users } = useParking();

  const activeBookingsCount = bookings.filter(b => b.status === 'active').length;

  return (
    <div className="admin-dashboard animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: 'var(--card-bg)',
        padding: '1.5rem 1.75rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text)' }}>
            Admin Command Center 🛡️
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            System Overview • {locations.length} Connected Garages • {activeBookingsCount} Active Sessions Right Now
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/locations">
            <Button variant="primary" size="md" icon={PlusCircle}>
              Add Parking Lot
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button variant="secondary" size="md" icon={BarChart3}>
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatisticsCard
          title="Monthly Revenue"
          value={ADMIN_STATS.totalRevenue}
          change={ADMIN_STATS.revenueGrowth}
          changeType="positive"
          icon={IndianRupee}
          iconBg="var(--success-light)"
          iconColor="var(--success)"
        />
        <StatisticsCard
          title="Total System Bookings"
          value={ADMIN_STATS.totalBookings}
          change={ADMIN_STATS.bookingsGrowth}
          changeType="positive"
          icon={Car}
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
        <StatisticsCard
          title="Avg. Occupancy Rate"
          value={ADMIN_STATS.occupancyRate}
          change={ADMIN_STATS.occupancyGrowth}
          changeType="positive"
          icon={TrendingUp}
          iconBg="var(--warning-light)"
          iconColor="var(--warning)"
        />
        <StatisticsCard
          title="Registered Drivers"
          value={users.length * 340 + 120}
          change="+18 this week"
          changeType="positive"
          icon={Users}
          iconBg="var(--primary-light)"
          iconColor="var(--primary)"
        />
      </div>

      {/* Recharts Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
        {/* Revenue Trend Area Chart */}
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Revenue Overview</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Monthly gross revenue in INR (₹)</p>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>+18.4% YoY</span>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_STATS.revenueChart}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Occupancy by City Bar Chart */}
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Occupancy Rate by City</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Indian garage capacity utilization</p>
            </div>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_STATS.occupancyByCity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} axisLine={false} unit="%" />
                <Tooltip formatter={(v) => [`${v}%`, 'Occupancy']} />
                <Bar dataKey="percentage" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Global Bookings Table */}
      <Card padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)' }}>Recent System Bookings</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real-time user transactions across all Indian garages</p>
          </div>
          <Link to="/admin/bookings">
            <Button variant="outline" size="sm" icon={ArrowUpRight} iconPosition="right">
              View All Bookings
            </Button>
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Booking Code</th>
                <th style={{ padding: '0.85rem 1rem' }}>Location</th>
                <th style={{ padding: '0.85rem 1rem' }}>Slot</th>
                <th style={{ padding: '0.85rem 1rem' }}>Vehicle</th>
                <th style={{ padding: '0.85rem 1rem' }}>Date</th>
                <th style={{ padding: '0.85rem 1rem' }}>Amount</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>{b.bookingCode}</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{b.locationName}</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Slot {b.slotId}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{b.vehicleNumber}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>{formatDate(b.date)}</td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>{formatCurrency(b.totalAmount)}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <StatusBadge status={b.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
