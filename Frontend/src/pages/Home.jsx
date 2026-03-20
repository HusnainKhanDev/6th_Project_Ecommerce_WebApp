import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Cards from '../components/Cards'
import Navigationbar from '../components/Navigationbar'
import Banner from '../components/Banner'
import axios from 'axios'
import { setProducts } from '../store/productSlice'
import Description from '../components/Description'
import { setcart } from '../store/cartSlice'
import { setOrder } from '../store/orderSlice'
import CardsHeader from '../components/CardsHeader'



const Home = () => {
  const dispatch = useDispatch();
  let [DesItem, setDesitem] = useState({})
  const cart = useSelector((state) => state.cart.Cartitems)
  const orders = useSelector((state) => state.orders.Orderitems)
  const user = useSelector((state) => state.user.user)
  const Orderitems = useRef(orders)
  const items = useRef(cart)
  let [FilteredProducts, setFilteredProducts] = useState([])
  let [isFilterActive, setIsFilterActive] = useState(false)
  

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
      console.log("Order ka pucha", items.current.length)
      if (Object.keys(user).length > 0 && items.current.length === 0) {
        try {
          let res = await axios.get(`${import.meta.env.VITE_BASE_URL}store/cart/`, { withCredentials: true })
          dispatch(setcart(res.data?.items))  // ✅ sends array, reducer handles it
        } catch (error) {
          console.log(error.response?.data)
        }
      }
    }
    fetchCart()
  }, [user, dispatch])

  // fetch orders
  useEffect(() => {
    async function fetchOrder() {
      if (Object.keys(user).length > 0 && Orderitems.current.length === 0) {
        try {
          let res = await axios.get(`${import.meta.env.VITE_BASE_URL}store/get/order/`, { withCredentials: true })
          dispatch(setOrder(res.data))  // ✅ sends array, reducer handles it
        } catch (error) {
          console.log(error.response?.data)
        }
      }
    }
    fetchOrder()
  }, [user, dispatch])



  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navigationbar />


      <div className="mx-auto w-full  pb-6">
        <Banner />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Section Header */}
        <div>
          <CardsHeader setFilteredProducts={setFilteredProducts}  setIsFilterActive={setIsFilterActive}/>
        </div>


        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" id='section1'>
          <Cards passToDescription={setDesitem} FilteredProducts={FilteredProducts} isFilterActive={isFilterActive}/>
        </div>

        {Object.keys(DesItem).length > 0 && (
          <Description product={DesItem} setDesitem={setDesitem} />
        )}

      </div>

    </div>
  )
}

export default Home