import express from 'express'
import { createClient } from '@supabase/supabase-js'
import {
  initiateStkPush,
  queryStkPushStatus,
  validatePhoneFormat,
} from '../mpesa.js'
import { updateOrderStatus } from '../db.js'
import { updatePaymentStatus, getPaymentByOrderId } from '../db.js'
import config from '../config.js'

const router = express.Router()
const supabase = createClient(config.supabase.url, config.supabase.key)

// Initiate STK Push payment
router.post('/stk-push', async (req, res) => {
  try {
    const { phone, amount, order_id } = req.body

    if (!phone || !amount || !order_id) {
      return res.status(400).json({
        error: 'Phone, amount, and order_id required',
      })
    }

    if (!validatePhoneFormat(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' })
    }

    // Initiate STK Push with M-Pesa
    const stk = await initiateStkPush(phone, amount, order_id)

    // Store payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([
        {
          order_id,
          phone,
          amount,
          status: 'pending',
          mpesa_request_id: stk.requestId,
        },
      ])
      .select()
      .single()

    if (paymentError) throw paymentError

    res.json({
      payment_id: payment.id,
      request_id: stk.requestId,
      response_code: stk.responseCode,
      response_description: stk.responseDescription,
    })
  } catch (err) {
    console.error('STK Push error:', err)
    res.status(500).json({ error: err.message })
  }
})

// Query payment status
router.get('/status/:request_id', async (req, res) => {
  try {
    const { request_id } = req.params

    const status = await queryStkPushStatus(request_id)

    res.json(status)
  } catch (err) {
    console.error('Status query error:', err)
    res.status(500).json({ error: err.message })
  }
})

// M-Pesa callback webhook
router.post('/callback', async (req, res) => {
  try {
    const { Body } = req.body

    if (!Body?.stkCallback) {
      return res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = Body.stkCallback

    // Find payment by M-Pesa request ID
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('id, order_id')
      .eq('mpesa_request_id', CheckoutRequestID)
      .single()

    if (paymentError || !payment) {
      console.error('Payment not found for request:', CheckoutRequestID)
      return res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    // Process result
    if (ResultCode === 0) {
      // Payment successful
      let mpesaReceipt = null

      if (CallbackMetadata?.Item) {
        const receiptItem = CallbackMetadata.Item.find(
          (item) => item.Name === 'MpesaReceiptNumber'
        )
        mpesaReceipt = receiptItem?.Value
      }

      // Update payment status
      await updatePaymentStatus(payment.id, 'completed', mpesaReceipt)

      // Update order status
      await updateOrderStatus(payment.order_id, 'processing')

      console.log(`Payment completed: ${mpesaReceipt}`)
    } else {
      // Payment failed
      await updatePaymentStatus(payment.id, 'failed')
      await updateOrderStatus(payment.order_id, 'failed')

      console.log(`Payment failed: ${ResultDesc}`)
    }

    res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (err) {
    console.error('Callback error:', err)
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  }
})

// Confirm payment (manual check)
router.post('/confirm', async (req, res) => {
  try {
    const { order_id } = req.body

    const { data: payment, error } = await getPaymentByOrderId(order_id)

    if (error || !payment) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    // Query latest status
    const status = await queryStkPushStatus(payment.mpesa_request_id)

    res.json({
      status: status.resultCode === 0 ? 'completed' : 'pending',
      result: status,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
