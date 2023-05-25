import React from "react"
// import { useNavigate } from 'react-router-dom';

function SocialKakao(){
  // const Rest_api_key='REST API KEY' //REST API KEY
  const Rest_api_key = process.env.REACT_APP_REST_API_KEY; // REST API KEY
  const redirect_uri = 'http://localhost:3000/auth'; // Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  // const handleLogout = ()=>{
  //     window.location.href = kakaoURLz
  // }
  return (
    <div>
      <button type="button" onClick={handleLogin}>카카오 로그인</button>
    </div>
  )
}
export default SocialKakao;
