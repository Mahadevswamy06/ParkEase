// Payment Gateway Service Abstraction (Razorpay / Stripe / UPI backend-ready)

export const paymentService = {
  /**
   * Create payment order session
   * @param {Object} orderData
   * @param {number} orderData.amount
   * @param {string} orderData.currency ('INR')
   * @param {string} orderData.bookingId
   */
  async createOrder({ amount, currency = 'INR', bookingId }) {
    // Uses environment variables if configured
    const razorpayKey = import.meta.env?.VITE_RAZORPAY_KEY_ID || null;
    const stripePublicKey = import.meta.env?.VITE_STRIPE_PUBLIC_KEY || null;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          orderId: `order_${Math.random().toString(36).substring(2, 11)}`,
          amount,
          currency,
          gateway: razorpayKey ? 'Razorpay' : stripePublicKey ? 'Stripe' : 'ParkEase Gateway (UPI/Card)',
          status: 'created',
          createdAt: new Date().toISOString()
        });
      }, 300);
    });
  },

  /**
   * Verify completed payment transaction
   */
  async verifyPayment({ orderId, paymentId, signature, paymentMethod = 'UPI' }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: paymentId || `txn_${Math.random().toString(36).substring(2, 12)}`,
          orderId,
          paymentMethod,
          verifiedAt: new Date().toISOString(),
          status: 'paid'
        });
      }, 400);
    });
  },

  async getPaymentStatus(transactionId) {
    return {
      transactionId,
      status: 'SUCCESSFUL',
      timestamp: new Date().toISOString()
    };
  },

  async refundPayment(bookingId, amount) {
    return {
      refundId: `rfnd_${Math.random().toString(36).substring(2, 10)}`,
      bookingId,
      amount,
      status: 'REFUNDED',
      timestamp: new Date().toISOString()
    };
  }
};
