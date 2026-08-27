// Notification Service Abstraction
import { INITIAL_NOTIFICATIONS } from '../data/demoData';

let notificationsCache = (() => {
  try {
    const saved = localStorage.getItem('parkease_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
})();

const saveCache = () => {
  try {
    localStorage.setItem('parkease_notifications', JSON.stringify(notificationsCache));
  } catch (e) {
    console.error('Failed to save notifications to localStorage', e);
  }
};

export const notificationService = {
  async getNotifications(userId) {
    if (!userId) return [...notificationsCache];
    return notificationsCache.filter(n => n.userId === userId || !n.userId);
  },

  async markAsRead(id) {
    notificationsCache = notificationsCache.map(n => n.id === id ? { ...n, read: true } : n);
    saveCache();
    return notificationsCache;
  },

  async markAllAsRead(userId) {
    notificationsCache = notificationsCache.map(n => (!userId || n.userId === userId) ? { ...n, read: true } : n);
    saveCache();
    return notificationsCache;
  },

  async addNotification(notification) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: 'Just now',
      ...notification
    };
    notificationsCache = [newNotif, ...notificationsCache];
    saveCache();
    return newNotif;
  }
};
