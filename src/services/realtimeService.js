// Real-time Event Service Abstraction (WebSocket / Polling Fallback)

class RealtimeService {
  constructor() {
    this.listeners = new Map();
    this.isConnected = false;
    this.pollingTimer = null;
  }

  connect() {
    this.isConnected = true;
    // Fallback polling if WebSocket env URL is missing
    const wsUrl = import.meta.env?.VITE_WEBSOCKET_URL || null;

    if (!wsUrl && !this.pollingTimer) {
      this.pollingTimer = setInterval(() => {
        this.emit('heartbeat', { time: new Date().toLocaleTimeString() });
      }, 5000);
    }
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
  }

  disconnect() {
    this.isConnected = false;
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
    this.listeners.clear();
  }
}

export const realtimeService = new RealtimeService();
