import React from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Headers from '../components/Headers';

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Headers text icon>
        회원가입
      </Headers>
      {/* <div className='flex justify-center items-center text-xl font-bold'>
        <IoIosArrowBack className='back-button' />
        <div>회원가입</div>
      </div> */}
      <button type='button' onClick={() => navigate('/login')}>
        login으로 이동
      </button>
    </div>
  );
}

export default SignupPage;
