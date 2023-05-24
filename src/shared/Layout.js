import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[375px] h-[812px] flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout