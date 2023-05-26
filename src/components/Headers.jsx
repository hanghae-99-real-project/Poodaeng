import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Headers({ children, text, icon, destination }) {
  const navigate = useNavigate();
  return (
    <div className='border'>
      {icon && (
        <IoIosArrowBack
          onClick={() => navigate(`/${destination}`)}
          className='back-button'
        />
      )}
      <div
        className={` flex justify-center my-[20px] font-bold ${
          text && 'text-xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Headers;
