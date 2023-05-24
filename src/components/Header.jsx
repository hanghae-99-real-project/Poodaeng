import React from 'react';

function Header({ children }) {
  return (
    <div className='container'>
      <div className='flex justify-center pt-[65px] border rounded-t-[15px]'>
        <img src='' alt='<' className='absolute left-[17px]' />
        <div className='font-[700] size-[20px]'>{children}</div>
      </div>
    </div>
  );
}

export default Header;
