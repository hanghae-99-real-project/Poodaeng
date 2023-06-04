import axios from "axios";
/**
 * local rest API 사용해서 클라이언트 측에서 좌표 변환하도록 해줌.
 * @param {Number} longitude 
 * @param {Number} latitude 
 */

const convertCoordinates = async (latitude, longitude) => {
  try {
    const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;
    /**
     * @param {Object} Rest_API_KEY 사용
    */
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    // const adrs = response.data.documents[0]?.address?.address_name;
    // setAddress(adrs);
    // console.log('KakaoApi.js 주소 >>>', adrs);
    return response;
  } catch (err) {
    console.error('주소 변환 에러:', err);
    // throw err;
    throw new Error(err);
  }

  // .then(response => {
  //   const adrs = response.data.documents[0]?.address?.address_name;
  //   setAddress(adrs);
  //   console.log('주소:', adrs);
  // })
  // .catch(err => {
  //   console.error('주소 변환 에러:', err);
  // });
};

export default convertCoordinates