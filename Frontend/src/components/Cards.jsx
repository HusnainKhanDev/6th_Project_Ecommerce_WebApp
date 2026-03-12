import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "flowbite-react";
import { setcart } from '../store/cartSlice'

const Cards = (prop) => {

  const items = useSelector((state) => state.products.items)
  const dispatch = useDispatch();

  function showDescription(item) {
    prop.passToDescription(item)

  }

  function handleAddToCart(item){
    console.log(item)
    dispatch(setcart(item))
  }

  return items.map((product) => {

    const firstImage = product.images[0]

    return (
      <div key={product.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        onClick={(e) => { e.stopPropagation(); showDescription(product)}}
        >

        {/* Image Area */}
        <div className="relative h-56 flex items-center justify-center p-2 bg-linear-to-br from-slate-50 to-slate-100">

          {/* Wishlist button */}
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white z-10">
            <i className="ri-heart-add-2-line"></i>
          </button>

          <img
            src={`${import.meta.env.VITE_BASE_URL}${firstImage?.image}`}
            alt={product.name}
            className="h-full w-[80%] object-cover transition-transform duration-300 group-hover:scale-105"
          />

        </div>

        {/* Content */}
        <div className="p-5">

          {/* Badge */}
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-md mb-3 bg-indigo-100 text-indigo-600">
            🏷️ {product.discount}% off
          </span>

          {/* Name */}
          <h3 className="text-sm font-semibold leading-snug mb-3 line-clamp-2 text-slate-900"
            style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h3>

          {/* Delivery */}
          <p className="text-xs text-emerald-500 flex items-center gap-1 mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {firstImage?.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Price + Button */}
          <div className="flex items-center justify-between">

            <p className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              ${product.price}
            </p>

            <Button
              className="bg-linear-to-r from-purple-500 via-purple-600 to-purple-700 text-white hover:bg-linear-to-br focus:ring-0 active:scale-95 transition-transform duration-150"
              color="purple"
              onClick={(e) => {e.stopPropagation(); handleAddToCart(product)}}
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