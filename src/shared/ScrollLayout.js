import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollFooter from '../components/ScrollFooter'

function ScrollLayout() {
  return (
    // <div className=' w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-yellow-400'>
      // <div className='w-screen h-[calc(var(--vh,1vh)*100)+65px] flex justify-center items-center bg-yellow-400'>
      <div className='w-screen h-[calc(var(--vh,1vh)*100)] flex justify-center items-center bg-yellow-400'>
        {/* <div className='test-canvas'>  */}
        <div className='canvas pt-0'> 
          <Outlet />
          <ScrollFooter />
        </div>
      </div>
    // </div>
  )
}

export default ScrollLayout

/* footer 가 있다면 */
/* height: calc(var(--vh, 1vh) * 100 + [footer의 높이]);

// 예: footer 높이가 66px인 경우
height: calc(var(--vh, 1vh) * 100 + 66px); */

/* <Container>
  <ContentContainer>
  	어쩌구 내용
  </ContentContainer>
  <Footer/>
</Container> */
