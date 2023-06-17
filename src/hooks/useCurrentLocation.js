// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'

function useCurrentLocation(options = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1 /* === 1 minute */,
  maximumAge: 1000 * 3600 * 24 /* === 24 hours */,
}){
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  const handleSuccess = (props) => {
    const {latitude, longitude} = props.coords;
    // console.log(latitude, longitude)

    setLocation({
      latitude,
      longitude
    })
  }

  const showKakaoMapErrorMsg = (er) => {
    switch (er.code) {
      case er.PERMISSION_DENIED:
        // location.innerHTML = '사용자가 Geolocation API 사용 요청을 거부하였습니다.'
        return '사용자가 Geolocation API 사용 요청을 거부하였습니다.'
        case er.POSITION_UNAVAILABLE:
        return "가져온 위치 정보를 사용할 수 없습니다!"
        case er.TIMEOUT:
        return"이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
        case er.UNKNOWN_ERROR:
        return "이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!"
        default:
        return undefined;
    }
  }

  const handleError = (err) => {
    const errorResult = showKakaoMapErrorMsg(err)
    // setError(err.message)
    setError(errorResult)
  }
  
  const getCurrentLocation = () => {
    const { geolocation } = navigator;
    if(!geolocation) {
      setError("GeoLocation is not supported.")
      return;
    }
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
    // eslint-disable-next-line consistent-return
    // return {location, error}
    // getCurrentLocation()
    
    // eslint-disable-next-line consistent-return
    // return {location, error}
  }
  

  // useEffect( () => {
  //   const { geolocation } = navigator;
  //   if(!geolocation) {
  //     setError("GeoLocation is not supported.")
  //     return;
  //   }
  //   geolocation.getCurrentPosition(handleSuccess, handleError, options);

  // }, [options]);  


  // return [getCurrentLocation]
  // getCurrentLocation()
  useEffect(() => {
    getCurrentLocation()
  },[])
  return {location, error}
}

export default useCurrentLocation