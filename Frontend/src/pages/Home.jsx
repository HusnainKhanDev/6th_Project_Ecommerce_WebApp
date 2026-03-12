import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Cards from '../components/Cards'
import Navigationbar from '../components/Navigationbar'
import Banner from '../components/Banner'
import axios from 'axios'
import { setProducts } from '../store/productSlice'
import Description from '../components/Description'
import { setcart } from '../store/cartSlice'



const Home = () => {

  const dispatch = useDispatch();
  let [DesItem, setDesitem] = useState({})
  const items = useSelector((state) => state.cart.Cartitems)
  const user = useSelector((state) => state.user.user)
 

  //  fetching products
  useEffect(() => {
    async function fetch() {
      try {
        let res = await axios.get(`${import.meta.env.VITE_BASE_URL}store/products/`, { withCredentials: true })
        dispatch(setProducts(res.data))
      } catch (error) {
        console.log(error.response?.data)
      }
    }

    fetch()
  }, [dispatch])

  // fetching cart
  useEffect(() => {
    async function fetchCart() {
      if (user && items.length === 0) {
        try {
          let res = await axios.get(`${import.meta.env.VITE_BASE_URL}store/cart/`, { withCredentials: true })
          dispatch(setcart(res.data))  // ✅ sends array, reducer handles it
        } catch (error) {
          console.log(error.response?.data)
        }
      }
    }
    fetchCart()
  }, [user])








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

          <Cards passToDescription={setDesitem} />

        </div>

        {Object.keys(DesItem).length > 0 ? <div>
          <Description product={DesItem} setDesitem={setDesitem}/>
        </div> : null}

      </div>

    </div>
  )
}

export default Home