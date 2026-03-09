import React from 'react'
import Cards from '../components/cards'
import Navigationbar from '../components/Navigationbar'
import Banner from '../components/Banner'



const Home = () => {

  










  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navigationbar />

     
      <div className="mx-auto w-full  pb-6">
        <Banner/>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">

        <div className="flex items-center justify-between mb-6">

        <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0f172a', fontFamily: 'Georgia, serif' }}> Featured Products </h2>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}> products available </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          
            <Cards/>

        </div>

      </div>

    </div>
  )
}

export default Home