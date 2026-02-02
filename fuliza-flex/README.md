# Fuliza Flex - Full Stack Learning Project

A complete clone of the Fuliza Limit Boost service for learning purposes, featuring M-Pesa payments, phone authentication, and a full admin dashboard.

## Project Structure

```
fuliza-flex/
├── frontend/              # React SPA (Tailwind CSS)
├── backend/               # Node.js/Express API
├── supabase/              # Supabase functions & migrations
│   ├── functions/         # Edge functions for M-Pesa
│   └── migrations/        # Database schema
├── docs/                  # API documentation
└── README.md              # This file
```

## Features

### Customer-Facing Website
- Landing page with hero section and social proof
- 4-step checkout flow (Select → Confirm → Pay → Done)
- M-Pesa payment integration (STK Push)
- Phone login with OTP verification
- Order history and tracking

### Admin Dashboard
- Key metrics and revenue charts
- Order management and status updates
- User management
- Analytics and reports
- Settings for pricing configuration

### Backend Services
- Phone/OTP authentication via Supabase Auth
- M-Pesa Daraja API integration (edge functions)
- Payment status polling and webhooks
- Real-time order updates

## Tech Stack

- **Frontend**: React + Tailwind CSS + Vite
- **Backend**: Node.js + Express + Supabase
- **Database**: PostgreSQL (Supabase)
- **Payments**: M-Pesa Daraja API
- **Auth**: Supabase Auth (Phone)
- **Real-time**: Supabase Realtime

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- M-Pesa Daraja API credentials (sandbox)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lyonna-0/fulizaFlex.git
   cd fuliza-flex
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env.local` in frontend and backend
   - Add your Supabase credentials and M-Pesa API keys

4. **Run development servers**
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

## API Documentation

See [docs/API.md](docs/API.md) for detailed API endpoints.

## Database Schema

See [supabase/migrations](supabase/migrations) for database structure.

## Contributing

Learning project - feel free to experiment and improve!

## License

MIT
