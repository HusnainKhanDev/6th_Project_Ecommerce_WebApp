import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const baseURL = import.meta.env.VITE_BASE_URL

const statusConfig = {
  pending:    { label: 'Pending',    bg: '#fef9c3', text: '#a16207', dot: '#eab308' },
  confirmed:  { label: 'Confirmed',  bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
  shipped:    { label: 'Shipped',    bg: '#ede9fe', text: '#6d28d9', dot: '#8b5cf6' },
  delivered:  { label: 'Delivered',  bg: '#dcfce7', text: '#15803d', dot: '#22c55e' },
  cancelled:  { label: 'Cancelled',  bg: '#fee2e2', text: '#b91c1c', dot: '#ef4444' },
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

const TrackOrders = () => {
  const orders =  useSelector((state) => state.orders.Orderitems)
  const [expandedOrder, setExpandedOrder] = useState(null)

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5"
        style={{ background: '#f8fafc' }}>
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg className="w-9 h-9 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: 'Georgia, serif' }}>
          No orders yet
        </h2>
        <p className="text-sm text-slate-400">Your order history will appear here</p>
        <Link to="/"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc', fontFamily: '"Delius Swash Caps, cursive' }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-4xl px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">
              My Account
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
            <p className="text-sm text-slate-400 mt-0.5">{orders.length} orders placed</p>
          </div>
          <Link to="/" className="text-sm font-medium text-indigo-500 hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* Orders List */}
      <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col gap-5">
        {orders.map((order, index) => {
          const status = statusConfig[order.status] || statusConfig.pending
          const isExpanded = expandedOrder === order.id

          return (
            <motion.div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Order Header — always visible */}
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-5">

                  {/* Order number */}
                  <div className="w-22 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#eef2ff' }}>
                    <span className="text-xs font-bold text-indigo-600">Order ID# {order.id}</span>
                  </div>

                  <div>
                    {/* Date + items count */}
                    <p className="text-sm font-semibold text-slate-900">
                      Order placed {formatDate(order.created_At)}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      {order.city && ` · ${order.city}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Total */}
                  <span className="text-base font-bold text-slate-900">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </span>

                  {/* Status badge */}
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ background: status.bg, color: status.text }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                    {status.label}
                  </span>

                  {/* Expand arrow */}
                  <motion.svg
                    className="w-4 h-4 text-slate-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6 border-t border-slate-100">

                      {/* Delivery info */}
                      {(order.shipping_address || order.city) && (
                        <div className="mt-5 mb-5 p-4 rounded-xl flex items-start gap-3"
                          style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                          <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                              Delivery Address
                            </p>
                            {order.shipping_address && (
                              <p className="text-sm text-slate-700">{order.shipping_address}</p>
                            )}
                            <p className="text-sm text-slate-500">
                              {[order.city, order.postal_code].filter(Boolean).join(' — ')}
                            </p>
                            {order.whatsapp_number && (
                              <p className="text-xs text-slate-400 mt-1">📱 {order.whatsapp_number}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Items */}
                      {order.items.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Items in this order
                          </p>
                          {order.items.map((item) => {
                            const product = item.product
                            const matchedImage = product?.images?.find(img => img.color === item.color)
                            const displayImage = matchedImage || product?.images?.[0]

                            return (
                              <motion.div
                                key={item.id}
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                {/* Image */}
                                <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 p-2 border border-slate-100">
                                  <img
                                    src={`${baseURL}${displayImage?.image}`}
                                    alt={product?.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                                    {product?.category?.name}
                                  </p>
                                  <p className="text-sm font-semibold text-slate-900 line-clamp-1 mt-0.5">
                                    {product?.name}
                                  </p>
                                  <div className="flex items-center gap-3 mt-1">
                                    {item.color && (
                                      <span className="text-xs text-slate-400 capitalize">
                                        Color: {item.color}
                                      </span>
                                    )}
                                    <span className="text-xs text-slate-400">
                                      Qty: {item.quantity}
                                    </span>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right shrink-0">
                                  <p className="text-sm font-bold text-slate-900">
                                    ${parseFloat(item.price).toFixed(2)}
                                  </p>
                                  <p className="text-xs text-slate-400">per item</p>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400 mt-4">No items found in this order.</p>
                      )}

                      {/* Order total row */}
                      <div className="mt-5 pt-4 flex items-center justify-between border-t border-slate-100">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                          Order Total
                        </span>
                        <span className="text-lg font-bold text-slate-900">
                          ${parseFloat(order.total_price).toFixed(2)}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default TrackOrders