// ANPR (Automatic Number Plate Recognition) Hardware Integration Abstraction

export const anprService = {
  /**
   * Simulate or call optical ANPR camera system to scan license plate
   * @param {string} [inputPlate]
   */
  async scanVehicle(inputPlate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const detectedPlate = inputPlate || 'KA-01-AB-1234';
        resolve({
          detected: true,
          licensePlate: detectedPlate.toUpperCase(),
          confidenceScore: 0.985,
          timestamp: new Date().toLocaleTimeString(),
          cameraLocation: 'Gate 01 - Main Entrance (High-Speed Optics)',
          matchedBooking: true
        });
      }, 800);
    });
  },

  async verifyPlateWithBooking(licensePlate, bookingCode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          verified: true,
          licensePlate,
          bookingCode,
          slotAssigned: 'A12',
          message: 'Entry Authorized - Welcome to ParkEase'
        });
      }, 500);
    });
  }
};
