// Smart Parking Gate & Barrier Control Service Abstraction

export const gateService = {
  /**
   * Send signal to hardware controller to open parking barrier arm
   * @param {string} gateId
   */
  async openGate(gateId = 'Gate-1') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          gateId,
          status: 'OPENING',
          message: 'Barrier arm raised. Please proceed to your designated bay.',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 600);
    });
  },

  async closeGate(gateId = 'Gate-1') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          gateId,
          status: 'CLOSED',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 500);
    });
  },

  async getGateStatus(gateId = 'Gate-1') {
    return {
      gateId,
      status: 'OPERATIONAL',
      mode: 'AUTOMATIC_ANPR',
      lastPing: new Date().toISOString()
    };
  }
};
