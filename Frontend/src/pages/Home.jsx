import React from 'react'
import Cards from '../components/cards'
import Navigationbar from '../components/Navigationbar'
import Banner from '../components/Banner'

const products = [
  {
    id: 1,
    name: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
    price: '$1,699',
    discount: 'Up to 35% off',
    rating: 5.0,
    reviews: 455,
    badge: 'Fast Delivery',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg',
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',
    price: '$1,199',
    discount: 'Up to 15% off',
    rating: 4.9,
    reviews: 1233,
    badge: 'Best Seller',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg',
  },
  {
    id: 3,
    name: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
    price: '$799',
    discount: 'Up to 35% off',
    rating: 4.9,
    reviews: 879,
    badge: 'Shipping Today',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg',
  },
  {
    id: 4,
    name: 'PlayStation®5 Console – 1TB, PRO Controller',
    price: '$499',
    discount: 'Up to 10% off',
    rating: 4.8,
    reviews: 2957,
    badge: 'Fast Delivery',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg',
  },
  {
    id: 5,
    name: 'Apple MacBook PRO Laptop with M2 chip',
    price: '$2,599',
    discount: 'Up to 5% off',
    rating: 4.9,
    reviews: 1076,
    badge: 'Fast Delivery',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg',
  },
  {
    id: 6,
    name: 'Microsoft Xbox Series X 1TB Gaming Console',
    price: '$499',
    discount: 'Up to 10% off',
    rating: 4.8,
    reviews: 4263,
    badge: 'Best Seller',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg',
  },
  {
    id: 7,
    name: 'Apple Watch SE [GPS 40mm], Smartwatch',
    price: '$699',
    discount: 'Up to 20% off',
    rating: 4.7,
    reviews: 387,
    badge: 'Fast Delivery',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg',
  },
  {
    id: 8,
    name: 'Microsoft Surface Pro, Copilot+ PC, 13 Inch',
    price: '$899',
    discount: 'Up to 35% off',
    rating: 4.9,
    reviews: 4775,
    badge: 'Best Seller',
    image: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-keyboard.svg',
  },
]

const Home = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navigationbar />

     
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">
        <Banner/>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">

        <div className="flex items-center justify-between mb-6">

        <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}> Featured Products </h2>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}> {products.length} products available </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
            <Cards/>

        </div>

      </div>

    </div>
  )
}

export default Home