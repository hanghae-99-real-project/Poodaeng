import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import KakaoLogin from '../utils/KakaoLogin';

function LoginSocial() {
  const navigate = useNavigate();
  const normalSignUp = () => {
    navigate('/signup');
  };

  const normalSignIn = () => {
    navigate('/signin');
  };
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <div className='flex flex-col items-center mb-[51px]'>
        <Logo st='w-[169px] h-[31px] bg-contain bg-no-repeat mb-2' />
        <div className='mb-5 text-base font-medium '>
          반려견 배변 처리 위치 정보
        </div>
        <div className='w-[213px] h-[187px] bg-slate-500 rounded-md' />
      </div>
      <div className='flex flex-col gap-4'>
        <KakaoLogin />
        {/* <button type='button' className='large-button bg-[#F9EB00]'>
          카카오톡으로 시작하기
        </button> */}
        <button type='button' className='large-button text-[#fff] bg-[#000000]'>
          구글 계정으로 시작하기
        </button>
      </div>
      <div className='flex flex-row  justify-center gap-2'>
        <button type='button' className='text-[#959595]' onClick={normalSignUp}>
          이메일 회원가입
        </button>
        <p className='text-[#959595]'>|</p>
        <button type='button' className='text-[#959595]' onClick={normalSignIn}>
          이메일 로그인
        </button>
      </div>
    </div>
  );
}

export default LoginSocial;