/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";
import axiosToken from './axiosToken';

/* access 토큰만 보내는 것도 있고, rf도 같이 보내는 것도 있어서 instance화를 못 시키네; */

const writePostLost = async(inputs) => {
  const refreshtoken = Cookies.get('refreshToken'); 
  const {accessToken} = inputs;
  const {formData} = inputs;
  const config = {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      // 'content-type': 'multipart/form-data'
      // // 'content-type': 'application/json'
      accesstoken : `Bearer ${accessToken}`,
      refreshtoken,
      'content-type': 'multipart/form-data'
      // 'content-type': 'application/json'
    }
  }
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/lostposts`,formData,config)
  return response
}

const getPostLost = async() => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts`)
  return response
}

const searchPostLost = async(inputs) => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/search/lostPosts`,inputs)
  return response
}

const searchPostLostDetail = async(id) => {
  console.log('api postid >>>', id)
  const postId = parseInt(id, 10);
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}`)
  return response
} 

const bookMarkLostPost = async(inputs) => {
  // const { accessToken, refreshToken, postId} = inputs;
  const { postId } = inputs;
  const config = {
    headers: {
      postId,
    }
  }

  // const config = {
  //   headers: {
  //     refreshtoken: refreshToken,
  //     accesstoken: `Bearer ${accessToken}`,
  //   }
  // }
  // const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/bookmark`, {}, config)
  const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/${postId}/bookmark`, {}, config)
  return response
}
// const bookMarkLostPost = async(inputs) => {
//   const { accessToken, refreshToken, postId} = inputs;
//   const config = {
//     headers: {
//       refreshtoken: refreshToken,
//       accesstoken: `Bearer ${accessToken}`,
//     }
//   }
//   // const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/bookmark`, {}, config)
//   const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/${postId}/bookmark`, {}, config)
//   return response
// }

export { writePostLost, getPostLost, searchPostLost, searchPostLostDetail, bookMarkLostPost };

