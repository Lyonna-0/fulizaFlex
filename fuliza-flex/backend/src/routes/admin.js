import express from 'express'
import { verifyToken } from '../auth.js'
import { getAdminMetrics, getAllOrders } from '../db.js'
import config from '../config.js'

const router = express.Router()

// Middleware: Verify admin access (placeholder - implement proper RBAC)
const verifyAdmin = (req, res, next) => {
  // TODO: Check admin role in database
  next()
}

// Get admin metrics
router.get('/metrics', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { data, error } = await getAdminMetrics()

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all orders (admin view with filters)
router.get('/orders', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query

    const { data, error } = await getAllOrders({ status })

    if (error) throw error

    const paginated = data.slice(
      (page - 1) * limit,
      page * limit
    )

    res.json({
      orders: paginated,
      total: data.length,
      page: parseInt(page),
      limit: parseInt(limit),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get analytics
router.get('/analytics', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { period = 'daily' } = req.query

    // TODO: Implement real analytics
    res.json({
      period,
      data: {
        revenue: [],
        orders: [],
        conversionFunnel: [],
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
