/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import qs from 'qs';
// import jwtDecode from 'jwt-decode';
import Loading from '../components/common/Loading';
// import Loading from '../components/Loading';

function KakaoAuthCheck() {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  console.log('location >>>', location);
  // const code = new URLSearchParams(location.search).get('code');
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('code'));
  const code = searchParams.get('code'); // 인가 코드 뜯어서 서버로 보내야 함.
  console.log('인가 code >>>', code);

  // eslint-disable-next-line consistent-return
  const getKakaoToken = async () => {
    // const payload = JSON.stringify({
    //   grant_type: 'authorization_code',
    //   client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    //   client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    //   code,
    // });

    /* 인가코드는 쿼리 스트링으로 넘겨야 인식함 */
    /* to Kakao auth */
    // const payload = qs.stringify({
    //   grant_type: 'authorization_code',
    //   client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    //   client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    //   code,
    // });

    /* to BE server */
    // const payload = qs.stringify({
    //   code,
    // });

    // let response;

    // const payload = {
    //   grant_type: 'authorization_code',
    //   client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    //   client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
    //   redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    //   code,
    // };

    /* 나 혼자 다 해보기 kakao랑 직접 통신할 때는 POST 방식 썼다. */
    /* 인가 코드는 쿼리 스트링으로 넘겨야 한다 인식한다는 어느 카카오 관계자의 답변 */
    /* 백엔드에 인가코드 넘길 때는 data 형식 다 빼고 url 뒤에 파라미터로 담아서 넘기면서 메서드는 GET을 써야 한다. */
    /* `http://{서버주소}?code=${code}` */

    try {
      // response = await axios
      /* 카카오에 직접 */
      // await axios
      //   .post('https://kauth.kakao.com/oauth/token', payload)
      //   .then(res => {
      //     console.log('response >>>', res);
      //     console.log(
      //       '카카오auth에서 가져온 데이터 response.data >>>',
      //       res.data,
      //     );
      //     if (res.status === 200) {
      //       console.log('jwtDecode result >>>', jwtDecode(res.data.id_token));
      //       const { sub } = jwtDecode(res.data.id_token);
      //       localStorage.setItem('kakaoUserId', sub);
      //       navigate('/', {
      //         state: {
      //           token: res.data.access_token,
      //           userId: sub,
      //         },
      //       });
      //     }
      //   });

      /* 서버에 */
      const response = await axios
        // .post(`http://localhost:3000/api/auth/kakao/signin`, {
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/kakao/signin`,
          {},
          {
            headers: {
              authorization: `Bearer ${code}`,
            },
            timeout: 10000 /* 10초 */,
            timeoutErrorMessage: 'Request timed out',
          },
        );
      console.log('서버 response >>>', response);
      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate('/', {
      //     state: {
      //       message: '로그인 성공',
      //     },
      //   });
      // }, 1000);
    } catch (error) {
      // setTimeout(() => {
      //   setIsLoading(false);
      //   console.log('error >>>', error);
      //   navigate('/login', {
      //     state: {
      //       error,
      //       message: '로그인 실패',
      //     },
      //   });
      // }, 1000);
      console.log('getKakaoToken error >>>', error);
      // return <Navigate to='/login' replace state={error.response.data.error} />;
    }
  };

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

  return isLoading && <Loading />;
}

export default KakaoAuthCheck;
