import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

  let [full_name, setname] = useState("")
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")
  let [phone, setphone] = useState("")

  let data = { full_name, email, password, phone }

  async function handleSignup(e) {
    e.preventDefault()
    try {
      console.log(data)
      let user = await axios.post("http://127.0.0.1:8000/auth/signup/", data)
      console.log(user)
    } catch (error) {
      console.log(error.response.data) // shows Django error message
    }
  }




  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900">

      {/* Card */}
      <div className="w-full max-w-md rounded-3xl p-8 bg-white shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-linear-to-br from-indigo-500 to-purple-600">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            Create Account
          </h1>
          <p className="text-xs text-slate-500 mt-1">Join ShopLux and start shopping</p>
        </div>

        {/* Form */}
        <form action="" className='flex flex-col gap-3' onSubmit={handleSignup}>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide"> Full Name </label>
            <div className="relative">
              <i className="ri-user-line absolute top-2 left-3"></i>
              <input type="text" placeholder="John Doe" value={full_name} onChange={(e) => setname(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide"> Email Address </label>
            <div className="relative">
              <i className="ri-mail-line absolute top-2 left-3"></i>
              <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setemail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide"> Phone Number </label>
            <div className="relative">
              <i className="ri-phone-line absolute top-2 left-3"></i>
              <input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setphone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wide"> Password </label>
            <div className="relative">
              <i className="ri-lock-password-line absolute top-2 left-3"></i>
              <input type="password" placeholder="Min. 8 characters" value={password} onChange={(e) => setpassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
            </div>
          </div>



          {/* Submit */}
          <button className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity mt-1">
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Sign in link */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-indigo-500 hover:underline">Sign In</a>
        </p>

      </div>
    </div>
  )
}

export default Signup