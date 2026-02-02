import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-fuliza-green text-white py-4">
        <div className="container flex justify-between items-center">
          <div className="text-2xl font-bold">Fuliza Flex</div>
          <nav className="space-x-6">
            <Link to="/orders" className="hover:underline">My Orders</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-fuliza-green to-green-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Boost Your Fuliza Limit</h1>
          <p className="text-xl mb-8">Fast, secure, and instant approval. Up to KES 70,000</p>
          <Link to="/checkout" className="btn-primary bg-white text-fuliza-green">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8">
        <div className="container flex justify-around text-center">
          <div>
            <div className="text-3xl font-bold text-fuliza-green">24hrs</div>
            <p className="text-gray-600">Active in 24 hours</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-fuliza-green">70K</div>
            <p className="text-gray-600">Max boost amount</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-fuliza-green">100%</div>
            <p className="text-gray-600">Secure & verified</p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Limit</h2>
          <div className="grid grid-cols-3 gap-6">
            {[5000, 15000, 25000, 35000, 50000, 70000].map((amount) => (
              <div key={amount} className="border rounded-lg p-6 text-center hover:shadow-lg transition">
                <div className="text-2xl font-bold text-fuliza-green mb-2">KES {amount.toLocaleString()}</div>
                <p className="text-gray-600 mb-4">Fee: {Math.round(amount * 0.05)}</p>
                <button className="btn-primary w-full">Select</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fuliza-dark text-white py-8">
        <div className="container text-center">
          <p>&copy; 2026 Fuliza Flex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
