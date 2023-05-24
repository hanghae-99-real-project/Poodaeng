import React from 'react';

function Header({ children }) {
  return (
    <div className='relative w-full bg-[#FFFFFF] rounded-t-[15px] z-20 border-b shadow-sm'>
      <div className='flex justify-center mt-[20px] mb-[20px]'>{children}</div>
    </div>
  );
}

export default Header;
