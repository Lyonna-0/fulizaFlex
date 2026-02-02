import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '../lib/api'
import { useAuthStore } from '../lib/store'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, setSession } = useAuthStore()

  // Get redirect path from query string
  const from = location.search.split('=')[1] || '/'

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!phone.startsWith('+254')) {
      toast.error('Please enter a valid Kenyan phone number (+254...)')
      return
    }

    setLoading(true)
    try {
      await authApi.sendOtp(phone)
      toast.success('OTP sent successfully!')
      setStep('otp')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authApi.verifyOtp(phone, otp)

      // Store token
      localStorage.setItem('auth_token', data.token)

      // Update store
      setUser(data.user)
      setSession({ access_token: data.token, user: data.user })

      toast.success('Login successful!')
      navigate(from)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
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
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
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
            <button
              type="submit"
              className="btn-primary w-full mb-4"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
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
