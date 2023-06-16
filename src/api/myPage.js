/* eslint-disable no-return-assign */
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
  console.log('api imgdata>>>>>>>>>>>>',data)
  console.log('api length>>>>>',data.length)
  // const imageBlob = new Blob([data], { type: "image/jpeg" });
  // console.log('imageBlob:', imageBlob);
  // Blob 객체를 파일로 저장
  // const file = new File([imageBlob], "image.jpg", { type: "image/jpeg" });
  // console.log('file:', file);

  // const formData = new FormData();
  // formData.append("userPhoto", file);
  
    const putData = {imageIndex: data.index, userPhoto: data.userPhoto}
  
  

  const config = {
    headers: { 
      "Content-Type": "multipart/form-data"
    }
  };

  const response = await axiosToken.put(`/api/auth/image/${data.index}`, putData, config);
  console.log('이미지 수정 요청>>>>>>>>',response);
  return response;
};


const newPutNickname = async (data) => {
  const config = {nickname: data}
  const response = await axiosToken.put('/api/auth/nickname', config);
  console.log(response)
  return response;
};

const newPutPassword = async (data) => {
  const config = {password: data}
  const response = await axiosToken.put('/api/auth/pass', config);
  console.log(response)
  return response;
};

export { getMyPost, getMyBookMark, getMypageCount, newPutImage, newPutNickname, newPutPassword }