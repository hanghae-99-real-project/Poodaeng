import React from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import Headers from '../components/Headers';
import Buttons from '../components/common/Buttons';

function SignupPage() {
  const navigate = useNavigate();
  const moveToWelcome = () => {
    navigate('/signupcomplete');
  };

  return (
    <div>
      <Headers text icon destination='signin'>
        회원가입
      </Headers>
      <div className='font-bold text-xl mb-11'>
        <p>푸댕과 함께 </p>
        <p>더 편리한 산책을 시작해볼까요?</p>
      </div>
      <form className='flex flex-col items-center gap-52'>
        <div className='flex flex-col items-center gap-10'>
          {/* <div className='relative flex flex-col after:content-["Goodbye"] after:text-amber-300 after:text-2xl'> */}
          <div className='relative flex flex-col '>
            <input
              type='email'
              placeholder='이메일'
              className='w-80 pb-2  text-xl font-medium border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
              ] placeholder:font-bold '
            />
            <button
              type='button'
              className='absolute top-0 right-0 px-4 py-1 border border-[#777777] rounded-2xl font-semibold text-sm '
            >
              인증하기
            </button>
            <span className='font-semibold  text-[10px] text-[#FF4444]'>
              사용하실 수 없는 이메일입니다.
            </span>
          </div>
          <div className='relative flex flex-col '>
            <input
              type='text'
              placeholder='닉네임'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] after:content-["Byebye"] after:text-amber-300 after:text-sm'
            />
            <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              placeholder='비밀번호'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              placeholder='비밀번호 확인'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
          </div>
        </div>
        <div className='absolute bottom-[76px]'>
          <Buttons
            type='submit'
            bgColor='#C2C2C2'
            textColor='#fff'
            onClick={moveToWelcome}
          >
            다음
          </Buttons>
        </div>
        {/* <button type='submit' className='large-button bg-[#C2C2C2] text-[#fff]'>
          다음
        </button> */}
      </form>

      {/* <button type='button' onClick={() => navigate('/login')}>
        login으로 이동
      </button> */}
    </div>
  );
}

export default SignupPage;
