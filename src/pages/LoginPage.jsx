import React from 'react';
import TestBox from '../components/TestBox';

function LoginPage() {
  return (
    <div>
      <label htmlFor='username'>
        Username:
        <input type='text' id='username' />
      </label>
      <TestBox>테스트</TestBox>
    </div>
  );
}

export default LoginPage;
