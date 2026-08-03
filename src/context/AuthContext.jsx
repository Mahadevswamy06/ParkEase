import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../utils/dummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('parkease_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default user: Alex Morgan
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('parkease_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('parkease_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    // If custom email, generate mock user
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      phone: "+1 (555) 123-9999",
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      memberSince: "Aug 2026",
      totalBookings: 0,
      vehiclePlate: "CA-1029-X",
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
      phone: userData.phone || "+91 98765 00000",
      role: userData.role || "user",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      memberSince: "Aug 2026",
      totalBookings: 0,
      vehiclePlate: userData.vehiclePlate || "DL-01-AB-1234",
      status: "Active"
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'admin') {
      const adminUser = INITIAL_USERS.find(u => u.role === 'admin') || INITIAL_USERS[1];
      setCurrentUser(adminUser);
    } else {
      const standardUser = INITIAL_USERS.find(u => u.role === 'user') || INITIAL_USERS[0];
      setCurrentUser(standardUser);
    }
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      role: currentUser?.role || 'user',
      isAuthenticated: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      login,
      register,
      logout,
      switchRole,
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
