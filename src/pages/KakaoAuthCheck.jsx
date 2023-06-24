/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import qs from 'qs';
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useMutation } from 'react-query';
import { shallow } from 'zustand/shallow';
import { kakaoSignIn } from '../api/sendCode';
import Loading from '../components/common/Loading';
import { tokenStore } from './SignInPage';
import useCurrentLocation from '../hooks/useCurrentLocation';
// import Loading from '../components/Loading';

function KakaoAuthCheck() {
  const [isLoading, setIsLoading] = useState(true);

  const loc = useLocation();
  const navigate = useNavigate();
  // console.log('location >>>', location);
  // const code = new URLSearchParams(location.search).get('code');
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get('code'));
  const code = searchParams.get('code'); // 인가 코드 뜯어서 서버로 보내야 함.
  // console.log('인가 code >>>', code);

  const { setToken } = tokenStore(
    state => ({
      setToken: state.setToken,
    }),
    shallow,
  );
  const { location } = useCurrentLocation();

  const mutation = useMutation(kakaoSignIn, {
    onSuccess: async data => {
      // console.log('서버 response >>>', data);
      const accessToken = data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;
      const decodedAcToken = await jwtDecode(accessToken);
      const decodedRfToken = await jwtDecode(refreshToken);
      // console.log('decodedAcToken >>>', decodedAcToken);
      // console.log('decodedRfToken >>>', decodedRfToken);
      const { exp: RF_EXP } = decodedRfToken;
      const rfExpireDate = new Date(RF_EXP * 1000);
      // console.log('rfExpireDate >>>', rfExpireDate);
      Cookies.set('refreshToken', refreshToken, {
        expires: rfExpireDate,
        secure: false,
        sameSite: 'Lax',
      });
      const { exp: AC_EXP, userId } = decodedAcToken;
      // console.log('이거 초 단위인가?  >>> ', AC_EXP);
      const acExpireDate = AC_EXP * 1000;
      // console.log('expireDate type 확인', typeof acExpireDate);
      setToken(userId, accessToken, acExpireDate);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/signincomplete', {
          replace: true,
          state: {
            fromSocial: true,
          },
        });
      }, 1000);
    },
    onError: error => {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
        // console.log('error >>>', error);
        navigate('/login', {
          state: {
            error,
            message: '로그인 실패',
          },
          replace: true,
        });
      }, 1000);
    },
  });
  const getKakaoToken = async () => {
    const agreed = localStorage.getItem('agreed') === 'true';
    const inputs = {
      code,
      position: agreed,
      userLatitude: agreed ? parseFloat(location?.latitude) : null,
      userLongitude: agreed ? parseFloat(location?.longitude) : null,
    };
    mutation.mutate(inputs);
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      getKakaoToken();
    }
  }, [location]);

  return isLoading && <Loading />;
}

export default KakaoAuthCheck;
