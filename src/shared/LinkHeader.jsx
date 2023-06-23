/* eslint-disable no-unused-vars */
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function LinkHeader({ children, icon, destination, setMapMode, feature }) {
  const navigate = useNavigate();
  return (
    // py-5
    <div className='f-fr-ic justify-between w-full h-7 px-4 shadow-md  py-7'>
      {icon && (
        <IoIosArrowBack
          className='text-2xl box-border -translate-x-2 cursor-pointer'
          // onClick={() => navigate(destination)}
          onClick={
            setMapMode
              ? () => setMapMode(prev => !prev)
              : () => navigate(destination)
          }
        />
      )}
      <div
        className={`f-fr-ic box-border font-bold text-xl  leading-6 text-center ${
          feature && 'translate-x-2'
        }`}
      >
        {children}
      </div>
      {feature || <div className='w-3' />}
    </div>
  );
}

export default LinkHeader;
