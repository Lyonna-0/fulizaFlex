import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Get all orders
export const getAllOrders = async (filters = {}) => {
  let query = supabase.from('orders').select('*')

  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  if (filters.userId) {
    query = query.eq('user_id', filters.userId)
  }

  const { data, error } = await query.order('created_at', {
    ascending: false,
  })

  return { data, error }
}

// Get order by ID
export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  return { data, error }
}

// Create new order
export const createOrder = async (userId, amount, phone) => {
  const fee = Math.round(amount * 0.05)
  const orderNumber = `FZ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString().slice(2, 6)}`

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        order_number: orderNumber,
        amount,
        fee,
        status: 'pending',
      },
    ])
    .select()

  return { data, error }
}

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      updated_at: new Date(),
      completed_at: status === 'completed' ? new Date() : null,
    })
    .eq('id', orderId)
    .select()

  return { data, error }
}

// Get user orders
export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Create payment record
export const createPayment = async (orderId, phone, amount, mpesaRequestId) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        order_id: orderId,
        phone,
        amount,
        status: 'pending',
        mpesa_request_id: mpesaRequestId,
      },
    ])
    .select()

  return { data, error }
}

// Update payment status
export const updatePaymentStatus = async (paymentId, status, mpesaReceipt) => {
  const { data, error } = await supabase
    .from('payments')
    .update({
      status,
      mpesa_receipt: mpesaReceipt,
      completed_at: status === 'completed' ? new Date() : null,
      updated_at: new Date(),
    })
    .eq('id', paymentId)
    .select()

  return { data, error }
}

// Get payment by order ID
export const getPaymentByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .single()

  return { data, error }
}

// Get admin metrics
export const getAdminMetrics = async () => {
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')

  if (ordersError) return { error: ordersError }

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.fee, 0)
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const completedOrders = orders.filter((o) => o.status === 'completed').length

  return {
    data: {
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
    },
  }
}
