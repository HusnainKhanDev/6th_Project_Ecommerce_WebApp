import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Cards from '../components/cards'
import Navigationbar from '../components/Navigationbar'
import Banner from '../components/Banner'
import axios from 'axios'
import { setProducts } from '../store/productSlice'



const Home = () => {

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();
  console.log(user)

  useEffect(() => {
    async function fetch() {
      try {
        let res = await axios.get("http://127.0.0.1:8000/store/products/", { withCredentials: true })
        dispatch(setProducts(res.data))
        console.log(res.data)
      } catch (error) {
        console.log(error.response?.data)
      }
    }

    fetch()
  }, [dispatch])








  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navigationbar />


      <div className="mx-auto w-full  pb-6">
        <Banner />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}> Featured Products </h2>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}> products available </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          <Cards />

        </div>

      </div>

    </div>
  )
}

export default Home