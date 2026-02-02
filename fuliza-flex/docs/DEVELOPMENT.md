# Development Guide

## Project Structure

```
fuliza-flex/
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (routes)
│   │   ├── lib/           # Utilities and API clients
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML entry point
│   └── package.json       # Frontend dependencies
│
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── index.js       # Express app setup
│   │   ├── auth.js        # JWT authentication
│   │   ├── mpesa.js       # M-Pesa API integration
│   │   ├── db.js          # Database queries
│   │   └── config.js      # Configuration
│   └── package.json       # Backend dependencies
│
├── supabase/              # Supabase configuration
│   ├── schema.sql         # Database schema
│   └── functions/         # Edge functions (optional)
│
├── docs/                  # Documentation
│   ├── API.md             # API documentation
│   ├── SETUP.md           # Local setup guide
│   ├── DEPLOYMENT.md      # Deployment guide
│   └── DEVELOPMENT.md     # This file
│
└── .gitignore             # Git ignore rules
```

## Setting Up Development Environment

### 1. Clone Repository

```bash
git clone https://github.com/Lyonna-0/fulizaFlex.git
cd fuliza-flex
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
nano .env.local

npm install
npm run dev
```

### 3. Backend Setup (in another terminal)

```bash
cd backend
cp .env.example .env

# Edit .env with credentials
nano .env

npm install
npm run dev
```

## Code Style & Standards

### Frontend (React)

- Use functional components with hooks
- Use `camelCase` for variables and functions
- Use `PascalCase` for components
- Keep components focused and small
- Use Tailwind CSS for styling
- Extract reusable logic to custom hooks

Example:

```jsx
// ✓ Good
export default function OrderCard({ order }) {
  const { formatCurrency } = useFormatting()
  
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold">{order.id}</h3>
      <p>{formatCurrency(order.amount)}</p>
    </div>
  )
}

// ✗ Avoid
function OrderCard(props) {
  return (
    <div style={{border: '1px solid black', padding: '10px'}}>
      <h3>{props.order.id}</h3>
      <p>KES {props.order.amount}</p>
    </div>
  )
}
```

### Backend (Node.js)

- Use ES6+ syntax
- Use `camelCase` for variables and functions
- Use `UPPER_SNAKE_CASE` for constants
- Return consistent error responses
- Log important events
- Use try-catch for async operations

Example:

```js
// ✓ Good
export const createOrder = async (userId, amount) => {
  try {
    const fee = calculateFee(amount)
    const { data, error } = await supabase
      .from('orders')
      .insert([{ user_id: userId, amount, fee }])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (err) {
    console.error('Create order failed:', err)
    throw err
  }
}

// ✗ Avoid
async function createOrder(userId, amount) {
  const fee = amount * 0.05
  return supabase.from('orders').insert([...])
}
```

## API Development

### Adding a New Endpoint

1. **Create route handler** in `backend/src/routes/`:

```js
// backend/src/routes/products.js
import express from 'express'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    // Logic here
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
```

2. **Register route** in `backend/src/index.js`:

```js
import productsRoutes from './routes/products.js'

app.use('/api/products', productsRoutes)
```

3. **Test with curl or Postman**:

```bash
curl http://localhost:5000/api/products/123
```

## Frontend Development

### Adding a New Page

1. **Create page component** in `frontend/src/pages/`:

```jsx
// frontend/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'

export default function ProductPage() {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    // Fetch product
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        {/* Page content */}
      </div>
    </>
  )
}
```

2. **Add route** in `frontend/src/App.jsx`:

```jsx
<Route path="/products/:id" element={<ProductPage />} />
```

### Using API

```jsx
import { ordersApi } from '../lib/api'

function OrdersList() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersApi.getAll()
        setOrders(response.data)
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      }
    }

    fetchOrders()
  }, [])

  return (
    // JSX
  )
}
```

## Testing

### Frontend Testing (Jest + React Testing Library)

```bash
npm run test
```

### Backend Testing

```bash
npm run test
```

### Manual Testing

1. Use Postman for API testing
2. Use browser DevTools for frontend debugging
3. Check network tab for API calls
4. Monitor backend logs for errors

## Debugging

### Frontend

```jsx
// Use console.log
console.log('Order:', order)

// Use React DevTools browser extension
// Use VS Code debugger
```

### Backend

```js
// Use console.log
console.log('Processing payment:', mpesaReceipt)

// Check terminal output from `npm run dev`
// Use VS Code debugger for Node.js
```

## Database Queries

### Using Supabase Client

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(URL, KEY)

// Select
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('status', 'pending')

// Insert
const { data, error } = await supabase
  .from('orders')
  .insert([{ user_id, amount }])
  .select()

// Update
const { data, error } = await supabase
  .from('orders')
  .update({ status: 'completed' })
  .eq('id', orderId)

// Delete
const { data, error } = await supabase
  .from('orders')
  .delete()
  .eq('id', orderId)
```

## Common Tasks

### Reset Database

```sql
-- Supabase SQL Editor
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS admin_roles CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then run schema.sql
```

### Create Test Data

```js
// Run in backend
const createTestData = async () => {
  const { data: user } = await supabase
    .from('users')
    .insert([{ phone: '+254712345678' }])
    .select()
    .single()

  const { data: order } = await supabase
    .from('orders')
    .insert([{
      user_id: user.id,
      amount: 25000,
      fee: 1250,
      status: 'pending'
    }])
    .select()
    .single()
}
```

## Git Workflow

### Creating Feature Branch

```bash
git checkout -b feature/user-authentication
# Make changes
git add .
git commit -m "Implement user OTP authentication"
git push origin feature/user-authentication
# Create PR on GitHub
```

### Commit Message Convention

```
feat: Add OTP verification
fix: Resolve M-Pesa callback timeout
docs: Update API documentation
style: Format code with prettier
refactor: Extract auth logic to module
test: Add order creation tests
```

## Performance Optimization

### Frontend

- Lazy load page components with `React.lazy()`
- Use React.memo for expensive components
- Optimize images (use WebP format)
- Code split with Vite

### Backend

- Cache frequently accessed data
- Use database indexes (already done in schema)
- Implement rate limiting for API
- Use pagination for large datasets

## Security Best Practices

- [ ] Never commit `.env` files
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Use JWT tokens with expiration
- [ ] Hash sensitive data
- [ ] Implement CORS properly
- [ ] Use environment variables for secrets
- [ ] Regular security audits
