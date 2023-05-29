import React from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollFooter() {
  const navigate = useNavigate();
  return (
    // <div className='absolute bottom-0 border bg-[#FFFFFF] z-20'>
    <div className='scroll-footer border bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <img
          src=''
          alt='Home'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/')}
          role='none'
        />

        <img
          src=''
          alt='Map'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/map')}
          role='none'
        />

        <img
          src='Group 176.png'
          alt='PooPost'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/poopost')}
          role='none'
        />

        <img
          src=''
          alt='DaengFinder'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/daengfinder')}
          role='none'
        />

        <img
          src=''
          alt='MyPage.png'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/mypage')}
          role='none'
        />
      </div>
    </div>
  );
}

export default ScrollFooter;
