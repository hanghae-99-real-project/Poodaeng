import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from './Headers';

function MypageUnknown() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-between'>
      <Headers text> 마이페이지 </Headers>
      <div className='my-64 flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center font-bold text-lg'>
          <div>회원 가입하고 </div>
          <div>푸댕의 서비스를 이용하세용!</div>
        </div>
        <button
          className='large-button bg-mainColor text-white mt-6 mb-3'
          onClick={() => navigate('/login')}
        >
          로그인/회원가입
        </button>
      </div>
      <div className='mt-0.5' />
    </div>
  );
}

export default MypageUnknown;
