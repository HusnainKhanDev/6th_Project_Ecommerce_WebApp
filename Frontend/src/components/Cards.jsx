import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "flowbite-react"
import { setcart } from '../store/cartSlice'
import axios from 'axios'
import { toast } from 'react-toastify'

const Cards = ({ FilteredProducts, passToDescription, isFilterActive }) => {

  const Productitems = useSelector((state) => state.products.items)
  const dispatch = useDispatch()
  const [Color, setcolor] = useState("")

  const items = isFilterActive ? FilteredProducts : Productitems

  function showDescription(item) {
    passToDescription(item)
  }

  const getColor = (colorStr) => {
    if (!colorStr) return 'grey'
    const words = colorStr.trim().split(' ')
    return words.length > 1 ? words[1] : words[0]
  }

  async function handleAddToCart(prod) {
    if (!Color) {
      toast.error("Please select one color")
      return
    }
    let item = { product: prod.id, color: Color, quantity: 1 }
    try {
      let res = await axios.post(`${import.meta.env.VITE_BASE_URL}store/add/cart/`, { "item": item }, { withCredentials: true })
      if (res.status === 201) {
        dispatch(setcart(res.data))
        toast.success("Added to cart!")
      }
    } catch (error) {
      console.log("error", error.response?.data)
    }
  }

  // ✅ return map directly — no fragment, no ToastContainer
  return items.map((product) => {
    const firstImage = product.images[0]
    return (
      <div key={product.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        onClick={(e) => { e.stopPropagation(); showDescription(product) }}
      >
        <div className="relative h-56 flex items-center justify-center p-2 bg-gradient-to-br from-slate-50 to-slate-100">
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white z-10">
            <i className="ri-heart-add-2-line"></i>
          </button>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${firstImage?.image}`}
            alt={product.name}
            className="h-full w-[80%] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-md mb-3 bg-indigo-100 text-indigo-600">
            🏷️ {product.discount}% off
          </span>

          <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2 text-slate-900"
            style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h3>

          <p className="text-xs text-emerald-500 flex items-center gap-1 mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {firstImage?.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          <div className='flex gap-2 mb-3'>
            {product.images.map((i) => (
              i.color?.length > 0 ? (
                <button
                  key={i.id}
                  className="w-4 h-4 rounded-full transition-all"
                  style={{
                    background: getColor(i.color),
                    outline: Color === i.color ? '2px solid #6366f1' : '2px solid transparent',
                    outlineOffset: '2px',
                  }}
                  onClick={(e) => { e.stopPropagation(); setcolor(i.color) }}
                />
              ) : null
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              ${product.price}
            </p>
            <Button
              className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white focus:ring-0 active:scale-95 transition-transform duration-150"
              color="purple"
              onClick={(e) => { e.stopPropagation(); handleAddToCart(product) }}
              pill
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    )
  })
}

export default Cards