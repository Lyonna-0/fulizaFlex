import React from 'react'

export default function Modal({ isOpen, title, children, onClose, footer }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ×
          </button>
        </div>

        <div className="mb-6">{children}</div>

        {footer && <div className="flex gap-3">{footer}</div>}
      </div>
    </div>
  )
}
