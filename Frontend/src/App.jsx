import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home'

const App = () => {

  const routes = createBrowserRouter([
      {
        path: '/',
        element: <div> <Home/> </div>
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