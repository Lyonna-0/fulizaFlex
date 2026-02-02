# M-Pesa Daraja API Setup Guide (With Till Number)

## Prerequisites

- ✅ Active Till Number from Safaricom
- ✅ Registered business with Safaricom
- ✅ Valid phone number for testing

---

## Step 1: Register on Daraja Portal

### 1.1 Create Account

1. Visit: **<https://developer.safaricom.co.ke>**
2. Click **"Sign Up"** (top right)
3. Fill in your details:
   - Email address
   - Password
   - Accept terms
4. **Verify your email** (check inbox/spam)

### 1.2 Login

- Go back to <https://developer.safaricom.co.ke>
- Click **"Login"**
- Enter your credentials

---

## Step 2: Create a Daraja App

### 2.1 Navigate to Apps

1. After login, click **"My Apps"** in the navigation
2. Click **"Add a New App"** button

### 2.2 Fill App Details

- **App Name:** `Fuliza Flex` (or your preferred name)
- **Description:** `M-Pesa STK Push for Fuliza Flex limit boost service`
- Click **"Create App"**

### 2.3 Get Sandbox Credentials

After creating the app, you'll see:

- **Consumer Key** (copy this)
- **Consumer Secret** (click "Show" then copy)

**Save these for Step 4!**

---

## Step 3: Request Production Access (Go Live)

### 3.1 Navigate to Production

1. In your app dashboard, find **"Lipa Na M-Pesa Online"** API
2. Click **"Go to Production"**

### 3.2 Submit Go Live Request

You'll need to provide:

- **Business Short Code:** Your Till Number (e.g., `5678901`)
- **Business Name:** Your registered business name
- **Callback URL:** `https://your-domain.com/api/mpesa/callback`
  - For testing: Use ngrok (explained in Step 5)
- **Contact Person:** Your name
- **Phone Number:** Your contact number

### 3.3 Wait for Approval

- Safaricom reviews requests (usually **1-3 business days**)
- You'll receive an email with:
  - **Production Consumer Key**
  - **Production Consumer Secret**
  - **Passkey** (specific to your Till Number)

---

## Step 4: Configure Your Backend

### 4.1 For Testing (Sandbox)

Update `backend/.env`:

```env
# M-Pesa Daraja API - SANDBOX
MPESA_CONSUMER_KEY=your-sandbox-consumer-key-from-step-2
MPESA_CONSUMER_SECRET=your-sandbox-consumer-secret-from-step-2
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
MPESA_ENVIRONMENT=sandbox
```

**Note:** The shortcode `174379` and passkey above are Safaricom's official test credentials.

### 4.2 For Production (After Approval)

Update `backend/.env`:

```env
# M-Pesa Daraja API - PRODUCTION
MPESA_CONSUMER_KEY=your-production-consumer-key
MPESA_CONSUMER_SECRET=your-production-consumer-secret
MPESA_BUSINESS_SHORT_CODE=your-till-number
MPESA_PASSKEY=your-production-passkey-from-safaricom
MPESA_ENVIRONMENT=production
```

---

## Step 5: Setup Callback URL

M-Pesa needs a **publicly accessible HTTPS URL** to send payment results.

### Option A: Using ngrok (For Testing)

1. **Install ngrok:**

   ```bash
   # Download from https://ngrok.com/download
   # Or use chocolatey:
   choco install ngrok
   ```

2. **Start your backend:**

   ```bash
   cd backend
   npm run dev
   # Backend runs on http://localhost:5000
   ```

3. **Expose with ngrok:**

   ```bash
   ngrok http 5000
   ```

4. **Copy the HTTPS URL:**
   - You'll see: `https://abc123.ngrok.io`
   - Your callback: `https://abc123.ngrok.io/api/mpesa/callback`

5. **Update `.env`:**

   ```env
   WEBHOOK_URL=https://abc123.ngrok.io/api/mpesa/callback
   ```

### Option B: Deploy to Production

Deploy your backend to:

- **Render:** <https://render.com> (free tier available)
- **Railway:** <https://railway.app>
- **Heroku:** <https://heroku.com>

Then use: `https://your-app.com/api/mpesa/callback`

---

## Step 6: Test STK Push

### 6.1 Sandbox Testing

Use Safaricom's test number:

- **Phone:** `254708374149`
- **Amount:** Any (e.g., 100)

**Expected:**

- API returns success
- Check backend logs for response
- No actual phone prompt (sandbox simulation)

### 6.2 Production Testing

Use **real Safaricom numbers**:

- **Phone:** `254712345678` (your actual number)
- **Amount:** Minimum KES 1

**Expected:**

- Real STK push prompt on phone
- Enter M-Pesa PIN
- Payment processes
- Callback received with result

---

## Step 7: Monitor Transactions

### 7.1 Daraja Portal

- Login to <https://developer.safaricom.co.ke>
- Go to **"Reports"** → **"Transactions"**
- View all STK push requests and responses

### 7.2 M-Pesa Business Portal

- Login to <https://org.ke.m-pesa.com>
- View actual payments received
- Download statements

---

## Troubleshooting

### Common Issues

**1. "Invalid Access Token"**

- Consumer Key/Secret incorrect
- Check environment (sandbox vs production)

**2. "Invalid Shortcode"**

- Till number not approved for Daraja
- Complete Go Live request

**3. "Callback not received"**

- URL not publicly accessible
- Check ngrok is running
- Verify HTTPS (not HTTP)

**4. "Request Timeout"**

- User didn't enter PIN within 60 seconds
- Network issues

---

## Quick Reference

| Environment | Shortcode | Passkey |
|------------|-----------|---------|
| **Sandbox** | `174379` | `bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919` |
| **Production** | Your Till Number | Provided by Safaricom after approval |

---

## Next Steps

1. ✅ Register on Daraja Portal
2. ✅ Create app and get sandbox credentials
3. ✅ Test with sandbox
4. ✅ Submit Go Live request
5. ✅ Wait for approval (1-3 days)
6. ✅ Update with production credentials
7. ✅ Test with real transactions
8. ✅ Go live!

**Need help?** Contact Safaricom Daraja Support: <apisupport@safaricom.co.ke>
