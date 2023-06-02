/* eslint-disable no-alert */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { getPooBox } from '../api/poobox';

function Kakaoserch() {
  const mapContainer = useRef(null);
  const { isLoading, isError, data } = useQuery('poobox', getPooBox);

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  // useEffect(() => {
  const { kakao } = window;
  // 카카오 맵 API를 로드하는 스크립트를 동적으로 추가
  const script = document.createElement('script');
  script.src = process.env.REACT_APP_KAKAO_KEY;
  script.async = true;
  document.head.appendChild(script);

  // 스크립트 로드된 이후 지도 초기화
  script.onload = () => {
    kakao.maps.load(() => {
      initializeMap();
    });
  };

  // 지도를 초기화하는 함수
  function initializeMap() {
    // 지도 옵션 설정 (중심 좌표)
    const mapOption = {
      center: new kakao.maps.LatLng(37.5652352, 127.0284288),
    };

    // 지도 객체 생성 후 컨테이너에 지도 표시
    const map = new kakao.maps.Map(mapContainer.current, mapOption);

    const pointsMarkerImageSrc = './images/points.png';
    const pointsMarkerImageSize = new kakao.maps.Size(20, 32);
    const pointsMarkerImageOption = { offset: new kakao.maps.Point(0, 0) };

    const pointsMarkerImage = new kakao.maps.MarkerImage(
      pointsMarkerImageSrc,
      pointsMarkerImageSize,
      pointsMarkerImageOption,
    );

    // 지도에 표시할 마커의 좌표 배열
    const points = data.data.map(item => {
      return new kakao.maps.LatLng(item.pooLatitude, item.pooLongitude);
    });

    // 지도 영역 설정을 위한 경계 객체 생성
    const bounds = new kakao.maps.LatLngBounds();

    // 마커를 지도에 표시하고 경계 객체에 추가
    let i;
    let marker;
    for (i = 0; i < points.length; i++) {
      marker = new kakao.maps.Marker({
        position: points[i],
        image: pointsMarkerImage,
      });
      marker.setMap(map);
      bounds.extend(points[i]);
    }

    // 지도 영역을 설정한 경계에 맞춤
    function setBounds() {
      map.setBounds(bounds);
      const center = map.getCenter();
      map.setLevel(3);
      map.setCenter(center);
    }

    setBounds();

    // 브라우저의 위치 정보 사용 가능한 경우 마커와 정보창 표시
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

  // 마커와 정보창을 표시하는 함수
  function displayMarker(map, locPosition, message) {
    // 마커 이미지 설정
    const imageSrc = './images/Group 47.png';
    const imageSize = new kakao.maps.Size(16, 32);
    const imageOption = { offset: new kakao.maps.Point(7, 25) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    );

    // 위치에 마커 객체 생성
    const marker = new kakao.maps.Marker({
      map,
      position: locPosition,
      image: markerImage,
    });

    // 정보창 내용 및 옵션 설정
    const iwContent = message;
    const iwRemoveable = true;

    // 정보창 객체 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 정보창을 지도에 연결 (마커와 함께 표시)
    infowindow.open(map, marker);
    map.setCenter(locPosition);
  }
  // }, []);

  // 지도가 표시될 컨테이너 반환
  return (
    <div
      id='map2'
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default Kakaoserch;
