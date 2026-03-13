import React from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const baseURL = import.meta.env.VITE_BASE_URL

const Cart = () => {
  const items = useSelector((state) => state.cart.Cartitems)
  console.log("cart: ", items)

  const totalPrice = items.reduce((acc, product) => {
    const price = parseFloat(product.price)
    const discounted = price * (1 - (product.discount / 100))
    return acc + discounted
  }, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: 'Georgia, serif' }}>
          Your cart is empty
        </h2>
        <p className="text-sm text-slate-400">Add some products to get started</p>
        <a href="/"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors">
          Shop Now
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 py-5 shadow-sm">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Your Cart
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{items.length} items</p>
          </div>
          <Link to="/" className="text-sm font-medium text-indigo-500 hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col lg:flex-row gap-6">

        {/* ── Cart Items ── */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((product, index) => {
            const firstImage = product.images?.[0]
            const originalPrice = parseFloat(product.price)
            const discountedPrice = (originalPrice * (1 - product.discount / 100)).toFixed(2)

            return (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl p-4 flex gap-4 items-center border border-slate-100"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 p-2">
                  <img
                    src={`${baseURL}${firstImage?.image}`}
                    alt={product?.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                    {product.category?.name}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 mt-0.5 line-clamp-2"
                    style={{ fontFamily: 'Georgia, serif' }}>
                    {product?.name}
                  </h3>

                  {/* Color */}
                  {firstImage?.color && (
                    <p className="text-xs text-slate-400 mt-1 capitalize">
                      Color: {firstImage.color}
                    </p>
                  )}

                  {/* Price row */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-slate-900">
                      ${discountedPrice}
                    </span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-xs line-through text-slate-400">
                          ${originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-600">
                          {product.discount}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors shrink-0"
                  style={{ color: '#94a3b8' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>

              </motion.div>
            )
          })}
        </div>

        {/* ── Order Summary ── */}
        <div className="lg:w-80">
          <motion.div
            className="bg-white rounded-2xl p-6 border border-slate-100 sticky top-6"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold text-slate-900 mb-5" style={{ fontFamily: 'Georgia, serif' }}>
              Order Summary
            </h2>

            {/* Item breakdown */}
            <div className="flex flex-col gap-3 mb-5">
              {items.map((product) => {
                const discountedPrice = (parseFloat(product.price) * (1 - product.discount / 100)).toFixed(2)
                return (
                  <div key={product.id} className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 line-clamp-1 flex-1 mr-2">
                      {product?.name}
                    </span>
                    <span className="text-sm font-semibold text-slate-900 shrink-0">
                      ${discountedPrice}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="h-px bg-slate-100 mb-4" />

            {/* Delivery */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-500">Delivery</span>
              <span className="text-sm font-semibold text-emerald-500">Free</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 bg-linear-to-r from-indigo-500 to-purple-600"
            >
              Proceed to Checkout →
            </button>

            {/* Security note */}
            <p className="text-xs text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </p>

          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Cart