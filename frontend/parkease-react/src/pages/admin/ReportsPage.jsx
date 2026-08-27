import React, { useState } from 'react';
import { Download, Calendar, BarChart3, TrendingUp, DollarSign, FileSpreadsheet, FileText } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatisticsCard from '../../components/StatisticsCard';
import { ADMIN_STATS } from '../../utils/dummyData';
import { useToast } from '../../context/ToastContext';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const ReportsPage = () => {
  const { addToast } = useToast();
  const [timeRange, setTimeRange] = useState('30days');

  const handleExport = (format) => {
    addToast(`Exporting ${format.toUpperCase()} report for ${timeRange}... Download started.`, 'success', 'Export Complete');
  };

  const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444'];

  return (
    <div className="reports-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header & Export Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Analytics & Financial Reports</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Comprehensive performance metrics, slot utilization breakdown, and gross revenue telemetry.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="secondary" size="md" icon={FileSpreadsheet} onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
          <Button variant="primary" size="md" icon={FileText} onClick={() => handleExport('pdf')}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Date Range Selector Bar */}
      <Card padding="md" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Calendar size={18} color="var(--primary)" />
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Select Time Horizon:</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: '7days', label: 'Last 7 Days' },
            { id: '30days', label: 'Last 30 Days' },
            { id: 'quarter', label: 'This Quarter' },
            { id: 'ytd', label: 'Year to Date' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTimeRange(item.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: `1px solid ${timeRange === item.id ? 'var(--primary)' : 'var(--border)'}`,
                backgroundColor: timeRange === item.id ? 'var(--primary-light)' : '#FFFFFF',
                color: timeRange === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatisticsCard
          title="Gross Revenue"
          value={ADMIN_STATS.totalRevenue}
          change="+18.4% vs prev period"
          changeType="positive"
          icon={DollarSign}
          iconBg="#F0FDF4"
          iconColor="var(--success)"
        />
        <StatisticsCard
          title="Average Rate / Booking"
          value="$34.50"
          change="+ $2.10 peak hour surcharge"
          changeType="positive"
          icon={TrendingUp}
          iconBg="#EFF6FF"
          iconColor="var(--primary)"
        />
        <StatisticsCard
          title="Peak Occupancy Hour"
          value="02:00 PM - 05:00 PM"
          change="98.2% capacity"
          changeType="neutral"
          icon={BarChart3}
          iconBg="#FFFBEB"
          iconColor="var(--warning)"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        {/* Monthly Revenue Trend */}
        <Card padding="lg">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text)' }}>
            Revenue Telemetry ($)
          </h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_STATS.revenueChart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Gross Revenue']} />
                <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Slot Type Distribution Pie Chart */}
        <Card padding="lg">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text)' }}>
            Capacity by Slot Category
          </h3>
          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ADMIN_STATS.slotTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {ADMIN_STATS.slotTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
