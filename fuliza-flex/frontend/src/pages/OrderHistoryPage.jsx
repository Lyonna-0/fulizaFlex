import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([
    {
      id: 'FZ-20260202-001',
      amount: 25000,
      fee: 1250,
      status: 'completed',
      date: '2026-02-02',
      paymentStatus: 'paid',
    },
    {
      id: 'FZ-20260201-001',
      amount: 15000,
      fee: 750,
      status: 'processing',
      date: '2026-02-01',
      paymentStatus: 'confirmed',
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-fuliza-green text-white py-4 mb-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Link to="/" className="hover:underline">Home</Link>
        </div>
      </header>

      <div className="container">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Fee
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono font-semibold text-fuliza-green">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        KES {order.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        KES {order.fee.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-fuliza-green hover:underline font-semibold">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No orders yet</p>
              <Link to="/checkout" className="btn-primary">
                Place Your First Order
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
