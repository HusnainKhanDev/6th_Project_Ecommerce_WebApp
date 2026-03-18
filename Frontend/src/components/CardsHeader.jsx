import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'

const CardsHeader = ({setFilteredProducts, setIsFilterActive}) => {
    const products = useSelector((state) => state.products.items)
    const categories = ['All', ...new Set(products.map(p => p.category?.name))]

    const [selectedCategory, setSelectedCategory] = useState('All')
    const [showFilter, setShowFilter] = useState(false)
    const [sort, setSort] = useState('default')
    const [discount, setDiscount] = useState(false)
    const [inStock, setInStock] = useState(false)
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    function handleFilter() {

        const filteredProducts = products
            .filter(p => selectedCategory === 'All' || p.category?.name === selectedCategory)

            // filter popup filters
            .filter(p => !inStock || p.images.some(img => img.stock > 0))
            .filter(p => !discount || p.discount > 0)
            .filter(p => !minPrice || parseFloat(p.price) >= parseFloat(minPrice))
            .filter(p => !maxPrice || parseFloat(p.price) <= parseFloat(maxPrice))

            .sort((a, b) => {
                if (sort === 'price_low') return parseFloat(a.price) - parseFloat(b.price)
                if (sort === 'price_high') return parseFloat(b.price) - parseFloat(a.price)
                if (sort === 'discount') return b.discount - a.discount
                return 0
            })
            setIsFilterActive(true)
            setFilteredProducts(filteredProducts)

    }
    const handleClear = () => {
        setSort('default')
        setDiscount(false)
        setInStock(false)
        setMinPrice('')
        setMaxPrice('')
        setIsFilterActive(false)
    }

    useEffect(() => {
        const filteredProducts = products
            .filter(p => selectedCategory === 'All' || p.category?.name === selectedCategory)
        selectedCategory === 'All' ? setIsFilterActive(false) : setIsFilterActive(true)
        setFilteredProducts(filteredProducts)   
    }, [products, selectedCategory, setFilteredProducts, setIsFilterActive])

    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}>
                    Featured Products
                </h2>
                <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                    {products.length} products available
                </p>
            </div>

            <div className="flex items-center gap-3 relative">

                {/* Category Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all"
                    style={{
                        border: showFilter ? '1px solid #6366f1' : '1px solid #e2e8f0',
                        background: showFilter ? '#eef2ff' : 'white',
                        color: showFilter ? '#6366f1' : '#64748b',
                    }}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                    Filters
                </button>

                {/* Filter Popup */}
                <AnimatePresence>
                    {showFilter && (
                        <motion.div
                            className="absolute top-12 right-0 z-50 bg-white rounded-2xl p-5 w-72"
                            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9' }}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="text-sm font-bold text-slate-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Filter Products
                            </p>

                            {/* Price Range */}
                            <div className="mb-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Price Range</p>
                                <div className="flex items-center gap-2">
                                    <input type="number" placeholder="Min" value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="flex-1 px-3 w-18 py-2 rounded-xl text-sm border border-slate-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    />
                                    <span className="text-slate-300">—</span>
                                    <input type="number" placeholder="Max" value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="flex-1 w-18 px-3 py-2 rounded-xl text-sm border border-slate-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="mb-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sort By</p>
                                <select value={sort} onChange={(e) => setSort(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl text-sm border border-slate-200 outline-none focus:border-indigo-400 transition-all bg-white text-slate-700"
                                >
                                    <option value="default">Default</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="discount">Highest Discount</option>
                                </select>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-col gap-3 mb-5">

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">In Stock Only</span>
                                    <div onClick={() => setInStock(!inStock)}
                                        className="w-10 h-5 rounded-full transition-all relative cursor-pointer"
                                        style={{ background: inStock ? '#6366f1' : '#e2e8f0' }}>
                                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm"
                                            style={{ left: inStock ? '22px' : '2px' }} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">On Discount</span>
                                    <div onClick={() => setDiscount(!discount)}
                                        className="w-10 h-5 rounded-full transition-all relative cursor-pointer"
                                        style={{ background: discount ? '#6366f1' : '#e2e8f0' }}>
                                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm"
                                            style={{ left: discount ? '22px' : '2px' }} />
                                    </div>
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <button onClick={handleClear}
                                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors">
                                    Clear
                                </button>
                                <button onClick={() => handleFilter()}
                                    className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-colors"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                    Apply
                                </button>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}

export default CardsHeader