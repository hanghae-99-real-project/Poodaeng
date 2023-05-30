import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useCurrentLocation from '../hooks/useCurrentLocation';

function KakaoMap() {
  const { kakao } = window;
  const [message, setMessage] = useState(false);
  const geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1 /* === 1 minute */,
    maximumAge: 1000 * 3600 * 24 /* === 24 hour */,
  };
  // const { latitude = 33.450701, longitude = 126.570667 } = useCurrentLocation(geoLocationOptions);
  const { location, error } = useCurrentLocation(geoLocationOptions);
  console.log('location >>> ', location);
  console.log('error >>> ', error);
  // const [getCurrentLocation] = useCurrentLocation(geoLocationOptions);
  // const { location, error } = getCurrentLocation();
  // console.log(location, error);
  useEffect(() => {
    if (error) {
      setMessage(true);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
      console.log(error);
      return;
    }
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
      // center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
      level: 3,
    };
    // eslint-disable-next-line no-unused-vars
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

    // var positions = [
    //   {
    //     title: '카카오',
    //     lating: new
    //   },
    // ]
    // return () => {
    //   second;
    // };
  }, []);

  return (
    <>
      {message && <ToastContainer />}
      <div id='map' className='w-[500px] h-[500px]' />
    </>
  );
}

export default KakaoMap;
