import React, { useState } from 'react'
import { Badge, Button } from 'flowbite-react'

const Cards = ({
  name = 'Apple iMac 27", 1TB HDD, Retina 5K Display',
  price = '$1,699',
  discount = 'Up to 35% off',
  rating = 5.0,
  reviews = 455,
  badge = 'Fast Delivery',
  image = 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
}) => {
  const [wishlist, setWishlist] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'white',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(99,102,241,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'}
    >

      {/* Image Area */}
      <div className="relative h-56 flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>

        {/* Wishlist Button */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10"
          style={{ background: wishlist ? '#fef2f2' : 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <svg className="w-4 h-4 transition-colors duration-200"
            fill={wishlist ? '#ef4444' : 'none'}
            stroke={wishlist ? '#ef4444' : '#94a3b8'}
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <img
          src={image}
          alt={name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Discount Badge — Flowbite ✅ */}
        <div className="mb-3">
          <Badge color="indigo" className="w-fit text-xs font-semibold">
            🏷️ {discount}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-semibold leading-snug mb-3 line-clamp-2"
          style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}>
          {name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5"
                fill={i < Math.floor(rating) ? '#f59e0b' : '#e2e8f0'}
                viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
            {rating} <span style={{ color: '#94a3b8' }}>({reviews})</span>
          </span>
        </div>

        {/* Delivery badge */}
        <p className="text-xs mb-4 flex items-center gap-1" style={{ color: '#10b981' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 13l4 4L19 7" />
          </svg>
          {badge}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}>
              {price}
            </p>
          </div>

          {/* Button — Flowbite ✅ */}
          <Button
            onClick={handleAddToCart}
            size="sm"
            style={{
              background: added
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              transition: 'all 0.3s ease',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {added ? '✓ Added!' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cards