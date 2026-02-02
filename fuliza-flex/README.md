# Fuliza Flex - Full Stack Learning Project

A complete, production-ready clone of the **Fuliza Limit Boost** service for learning purposes. Built with React, Node.js, Supabase, and M-Pesa Daraja API integration.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (download from [nodejs.org](https://nodejs.org))
- **Git** (download from [git-scm.com](https://git-scm.com))
- **Supabase** account (free at [supabase.com](https://supabase.com))
- **M-Pesa Daraja** sandbox credentials (register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke))

### 5-Minute Setup

```bash
# 1. Clone repository
git clone https://github.com/Lyonna-0/fulizaFlex.git
cd fuliza-flex

# 2. Frontend setup
cd frontend
cp .env.example .env.local
# Edit .env.local with your Supabase URL and API key
npm install
npm run dev
# Opens http://localhost:3000

# 3. Backend setup (new terminal)
cd ../backend
cp .env.example .env
# Edit .env with Supabase and M-Pesa credentials
npm install
npm run dev
# Runs on http://localhost:5000
```

### Full Setup Guide
See [docs/SETUP.md](docs/SETUP.md) for detailed instructions.

---

## 📋 Features

### Customer-Facing Website

✅ **Landing Page**
- Hero section with value proposition
- Social proof banner (recent limit increases)
- 6 pricing tiers (KES 5,000 - 70,000)
- Testimonials carousel
- FAQ accordion
- Trust badges and security messaging

✅ **Multi-Step Checkout (4 Steps)**
1. **Select** - Choose desired Fuliza limit
2. **Confirm** - Enter phone number and review order
3. **Pay** - M-Pesa STK Push prompt
4. **Done** - Success confirmation with tracking number

✅ **User Authentication**
- Phone number login with OTP verification
- Secure JWT token management
- Session persistence
- Phone number validation (Kenyan format +254)

✅ **Order Management**
- View all past orders
- Real-time order status tracking
- Order details with payment info
- Order history filtering

### Admin Dashboard

✅ **Overview Dashboard**
- Key metrics (total orders, revenue, pending, active users)
- Revenue chart (daily/weekly/monthly)
- Recent activity feed
- Conversion funnel visualization

✅ **Order Management**
- Complete orders table with filtering
- Order details view with timeline
- Manual status updates
- Bulk actions for batch processing

✅ **User Management**
- Users table with search
- User account status control
- User blocking/activation
- View user order history

✅ **Analytics & Reports**
- Conversion funnel breakdown
- Popular limit tiers analysis
- Geographic distribution map
- Export to CSV/PDF functionality

### Backend APIs

✅ **Authentication**
- Phone-based OTP login
- JWT token generation
- User profile management

✅ **Orders**
- Create new orders
- Fetch order history
- Update order status
- Query order details

✅ **M-Pesa Integration**
- STK Push initiation (Lipa Na M-Pesa)
- Payment status polling
- Webhook callback handling
- Transaction confirmation

✅ **Admin APIs**
- Dashboard metrics
- Order filtering and search
- User management
- Analytics data

---

## 🏗️ Project Structure

```
fuliza-flex/
├── frontend/                      # React 18 + Tailwind SPA
│   ├── src/
│   │   ├── pages/                # Route pages (Home, Checkout, Orders, Admin)
│   │   ├── components/            # Reusable UI components (Header, Footer, etc.)
│   │   ├── hooks/                # Custom React hooks (useAuth, useOrders)
│   │   ├── lib/                  # Utilities & clients
│   │   │   ├── api.js            # Axios API client
│   │   │   ├── supabase.js       # Supabase Auth client
│   │   │   ├── store.js          # Zustand state management
│   │   │   └── utils.js          # Helper functions
│   │   ├── App.jsx               # Main app routing
│   │   └── index.css             # Global styles
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                       # Node.js + Express API
│   ├── src/
│   │   ├── routes/               # API endpoints
│   │   │   ├── auth.js           # Phone login, OTP verification
│   │   │   ├── orders.js         # Order creation and management
│   │   │   ├── mpesa.js          # M-Pesa integration
│   │   │   └── admin.js          # Admin dashboard APIs
│   │   ├── auth.js               # JWT token generation
│   │   ├── mpesa.js              # M-Pesa Daraja client
│   │   ├── db.js                 # Database queries
│   │   ├── config.js             # Environment configuration
│   │   └── index.js              # Express app setup
│   └── package.json
│
├── supabase/
│   ├── schema.sql                # Database schema (users, orders, payments)
│   └── functions/                # Edge functions (optional)
│
├── docs/                         # Documentation
│   ├── API.md                    # REST API reference
│   ├── SETUP.md                  # Local development setup
│   ├── DEPLOYMENT.md             # Production deployment guide
│   ├── DEVELOPMENT.md            # Development standards & guides
│   └── CONTRIBUTING.md           # Contribution guidelines
│
├── .gitignore
└── README.md                     # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool (fast HMR)
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Supabase JS** - Auth SDK

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Supabase** - Database (PostgreSQL) + Auth
- **JWT** - Token authentication
- **Axios** - HTTP client for M-Pesa API

### Database
- **PostgreSQL** - Hosted on Supabase
- **Tables**: users, orders, payments, admin_roles
- **Real-time subscriptions** via Supabase

### Payments
- **M-Pesa Daraja API** - STK Push & C2B integration
- **OAuth 2.0** - M-Pesa authentication
- **Webhook callbacks** - Payment confirmation

---

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - How to set up locally
- **[API Reference](docs/API.md)** - REST API endpoints
- **[Development Guide](docs/DEVELOPMENT.md)** - Code standards, debugging, testing
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to Vercel, Render, Railway
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute

---

## 🔐 Security Features

✅ Phone number validation (Kenyan +254 format)
✅ OTP-based authentication (SMS via Supabase)
✅ JWT tokens with expiration (30 days)
✅ CORS configured for cross-origin requests
✅ Environment variables for sensitive data
✅ Password hashing (bcryptjs)
✅ Rate limiting ready
✅ HTTPS in production

---

## 📊 Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,        -- +254712345678
  name TEXT,
  location TEXT,
  account_status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  amount INTEGER,                    -- KES (e.g., 25000)
  fee INTEGER,                       -- 5% of amount
  status TEXT DEFAULT 'pending',     -- pending, processing, completed, failed
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders,
  amount INTEGER,
  status TEXT DEFAULT 'pending',     -- pending, completed, failed
  mpesa_receipt TEXT,                -- M-Pesa receipt code
  mpesa_request_id TEXT,             -- M-Pesa request ID
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin Roles Table
CREATE TABLE admin_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  role TEXT,                         -- admin, moderator, etc.
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/send-otp          Send OTP to phone
POST   /api/auth/verify-otp        Verify OTP and login
GET    /api/auth/me                Get current user (requires token)
PATCH  /api/auth/profile           Update user profile
```

### Orders
```
GET    /api/orders                 Get all orders
GET    /api/orders/:id             Get order details
POST   /api/orders                 Create new order
GET    /api/orders/my-orders       Get user's orders
PATCH  /api/orders/:id             Update order status
```

### M-Pesa Payments
```
POST   /api/mpesa/stk-push         Initiate STK Push
GET    /api/mpesa/status/:id       Check payment status
POST   /api/mpesa/callback         Webhook for M-Pesa
POST   /api/mpesa/confirm          Manually confirm payment
```

### Admin
```
GET    /api/admin/metrics          Dashboard metrics
GET    /api/admin/orders           Orders (admin view)
GET    /api/admin/analytics        Analytics data
```

See [docs/API.md](docs/API.md) for complete API documentation.

---

## 🚀 Deployment

### Frontend → Vercel (Free, Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Go to vercel.com → Import project → Select fuliza-flex/frontend
# Set environment variables
# Deploy!
```

### Backend → Render or Railway
```bash
# Similar process
# Set environment variables including:
# - SUPABASE_URL, SUPABASE_KEY
# - MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET
# - MPESA_BUSINESS_SHORT_CODE, MPESA_PASSKEY
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment guide.

---

## 🐛 Troubleshooting

### M-Pesa STK not appearing?
1. Verify phone number is in correct format (+254xxx)
2. Check consumer key/secret are correct
3. Ensure amount is valid (not 0 or negative)
4. Check M-Pesa environment (sandbox vs production)

### Database connection error?
1. Verify SUPABASE_URL and SUPABASE_KEY
2. Check database is running in Supabase
3. Check network connectivity

### Port already in use?
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>
```

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for more troubleshooting.

---

## 📚 Learning Resources

This project demonstrates:
- **Full-stack development** (React + Node.js)
- **REST API design** (Express.js)
- **Database design** (PostgreSQL + Supabase)
- **Payment integration** (M-Pesa Daraja API)
- **Authentication** (JWT + OTP)
- **State management** (Zustand)
- **Component-based UI** (React + Tailwind)
- **Deployment & DevOps** (Vercel, Render)

---

## 🤝 Contributing

We welcome contributions! Whether it's bug fixes, features, or documentation:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "feat: Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 👨‍💻 Author

Built by Leona as a full-stack learning project.

---

## 🙋 Support

- 📖 Check the [documentation](docs/)
- 🐛 Report issues on GitHub
- 💬 Start a discussion on GitHub

---

**Built with ❤️ for learning**
