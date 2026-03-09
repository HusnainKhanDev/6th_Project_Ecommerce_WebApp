import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

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
  ])

  return (
    <div>
      <RouterProvider router={routes}>
      </RouterProvider>
    </div>
  )
}

export default App