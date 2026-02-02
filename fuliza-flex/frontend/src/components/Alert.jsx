import React from 'react'

export default function Alert({ type = 'info', message, onClose }) {
  const bgColor = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
  }[type]

  return (
    <div className={`rounded-lg p-4 mb-4 flex justify-between items-center ${bgColor}`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="font-bold hover:opacity-70 transition"
        >
          ×
        </button>
      )}
    </div>
  )
}
