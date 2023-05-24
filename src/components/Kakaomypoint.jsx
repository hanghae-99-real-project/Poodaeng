/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

const { kakao } = window;

export function KakaoMyPoint() {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    mapContainer.style.width = '330px';
    mapContainer.style.height = '155px';

    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const arr = { lat, lon };
        const locPosition = new kakao.maps.LatLng(arr.lat, arr.lon);
        const message = '<div style="padding:5px;">내 위치</div>';
        displayMarker(locPosition, message);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = 'geolocation을 사용할수 없어요..';
      displayMarker(locPosition, message);
    }

    function displayMarker(locPosition, message) {
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
      map.relayout();
    }
  }, []);

  return <div id='map' className='w-[330px] h-[155px] .svg:w-[150px]' />;
}
