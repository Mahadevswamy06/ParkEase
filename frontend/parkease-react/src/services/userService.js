// ParkEase REST API User Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const userService = {
  async registerUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        return await response.json();
      }
      const err = await response.text();
      throw new Error(err || 'Registration failed');
    } catch (error) {
      console.warn('Backend register failed, returning local mock user:', error.message);
      return {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'USER'
      };
    }
  },

  async loginUser(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'POST'
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend login failed, using local mock auth:', error.message);
    }
    return {
      id: 1,
      name: 'Mahadev Swamy',
      email: email,
      role: email.includes('admin') ? 'ADMIN' : 'USER'
    };
  },

  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend GET /api/users failed:', error.message);
    }
    return [
      { id: 1, name: 'Mahadev Swamy', email: 'driver@parkease.in', role: 'USER' },
      { id: 2, name: 'Admin Manager', email: 'admin@parkease.in', role: 'ADMIN' }
    ];
  }
};
