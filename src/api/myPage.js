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

const newPutImage = async (data) => {

  const formData = new FormData();
  formData.append("userPhoto", data.pooPhotoUrl);
  
  // 폼데이터 조회 코드
  // for (const [key, value] of formData.entries()) { console.log(`${key}:`, value); }
  
  const config = {
    headers: { 
      "content-type" : "multipart/form-data"
    }
  };
  const response = await axiosToken.put('/api/auth/image', formData, config);
  console.log(response)
  return response;
};

const newPutNickname = async (data) => {
  const response = await axiosToken.put('/api/auth/nickname', data);
  console.log(response)
  return response;
};

const newPutPassword = async (data) => {
  const response = await axiosToken.put('/api/auth/pass', data);
  console.log(response)
  return response;
};

export { getMyPost, getMyBookMark, getMypageCount, newPutImage, newPutNickname, newPutPassword }