import axiosToken from "./axiosToken"

const getMyPost = async() => {
  const response = await axiosToken.get('/api/auth/mypage/mypost');
  return response
}

const getMyBookMark = async() => {
  const response = await axiosToken.get('/api/auth/mypage/bookmark');
  return response
}

export {getMyPost, getMyBookMark}