import express from 'express'
import { verifyToken } from '../auth.js'
import { db } from '../db.js'
import { initiateStkPush, validatePhoneFormat } from '../mpesa.js'

const router = express.Router()

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query
    const orders = await db.getAllOrders({ status })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get user's orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await db.getOrdersByUserId(req.user.userId)
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id)

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json(order)
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
    const order = await db.createOrder(req.user.userId, amount, fee)

    // Initiate M-Pesa STK Push
    try {
      const stk = await initiateStkPush(phone, amount + fee, order.id)

      // Store payment record with M-Pesa request ID
      await db.createPayment(order.id, phone, amount + fee, stk.requestId)

      res.status(201).json({
        order,
        mpesa: stk,
      })
    } catch (stkError) {
      // If STK fails, mark order as failed
      await db.updateOrderStatus(order.id, 'failed')
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

    await db.updateOrderStatus(req.params.id, status)
    const order = await db.getOrderById(req.params.id)

    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
