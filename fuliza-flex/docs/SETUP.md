# Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- M-Pesa Daraja API credentials (sandbox)

## Step 1: Clone Repository
```bash
git clone https://github.com/Lyonna-0/fulizaFlex.git
cd fuliza-flex
```

## Step 2: Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL editor, run the schema from `supabase/schema.sql`
3. Copy your project URL and anon key from Settings → API

## Step 3: Setup M-Pesa Daraja API

1. Go to [M-Pesa Developer Portal](https://developer.safaricom.co.ke/)
2. Register and create a sandbox app
3. Get your:
   - Consumer Key
   - Consumer Secret
   - Business Short Code
   - Pass Key

## Step 4: Configure Environment

### Frontend
```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend
```bash
cd ../backend
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-service-role-key
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_BUSINESS_SHORT_CODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_ENVIRONMENT=sandbox
JWT_SECRET=your-random-secret-key
WEBHOOK_URL=http://localhost:5000/api/mpesa/callback
```

## Step 5: Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend (in another terminal)
cd backend
npm install
```

## Step 6: Run Development Servers

### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```
Opens at `http://localhost:3000`

### Terminal 2 - Backend
```bash
cd backend
npm run dev
```
Runs at `http://localhost:5000`

## Step 7: Test M-Pesa Integration

1. Use the test credentials from M-Pesa Daraja
2. Test phone: `254708374149`
3. Test amount: Any amount (no real money charged)

## Troubleshooting

### Port already in use
Change port in `backend/.env` or kill existing process:
```bash
lsof -i :5000  # List process on port 5000
kill -9 <PID>  # Kill the process
```

### Supabase connection error
- Check SUPABASE_URL and SUPABASE_KEY
- Ensure database is running
- Check internet connection

### M-Pesa STK not appearing
- Verify consumer credentials
- Check test phone is correct format (+254...)
- Ensure amount is valid
- Check API environment (sandbox vs production)
