import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  Button
} from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setuser } from '../store/userSlice'


const Navigationbar = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  let action = Object.keys(user).length > 0 ? true : false
  let navigate = useNavigate()

  async function handleLoginLogout(action) {
    if (action) {
      try {
        let logout = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/logout/`)
        console.log(logout)
        dispatch(setuser({}))
        logout.status === 200 ? navigate('/') : null
      }
      catch (error) {
        console.log(error.response?.data)
      }
    }
    else{
      navigate('/login')
    }
  }
  console.log(action)
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

      <div className="flex items-center gap-3 md:order-2" onClick={() => handleLoginLogout(action)}>
        <Button color={action ? "" : "red"} size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-0">
          {action ? "logout" : "login"}
        </Button>
        <NavbarToggle className="text-gray-400 border-0 focus:ring-0 hover:bg-white/10" />
      </div>

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