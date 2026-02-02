export const formatPhoneNumber = (phone) => {
  // Convert 07xx to +2547xx format
  if (phone.startsWith('07')) {
    return '+254' + phone.slice(1)
  }
  return phone
}

export const validatePhoneNumber = (phone) => {
  const formattedPhone = formatPhoneNumber(phone)
  return /^\+254\d{9}$/.test(formattedPhone)
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(amount)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export const calculateFee = (amount) => {
  return Math.round(amount * 0.05)
}

export const calculateTotal = (amount) => {
  return amount + calculateFee(amount)
}
