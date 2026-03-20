import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigationbar from '../components/Navigationbar'

const faqs = [
  {
    id: 1,
    icon: '📦',
    title: 'Orders & Delivery',
    items: [
      'Free shipping on all orders across Pakistan',
      'Delivery in 3–5 business days in major cities',
      'Every order comes with a tracking ID',
      'Orders are dispatched within 24 hours of placement',
    ]
  },
  {
    id: 2,
    icon: '✏️',
    title: 'Change & Cancellation',
    items: [
      'Modify or cancel your order within 4 hours of placing it',
      'Cancellations are processed within 2 business days',
      'Refunds take 5–7 business days to reflect',
      'Contact us via WhatsApp for fastest response',
    ]
  },
  {
    id: 3,
    icon: '🛠️',
    title: 'Warranty & Replacement',
    items: [
      'Report wrong or damaged items within 24 hours of delivery',
      'Software faults can be reported within 7 days',
      'Physical damage after 24 hours is repair-only',
      '1-year warranty on all products — only parts charged outside warranty',
    ]
  },
  {
    id: 4,
    icon: '🔄',
    title: 'Returns & Complaints',
    items: [
      'Register complaint with video proof via our form',
      'Quality and authenticity checked on every return',
      'Wrong or damaged replacements processed after verification',
      'Our team responds within 24 hours',
    ]
  },
  {
    id: 5,
    icon: '📋',
    title: 'Usage Guidelines',
    items: [
      'Use the recommended charger — avoid fast charging',
      'Keep electronics away from water and extreme heat',
      'Bluetooth range maximum ~10 meters',
      'Health metrics are for lifestyle use only, not medical',
    ]
  },
  {
    id: 6,
    icon: '☎️',
    title: 'Contact & Support',
    items: [
      'WhatsApp: +92 300 0000000 (fastest response)',
      'Email: support@shoplux.com',
      'Working hours: Mon–Sat, 10AM–7PM',
      'Follow us on Instagram, Facebook & TikTok for updates',
    ]
  },
]

const promises = [
  { icon: '📅', title: '7 Days Replacement', desc: 'Not happy? Get a replacement within 7 days, no hassle.' },
  { icon: '🏅', title: 'Easy Exchange', desc: 'Smooth exchange and warranty claims, handled with care.' },
  { icon: '⚡', title: 'Instant Exchange', desc: 'Request an exchange and we process it immediately.' },
  { icon: '👍', title: 'No Questions Asked', desc: 'We trust our customers. Exchange without interrogation.' },
]

const AccordionItem = ({ faq }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{faq.icon}</span>
          <span className="text-base font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            {faq.title}
          </span>
        </div>
        <motion.svg
          className="w-5 h-5 text-indigo-400 shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="px-6 pb-5 flex flex-col gap-2 border-t border-slate-100 pt-4">
              {faq.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Support = () => {
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Georgia, serif' }}>
        <Navigationbar />
      {/* Hero */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)' }}>

        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#6366f1' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ShopLux
          </motion.p>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Shop With Us?
          </motion.h1>
          <motion.p
            className="text-base max-w-xl mx-auto"
            style={{ color: '#94a3b8' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We believe in building trust through transparency. Here's everything you need to know about shopping with ShopLux.
          </motion.p>
        </div>
      </div>

      {/* Promises */}
      <div className="mx-auto max-w-5xl px-6 mt-5 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-5 text-center border border-slate-300"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <p className="text-sm font-bold text-slate-900 mb-1">{p.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="mx-auto max-w-5xl px-6 mb-16">
        <motion.div
          className="rounded-2xl p-6 md:p-8 border"
          style={{ background: '#fff7ed', borderColor: '#fed7aa' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🚨</span>
            <h2 className="text-lg font-bold text-orange-800">Important Notice</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              'Only accept parcels with ShopLux branded packaging.',
              'Do not accept if the parcel is damaged, opened, or mishandled.',
              'Product should not have any scratches or damage.',
              'All accessories should be present within the box.',
              'Our QA team will determine refund or replacement after inspection.',
            ].map((notice, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-orange-700">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                {notice}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-5xl px-6 mb-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
            Everything you need to know
          </p>
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <AccordionItem faq={faq} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <motion.div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Still have questions?
          </h2>
          <p className="text-sm mb-8" style={{ color: '#94a3b8' }}>
            Our support team is available Mon–Sat, 10AM to 7PM. We usually respond within minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: '#25d366' }}
            >
              💬 WhatsApp Us
            </a>
            <Link
              to="/"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              🛍️ Start Shopping
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default Support