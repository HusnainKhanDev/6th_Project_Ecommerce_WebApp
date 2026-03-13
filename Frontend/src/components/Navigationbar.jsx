import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { setuser } from '../store/userSlice'
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Button
} from 'flowbite-react'

const Navigationbar = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let action = Object.keys(user).length > 0 ? true : false

  async function handleLoginLogout(action) {
    if (action) {
      try {
        console.log("ya chala")
        let logout = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/logout/`)
        dispatch(setuser({}))
        console.log(logout)
        logout.status === 200 ? navigate('/login') : null
      } catch (error) {
        console.log(error.response?.data)
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <Navbar
      fluid
      className="shadow-xl px-6 py-3"
      style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
    >
      {/* Logo */}
      <NavbarBrand as={Link} to="/">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-2"
          style={{ background: '#6366f1' }}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="text-lg font-bold text-white">ShopLux</span>
      </NavbarBrand>

      {/* Login/Logout + Toggle */}
      <div className="flex items-center gap-3 md:order-2">
        <Button
          color={action ? "" : "red"}
          size="md"
          className="bg-linear-to-r from-red-400 via-red-500 to-red-600 text-white hover:bg-linear-to-br focus:ring-0"
          onClick={() => handleLoginLogout(action)}
        >
          {action ? 'Logout' : 'Login'}
        </Button>
        <NavbarToggle className="text-gray-400 border-0 focus:ring-0 hover:bg-white/10" />
      </div>

      {/* Nav Links — all using React Router Link ✅ */}
      <NavbarCollapse>
        <Link to="/"
          className="block py-2 font-medium md:hover:text-indigo-400 transition-colors"
          style={{ color: '#818cf8' }}>
          Home
        </Link>
        <Link to="/products"
          className="block py-2 font-medium md:hover:text-indigo-400 transition-colors"
          style={{ color: '#94a3b8' }}>
          Products
        </Link>
        <Link to="/categories"
          className="block py-2 font-medium md:hover:text-indigo-400 transition-colors"
          style={{ color: '#94a3b8' }}>
          Categories
        </Link>
        <Link to="/cart"
          className="block py-2 font-medium md:hover:text-indigo-400 transition-colors"
          style={{ color: '#94a3b8' }}>
          Cart
        </Link>
        <Link to="/about"
          className="block py-2 font-medium md:hover:text-indigo-400 transition-colors"
          style={{ color: '#94a3b8' }}>
          About
        </Link>
      </NavbarCollapse>

    </Navbar>
  )
}

export default Navigationbar