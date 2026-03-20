import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import TrackOrders from './pages/TrackOrder'
import UserProtection from './components/UserProtection'
import Support from './pages/Support'

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
      element: <div><UserProtection> <Cart /> </UserProtection> </div>
    },
    {
      path: '/order',
      element: <div> <UserProtection> <Orders /> </UserProtection> </div>
    },
    {
      path: '/track/order',
      element: <div> <UserProtection> <TrackOrders /> </UserProtection> </div>
    },
    {
      path: '/support',
      element: <div> <UserProtection> <Support/> </UserProtection> </div>
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