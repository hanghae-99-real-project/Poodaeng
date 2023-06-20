import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    // <div className=' w-screen h-screen flex justify-center items-center bg-white'>
    /** @높이_들어오는_기기에_맞춰_계산하도록_설정_footer_있는_거_경로_따로_분리해야_함 */
    <div className=' w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-white'>
      <div className='canvas'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout