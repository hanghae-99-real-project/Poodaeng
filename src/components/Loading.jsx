import React from 'react';
import Logo from './common/Logo';

function Loading() {
  return (
    <div className='flex flex-col items-center gap-7'>
      {/* <div
        className='logo-div'
        style={{ backgroundImage: `url(/images/PooDaeng.svg)` }}
      /> */}
      <Logo />
      <img
        className='w-[121px] h-[115px] object-cover z-10 border rounded-md'
        src={`${process.env.PUBLIC_URL}/images/testImage.jpg`}
        alt='photoThumb'
      />
      {/* <img
        className='w-14 h-14 object-cover z-10'
        src='/images/testImage.jpg'
        alt='photoThumb'
      /> */}
    </div>
  );
}

export default Loading;
