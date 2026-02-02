import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { generateToken, verifyToken } from '../auth.js'
import config from '../config.js'

const router = express.Router()
const supabase = createClient(config.supabase.url, config.supabase.key)

// Send OTP to phone
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body

    // Validate phone format
    if (!phone || !phone.startsWith('+254')) {
      return res.status(400).json({ error: 'Invalid phone format. Use +254xxx' })
    }

    // In production, use Supabase Auth with phone provider or SMS service
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

    // TODO: Verify with Supabase Auth or SMS service
    // For now, accept any 6-digit OTP
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: 'Invalid OTP format' })
    }

    // Check or create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('phone', phone)
      .single()

    let userId
    if (!user && userError?.code === 'PGRST116') {
      // User doesn't exist, create
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{ phone, account_status: 'active' }])
        .select('id')
        .single()

      if (createError) throw createError
      userId = newUser.id
    } else if (user) {
      userId = user.id
    } else if (userError) {
      throw userError
    }

    // Generate JWT token
    const token = generateToken(userId, phone)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userId,
        phone,
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
    const { data: user, error } = await supabase
      .from('users')
      .select('id, phone, name, location, account_status, created_at')
      .eq('id', req.user.userId)
      .single()

    if (error) throw error

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update user profile
router.patch('/profile', verifyToken, async (req, res) => {
  try {
    const { name, location } = req.body

    const { data: user, error } = await supabase
      .from('users')
      .update({ name, location, updated_at: new Date() })
      .eq('id', req.user.userId)
      .select()
      .single()

    if (error) throw error

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
