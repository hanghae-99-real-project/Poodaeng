/* eslint-disable no-alert */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';
import Headers from './Headers';

function Kakaoserch() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const { kakao } = window;

    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=239411147ef0f32c5e49b15677045e5c';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        initializeMap();
      });
    };

    function initializeMap() {
      const mapOption = {
        center: new kakao.maps.LatLng(37.5652352, 127.0284288),
      };

      const map = new kakao.maps.Map(mapContainer.current, mapOption);

      const points = [
        new kakao.maps.LatLng(37.5621152, 127.0271188),
        new kakao.maps.LatLng(37.5652252, 127.0282288),
        new kakao.maps.LatLng(37.5663352, 127.0293388),
      ];

      const bounds = new kakao.maps.LatLngBounds();

      let i;
      let marker;
      for (i = 0; i < points.length; i++) {
        marker = new kakao.maps.Marker({ position: points[i] });
        marker.setMap(map);
        bounds.extend(points[i]);
      }

      function setBounds() {
        map.setBounds(bounds);
        const center = map.getCenter();
        map.setLevel(3);
        map.setCenter(center);
      }

      setBounds();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = '<div style="padding:5px;">내 위치</div>';
          displayMarker(map, locPosition, message);
        });
      } else {
        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const message = 'geolocation을 사용할 수 없어요..';
        displayMarker(map, locPosition, message);
      }
    }

    function displayMarker(map, locPosition, message) {
      const imageSrc = 'Group 47.png';
      const imageSize = new kakao.maps.Size(16, 32);
      const imageOption = { offset: new kakao.maps.Point(7, 25) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      const marker = new kakao.maps.Marker({
        map,
        position: locPosition,
        image: markerImage,
      });

      const iwContent = message;
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
      map.setCenter(locPosition);
    }
  }, []);

  return (
    <div
      id='map2'
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default Kakaoserch;
