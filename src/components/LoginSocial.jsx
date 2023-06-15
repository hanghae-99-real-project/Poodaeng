import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../utils/KakaoLogin';
import { ReactComponent as Logo } from '../assets/images/Poodaeng.svg';
import { ReactComponent as DaengPoo } from '../assets/images/DaengPoo.svg';

function LoginSocial() {
  const navigate = useNavigate();
  // const { state } = useLocation();

  const normalSignUp = () => {
    navigate('/signup');
  };

  const normalSignIn = () => {
    navigate('/signin');
  };

  const moveToHome = () => {
    navigate('/');
  };
  return (
    <>
      <IoIosArrowBack
        className='text-4xl absolute left-4 top-16 cursor-pointer'
        onClick={moveToHome}
      />
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <div className='flex flex-col justify-center items-center gap-3'>
          <div className='flex flex-col items-center mb-24 gap-3'>
            <DaengPoo className='w-24 h-16 translate-x-2' />
            <Logo className='w-28 h-14 mb-2' />
          </div>
          <div className='flex flex-col gap-4'>
            <KakaoLogin />
            <button
              type='button'
              className='large-button bg-[#000000] text-[#fff]'
            >
              구글 계정으로 시작하기
            </button>
          </div>
          <div className='flex flex-row  justify-center gap-2'>
            <button
              type='button'
              className='text-[#959595] cursor-pointer'
              onClick={normalSignUp}
            >
              회원가입
            </button>
            <p className='text-[#959595]'>|</p>
            <button
              type='button'
              className='text-[#959595] cursor-pointer'
              onClick={normalSignIn}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSocial;
