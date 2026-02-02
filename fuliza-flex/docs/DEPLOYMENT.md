# Deployment Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- Git
- GitHub account for version control
- Supabase account
- M-Pesa Daraja API credentials
- Domain name (optional, for production)

## Deployment Options

### Option 1: Deploy to Vercel (Recommended for Frontend)

#### Frontend (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

3. **Set Environment Variables**
   In Vercel project settings, add:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy on every push to `main`

### Option 2: Deploy Backend to Render or Railway

#### Backend (Render)

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-service-role-key
   MPESA_CONSUMER_KEY=your-key
   MPESA_CONSUMER_SECRET=your-secret
   MPESA_BUSINESS_SHORT_CODE=your-shortcode
   MPESA_PASSKEY=your-passkey
   MPESA_ENVIRONMENT=production
   JWT_SECRET=your-super-secret-key
   WEBHOOK_URL=https://your-backend.onrender.com/api/mpesa/callback
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will deploy on every push to `main`

### Option 3: Deploy to Railway

Similar to Render, Railway offers simple deployment:

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Production Checklist

- [ ] Database migrations applied (Supabase SQL)
- [ ] All environment variables set
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] CORS configured for production domain
- [ ] M-Pesa API switched to production environment
- [ ] Payment webhook URL updated
- [ ] Admin accounts created
- [ ] Monitoring and logging configured
- [ ] Database backups enabled
- [ ] Error tracking (Sentry) configured

## Database Migrations

1. **Apply Schema to Supabase**
   ```sql
   -- Copy contents from supabase/schema.sql
   -- Paste into Supabase SQL Editor
   -- Execute
   ```

2. **Verify Tables**
   - Check `users`, `orders`, `payments`, `admin_roles` tables exist
   - Verify indexes are created

## Monitoring & Logging

### Sentry (Error Tracking)

1. Create [Sentry](https://sentry.io) account
2. Add to `backend/package.json`:
   ```bash
   npm install @sentry/node
   ```
3. Initialize in `backend/src/index.js`

### Datadog (Performance Monitoring)

1. Sign up at [datadog.com](https://datadog.com)
2. Set up APM for Node.js
3. Monitor frontend performance with Real User Monitoring (RUM)

## Scaling Considerations

- **Database**: Supabase auto-scales; monitor connection limits
- **Backend**: Render/Railway auto-scales based on load
- **Frontend**: Vercel CDN handles caching; minimal scaling needed
- **M-Pesa API**: Queue long-running requests; implement rate limiting

## Backup & Recovery

- **Database**: Enable automated backups in Supabase
- **Code**: GitHub is your backup
- **Secrets**: Use environment variable backups (secure storage)

## Custom Domain

1. **Purchase Domain** (e.g., fulizaflex.com)
2. **Point DNS** to your deployed services
3. **Enable SSL/TLS** (automatic on Vercel/Render)

### Example DNS Setup

```
Frontend:  fulizaflex.com → Vercel
API:       api.fulizaflex.com → Render
```

## Troubleshooting

### Build Failures
```bash
# Local test before pushing
npm install
npm run build
```

### Environment Variable Issues
- Verify all required variables are set
- Check for typos in variable names
- Ensure sensitive keys are not in code

### M-Pesa Callback Issues
- Verify webhook URL is accessible from internet
- Check firewall/security group allows incoming requests
- Monitor callback logs for errors

### Database Connection Errors
- Verify SUPABASE_URL and SUPABASE_KEY
- Check Supabase project is running
- Monitor connection pool limits
