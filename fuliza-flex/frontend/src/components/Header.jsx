import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-fuliza-green text-white sticky top-0 z-50 shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold">Fuliza</div>
          <span className="text-sm opacity-75">Flex</span>
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:opacity-80 transition">
            Home
          </Link>
          <Link to="/checkout" className="hover:opacity-80 transition">
            Get Limit
          </Link>
          <Link to="/orders" className="hover:opacity-80 transition">
            My Orders
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-fuliza-green rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Login
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 pb-4">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/checkout"
            className="block px-4 py-2 hover:bg-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Limit
          </Link>
          <Link
            to="/orders"
            className="block px-4 py-2 hover:bg-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            My Orders
          </Link>
        </div>
      )}
    </header>
  )
}
