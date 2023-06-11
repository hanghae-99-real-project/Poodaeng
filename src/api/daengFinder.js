import axios from "axios";
import axiosToken from './axiosToken';

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
  const { postId } = inputs;
  const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}/bookmark`)
  // const response = await axiosToken.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/${postId}/bookmark`)
  return response
}

const getPostComment = async(postId) => {
  const response = await axiosToken.get(`/api/lostposts/${postId}/comments`)
  // const response = await axiosToken.get(`/api/posts/${postId}/comments`)
  return response
}

const getPostReply = async(inputs) => {
  /* 쿠키에 리프레쉬 토큰이 남아있으면 로그인 하러 이동할 때 바로 로그인 완료시켜야 할 듯.  */
  const {postId, commentId} = inputs;
  const response = await axiosToken.get(`/api/lostposts/${postId}/comments/${commentId}/childcomments`)
  // const response = await axiosToken.get(`/api/posts/${postId}/comments/${commentId}/childcomments`)
  return response
}

const writePostComment = async(inputs) => {
    const { postId, formData } = inputs;
    const { commentPhotoUrl } = formData;
    const contentType = commentPhotoUrl? 'multipart/form-data':'application/json'
    const config = {
      headers : {
        'content-type': contentType
      }
    }
    const response = await axiosToken.post(`/api/lostposts/${postId}/comments`, formData, config)
    // const response = await axiosToken.post(`/api/posts/${postId}/comments`, formData)
    // const response = await axiosToken.post(`/api/posts/${postId}/comments`, formData, config)
    return response
}

const writePostReply = async(inputs) => {
  const { postId, commentId, formData } = inputs;
  const response = await axiosToken.post(`/api/lostposts/${postId}/comments/${commentId}/childcomments`, formData)
  // const response = await axiosToken.post(`/api/posts/${postId}/comments/${commentId}/childcomments`, formData)
  return response
}

const editPostComment = async(inputs) => {
  const { postId, commentId, comment } = inputs;
  console.log('postId >>> ', postId)
  console.log('commentId >>> ', commentId)
  console.log('comment>>> ', comment)
  const response = await axiosToken.put(`/api/lostposts/${postId}/comments/${commentId}`, comment)
  return response
}

const deletePostComment = async(inputs) => {
  const {postId, commentId} = inputs;
  const response = await axiosToken.delete(`/api/lostposts/${postId}/comments/${commentId}`)
  return response
}

const deletePostReply = async(inputs) => {
  const {postId, commentId, childCommentId} =inputs;
  const response = await axiosToken.delete(`/api/lostposts/${postId}/comments/${commentId}/childcomments/${childCommentId}`)
  return response
}

export { writePostLost, getPostLost, searchPostLost, searchPostLostDetail, bookMarkLostPost, getPostComment, getPostReply, writePostComment, writePostReply, editPostComment, deletePostComment, deletePostReply };

