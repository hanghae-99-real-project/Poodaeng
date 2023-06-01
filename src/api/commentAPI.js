import axios from "axios";
import Cookies from "js-cookie";

const getComment = async (inputs) => {
  const {postId} = inputs;
  const {accessToken} = inputs;
  const rfToken = Cookies.get("refreshToken");
  const config = {
    headers: {
      "accesstoken": `Bearer ${accessToken}`,
      "refreshtoken": rfToken,
    } 
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}`, config);
    return response
  } catch (error) {
    console.log("getComment error >>>", error);
    throw error;
  }
}


const getReply = async (inputs) => {
  const {postId, commentId, accessToken} = inputs;
  const rfToken = Cookies.get("refreshToken");
  const config = {
    headers: {
          "accesstoken": `Bearer ${accessToken}`,
          "refreshtoken": rfToken,
        }
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/lostposts/${postId}/comments/${commentId}/childcomments`, config);
    return response;
  } catch (error) {
    console.log("getReply error >>>",error);
    throw error;
  }
}


export {getComment, getReply};



// axios({
//   method: 'get',
//   url: 'http://54.180.95.53:8000/card',
//   params: {
//     "cardId":cardId
//   }
// }, { withCredentials : true })
//   .then((Response)=>{
//     console.log(Response.data);
// }).catch((Error)=>{
//     console.log(Error);
// })
// }