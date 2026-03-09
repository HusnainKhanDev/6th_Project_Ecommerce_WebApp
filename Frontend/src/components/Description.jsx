import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Badge } from 'flowbite-react'

const Description = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const colors = [
    { name: 'Midnight', hex: '#1e293b' },
    { name: 'Silver', hex: '#cbd5e1' },
    { name: 'Indigo', hex: '#6366f1' },
    { name: 'Rose', hex: '#f43f5e' },
  ]

  // Multiple images using different angles/views
  const images = [
    product.image,
    'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg',
    'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg',
    product.image,
  ]

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Panel */}
        <motion.div
          className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
          style={{
            background: 'white',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
          onClick={e => e.stopPropagation()} // prevent close on modal click
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: '#64748b' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">

            {/* ── Left: Image Gallery ── */}
            <div className="md:w-1/2 p-8 flex flex-col gap-4"
              style={{ background: '#f8fafc' }}>

              {/* Main Image */}
              <motion.div
                className="rounded-2xl flex items-center justify-center p-8"
                style={{ background: 'white', minHeight: '280px' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full max-h-56 object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="rounded-xl p-2 flex items-center justify-center transition-all"
                    style={{
                      background: 'white',
                      border: selectedImage === i ? '2px solid #6366f1' : '2px solid transparent',
                      width: '64px', height: '64px',
                      boxShadow: selectedImage === i ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                    }}
                  >
                    <img src={img || product.image} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Product Details ── */}
            <div className="md:w-1/2 p-8 flex flex-col gap-5">

              {/* Badge + Name */}
              <div>
                <Badge color="indigo" className="w-fit mb-3 text-xs">
                  🏷️ {product.discount}
                </Badge>
                <h2 className="text-xl font-bold leading-snug mb-2"
                  style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h2>

                {/* Stars */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4"
                        fill={i < Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0'}
                        viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: '#64748b' }}>
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}>
                  {product.price}
                </span>
                <span className="text-sm line-through" style={{ color: '#94a3b8' }}>
                  {/* original price approx */}
                  ${(parseInt(product.price.replace(/\D/g, '')) * 1.35).toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: '#f1f5f9' }} />

              {/* Color Selector */}
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0f172a' }}>
                  Choose a Color —
                  <span className="font-normal ml-1" style={{ color: '#6366f1' }}>
                    {colors[selectedColor].name}
                  </span>
                </p>
                <div className="flex gap-3">
                  {colors.map((color, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className="w-8 h-8 rounded-full transition-all"
                      style={{
                        background: color.hex,
                        border: selectedColor === i ? '3px solid #6366f1' : '3px solid transparent',
                        outline: selectedColor === i ? '2px solid white' : 'none',
                        outlineOffset: '1px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0f172a' }}>Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: '1px solid #e2e8f0' }}>
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors hover:bg-gray-50"
                      style={{ color: '#64748b' }}
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      whileTap={{ scale: 0.85 }}
                    >
                      −
                    </motion.button>
                    <span className="w-10 text-center font-semibold text-sm"
                      style={{ color: '#0f172a' }}>
                      {quantity}
                    </span>
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium transition-colors hover:bg-gray-50"
                      style={{ color: '#64748b' }}
                      onClick={() => setQuantity(q => q + 1)}
                      whileTap={{ scale: 0.85 }}
                    >
                      +
                    </motion.button>
                  </div>
                  <span className="text-xs" style={{ color: '#ef4444' }}>
                    ⚡ Only 12 items left!
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: '#f1f5f9' }} />

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Buy Now
                </motion.button>

                <motion.button
                  className="flex-1 py-3 rounded-xl font-semibold text-sm"
                  style={{
                    background: added
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    transition: 'background 0.3s ease',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                >
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </motion.button>
              </div>

              {/* Delivery info */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#10b981' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7" />
                  </svg>
                  Free Delivery — arrives in 2-3 days
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#10b981' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Free 30-day returns
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Description