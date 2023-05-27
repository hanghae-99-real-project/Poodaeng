import React from 'react';
import { useLocation } from 'react-router-dom';

function LogoutTest() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <button type='button'>Logout</button>
    </div>
  );
}

export default LogoutTest;
