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
  // 이미지 데이터를 직접 Blob 객체로 변환
  const imageBlob = new Blob([data], { type: "image/jpeg" });
  console.log('imageBlob:', imageBlob);

  // Blob 객체를 파일로 저장
  const file = new File([imageBlob], "image.jpg", { type: "image/jpeg" });
  console.log('file:', file);

  const formData = new FormData();
  formData.append("userPhoto", file);

  const config = {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  };

  const response = await axiosToken.put('/api/auth/image', formData, config);
  console.log(response);
  return response;
};


const newPutNickname = async (data) => {
  const config = {nickname: data}
  const response = await axiosToken.put('/api/auth/nickname', config);
  console.log(response)
  return response;
};

const newPutPassword = async (data) => {
  const response = await axiosToken.put('/api/auth/pass', data);
  console.log(response)
  return response;
};

export { getMyPost, getMyBookMark, getMypageCount, newPutImage, newPutNickname, newPutPassword }