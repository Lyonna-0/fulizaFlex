import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// M-Pesa API functions
export const mpesaApi = {
  initiateStkPush: (phone, amount, orderId) =>
    apiClient.post('/mpesa/stk-push', { phone, amount, order_id: orderId }),

  checkPaymentStatus: (requestId) =>
    apiClient.get(`/mpesa/status/${requestId}`),

  confirmPayment: (orderId) =>
    apiClient.post('/mpesa/confirm', { order_id: orderId }),
}

// Orders API functions
export const ordersApi = {
  getAll: () => apiClient.get('/orders'),
  getById: (id) => apiClient.get(`/orders/${id}`),
  create: (data) => apiClient.post('/orders', data),
  updateStatus: (id, status) =>
    apiClient.patch(`/orders/${id}`, { status }),
}

// Admin API functions
export const adminApi = {
  getMetrics: () => apiClient.get('/admin/metrics'),
  getOrders: (filters) => apiClient.get('/admin/orders', { params: filters }),
  updateOrder: (id, data) => apiClient.patch(`/admin/orders/${id}`, data),
  getUsers: (filters) => apiClient.get('/admin/users', { params: filters }),
  getAnalytics: (period) =>
    apiClient.get('/admin/analytics', { params: { period } }),
}

export default apiClient
