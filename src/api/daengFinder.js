/* eslint-disable no-undef */
import axios from "axios"

/* access 토큰만 보내는 것도 있고, rf도 같이 보내는 것도 있어서 instance화를 못 시키네; */

const writePostLost = async(inputs) => {
  const {accessToken} = inputs;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      /**
       * @checkPoint 이미지도 json으로 되어 있던데 그러면 multipart 빼야 하나? 
       */
      "Content-Type": "multipart/form-data"
    }
  }
  const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/lostposts`,inputs.formData,config)
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

export { writePostLost, getPostLost, searchPostLost };