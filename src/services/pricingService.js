// Pricing Engine Service Abstraction

export const pricingService = {
  /**
   * Calculate total price for a parking reservation
   * @param {Object} params
   * @param {number} params.basePricePerHour
   * @param {number} params.durationHours
   * @param {string} params.vehicleType ('Car' | 'Bike' | 'EV')
   * @param {string} params.startTime
   * @param {boolean} params.isWeekend
   */
  calculatePrice({ basePricePerHour = 40, durationHours = 2, vehicleType = 'Car', isWeekend = false }) {
    let rate = basePricePerHour;

    // Vehicle specific rate multipliers
    if (vehicleType === 'Bike') {
      rate = Math.round(basePricePerHour * 0.5);
    } else if (vehicleType === 'EV') {
      rate = Math.round(basePricePerHour * 1.25); // Includes charging pod access
    }

    // Weekend multiplier
    if (isWeekend) {
      rate = Math.round(rate * 1.15);
    }

    const parkingFee = rate * durationHours;
    const taxes = Math.round(parkingFee * 0.18 * 100) / 100; // 18% GST in India
    const convenienceFee = 15.00; // Fixed convenience charge ₹15
    const total = Math.round((parkingFee + taxes + convenienceFee) * 100) / 100;

    return {
      ratePerHour: rate,
      durationHours,
      parkingFee,
      taxes,
      convenienceFee,
      total
    };
  }
};
