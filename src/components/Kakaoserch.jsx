/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabbar from './Tabbar';
import Headers from './Headers';

function Kakaoserch() {
  const navigate = useNavigate();

  const HomeNavigateHandler = () => {
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
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
  }, []);

  function initializeMap() {
    const mapContainer = document.getElementById('map2');

    if (mapContainer) {
      const mapOption = {
        center: new kakao.maps.LatLng(37.5652352, 127.0284288), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다
      const points = [
        new kakao.maps.LatLng(37.5621152, 127.0271188),
        new kakao.maps.LatLng(37.5652252, 127.0282288),
        new kakao.maps.LatLng(37.5663352, 127.0293388),
      ];

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      const bounds = new kakao.maps.LatLngBounds();

      let i;
      let marker;
      for (i = 0; i < points.length; i++) {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
        marker = new kakao.maps.Marker({ position: points[i] });
        marker.setMap(map);

        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(points[i]);
      }

      function setBounds() {
        // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
        // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
        map.setBounds(bounds);
      }

      setBounds();
    } else {
      console.error('데이터를 찾지 못했습니다.');
      // 'map' 요소를 찾지 못했을 때의 처리
      // ...
    }
  }

  return (
    <>
      <Headers text icon destination=''>
        푸박스 찾기
      </Headers>
      <div id='map2' style={{ width: '100%', height: '100%' }} />
      <Tabbar />
    </>
  );
}

export default Kakaoserch;
