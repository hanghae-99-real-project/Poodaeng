import React from 'react';
import { useNavigate } from 'react-router-dom';

function Headers({ children }) {
  const navigate = useNavigate();
  return (
    <div className='relative w-full bg-[#FFFFFF] z-20 border-b shadow-sm mt-[29px]'>
      <img
        className='absolute left-5 scale-[-1] cursor-pointer mt-7'
        src='Vector 56.png'
        alt='<'
        onClick={() => navigate('/')}
        role='none'
      />
      <div className='flex justify-center mt-[20px] mb-[20px] font-[700]'>
        {children}
      </div>
    </div>
  );
}

export default Headers;
