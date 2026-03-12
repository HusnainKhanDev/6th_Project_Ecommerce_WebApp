import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import Slider from 'react-slick'
import { useDispatch } from 'react-redux'
import { setcart } from '../store/cartSlice'

const baseURL = import.meta.env.VITE_BASE_URL


const getColor = (colorStr) => {
  if (!colorStr) return 'grey'
  const words = colorStr.trim().split(' ')
  return words.length > 1 ? words[1] : words[0]
}
const SlickArrow = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-100 transition-colors ${direction === 'prev' ? 'left-2' : 'right-2'}`}
  >
    {direction === 'prev'
      ? <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      : <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    }
  </button>
)



const Description = ({ product, setDesitem }) => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [sliderRef, setSliderRef] = useState(null)
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(setcart(item))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const originalPrice = parseFloat(product.price)
  const discountedPrice = (originalPrice * (1 - product.discount / 100)).toFixed(2)

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrow direction="prev" />,
    nextArrow: <SlickArrow direction="next" />,
  }
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setDesitem({})}
      >
        <motion.div
          className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white"
          style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
          onClick={e => e.stopPropagation()}
        >

          {/* Close */}
          <button
            onClick={() => setDesitem({})}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">

            {/* ── Left ── */}
            <div className="md:w-1/2 p-8 bg-slate-50 flex flex-col gap-4">

              {/* Slider */}
              <div className="rounded-2xl bg-white relative" style={{ height: '280px' }}>
                <Slider ref={setSliderRef} {...sliderSettings}>
                  {product.images.map((img) => (
                    <div key={img.id}>
                      <div className="flex items-center justify-center bg-white p-6" style={{ height: '280px' }}>
                        <img
                          src={`${baseURL}${img.image}`}
                          alt={img.color}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Color List */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Available Colors
                </p>
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setSelectedColor(i)
                      sliderRef?.slickGoTo(i)  // ✅ clicking color jumps slider to that image
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all"
                    style={{
                      background: selectedColor === i ? '#eef2ff' : 'white',
                      border: selectedColor === i ? '1.5px solid #6366f1' : '1.5px solid #e2e8f0',
                    }}
                  >
                    <div className="w-5 h-5 rounded-full border border-slate-200 shrink-0"
                      style={{ background: getColor(img.color) }} />   {/* ✅ CSS understands 'black', 'red' etc directly */}
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {img.color}   {/* ✅ shows 'Grey' not 'Titanium Grey' */}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      {img.stock} left
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right ── */}
            <div className="md:w-1/2 p-8 flex flex-col gap-5">

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
                  {product.category.name}
                </span>
                <h2 className="text-xl font-bold leading-snug mt-1 mb-2 text-slate-900"
                  style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900"
                  style={{ fontFamily: 'Georgia, serif' }}>
                  ${discountedPrice}
                </span>
                <span className="text-sm line-through text-slate-400">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-semibold px-2 py-1 rounded-md bg-indigo-100 text-indigo-600">
                  {product.discount}% off
                </span>
              </div>

              <div className="h-px bg-slate-100" />

              <div>
                <p className="text-sm font-semibold mb-3 text-slate-900">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200">
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-gray-50 text-slate-500"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      whileTap={{ scale: 0.85 }}
                    >−</motion.button>
                    <span className="w-10 text-center font-semibold text-sm text-slate-900">
                      {quantity}
                    </span>
                    <motion.button
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-gray-50 text-slate-500"
                      onClick={() => setQuantity(q => q + 1)}
                      whileTap={{ scale: 0.85 }}
                    >+</motion.button>
                  </div>
                  <span className="text-xs text-red-400">
                    ⚡ Only {product.images[selectedColor]?.stock} items left!
                  </span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex gap-3">
                <motion.button
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-slate-800 to-slate-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Buy Now
                </motion.button>
                <motion.button
                  className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                  style={{
                    background: added
                      ? 'linear-gradient(135deg, #10b981, #059669)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product)}}
                >
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </motion.button>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-emerald-500 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Delivery — arrives in 2-3 days
                </p>
                <p className="text-sm text-emerald-500 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Free 30-day returns
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Description