import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Headers({ children, text, icon, destination }) {
  const navigate = useNavigate();
  return (
    <div className='sticky top-0 flex flex-row z-0 items-center justify-between h-7 w-[375px] px-5 shadow-md py-7 bg-white'>
      <div className='w-3'>
        {icon && (
          <IoIosArrowBack
            onClick={() => navigate(`/${destination}`)}
            className='text-2xl cursor-pointer'
          />
        )}
      </div>
      <div className={`font-bold ${text && 'text-xl'}`}>{children}</div>
      <div className='w-3' />
    </div>
  );
}

export default Headers;
