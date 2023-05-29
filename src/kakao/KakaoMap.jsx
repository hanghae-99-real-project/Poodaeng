import React, { useEffect } from 'react';

const { kakao } = window;

function KakaoMap() {
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
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

  return <div id='map' className='w-[500px] h-[500px]' />;
}

export default KakaoMap;
