import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import TrackOrders from './pages/TrackOrder'

const App = () => {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <div> <Home /> </div>
    },
    {
      path: '/signup',
      element: <div> <Signup /> </div>
    },
    {
      path: '/login',
      element: <div> <Login /> </div>
    },
    {
      path: '/cart',
      element: <div> <Cart /> </div>
    },
    {
      path: '/order',
      element: <div> <Orders /> </div>
    },
    {
      path: '/track/order',
      element: <div> <TrackOrders /> </div>
    },
  ])

  return (
    <div>
      <RouterProvider router={routes}>
      </RouterProvider>
    </div>
  )
}

export default App