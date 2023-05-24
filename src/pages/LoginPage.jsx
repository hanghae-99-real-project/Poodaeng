import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const SubmitHandler = () => {
    console.log('submitting');
    navigate('/');
  };
  return (
    <div>
      <label htmlFor='username'>
        Username:
        <input type='text' id='username' />
      </label>
      <button type='button' onClick={SubmitHandler}>
        테스트 버튼
      </button>
      <image className='w-3 h-3' onClick={SubmitHandler} />
    </div>
  );
}

export default LoginPage;
