import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Auth routes
app.post('/api/auth/phone', async (req, res) => {
  try {
    const { phone } = req.body
    // Validate phone format
    if (!phone || !phone.startsWith('+254')) {
      return res.status(400).json({ error: 'Invalid phone format' })
    }
    res.json({ message: 'OTP sent to phone number' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Orders routes (placeholder)
app.get('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(10)
    
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// M-Pesa routes (placeholder)
app.post('/api/mpesa/stk-push', async (req, res) => {
  try {
    const { phone, amount, order_id } = req.body
    // M-Pesa STK push logic here
    res.json({ message: 'STK push initiated', request_id: order_id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/mpesa/callback', async (req, res) => {
  try {
    // Handle M-Pesa callback
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message })
})

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
})
