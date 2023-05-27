import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Headers({ children, text, icon, destination }) {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row items-center justify-between h-7 w-[375px] px-[20px] shadow-md py-5 box-border'>
      <div className='w-[10px]'>
        {icon && (
          <IoIosArrowBack
            onClick={() => navigate(`/${destination}`)}
            // className='back-button'
          />
        )}
      </div>
      <div className={`font-bold ${text && 'text-xl'}`}>{children}</div>
      <div className='w-[10px]' />
    </div>
  );
}

export default Headers;
