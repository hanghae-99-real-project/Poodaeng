import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { ReactComponent as SignInCompleteCharacter } from '../assets/images/SignInCompleteCharacter.svg';
import Buttons from '../components/common/Buttons';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import Welcome from '../components/SignIn/SignInComplete/Welcome';

function SignInCompletePage() {
  const navigate = useNavigate();
  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );
  useEffect(() => {
    SwitchFooter(false);
  }, []);
  return (
    <div className='relative f-fc-ic-jc h-full w-full bg-gradient-to-b from-[#DCBAFF] from-[15.87%] via-[#f7f4f9] to-[#FFFFFF] to-[100%] default:transition duration-150'>
      <div>
        <div className='absolute top-4 left-0 right-0'>
          <Welcome />
        </div>
        <div className='flex flex-col items-center pb-10'>
          <SignInCompleteCharacter />
        </div>
        <div className='flex flex-col justify-center items-center gap-6'>
          <div>
            <h1 className='font-bold text-2xl '>가입을 축하합니다!</h1>
          </div>
          <div className='text-base font-medium leading-6 w-56 '>
            <p className='text-center'>푸댕과 함께 산책하고,</p>
            <p className='whitespace-nowrap'>
              배변 처리의 어려움에서 벗어나세요!
            </p>
          </div>
        </div>
      </div>
      <div className='absolute bottom-[52px]'>
        <Buttons
          type='button'
          bgColor='#8722ED'
          textColor='#fff'
          onClick={() => navigate('/signin')}
        >
          푸댕 시작하기
        </Buttons>
      </div>
    </div>
  );
}

export default SignInCompletePage;
