import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useToast } from '../../context/ToastContext';

const ContactPage = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('Thank you! Your message has been sent to our support team.', 'success', 'Message Sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="contact-page animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text)' }}>Contact Our Team</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Have questions about our Smart Parking system or enterprise partnership? Get in touch.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        {/* Contact Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card padding="lg" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', color: 'var(--primary)' }}>
              <Mail size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>Email Support</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>support@parkease-saas.com</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Average response time: 15 minutes</p>
            </div>
          </Card>

          <Card padding="lg" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', color: 'var(--success)' }}>
              <Phone size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>Phone & Hotline</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>+1 (800) 555-PARK (7275)</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Available 24/7 for active parking issues</p>
            </div>
          </Card>

          <Card padding="lg" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FFFBEB', color: 'var(--warning)' }}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>Headquarters</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>500 Howard Street, Suite 400</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>San Francisco, CA 94105</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card padding="lg">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)' }}>Send us a Message</h3>
            
            <Input
              label="Your Full Name"
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="jane@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Subject"
              placeholder="e.g. Enterprise Parking Partnership"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                Message <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <textarea
                rows="4"
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" icon={Send} loading={loading} fullWidth>
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
