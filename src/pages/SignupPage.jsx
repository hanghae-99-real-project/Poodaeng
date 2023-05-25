import React from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
import Headers from '../components/Headers';

function SignupPage() {
  // const navigate = useNavigate();
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
          <div className='relative flex flex-row items-center'>
            <input
              type='email'
              placeholder='이메일'
              className='w-80 font-bold text-xl placeholder: text-[#DBDBDB
              ] '
            />
            <button
              type='button'
              className='absolute top-0 right-0 px-4 py-1 border rounded-2xl font-semibold text-sm'
            >
              인증하기
            </button>
          </div>
          <input type='text' placeholder='닉네임' />
          <input type='password' placeholder='비밀번호' />
          <input type='password' placeholder='비밀번호 확인' />
        </div>
        <button type='submit'>회원가입</button>
      </form>

      {/* <button type='button' onClick={() => navigate('/login')}>
        login으로 이동
      </button> */}
    </div>
  );
}

export default SignupPage;