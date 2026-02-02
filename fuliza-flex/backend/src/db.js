import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fuliza_flex',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Test connection
pool
  .getConnection()
  .then((connection) => {
    console.log('✅ MySQL connected successfully')
    connection.release()
  })
  .catch((err) => {
    console.error('❌ MySQL connection failed:', err.message)
  })

// Helper function to generate UUID (MySQL compatible)
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Database query helpers
export const db = {
  // Users
  async createUser(phone, name = null, location = null) {
    const id = generateUUID()
    const [result] = await pool.execute(
      'INSERT INTO users (id, phone, name, location) VALUES (?, ?, ?, ?)',
      [id, phone, name, location]
    )
    return { id, phone, name, location }
  },

  async getUserByPhone(phone) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE phone = ?', [
      phone,
    ])
    return rows[0] || null
  },

  async getUserById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    return rows[0] || null
  },

  async updateUser(id, data) {
    const fields = []
    const values = []

    if (data.name !== undefined) {
      fields.push('name = ?')
      values.push(data.name)
    }
    if (data.location !== undefined) {
      fields.push('location = ?')
      values.push(data.location)
    }

    if (fields.length === 0) return

    values.push(id)
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    )
  },

  // Orders
  async createOrder(userId, amount, fee) {
    const id = generateUUID()
    const [result] = await pool.execute(
      'INSERT INTO orders (id, user_id, amount, fee, status) VALUES (?, ?, ?, ?, ?)',
      [id, userId, amount, fee, 'pending']
    )
    return { id, user_id: userId, amount, fee, status: 'pending' }
  },

  async getOrderById(id) {
    const [rows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id])
    return rows[0] || null
  },

  async getOrdersByUserId(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    )
    return rows
  },

  async getAllOrders(filters = {}) {
    let query = 'SELECT * FROM orders'
    const conditions = []
    const values = []

    if (filters.status) {
      conditions.push('status = ?')
      values.push(filters.status)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY created_at DESC'

    const [rows] = await pool.execute(query, values)
    return rows
  },

  async updateOrderStatus(id, status) {
    await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id])
  },

  // Payments
  async createPayment(orderId, phone, amount, mpesaRequestId = null) {
    const id = generateUUID()
    const [result] = await pool.execute(
      'INSERT INTO payments (id, order_id, phone, amount, status, mpesa_request_id) VALUES (?, ?, ?, ?, ?, ?)',
      [id, orderId, phone, amount, 'pending', mpesaRequestId]
    )
    return {
      id,
      order_id: orderId,
      phone,
      amount,
      status: 'pending',
      mpesa_request_id: mpesaRequestId,
    }
  },

  async getPaymentByOrderId(orderId) {
    const [rows] = await pool.execute(
      'SELECT * FROM payments WHERE order_id = ?',
      [orderId]
    )
    return rows[0] || null
  },

  async getPaymentByMpesaRequestId(mpesaRequestId) {
    const [rows] = await pool.execute(
      'SELECT * FROM payments WHERE mpesa_request_id = ?',
      [mpesaRequestId]
    )
    return rows[0] || null
  },

  async updatePaymentStatus(id, status, mpesaReceipt = null) {
    await pool.execute(
      'UPDATE payments SET status = ?, mpesa_receipt = ? WHERE id = ?',
      [status, mpesaReceipt, id]
    )
  },

  // Admin
  async isAdmin(userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM admin_roles WHERE user_id = ?',
      [userId]
    )
    return rows.length > 0
  },

  async getMetrics() {
    const [totalOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders'
    )
    const [totalRevenue] = await pool.execute(
      'SELECT SUM(amount) as total FROM orders WHERE status = "completed"'
    )
    const [pendingOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders WHERE status = "pending"'
    )

    return {
      totalOrders: totalOrders[0].count,
      totalRevenue: totalRevenue[0].total || 0,
      pendingOrders: pendingOrders[0].count,
    }
  },
}

export default pool
