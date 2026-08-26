// Booking Service Abstraction
import { INITIAL_BOOKINGS } from '../data/demoData';

let bookingsCache = (() => {
  try {
    const saved = localStorage.getItem('parkease_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
})();

const saveCache = () => {
  try {
    localStorage.setItem('parkease_bookings', JSON.stringify(bookingsCache));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
};

export const bookingService = {
  async getBookings(userId) {
    if (!userId) return [...bookingsCache];
    return bookingsCache.filter(b => b.userId === userId);
  },

  async getBookingById(bookingId) {
    const found = bookingsCache.find(b => b.id === bookingId || b.bookingCode === bookingId);
    if (!found) throw new Error(`Booking ${bookingId} not found`);
    return { ...found };
  },

  async createBooking(bookingData) {
    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: `PRK-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'active',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    bookingsCache = [newBooking, ...bookingsCache];
    saveCache();
    return newBooking;
  },

  async cancelBooking(bookingId) {
    bookingsCache = bookingsCache.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
    saveCache();
    return bookingsCache.find(b => b.id === bookingId);
  },

  async updateBookingStatus(bookingId, status) {
    bookingsCache = bookingsCache.map(b => b.id === bookingId ? { ...b, status } : b);
    saveCache();
    return bookingsCache.find(b => b.id === bookingId);
  }
};
