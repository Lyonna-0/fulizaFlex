import jwt from 'jsonwebtoken'
import config from './config.js'

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.slice(7)
    const decoded = jwt.verify(token, config.jwt.secret)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const generateToken = (userId, phone) => {
  return jwt.sign(
    { userId, phone, iat: Date.now() },
    config.jwt.secret,
    { expiresIn: '30d' }
  )
}
