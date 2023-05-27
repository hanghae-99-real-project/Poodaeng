// /* eslint-disable import/prefer-default-export */
import axios from "axios";
import Cookies from "js-cookie";

// 게시글 작성
const addPooBox = async (formData) => {
  const token = Cookies.get('token')
  console.log('현재토큰',token);
  const config = { headers: {'Content-Type': 'multipart/form-data',  Authorization: `Bearer ${token}` }}
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/map/poo`, formData, config);
  // for (const [key, value] of formData.entries()) { console.log(`${key}:`, value); }
  return response;
};

export default addPooBox;