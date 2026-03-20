import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

// High quality transparent PNG product images from public CDNs
const IMAC = 'https://www.apple.com/v/imac/q/images/overview/hero/hero_imac__e415801lu0qe_large.png'
const IPHONE = 'https://www.apple.com/v/iphone-15-pro/d/images/overview/hero/hero_iphone15pro__uo6f6kkpzaeq_large.png'
const PS5 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/PS5_Disc_Edition.png/640px-PS5_Disc_Edition.png'

// Fallback to flowbite svgs if above don't load
const IMAC_FB = 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg'
const IPHONE_FB = 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg'
const PS5_FB = 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg'
  const stars = [...Array(20)].map((_, i) => ({
  id: i,
  width: Math.random() * 2 + 1,
  height: Math.random() * 2 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.4 + 0.1,
}))
const Banner = () => {
  const user = useSelector((state) => state.user.user)



  return (
    <div
      className="w-full flex flex-col items-center justify-center text-center gap-20 py-20 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #0f172a 30%, #1e1b4b 65%, #0f172a 100%)' }}
    >

      {/* ── Decorative background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-60 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-40 left-1/3 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(70px)' }} />
        {/* Star dots */}
            {stars.map((star) => (
      <div key={star.id}
        className="absolute rounded-full bg-white"
        style={{
          width: star.width + 'px',
          height: star.height + 'px',
          top: star.top + '%',
          left: star.left + '%',
          opacity: star.opacity,
        }}
      />
    ))}
      </div>

      {/* ── Welcome greeting ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full"
          style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#a5b4fc' }}>
            Welcome back, {user?.full_name?.split(' ')[0] || 'Shopper'} 👋
          </span>
        </div>
      </motion.div>

      {/* ── Hero heading ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: '#6366f1' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Limited Time Offer
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
          style={{ color: 'white', fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: 'spring', bounce: 0.3, delay: 0.3 }}
        >
          Premium
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #818cf8, #c4b5fd, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Electronics
          </span>
        </motion.h1>

        <motion.p
          className="text-base max-w-md"
          style={{ color: '#64748b', lineHeight: '1.8' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Unbeatable prices on the world's finest tech.
          Fast delivery. Premium quality.
        </motion.p>
      </motion.div>

      {/* ── Hero iMac image ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 60, rotate: -5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        whileHover={{ y: -12, rotate: 1 }}
      >
        {/* Glow under image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-10 rounded-full opacity-40"
          style={{ background: 'radial-gradient(ellipse, #6366f1, transparent)', filter: 'blur(20px)' }} />
        <img
          src={IMAC_FB}
          alt="iMac"
          className="w-72 md:w-[440px] relative z-10 drop-shadow-2xl"
          onError={(e) => e.target.src = IMAC_FB}
        />
      </motion.div>

      {/* ── Discount badge ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <h2 className="text-5xl md:text-7xl font-black"
          style={{
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(135deg, #818cf8, #c4b5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
          Up to 35% Off
        </h2>
        <div className="flex items-center gap-6 mt-2">
          {['⚡ Fast Delivery', '🔒 Secure Payment', '↩️ Easy Returns'].map((badge) => (
            <span key={badge} className="text-xs font-semibold" style={{ color: '#475569' }}>
              {badge}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Divider ── */}
      <motion.div className="relative z-10 flex items-center gap-4 w-full max-w-2xl"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #1e293b)' }} />
        <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#334155' }}>Featured</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #1e293b)' }} />
      </motion.div>

      {/* ── iPhone Section ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl">

        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>
            New Arrival
          </span>
          <h3 className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: 'white', fontFamily: 'Georgia, serif' }}>
            iPhone 15<br />Pro Max
          </h3>
          <ul className="flex flex-col gap-3 mb-8">
            {[
              { icon: '🔥', text: 'A17 Pro chip — fastest ever' },
              { icon: '📸', text: '48MP camera system' },
              { icon: '⚡', text: 'All-day battery life' },
              { icon: '🪨', text: 'Titanium. Strong & light' },
            ].map((feat) => (
              <li key={feat.text} className="flex items-center gap-3">
                <span>{feat.icon}</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{feat.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black" style={{ color: '#a5b4fc' }}>$849</span>
            <span className="text-lg line-through" style={{ color: '#334155' }}>$999</span>
            <span className="text-sm font-bold px-2 py-0.5 rounded-lg"
              style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>15% off</span>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex items-center justify-center relative"
          initial={{ opacity: 0, x: 80, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, rotate: -3 }}
        >
          <div className="absolute inset-0 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(40px)' }} />
          <img src={IPHONE_FB} alt="iPhone 15 Pro Max"
            className="w-40 md:w-56 relative z-10 drop-shadow-2xl"
            onError={(e) => e.target.src = IPHONE_FB}
          />
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <motion.div className="relative z-10 w-full max-w-2xl"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }}>
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #4f46e5, transparent)' }} />
      </motion.div>

      {/* ── PS5 Section ── */}
      <div className="relative z-10 flex flex-col md:flex-row-reverse items-center gap-12 w-full max-w-5xl">

        <motion.div
          className="flex-1 text-left"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(168,85,247,0.15)', color: '#c4b5fd', border: '1px solid rgba(168,85,247,0.25)' }}>
            Best Seller
          </span>
          <h3 className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: 'white', fontFamily: 'Georgia, serif' }}>
            PlayStation<br />5
          </h3>
          <ul className="flex flex-col gap-3 mb-8">
            {[
              { icon: '🎮', text: '4K gaming at 120fps' },
              { icon: '⚡', text: 'Ultra-high speed SSD' },
              { icon: '🎧', text: '3D Audio experience' },
              { icon: '🕹️', text: 'DualSense haptic controller' },
            ].map((feat) => (
              <li key={feat.text} className="flex items-center gap-3">
                <span>{feat.icon}</span>
                <span className="text-sm" style={{ color: '#94a3b8' }}>{feat.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black" style={{ color: '#c4b5fd' }}>$404</span>
            <span className="text-lg line-through" style={{ color: '#334155' }}>$449</span>
            <span className="text-sm font-bold px-2 py-0.5 rounded-lg"
              style={{ background: 'rgba(168,85,247,0.2)', color: '#c4b5fd' }}>10% off</span>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
          whileHover={{ scale: 1.06, rotate: 3 }}
        >
          <div className="absolute inset-0 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(40px)' }} />
          <img src={PS5_FB} alt="PlayStation 5"
            className="w-52 md:w-72 relative z-10 drop-shadow-2xl"
            onError={(e) => e.target.src = PS5_FB}
          />
        </motion.div>
      </div>

      {/* ── Bottom tagline ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3 pb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: '#334155' }}>
          Trusted by thousands of customers
        </p>
        <div className="flex items-center gap-2">
          {['⭐', '⭐', '⭐', '⭐', '⭐'].map((s, i) => (
            <span key={i} className="text-lg">{s}</span>
          ))}
          <span className="text-sm ml-2" style={{ color: '#475569' }}>4.9 / 5 rating</span>
        </div>
      </motion.div>

    </div>
  )
}

export default Banner