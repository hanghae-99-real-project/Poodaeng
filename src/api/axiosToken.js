import axios from "axios";
import Cookies from "js-cookie";

const rfToken = Cookies.get("refreshToken");

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});
// instance.defaults.headers.common.Authorization = rfToken
instance.defaults.headers = rfToken

// Instance를 만들 때 설정의 default 값을 설정할 수 있다.
/* const instance = axios.create({
    baseURL: 'https://api.example.com'
  });

  // Instance를 만든 후  defalut 값을 수정할 수 있다.
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  instance.defaults.timeout = 2500; */

// axios 전역 설정
// axios.defaults.withCredentials = true;

export default instance;