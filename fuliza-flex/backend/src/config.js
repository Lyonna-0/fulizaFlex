import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },

  mpesa: {
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
    passkey: process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-key',
  },

  webhook: {
    url: process.env.WEBHOOK_URL,
  },
}
