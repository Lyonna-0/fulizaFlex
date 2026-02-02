import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    amount: null,
    phone: '',
    confirmPhone: '',
  })

  const limits = [
    { amount: 5000, fee: 250 },
    { amount: 15000, fee: 750 },
    { amount: 25000, fee: 1250 },
    { amount: 35000, fee: 1750 },
    { amount: 50000, fee: 2500 },
    { amount: 70000, fee: 3500 },
  ]

  const handleSelectAmount = (amount) => {
    setFormData({ ...formData, amount })
    setStep(2)
  }

  const handleConfirm = () => {
    if (formData.phone !== formData.confirmPhone) {
      alert('Phone numbers do not match!')
      return
    }
    setStep(3)
  }

  const handlePayment = () => {
    // Initiate M-Pesa STK push
    alert('M-Pesa prompt will appear on your phone: ' + formData.phone)
    setStep(4)
  }

  const fee = limits.find((l) => l.amount === formData.amount)?.fee || 0
  const total = formData.amount + fee

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <header className="bg-fuliza-green text-white py-4 mb-8">
        <div className="container">
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
      </header>

      <div className="container max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {['Select', 'Confirm', 'Pay', 'Done'].map((label, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center py-2 ${
                idx < step
                  ? 'bg-fuliza-green text-white'
                  : idx === step - 1
                  ? 'bg-fuliza-green text-white'
                  : 'bg-gray-200 text-gray-600'
              } rounded mr-2`}
            >
              {idx + 1}. {label}
            </div>
          ))}
        </div>

        {/* Step 1: Select */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Select Your Limit</h2>
            <div className="grid grid-cols-2 gap-4">
              {limits.map((limit) => (
                <button
                  key={limit.amount}
                  onClick={() => handleSelectAmount(limit.amount)}
                  className="border-2 border-gray-300 rounded-lg p-6 text-center hover:border-fuliza-green hover:bg-green-50 transition"
                >
                  <div className="text-2xl font-bold text-fuliza-green mb-2">
                    KES {limit.amount.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Fee: KES {limit.fee.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Confirm Details</h2>
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Limit Amount:</span>
                <span className="font-bold">KES {formData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-3 border-t pt-3">
                <span className="text-gray-600">Processing Fee:</span>
                <span className="font-bold">KES {fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total:</span>
                <span className="text-fuliza-green">KES {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+254712345678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-fuliza-green"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Phone Number
              </label>
              <input
                type="tel"
                placeholder="+254712345678"
                value={formData.confirmPhone}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPhone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-fuliza-green"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="btn-primary flex-1"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pay */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Pay via M-Pesa</h2>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-700 text-sm">
                ✓ You will receive an M-Pesa prompt on your phone to complete payment
              </p>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Amount to Pay:</span>
                <span className="font-bold">KES {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-bold">{formData.phone}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="btn-primary flex-1 text-lg"
              >
                Pay KES {total.toLocaleString()}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl text-green-500 mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4">Payment Initiated!</h2>
            <p className="text-gray-600 mb-6">
              Your M-Pesa prompt will appear shortly. Enter your PIN to complete the payment.
            </p>
            <div className="bg-gray-50 rounded p-4 mb-6">
              <p className="text-gray-600 text-sm mb-2">Order Reference:</p>
              <p className="text-xl font-mono font-bold">FZ-20260202-001</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/orders" className="btn-primary">
                Track Order
              </Link>
              <Link to="/" className="btn-secondary">
                Back Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
