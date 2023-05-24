/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

export function KakaoMyPoint() {
  useEffect(() => {
    let map;

    const displayMarker = (map, locPosition, message) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: locPosition,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
      map.setCenter(locPosition);
      map.relayout();
    };

    const initializeMap = () => {
      const { kakao } = window;
      const mapContainer = document.getElementById('map');
      mapContainer.style.width = '330px';
      mapContainer.style.height = '155px';

      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        draggable: false,
        level: 3,
      };

      map = new kakao.maps.Map(mapContainer, mapOption);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const arr = { lat, lon };
          const locPosition = new kakao.maps.LatLng(arr.lat, arr.lon);
          const message = '<div style="padding:5px;">내 위치</div>';
          displayMarker(map, locPosition, message);
        });
      } else {
        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const message = 'geolocation을 사용할 수 없어요..';
        displayMarker(map, locPosition, message);
      }
    };

    window.onload = initializeMap;
  }, []);

  return <div id='map' className='w-[330px] h-[155px] .svg:w-[150px]' />;
}
