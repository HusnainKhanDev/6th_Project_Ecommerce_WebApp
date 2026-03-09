import React from 'react'

const Cards = () => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>

      {/* Image Area */}
      <div className="relative h-56 flex items-center justify-center p-6 bg-linear-to-br from-slate-50 to-slate-100">

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white z-10">
          <i class="ri-heart-add-2-line"></i>
        </button>

        <img
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
          alt="product"
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Badge */}
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded-md mb-3 bg-indigo-100 text-indigo-600">
          🏷️ Up to 35% off
        </span>

        {/* Name */}
        <h3 className="text-sm font-semibold leading-snug mb-3 line-clamp-2 text-slate-900"
          style={{ fontFamily: 'Georgia, serif' }}>
          Apple iMac 27", 1TB HDD, Retina 5K Display
        </h3>


        {/* Delivery */}
        <p className="text-xs text-emerald-500 flex items-center gap-1 mb-4">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Fast Delivery
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between">

          <p className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            $1,699
          </p>

          <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Add to cart
          </button>

        </div>

      </div>
    </div>
  )
}

export default Cards