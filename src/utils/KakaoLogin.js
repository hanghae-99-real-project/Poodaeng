import React from "react"
import Buttons from "../components/common/Buttons";
// import { useNavigate } from 'react-router-dom';

function SocialKakao(){
  // const Rest_api_key='REST API KEY' //REST API KEY
  const RestApiKey = process.env.REACT_APP_REST_API_KEY; // REST API KEY
  const redirectUri = 'http://localhost:3000/auth'; // Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  // const handleLogout = ()=>{
  //     window.location.href = kakaoURLz
  // }
  return (
      <Buttons type='button' bgColor='#F9EB00' onClick={handleLogin}>카카오톡으로 시작하기</Buttons>
      // <button type='button' className='large-button bg-[#F9EB00]' onClick={handleLogin}>카카오톡으로 시작하기</button>
  )
}
export default SocialKakao;
