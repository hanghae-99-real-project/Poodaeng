import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Headers({ children, text, icon }) {
  const navigate = useNavigate();
  return (
    <>
      {icon && (
        <IoIosArrowBack onClick={() => navigate('/')} className='back-button' />
      )}
      <div
        className={`flex justify-center mt-[20px] mb-[20px] ${
          text && 'text-xl'
        }`}
      >
        <div className='relative w-full bg-[#FFFFFF] z-20 border-b shadow-sm mt-[29px]'>
          {children}
        </div>
      </div>
    </>
  );
}

export default Headers;
