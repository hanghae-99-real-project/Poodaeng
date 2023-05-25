import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tabbar() {
  const navigate = useNavigate();
  return (
    <div className='absolute bottom-0 border bg-[#FFFFFF]  z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <img
          src=''
          alt='icon1.png'
          className='border w-[45px] h-[41px] rounded-[8px]'
        />

        <img
          src=''
          alt='icon2.png'
          className='border w-[45px] h-[41px] rounded-[8px]'
        />

        <img
          src='Group 176.png'
          alt='PooPost'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('./poopost')}
          role='none'
        />

        <img
          src=''
          alt='DaengFinder'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('./daengfinder')}
          role='none'
        />

        <img
          src=''
          alt='icon5.png'
          className='border w-[45px] h-[41px] rounded-[8px]'
        />
      </div>
    </div>
  );
}

export default Tabbar;