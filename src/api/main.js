import axiosToken from "./axiosToken";

// 댕파인더 메인화면 조회
// const getDaengMain = async () => {
//   try {
//     const response = await axiosToken.get(`/api/main/lostposts`)
//     return response
//   } catch (error) {
//     return Promise.reject(error.data)
//   }
// };

const getDaengMain = async () => {
    const response = await axiosToken.get('/api/main/lostposts')
    return response
};

const getAlert = async () => {
    const response = await axiosToken.get('/api/notifications')
    return response
};

const putAlert = async (id) => {
    const response = await axiosToken.put(`/api/notifications/${id}`)
    return response
};


export { getDaengMain, getAlert, putAlert }
