import { useState } from 'react'
import { apiClient, ordersApi, mpesaApi } from '../lib/api'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await ordersApi.getAll()
      setOrders(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (amount, phone) => {
    setLoading(true)
    try {
      const response = await ordersApi.create({ amount, phone })
      setOrders([response.data, ...orders])
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const initiatePayment = async (phone, amount, orderId) => {
    try {
      const response = await mpesaApi.initiateStkPush(phone, amount, orderId)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const checkPaymentStatus = async (requestId) => {
    try {
      const response = await mpesaApi.checkPaymentStatus(requestId)
      return response.data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    initiatePayment,
    checkPaymentStatus,
  }
}
