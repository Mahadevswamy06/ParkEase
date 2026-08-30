import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Mail, Lock, LogIn, Eye, EyeOff, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = login(email || 'alex.morgan@parkease.in', password || 'password123');
      addToast(`Welcome back, ${res.user.name}!`, 'success', 'Authenticated');
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }, 500);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      addToast('Please enter your mobile number.', 'warning');
      return;
    }
    setOtpSent(true);
    addToast(`OTP code sent to ${phoneNumber}`, 'info');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      maxWidth: '1380px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      alignItems: 'center',
      gap: '3rem'
    }}>

      {/* Left Side: Luxury Parking Showcase Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          minHeight: '520px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2.5rem',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80"
          alt="Cyberpunk Smart Parking"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Gradient Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.88) 100%)'
        }} />

        {/* Left Content overlay text */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(37, 99, 235, 0.4)',
            backdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} /> ANPR Live Telemetry
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '0.5rem' }}>
            FastPass ANPR Barrier Gate Access
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '420px' }}>
            Seamless automated entry across 500+ premium Indian parking garages.
          </p>
        </div>
      </motion.div>

      {/* Right Side: Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '460px', margin: '0 auto' }}
      >
        <Card padding="lg">
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)' }}>Sign In to ParkEase</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Access your reservations and license pass
            </p>
          </div>

          {/* Login Tabs: Password vs OTP */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            backgroundColor: 'var(--bg)',
            padding: '0.3rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('password')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'password' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'password' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              Password Login
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('otp')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'otp' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'otp' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              OTP Login
            </button>
          </div>

          {/* Password Login Form */}
          {activeTab === 'password' ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                placeholder="alex.morgan@parkease.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div style={{ position: 'relative' }}>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  icon={Lock}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '38px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                  Remember me
                </label>
                <a href="#forgot" style={{ color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</a>
              </div>

              <button type="submit" className="btn-gradient" style={{ padding: '0.85rem 1.5rem', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                Sign In
              </button>
            </form>
          ) : (
            /* OTP Login Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Input
                label="Mobile Number (+91)"
                type="tel"
                icon={Phone}
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              {otpSent && (
                <Input
                  label="6-Digit OTP Code"
                  type="text"
                  icon={ShieldCheck}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                />
              )}

              {!otpSent ? (
                <Button type="button" variant="secondary" size="lg" onClick={handleSendOtp}>
                  Send One-Time Passcode
                </Button>
              ) : (
                <button type="submit" className="btn-gradient" style={{ padding: '0.85rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
                  Verify & Sign In
                </button>
              )}
            </form>
          )}

          {/* Social Logins */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Or continue with
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Google
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg)',
                  color: 'var(--text)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Apple ID
              </button>
            </div>
          </div>
        </Card>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
