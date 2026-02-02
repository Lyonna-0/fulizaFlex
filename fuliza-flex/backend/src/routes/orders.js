import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { verifyToken } from '../auth.js'
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getUserOrders,
} from '../db.js'
import {
  initiateStkPush,
  validatePhoneFormat,
} from '../mpesa.js'
import config from '../config.js'

const router = express.Router()
const supabase = createClient(config.supabase.url, config.supabase.key)

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query
    const { data, error } = await getAllOrders({ status })

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get user's orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const { data, error } = await getUserOrders(req.user.userId)

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await getOrderById(req.params.id)

    if (error) throw error
    if (!data) return res.status(404).json({ error: 'Order not found' })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { amount, phone } = req.body

    if (!amount || !phone) {
      return res.status(400).json({ error: 'Amount and phone required' })
    }

    if (!validatePhoneFormat(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' })
    }

    // Create order in database
    const fee = Math.round(amount * 0.05)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: req.user.userId,
          amount,
          fee,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (orderError) throw orderError

    // Initiate M-Pesa STK Push
    try {
      const stk = await initiateStkPush(
        phone,
        amount + fee,
        order.id
      )

      // Store M-Pesa request ID
      await supabase
        .from('payments')
        .insert([
          {
            order_id: order.id,
            phone,
            amount: amount + fee,
            status: 'pending',
            mpesa_request_id: stk.requestId,
          },
        ])

      res.status(201).json({
        order,
        mpesa: stk,
      })
    } catch (stkError) {
      // If STK fails, mark order as failed
      await updateOrderStatus(order.id, 'failed')
      throw stkError
    }
  } catch (err) {
    console.error('Create order error:', err)
    res.status(500).json({ error: err.message })
  }
})

// Update order status (admin)
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status required' })
    }

    const { data, error } = await updateOrderStatus(req.params.id, status)

    if (error) throw error
    res.json(data[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
