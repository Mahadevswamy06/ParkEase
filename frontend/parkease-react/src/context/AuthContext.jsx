import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/demoData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('parkease_user');
      return saved ? JSON.parse(saved) : MOCK_USERS[0]; // Default: Mahadev Swamy (Driver)
    } catch (e) {
      return MOCK_USERS[0];
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('parkease_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('parkease_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      phone: "+91 98765 43210",
      role: email.includes('admin') ? 'admin' : 'driver',
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      memberSince: "Aug 2026",
      totalBookings: 0,
      status: "Active"
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98765 43210",
      role: userData.role || "driver",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      memberSince: "Aug 2026",
      totalBookings: 0,
      status: "Active"
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const setRole = (role) => {
    if (role === 'admin') {
      const adminUser = MOCK_USERS.find(u => u.role === 'admin') || { ...currentUser, role: 'admin' };
      setCurrentUser(adminUser);
    } else {
      const driverUser = MOCK_USERS.find(u => u.role === 'driver') || { ...currentUser, role: 'driver' };
      setCurrentUser(driverUser);
    }
  };

  const updateProfile = (fields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...fields
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role: currentUser?.role || 'driver',
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      login,
      register,
      logout,
      setRole,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
