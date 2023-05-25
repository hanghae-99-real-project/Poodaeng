import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button type='button' onClick={() => navigate('/login')}>
        login으로 이동
      </button>
    </div>
  );
}

export default SignupPage;
