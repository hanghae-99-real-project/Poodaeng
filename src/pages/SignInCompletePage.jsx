import React from 'react';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/common/Buttons';

function SignInCompletePage() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center h-full pt-36'>
      <div>
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
          <div className='text-base font-normal w-56 '>
            <p className='break-keep line-pre'>
              푸댕과 함께 산책하고,
              <span>배변 처리의 어려움에서 벗어나세요!</span>
            </p>
          </div>
        </div>
      </div>
      <div className='absolute bottom-[52px]'>
        <Buttons
          type='button'
          bgColor='#8722ED'
          textColor='#fff'
          onClick={() => navigate('/')}
        >
          푸댕 시작하기
        </Buttons>
      </div>
    </div>
  );
}

export default SignInCompletePage;
