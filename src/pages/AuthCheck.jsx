import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import qs from 'qs';
// import axios from 'axios';

function AuthCheck() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log('location >>>', location);
  // const code = new URLSearchParams(location.search).get('code');
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('code'));
  const code = searchParams.get('code'); // 인가 코드 뜯어서 서버로 보내야 함.
  console.log('code >>>', code);

  // eslint-disable-next-line consistent-return
  const getKakaoToken = async () => {
    // const payload = JSON.stringify({
    //   grant_type: 'authorization_code',
    //   client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    //   client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    //   code,
    // });
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code,
    });
    let auth;
    // const payload = {
    //   grant_type: 'authorization_code',
    //   client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    //   client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    //   code,
    // };

    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload,
      );
      console.log('response >>>', response);

      // const token = response.data.access_token;
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };
      // const res = await axios.post('/api/auth/users/login', headers);
      // console.log('BE response >>>', res);
      auth = response;
      if (!auth) {
        navigate(-1);
        console.log('나 뒤로 와졌니?');
        // return <Navigate to='/' replace state='유효하지 않은 인가코드입니다.' />;
      }

      if (auth) {
        const res = getKakaoToken();
        console.log('response >>>', res);
        console.log('response.data >>>', res.data);
        if (res.status === 200) {
          return (
            // <Navigate to='/signupcomplete' state={response.data.access_token} />
            <Navigate to='/test' state={res.data.access_token} />
          );
        }
      }
    } catch (error) {
      console.log('getKakaoToken error >>>', error);
    }
  };

  // if (!code) {
  //   navigate(-1);
  //   console.log('나 뒤로 와졌니?');
  //   // return <Navigate to='/' replace state='유효하지 않은 인가코드입니다.' />;
  // }

  // if (code) {
  //   const response = getKakaoToken();
  //   console.log('response >>>', response);
  //   console.log('response.data >>>', response.data);
  //   if (response.status === 200) {
  //     return (
  //       // <Navigate to='/signupcomplete' state={response.data.access_token} />
  //       <Navigate to='/test' state={response.data.access_token} />
  //     );
  //   }
  //   /* 인가코드 서버로 보내는 로직 */
  //   // axios.post('/api/auth/login');
  //   // console.log(location);
  //   // const code = location.search.split("=")[1];
  //   /* REST_API_KEY랑  */
  //   // const restApiKey = process.env.REACT_APP_REST_API_KEY;
  //   // const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  // }
  useEffect(() => {
    getKakaoToken();
  }, []);
}

export default AuthCheck;
