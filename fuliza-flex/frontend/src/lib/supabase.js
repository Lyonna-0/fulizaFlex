import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase credentials in environment variables')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Auth functions
export const signInWithPhone = async (phone) => {
  const { data, error } = await supabase.auth.signInWithOtp({ phone })
  return { data, error }
}

export const verifyOtp = async (phone, token) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return error
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

// Orders functions
export const createOrder = async (userId, amount, phone) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        amount,
        fee: Math.round(amount * 0.05),
        phone,
        status: 'pending',
      },
    ])
    .select()

  return { data, error }
}

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  return { data, error }
}

// Payments functions
export const createPayment = async (orderId, phone, amount) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        order_id: orderId,
        phone,
        amount,
        status: 'pending',
      },
    ])
    .select()

  return { data, error }
}

export const getPaymentByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .single()

  return { data, error }
}
