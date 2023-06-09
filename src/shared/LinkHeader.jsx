/* eslint-disable no-unused-vars */
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function LinkHeader({ children, icon, destination, setMapMode, feature }) {
  console.log('추가기능 feature >>>', feature);
  const navigate = useNavigate();
  return (
    // py-5
    <div className='f-fr-ic justify-between h-7 px-4 shadow-md pt-[61px] py-5'>
      {icon && (
        <IoIosArrowBack
          className='text-2xl box-border -translate-x-2'
          // onClick={() => navigate(destination)}
          onClick={
            setMapMode
              ? () => setMapMode(prev => !prev)
              : () => navigate(destination)
          }
        />
      )}
      <div
        className={`box-border font-bold text-xl leading-6 text-center ${
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
