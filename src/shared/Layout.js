import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    // <div className=' w-screen h-screen flex justify-center items-center bg-yellow-400'>
    <div className=' w-max h-max flex justify-center items-center bg-yellow-400'>
      <div className='canvas'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout