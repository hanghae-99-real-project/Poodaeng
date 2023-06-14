import axiosToken from "./axiosToken";

// 댕파인더 메인화면 조회
const getDaengMain = async () => {
  try {
    const response = await axiosToken.get(`/api/main/lostposts`)
    return response
  } catch (error) {
    return Promise.reject(error.data)
  }
};

export default getDaengMain
