import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className=' max-w-screen-sm h-screen-[110vh] flex justify-center items-center bg-yellow-400'>
      <div className='canvas'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout