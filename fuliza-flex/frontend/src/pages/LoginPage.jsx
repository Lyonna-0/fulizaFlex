import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone')

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (!phone.startsWith('+254')) {
      alert('Please enter a valid Kenyan phone number (+254...)')
      return
    }
    setStep('otp')
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    // Verify OTP logic
    alert('Login successful!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-fuliza-green to-green-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-fuliza-dark text-center mb-8">
          Fuliza Flex
        </h1>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-fuliza-green"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <p className="text-gray-600 text-sm mb-4">
                We sent an OTP to {phone}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-fuliza-green"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full mb-4">
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('phone')
                setPhone('')
                setOtp('')
              }}
              className="btn-secondary w-full"
            >
              Change Phone
            </button>
          </form>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          No account yet?{' '}
          <button
            onClick={() => alert('Registration coming soon!')}
            className="text-fuliza-green font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
