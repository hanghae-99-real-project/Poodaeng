import axiosToken from "./axiosToken"

const getMyPost = async() => {
  const response = await axiosToken.get('/api/auth/mypage/mypost');
  return response
}

const getMyBookMark = async() => {
  const response = await axiosToken.get('/api/auth/mypage/bookmark');
  return response
}

const getMypageCount = async() => {
  const response = await axiosToken.get('/api/auth/mypage');
  return response
}
export {getMyPost, getMyBookMark ,getMypageCount}