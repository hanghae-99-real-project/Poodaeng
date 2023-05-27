import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import Headers from '../components/Headers';
import Buttons from '../components/common/Buttons';
import sendCodeNumber from '../api/sendCode';
import { SET_TIMER } from '../redux/modules/timerSlice';
import AuthTimer from '../utils/AuthTimer';

function SignUpPage() {
  const [getAuthMode, setGetAuthMode] = useState(false);
  const [checkTimeMode, setCheckTimeMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAuthHandler = async () => {
    const response = sendCodeNumber();
    console.log('send code response >>> ', response);
    const currentTime = new Date();
    const expireDate = new Date(currentTime.getTime() + 1000 * 60 * 3);
    setCheckTimeMode(true);
    dispatch(SET_TIMER(expireDate));
    sendCodeNumber(response);
  };

  const moveToWelcome = () => {
    navigate('/signupcomplete');
  };

  return (
    <div>
      <div className={`fixed z-30 inset-0 ${getAuthMode ? '' : 'hidden'}`}>
        <div
          role='none'
          className='absolute inset-0 bg-black opacity-30 '
          onClick={() => setGetAuthMode(false)}
        />
        <div className='fixed flex flex-col items-center bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-10 py-20 '>
          <div>입력하신 번호로 인증번호를 보냈어요</div>
          <div>인증번호를 입력해주세요</div>
          <div className='relative flex flex-col gap-1 w-full h-8 pt-10'>
            <div className='flex flex-row '>
              <input type='text' className='outline-none' />
              <div className='flex flex-row items-center gap-1'>
                {/* <div className='text-sm text-[#FF4444]'>03:00</div> */}
                {checkTimeMode && <AuthTimer />}
                <button
                  type='button'
                  className='px-4 py-1 border border-[#777777] rounded-2xl font-semibold text-xs '
                  onClick={getAuthHandler}
                >
                  인증하기
                </button>
              </div>
            </div>
            <div className='w-full  border border-[#777777]' />
          </div>
        </div>
      </div>
      <div className='mb-[61px]'>
        <Headers text icon destination='signin'>
          회원가입
        </Headers>
      </div>
      <div className='flex flex-col px-[22px] font-bold text-xl mb-11'>
        <p>푸댕과 함께 </p>
        <p>더 편리한 산책을 시작해볼까요?</p>
      </div>
      <form className='flex flex-col items-center'>
        <div className='flex flex-col items-center gap-10 '>
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
              onClick={() => setGetAuthMode(true)}
            >
              인증하기
            </button>
            <span className='absolute -bottom-4 left-0 font-semibold  text-[10px] text-[#FF4444]'>
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
        <div className='absolute bottom-[52px]'>
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

export default SignUpPage;
