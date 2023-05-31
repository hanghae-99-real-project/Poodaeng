/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import Cookies from "js-cookie";

// 게시글 작성
const addPooBox = async (data) => {
  const refreshtoken = Cookies.get('refreshToken'); 
  const { accessToken } = data;

  const formData = new FormData();
  formData.append("pooPhotoUrl", data.pooPhotoUrl);
  formData.append("content", data.content);
  formData.append("pooLatitude", data.pooLongitude);
  formData.append("pooLongitude", data.pooLatitude);
  
  // 폼데이터 조회 코드3
  for (const [key, value] of formData.entries()) { console.log(`${key}:`, value); }
  
  const config = {
    headers: { 
      "accesstoken": `Bearer ${accessToken}`,
      "refreshtoken": refreshtoken,
      "content-type" : "multipart/form-data"
    }
  };
  console.log(config);
  console.log('refreshtoken', config.headers.refreshtoken)
  console.log('accesstoken', config.headers.accesstoken)
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/map/poo`, formData, config);
  console.log('api response',response);
  return response;
};

export default addPooBox;