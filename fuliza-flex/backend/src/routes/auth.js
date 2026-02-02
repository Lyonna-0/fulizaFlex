import express from 'express'
import { generateToken, verifyToken } from '../auth.js'
import { db } from '../db.js'

const router = express.Router()

// Send OTP to phone
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body

    // Validate phone format
    if (!phone || !phone.startsWith('+254')) {
      return res.status(400).json({ error: 'Invalid phone format. Use +254xxx' })
    }

    // In production, integrate with SMS service (Africa's Talking, Twilio, etc.)
    // For now, just acknowledge
    res.json({
      message: 'OTP sent successfully',
      phone,
      // In production, don't return this
      _test_otp: '123456',
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP required' })
    }

    // TODO: Verify with SMS service
    // For now, accept any 6-digit OTP
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: 'Invalid OTP format' })
    }

    // Check or create user
    let user = await db.getUserByPhone(phone)

    if (!user) {
      // User doesn't exist, create
      user = await db.createUser(phone)
    }

    // Generate JWT token
    const token = generateToken(user.id, phone)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        phone: user.phone,
      },
    })
  } catch (err) {
    console.error('Verify OTP error:', err)
    res.status(500).json({ error: err.message })
  }
})

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await db.getUserById(req.user.userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      id: user.id,
      phone: user.phone,
      name: user.name,
      location: user.location,
      account_status: user.account_status,
      created_at: user.created_at,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update user profile
router.patch('/profile', verifyToken, async (req, res) => {
  try {
    const { name, location } = req.body

    await db.updateUser(req.user.userId, { name, location })

    const user = await db.getUserById(req.user.userId)

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
