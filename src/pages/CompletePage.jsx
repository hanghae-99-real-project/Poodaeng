import React from 'react';
import Buttons from '../components/common/Buttons';

function CompletePage() {
  return (
    <div className='flex flex-col items-center h-full pt-44'>
      <div className='flex flex-col items-center '>
        <img
          src={`${process.env.PUBLIC_URL}images/WelcomeLogo.svg`}
          alt='photoThumb'
          className='mb-14'
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <div>
          <h1 className='font-bold text-2xl '>가입을 축하합니다!</h1>
        </div>
        <p className='text-base font-normal w-56 '>
          푸댕과 함께 반려견 산책 어쩌구 저쩌구 얼씨구
        </p>
      </div>
      <div className='absolute bottom-[76px]'>
        <Buttons type='button' bgColor='#449AFF' textColor='#fff'>
          푸댕 시작하기
        </Buttons>
      </div>
    </div>
  );
}

export default CompletePage;
