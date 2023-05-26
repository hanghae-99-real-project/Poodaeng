/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';

function KakaoMyPoint() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const { kakao } = window;
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer.current, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
        displayMarker(map, locPosition, message);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = 'geolocation을 사용할수 없어요..';
      displayMarker(map, locPosition, message);
    }
  }, []);

  const displayMarker = (map, locPosition, message) => {
    const marker = new kakao.maps.Marker({
      map,
      position: locPosition,
    });

    const iwContent = message;
    const iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
  };

  return (
    <div
      id='map'
      ref={mapContainer}
      style={{ width: '100%', height: '200px' }}
    />
  );
}

export default KakaoMyPoint;
