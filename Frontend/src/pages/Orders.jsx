import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-slate-800 outline-none bg-white border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-300"
const labelClass = "block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-widest"

const Order = () => {
    const items = useSelector((state) => state.cart.Cartitems)

    const [postal_code, setpostal_code] = useState()
    const [shipping_address, setshipping_address] = useState()
    const [whatsapp_number, setwhatsapp_number] = useState()
    const [city, setcity] = useState()

    const handleOrder = async () => {
        let data = { postal_code, shipping_address, whatsapp_number, city }
        try{
            let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/store/order/`, data, {withCredentials: true})
            console.log(res.data)
        }
        catch(error){
            console.log(error.response?.data)
        }
    }

    const totalPrice = items.reduce((acc, item) => {
        const price = parseFloat(item.product_detail.price)
        const discounted = price * (1 - item.product_detail.discount / 100)
        return acc + (discounted * item.quantity)
    }, 0)

    const savedAmount = items.reduce((acc, item) => {
        const price = parseFloat(item.product_detail.price)
        const saved = price * (item.product_detail.discount / 100)
        return acc + (saved * item.quantity)
    }, 0)

    return (
        <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: "'Palatino Linotype', Palatino, serif" }}>

            {/* ── LEFT PANEL — dark, order summary ── */}
            <motion.div
                className="lg:w-5/12 xl:w-2/5 flex flex-col relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)', minHeight: '100vh' }}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
                    style={{ background: 'radial-gradient(circle, #818cf8, transparent)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5"
                    style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', transform: 'translate(-30%, 30%)' }} />

                <div className="relative z-10 flex flex-col h-full p-8 xl:p-12">

                    {/* Back link */}
                    <Link to="/cart" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-10 w-fit transition-opacity hover:opacity-70"
                        style={{ color: '#818cf8' }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Cart
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>
                            ShopLux
                        </p>
                        <h1 className="text-3xl font-bold text-white leading-tight">
                            Review your<br />
                            <span style={{ color: '#a5b4fc' }}>order</span>
                        </h1>
                        <p className="text-sm mt-2" style={{ color: '#64748b' }}>
                            {items.length} {items.length === 1 ? 'item' : 'items'} in your order
                        </p>
                    </div>

                    {/* Items list */}
                    <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1" style={{ maxHeight: '40vh' }}>
                        {items.map((item, index) => {
                            const product = item.product_detail
                            const originalPrice = parseFloat(product.price)
                            const discountedPrice = (originalPrice * (1 - product.discount / 100)).toFixed(2)
                            const matchedImage = product.images.find(img => img.color === item.color)
                            const displayImage = matchedImage || product.images[0]

                            return (
                                <motion.div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    {/* Image */}
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 p-1.5"
                                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <img
                                            src={`${baseURL}${displayImage?.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white line-clamp-1">{product.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {item.color && (
                                                <span className="text-xs capitalize" style={{ color: '#64748b' }}>{item.color}</span>
                                            )}
                                            <span className="text-xs" style={{ color: '#64748b' }}>· Qty {item.quantity}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-white">${discountedPrice}</p>
                                        {product.discount > 0 && (
                                            <p className="text-xs line-through" style={{ color: '#475569' }}>${originalPrice.toFixed(2)}</p>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Divider */}
                    <div className="my-6 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />

                    {/* Totals */}
                    <motion.div
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {savedAmount > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm" style={{ color: '#64748b' }}>You save</span>
                                <span className="text-sm font-semibold text-emerald-400">-${savedAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-sm" style={{ color: '#64748b' }}>Delivery</span>
                            <span className="text-sm font-semibold text-emerald-400">Free</span>
                        </div>
                        <div className="flex items-center justify-between pt-3"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="text-base font-bold text-white">Total</span>
                            <span className="text-2xl font-bold" style={{ color: '#a5b4fc' }}>
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* ── RIGHT PANEL — white, form ── */}
            <motion.div
                className="flex-1 flex items-center justify-center p-8 xl:p-16 bg-white"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <div className="w-full max-w-md">

                    {/* Form heading */}
                    <div className="mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
                            Step 2 of 2
                        </p>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Delivery details
                        </h2>
                        <p className="text-sm text-slate-400 mt-1.5">
                            Tell us where to bring your order
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-5">

                        {/* Shipping Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className={labelClass}>Shipping Address</label>
                            <textarea
                                name="shipping_address"
                                value={shipping_address}
                                onChange={(e) => setshipping_address(e.target.value)}
                                placeholder="House #, Street, Area, Neighbourhood..."
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </motion.div>

                        {/* City */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className={labelClass}>City</label>
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setcity(e.target.value)}
                                placeholder="e.g. Karachi"
                                className={inputClass}
                            />
                        </motion.div>

                        {/* Postal + WhatsApp */}
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex-1">
                                <label className={labelClass}>Postal Code</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={postal_code}
                                    onChange={(e) => setpostal_code(e.target.value)}
                                    placeholder="75500"
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex-1">
                                <label className={labelClass}>WhatsApp</label>
                                <input
                                    type="tel"
                                    name="whatsapp_number"
                                    value={whatsapp_number}
                                    onChange={(e) => setwhatsapp_number(e.target.value)}
                                    placeholder="+92 300 0000000"
                                    className={inputClass}
                                />
                            </div>
                        </motion.div>

                        {/* Place Order Button */}
                        <button
                            className="w-full py-4 rounded-2xl font-bold text-base text-white mt-2 transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
                            onClick={() => handleOrder()}
                        >
                            Place Order · ${totalPrice.toFixed(2)}
                        </button>

                        {/* Fine print */}
                        <p className="text-xs text-slate-400 text-center leading-relaxed">
                            By placing your order you agree to our{' '}
                            <a className="text-indigo-400 hover:underline">Terms</a>
                            {' '}and{' '}
                            <a className="text-indigo-400 hover:underline">Privacy Policy</a>
                        </p>

                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default Order