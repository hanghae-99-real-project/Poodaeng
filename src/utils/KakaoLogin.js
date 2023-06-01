import React from "react"
// import Buttons from "../components/common/Buttons";
import { ReactComponent as Kakao } from '../assets/images/KakaoLogo.svg';
// import { useNavigate } from 'react-router-dom';

function SocialKakao(){
  // const Rest_api_key='REST API KEY' //REST API KEY
  // const redirectUri = 'http://localhost:3000/auth'; // Redirect URI
  const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY; // REST API KEY
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI // Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code&code=profile_nickname,profile_image,account_email`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  // const handleLogout = ()=>{
  //     window.location.href = kakaoURLz
  // }
  return (
      // <Buttons type='button' bgColor='#F9EB00' onClick={handleLogin}>카카오톡으로 시작하기</Buttons>
      <div>
        <button type='button' className='flex flex-row items-center justify-center gap-3 relative large-button bg-[#F9EB00]' onClick={handleLogin}><Kakao />카카오톡으로 시작하기</button>
      </div>
  )
}
export default SocialKakao;
