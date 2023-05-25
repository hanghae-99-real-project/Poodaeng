import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
// import axios from 'axios';

function AuthCheck() {
  const location = useLocation();
  console.log('location >>>', location);
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('code'));
  const code = searchParams.get('code'); // 인가 코드 뜯어서 서버로 보내야 함.
  console.log('code >>>', code);

  // axios.post('/api/auth/login');
  // console.log(location);
  // const code = location.search.split("=")[1];
  // const restApiKey = process.env.REACT_APP_REST_API_KEY;
  // const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  return <div>AuthCheck</div>;
}

export default AuthCheck;
