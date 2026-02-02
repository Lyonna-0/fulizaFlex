import React, { useState } from 'react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const metrics = [
    { label: 'Total Orders', value: '1,234', color: 'bg-blue-500' },
    { label: 'Revenue', value: 'KES 2.5M', color: 'bg-green-500' },
    { label: 'Pending Orders', value: '45', color: 'bg-yellow-500' },
    { label: 'Active Users', value: '890', color: 'bg-purple-500' },
  ]

  const recentOrders = [
    {
      id: 'FZ-20260202-001',
      customer: 'John Doe',
      amount: 25000,
      status: 'completed',
    },
    {
      id: 'FZ-20260202-002',
      customer: 'Jane Smith',
      amount: 15000,
      status: 'processing',
    },
    {
      id: 'FZ-20260202-003',
      customer: 'Bob Wilson',
      amount: 50000,
      status: 'pending',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'processing':
        return 'text-blue-600 bg-blue-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-fuliza-dark text-white py-6">
        <div className="container">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      <div className="container py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {['overview', 'orders', 'users', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === tab
                  ? 'border-b-4 border-fuliza-green text-fuliza-green'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-6 border-l-4"
                  style={{ borderColor: metric.color.split('-')[1] }}
                >
                  <p className="text-gray-600 text-sm mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Revenue Chart</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Conversion Funnel</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm font-semibold">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-sm">{order.customer}</td>
                        <td className="px-6 py-4 text-sm font-bold">
                          KES {order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
