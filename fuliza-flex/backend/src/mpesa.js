import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_BUSINESS_SHORT_CODE,
  MPESA_PASSKEY,
  MPESA_ENVIRONMENT,
} = process.env

const BASE_URL =
  MPESA_ENVIRONMENT === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke'

let accessToken = null
let tokenExpiry = 0

// Get OAuth token
export const getAccessToken = async () => {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken
  }

  try {
    const auth = Buffer.from(
      `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
    ).toString('base64')

    const response = await axios.get(`${BASE_URL}/oauth/v1/generate`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      params: {
        grant_type: 'client_credentials',
      },
    })

    accessToken = response.data.access_token
    tokenExpiry = Date.now() + response.data.expires_in * 1000
    return accessToken
  } catch (error) {
    console.error('Failed to get M-Pesa access token:', error.message)
    throw error
  }
}

// Initiate STK Push
export const initiateStkPush = async (phoneNumber, amount, accountReference) => {
  try {
    const token = await getAccessToken()
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3)

    const password = Buffer.from(
      `${MPESA_BUSINESS_SHORT_CODE}${MPESA_PASSKEY}${timestamp}`
    ).toString('base64')

    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: MPESA_BUSINESS_SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.WEBHOOK_URL,
        AccountReference: accountReference,
        TransactionDesc: 'Fuliza Limit Boost',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return {
      requestId: response.data.CheckoutRequestID,
      responseCode: response.data.ResponseCode,
      responseDescription: response.data.ResponseDescription,
    }
  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message)
    throw error
  }
}

// Query STK Push Status
export const queryStkPushStatus = async (checkoutRequestId) => {
  try {
    const token = await getAccessToken()
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, -3)

    const password = Buffer.from(
      `${MPESA_BUSINESS_SHORT_CODE}${MPESA_PASSKEY}${timestamp}`
    ).toString('base64')

    const response = await axios.post(
      `${BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return {
      resultCode: response.data.ResultCode,
      resultDesc: response.data.ResultDesc,
      checkoutRequestID: response.data.CheckoutRequestID,
      merchantRequestID: response.data.MerchantRequestID,
    }
  } catch (error) {
    console.error('STK Query error:', error.response?.data || error.message)
    throw error
  }
}

// Validate phone format
export const validatePhoneFormat = (phone) => {
  const phoneRegex = /^254\d{9}$|^\+254\d{9}$/
  return phoneRegex.test(phone)
}
