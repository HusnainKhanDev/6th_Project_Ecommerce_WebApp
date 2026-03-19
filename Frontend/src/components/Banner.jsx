import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Banner = () => {
  const user = useSelector((state) => state.user.user)
  
  return (
    <div
      className="w-full flex flex-col items-center justify-center text-center gap-12 py-16 px-8"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #312e81 50%, #0f172a 100%)' }}
    >
      <motion.p
        className="text-4xl text-white"
        style={{ fontFamily: "Delius Swash Caps, cursive", fontWeight: 400 }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
      >
       {`Welcome! ${user.full_name || "User"} Happy Shoping`}
      </motion.p>

      {/* Tag */}
      <motion.p
        className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full"
        style={{ color: '#a5b4fc', border: '1px solid #4f46e5' }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Limited Time Offer
      </motion.p>

      {/* Main Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold"
        style={{ color: 'white', fontFamily: 'Georgia, serif', lineHeight: '1.1' }}
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      >
        Premium <br/>
        <span style={{ color: '#a5b4fc' }}>Electronics</span>
      </motion.h1>

      {/* iMac + discount */}
      <motion.img
        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
        alt="iMac"
        className="w-64 md:w-96"
        initial={{ opacity: 0, y: 80, rotate: -10 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        whileHover={{ y: -10, rotate: 2 }}
      />

      <motion.h2
        className="text-4xl md:text-6xl font-bold"
        style={{ color: '#818cf8' }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
      >
        Up to 35% Off
      </motion.h2>

      <motion.p
        className="text-lg max-w-lg"
        style={{ color: '#94a3b8', lineHeight: '1.8' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Explore the latest tech from Apple, Sony, Microsoft & more.
        Unbeatable prices, fast delivery, premium quality.
      </motion.p>

      {/* ---- iPhone Section ---- */}
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-4xl">

        {/* text slides from left */}
        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#a5b4fc' }}>New Arrival</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'white', fontFamily: 'Georgia, serif' }}>
            iPhone 15 Pro Max
          </h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              '🔥 A17 Pro chip — fastest ever',
              '📸 48MP camera system',
              '⚡ All-day battery life',
              '🪨 Titanium. Strong & light',
            ].map((feat) => (
              <li key={feat} className="text-sm" style={{ color: '#94a3b8' }}>{feat}</li>
            ))}
          </ul>
          <span className="text-2xl font-bold" style={{ color: '#818cf8' }}>
            From $999 — 15% off
          </span>
        </motion.div>

        {/* image slides from right */}
        <motion.img
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
          alt="iPhone"
          className="w-36 md:w-52"
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          whileHover={{ scale: 1.1, rotate: -5 }}
        />
      </div>

      {/* Divider */}
      <motion.div
        className="w-24 h-px"
        style={{ background: '#4f46e5' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />

      {/* ---- PS5 Section ---- */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 w-full max-w-4xl">

        {/* text slides from right */}
        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#a5b4fc' }}>Best Seller</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'white', fontFamily: 'Georgia, serif' }}>
            PlayStation 5
          </h3>
          <ul className="flex flex-col gap-2 mb-6">
            {[
              '🎮 4K gaming at 120fps',
              '⚡ Ultra-high speed SSD',
              '🎧 3D Audio experience',
              '🕹️ DualSense haptic controller',
            ].map((feat) => (
              <li key={feat} className="text-sm" style={{ color: '#94a3b8' }}>{feat}</li>
            ))}
          </ul>
          <span className="text-2xl font-bold" style={{ color: '#818cf8' }}>
            From $449 — 10% off
          </span>
        </motion.div>

        {/* image zooms in spinning */}
        <motion.img
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
          alt="PS5"
          className="w-48 md:w-64"
          initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.08, rotate: 3 }}
        />
      </div>

      {/* Divider */}
      <motion.div
        className="w-24 h-px"
        style={{ background: '#4f46e5' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />

      {/* Final CTA */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm uppercase tracking-widest" style={{ color: '#64748b' }}>
          Don't miss out
        </p>
        <motion.button
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(99,102,241,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Now →
        </motion.button>
      </motion.div>

    </div>
  )
}

export default Banner
