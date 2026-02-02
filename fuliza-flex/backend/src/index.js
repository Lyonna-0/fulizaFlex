import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth.js'
import ordersRoutes from './routes/orders.js'
import mpesaRoutes from './routes/mpesa.js'
import adminRoutes from './routes/admin.js'
import config from './config.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = config.port

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/mpesa', mpesaRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`)
  res.status(err.status || 500).json({
    error: err.message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ Environment: ${config.nodeEnv}`)
})
