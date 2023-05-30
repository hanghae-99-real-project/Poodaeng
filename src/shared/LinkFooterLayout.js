import React from 'react'
import { Outlet } from 'react-router-dom'
import LinkFooter from './LinkFooter';

function LinkFooterLayout() {
  return (
    // <div className=' w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-yellow-400'>
      // <div className='w-screen h-[calc(var(--vh,1vh)*100)+65px] flex justify-center items-center bg-yellow-400'>
      <div className='w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-yellow-400'>
        {/* <div className='test-canvas'>  */}
        <div className='canvas pt-0'> 
          <Outlet />
          <LinkFooter />
        </div>
      </div>
    // </div>
  )
}

export default LinkFooterLayout;