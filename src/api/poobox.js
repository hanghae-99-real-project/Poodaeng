/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import axiosToken from "./axiosToken";
// import axiosToken from "./axiosToken"

// 푸박스 등록
const addPooBox = async (data) => {
  // const refreshtoken = Cookies.get('refreshToken'); 
  // const accesstoken = JSON.parse(localStorage.getItem("accessToken"))

  // console.log('refreshtoken',refreshtoken)
  // console.log('accessToken',accessToken)

  const formData = new FormData();
  formData.append("pooPhotoUrl", data.pooPhotoUrl);
  formData.append("content", data.content);
  formData.append("pooLatitude", data.pooLongitude);
  formData.append("pooLongitude", data.pooLatitude);
  
  // 폼데이터 조회 코드
  // for (const [key, value] of formData.entries()) { console.log(`${key}:`, value); }
  
  const config = {
    headers: { 
      // "accesstoken": `Bearer ${accesstoken}`,
      // "refreshtoken": refreshtoken,
      "content-type" : "multipart/form-data"
    }
  };
  // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/map/poo`, formData, config);
  const response = await axiosToken.post('/api/map/poo', formData, config);
  console.log(response)
  return response;
};

// 푸박스 조회
const getPooBox = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/map/poo`)
    return response
  } catch (error) {
    return Promise.reject(error.data)
  }
};

// 푸박스 신고
const reportPooBox = async (data) => {
  const pooId = parseInt(data.pooId, 10);
  const {reportContent} = data;
  console.log(pooId)
  console.log(reportContent)
  const response = await axiosToken.put(`/api/report/${pooId}`, reportContent);
  console.log(response)
  return response
}

// 내 푸박스 조회
const getMyPooBox = async () => {
  try {
    const response = await axiosToken.get(`/api/auth/mypage/mypoo`)
    return response
  } catch (error) {
    return Promise.reject(error.data)
  }
};

export { addPooBox, getPooBox, reportPooBox, getMyPooBox };
