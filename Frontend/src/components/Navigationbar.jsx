import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
} from 'flowbite-react'

const Navigationbar = () => {
  return (
    <Navbar
      fluid
      className="shadow-xl px-6 py-3"
      style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
    >
      {/* Logo */}
      <NavbarBrand href="/">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2"
          style={{ background: '#6366f1' }}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="text-lg font-bold text-white">ShopLux</span>
      </NavbarBrand>

      <NavbarToggle className="text-gray-400 border-0 focus:ring-0 hover:bg-white/10" />

      <NavbarCollapse>
        <NavbarLink href="/" active
          className="font-medium md:hover:text-indigo-400"
          style={{ color: '#818cf8' }}>
          Home
        </NavbarLink>
        <NavbarLink href="/products"
          className="font-medium md:hover:text-indigo-400"
          style={{ color: '#94a3b8' }}>
          Products
        </NavbarLink>
        <NavbarLink href="/categories"
          className="font-medium md:hover:text-indigo-400"
          style={{ color: '#94a3b8' }}>
          Categories
        </NavbarLink>
        <NavbarLink href="/deals"
          className="font-medium md:hover:text-indigo-400"
          style={{ color: '#94a3b8' }}>
          Deals
        </NavbarLink>
        <NavbarLink href="/about"
          className="font-medium md:hover:text-indigo-400"
          style={{ color: '#94a3b8' }}>
          About
        </NavbarLink>
      </NavbarCollapse>
      
    </Navbar>
  )
}

export default Navigationbar