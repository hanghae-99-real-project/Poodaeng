/* eslint-disable no-undef */
import axios from "axios";
// import Cookies from "js-cookie";
import axiosToken from './axiosToken';

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



// const writePostLost = async(inputs) => {
//   const refreshtoken = Cookies.get('refreshToken'); 
//   const {accessToken} = inputs;
//   const {formData} = inputs;
//   const config = {
//     headers: {
//       // Authorization: `Bearer ${accessToken}`,
//       // 'content-type': 'multipart/form-data'
//       // // 'content-type': 'application/json'
//       accesstoken : `Bearer ${accessToken}`,
//       refreshtoken,
//       'content-type': 'multipart/form-data'
//       // 'content-type': 'application/json'
//     }
//   }
//   const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/lostposts`,formData,config)
//   return response
// }

// const getPostLost = async() => {
//   const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts`)
//   return response
// }

// const searchPostLost = async(inputs) => {
//   const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/search/lostPosts`,inputs)
//   return response
// }

// const searchPostLostDetail = async(id) => {
//   console.log('api postid >>>', id)
//   const postId = parseInt(id, 10);
//   const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}`)
//   return response
// } 

// const bookMarkLostPost = async(inputs) => {
//   // const { accessToken, refreshToken, postId} = inputs;
//   const { postId } = inputs;
//   // const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/bookmark`, {}, config)
//   const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/${postId}/bookmark`, {}, config)
//   return response
// }

const writePostLost = async(inputs) => {
  const {formData} = inputs;
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
      // 'content-type': 'application/json'
    }
  }
  const response = await axiosToken.post('/api/lostposts',formData,config)
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
  const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}/bookmark`)
  // const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/${postId}/bookmark`)
  return response
}

const getPostComment = async(postId) => {
  // const response = await axiosToken.get(`/api/posts/${postId}/comments`)
  const response = await axiosToken.get(`/api/lostposts/${postId}/comments`)
  return response
}

const getPostReply = async(inputs) => {
  /* 쿠키에 리프레쉬 토큰이 남아있으면 로그인 하러 이동할 때 바로 로그인 완료시켜야 할 듯.  */
  const {postId, commentId} = inputs;
  // const response = await axiosToken.get(`/api/posts/${postId}/comments/${commentId}/childcomments`)
  const response = await axiosToken.get(`/api/lostposts/${postId}/comments/${commentId}/childcomments`)
  return response
}

const writePostComment = async(inputs) => {
    // const {postId, formData} = inputs;
    // const refreshtoken = Cookies.get('refreshToken');   
    // const accesstoken = JSON.parse(localStorage.getItem('accessToken'));
    // const config = {
    //   headers: {
    //     refreshtoken,
    //     accesstoken :`Bearer ${accesstoken}`,
    //   }
    // }
    // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/${postId}/comments`,formData,config)
    // return response
    const { postId, formData } = inputs;
    // const response = await axiosToken.post(`/api/posts/${postId}/comments`, formData)
    // const response = await axiosToken.post(`/api/posts/${postId}/comments`, formData, config)
    const response = await axiosToken.post(`/api/lostposts/${postId}/comments`, formData)
    return response
}

const writePostReply = async(inputs) => {
  const { postId, commentId, formData } = inputs;
  // const response = await axiosToken.post(`/api/posts/${postId}/comments/${commentId}/childcomments`, formData)
  const response = await axiosToken.post(`/api/lostposts/${postId}/comments/${commentId}/childcomments`, formData)
  return response
}


export { writePostLost, getPostLost, searchPostLost, searchPostLostDetail, bookMarkLostPost, getPostComment, getPostReply, writePostComment, writePostReply };

