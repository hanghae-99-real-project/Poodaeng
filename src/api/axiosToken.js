/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
// eslint-disable-next-line import/no-cycle
import { tokenStore } from "../pages/SignInPage";


let refreshtoken; 
// const accesstoken = JSON.parse(localStorage.getItem("accessToken"))
let accesstoken;

const axiosToken = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 1500,
    timeoutErrorMessage: "Request Timeout over 2 seconds. check your refreshToken.",
});
// instance.defaults.headers.common.Authorization = rfToken
// instance.defaults.headers = rfToken


axiosToken.interceptors.request.use(
  async(config) => {
    // console.log('보낼 때 config headers >>> ', config.headers)
    /**
     * @description refresh token 이 null 이니까 아예 액세스 토큰을 못 받아오네.
     * 서버 쪽에 refreshToken하고 accessToken 둘 다 null인 상태로 보냈을 때 어떤 로직인지 봐야함.
     * refresh토큰 체크하는 로직은 여기 짜면 안 됨. 로그인 안 해도 볼 수 있어야 하기 때문.
     * 그리고 로그인 필요없는 페이지에서는 서버 쪽에서 null로 보내도록 명세서 적어놔서 보내긴 해야 함.
     * 에러 띄우면 안 됨.
     */
    refreshtoken = Cookies.get("refreshToken") ?? null;
    // if(!refreshtoken){
    //   throw new Error("No refresh token. Please login again to get refresh token.")
    // }

    // accesstoken = await JSON.parse(localStorage.getItem("accessToken"))
    accesstoken = tokenStore.getState().tokenState.accessToken;
    config.headers.refreshtoken = refreshtoken;
    config.headers.accesstoken = `Bearer ${accesstoken}`;
    // config.data = // request body 를 의미함
    return config;
  },
  (error) => {
    console.log('axios interceptor request error >>>', error);
    return Promise.reject(error);
  }
)

/**
 * @description 
 * 1. (공통) 아예 로그인 안 한 유저인데 인가 요청 날린 유저 -> ECONNABORTED 
 * 2. (공통) 로그인 했는데 리프레쉬 토큰 날린 유저 -> error.config.message(컴포넌트에서 우선처리) || ECONNABORTED 
 * 3. (공통) 로그인 했는데 다른 userId의 인가요청을 한 유저 -> 페이지(컴포넌트에서 처리) 
 * 4. (선택) navigate 처리는 페이지마다 처리할 것.(페이지마다 비회원이 가능한 인가요청 범위가 다르기 때문.) 
 * ex) onError : () => navigate('/login')
 */
axiosToken.interceptors.response.use(
  async(response) => {
    console.log('axios interceptor response data depth check >>> ', response);
    if(response.status === 203){
      console.log('axios interceptor response data depth check >>> ', response);
      const {setToken} = tokenStore.getState()
      const acToken = await response.data.newAccessToken;
      // const newAccessToken = JSON.stringify(acToken);
      // localStorage.setItem("accessToken", newAccessToken);
      const decodedAcToken = await jwtDecode(acToken);
      console.log('받아온 access token >>>',acToken);
      const { userId, exp } = decodedAcToken;
      const AC_EXP = await exp*1000
      setToken(userId, acToken, AC_EXP)
      // localStorage.setItem('userId', JSON.stringify(userId));
      // accesstoken = await acToken;
      /**
       * @description should approach[attach] 'config' manually if you're retrying.
       */
      response.config.headers.accesstoken = `Bearer ${acToken}`;
      try{
        const retryResponse = await axios.request(response.config);
        return retryResponse;
      } catch(error){
        console.log('axios interceptor retry error >>>', error);
        return Promise.reject(error);
      }
    }
    return response;
  },
  (error) => {
    console.log('axios interceptor response error >>>', error);
    /**
     * @description 리프래쉬 토큰도 만료되고 [액세스 토큰도] 만료되는 경우의 로직을 짜야 함.
     */
    if(error.code === 'ECONNABORTED'){
      error.config.message = "로그인 후 이용해 주세요."
    }
    return Promise.reject(error);
  }
)


// Instance를 만들 때 설정의 default 값을 설정할 수 있다.
/* const instance = axios.create({
    baseURL: 'https://api.example.com'
  });

  // Instance를 만든 후  defalut 값을 수정할 수 있다.
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  instance.defaults.timeout = 2500; */

// axios 전역 설정
// axios.defaults.withCredentials = true;

export default axiosToken;