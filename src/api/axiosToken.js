/* eslint-disable no-param-reassign */
import axios from "axios";
import Cookies from "js-cookie";


let refreshtoken; 
// const accesstoken = JSON.parse(localStorage.getItem("accessToken"))
let accesstoken; 

const axiosToken = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    // baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    // timeout: 10000,
    // timeoutErrorMessage: "Request Timeout",
});
// instance.defaults.headers.common.Authorization = rfToken
// instance.defaults.headers = rfToken


axiosToken.interceptors.request.use(
  async(config) => {
    console.log('보낼 때 config headers >>> ', config.headers)
    refreshtoken = Cookies.get("refreshToken");
    accesstoken = await JSON.parse(localStorage.getItem("accessToken"))
    config.headers.refreshtoken = refreshtoken;
    config.headers.accesstoken = `Bearer ${accesstoken}`;
    // config.data = // request body 를 의미함

    // if(config.headers.postId){
    //   config.headers.postId = 
    // }
    return config;
  },
  (error) => {
    // do something with request error before error reporting
    console.log('axios interceptor request error >>>', error);
    return Promise.reject(error);
    // await Promise.reject(error);
    // throw Error(error);
    // throw error;
  }
)

axiosToken.interceptors.response.use(
  async(response) => {
    console.log('status 203 아닌데 resolve인 경우 >>>',response)
    if(response.status === 203){
      console.log('axios interceptor response data depth check >>> ', response);
      const acToken = await response.data.newAccessToken;
      const newAccessToken = JSON.stringify(acToken);
      localStorage.setItem("accessToken", newAccessToken);
      accesstoken = await acToken;
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
    return Promise.reject(error);
    //  Promise.reject(error);
    // throw Error(error);
    // throw error;
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