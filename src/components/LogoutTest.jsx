import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { findLocation } from '../utils/kakaoMapError';
import KakaoMap from '../kakao/KakaoMap';

function LogoutTest() {
  const location = useLocation();
  const { state } = location;
  const { token, userId } = state;
  const navigate = useNavigate();
  console.log('location token', token);
  console.log('location userId', userId);
  // const acToken = JSON.stringify(token);
  const kakaoLogoutHandler = async () => {
    // 토큰 받을 때랑 타입 똑같음. ('Content-Type: application/x-www-form-urlencoded');
    /* 요청하면 토큰 지워지긴 함.  근데 내 세션에 있는 회원정보를 지우는 것과 화면 이동은 내가 알아서 해야 한다.  */
    const response = await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const { id } = response.data;
    console.log('id', id); /* id: 2801151948 */
    localStorage.removeItem('kakaoUserId');
    navigate('/');
  };
  return (
    <div>
      <button
        type='button'
        className='hidden large-button bg-mainColor text-white cursor-pointer'
        onClick={kakaoLogoutHandler}
      >
        Logout
      </button>
      <button
        className='hidden'
        type='button'
        id='myLocation'
        onClick={findLocation}
      >
        위치 파악
      </button>
      <KakaoMap />
    </div>
  );
}

export default LogoutTest;
