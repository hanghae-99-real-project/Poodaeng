import React from 'react';

function Headers({ children, text }) {
  return (
    <div className='relative w-full bg-[#FFFFFF] rounded-t-[15px] z-20 border-b shadow-sm'>
      <div
        className={`flex justify-center mt-[20px] mb-[20px] ${
          text && 'text-xl'
        }`}
        // className={` ${
        //   text
        //     ? 'flex justify-center mt-[20px] mb-[20px] text-xl'
        //     : 'flex justify-center mt-[20px] mb-[20px]'
        // }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Headers;
