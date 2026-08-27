// Format currency to INR (₹)
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getStatusBadgeVariant = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'available':
    case 'open':
      return 'success';
    case 'upcoming':
    case 'reserved':
    case 'pending':
      return 'warning';
    case 'occupied':
    case 'cancelled':
    case 'closed':
    case 'inactive':
      return 'danger';
    case 'completed':
      return 'info';
    default:
      return 'secondary';
  }
};
