/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

// 게시글 작성
const addPooBox = async (data) => {
  const {formData, accessToken} = data;
  const config = {    
    headers: { 
       authorization: `Bearer ${accessToken}`
    }
 };
  console.log('api',formData);
  for (const [key, value] of formData.entries()) { console.log(`${key}:`, value); }
  console.log('api',config);
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/map/poo`, formData, config);
  console.log('data',data);
  console.log('response', response);
  return response;
};

export default addPooBox;