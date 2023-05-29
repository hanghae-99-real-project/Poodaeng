/* geoLocation success error handler hook */
const loc = document.getElementById("myLocation");

function showYourLocation(position) {
  loc.innerHTML = `현재 사용자는 위도 ${position.coords.latitude}, 경도 ${position.coords.longitude}에 위치하고 있습니다.`;
}

function showKakaoMapErrorMsg(error){
  switch (error.code) {
    case error.PERMISSION_DENIED:
      // location.innerHTML = '사용자가 Geolocation API 사용 요청을 거부하였습니다.'
      loc.innerHTML = '사용자가 Geolocation API 사용 요청을 거부하였습니다.'
      break;
      case error.POSITION_UNAVAILABLE:
      loc.innerHTML = "이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!"
      break;
      case error.TIMEOUT:
      loc.innerHTML = "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
      break;
      case error.UNKNOWN_ERROR:
      loc.innerHTML = "이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!"
      break;
      default:
      break;
  }
}

function findLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showYourLocation, showKakaoMapErrorMsg);
  } else { 
    loc.innerHTML = "이 문장은 사용자의 웹 브라우저가 Geolocation API를 지원하지 않을 때 나타납니다!";
  }
}


export {showYourLocation, showKakaoMapErrorMsg, findLocation}