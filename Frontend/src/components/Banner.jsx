import React from 'react'

const Banner = () => {
    return (
        <div
            className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)' }}
        >
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#818cf8' }}>
                    Limited Time Offer
                </p>

                <h1 className="text-3xl md:text-4xl font-bold mb-3"
                    style={{ color: 'white', fontFamily: 'Georgia, serif', lineHeight: '1.2' }}>
                    Premium Electronics<br />
                    <span style={{ color: '#a5b4fc' }}>Up to 35% Off</span>
                </h1>

                <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
                    Explore the latest tech from Apple, Sony, Microsoft & more.
                </p>

                <button
                    className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' }}>
                    Shop Now →
                </button>
                
            </div>

            <img
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="hero"
                className="w-48 md:w-64 opacity-90"
            />
        </div>
    )
}

export default Banner