/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useRef } from 'react';
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

  console.log('data >>>', data);

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
    const pointsMarkerImageOption = { offset: new kakao.maps.Point(7, 25) };

    const pointsMarkerImage = new kakao.maps.MarkerImage(
      pointsMarkerImageSrc,
      pointsMarkerImageSize,
      pointsMarkerImageOption,
    );

    // 지도에 표시할 마커의 좌표 배열
    const points = data?.data?.getPooAll.map(
      item => new kakao.maps.LatLng(item.pooLatitude, item.pooLongitude),
    );

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

      // 주소, 콘텐츠, pooId를 마커 객체에 추가
      marker.address = data.data.getPooAll[i].address;
      marker.content = data.data.getPooAll[i].content;
      marker.pooId = data.data.getPooAll[i].pooId;
      marker.UserId = data.data.getPooAll[i].UserId;
      marker.imageUrl = data.data.getPooAll[i].imageUrl;
      marker.createdAt = data.data.getPooAll[i].createdAt;

      // 각 마커에 클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(
        marker,
        'click',
        (function (currMarker) {
          return function () {
            const iwContent = `
        <div style="padding:10px; width: 270px; height: 200px; display: flex; flex-direction: column; gap: 10px; border:1px solid black; border-radius: 10px; ">
          <div>
            <div style="display: flex; justify-content: center; justify-content: space-between;">
              <div style="display: flex; gap: 5px;">
                <div style="font-size: 20px; font-weight: bold;">푸박스 정보</div>
              </div>
              <div style="display: flex;">
                <div onClick="window.closeInfoWindow()" style="cursor: pointer;"> X </div>
              </div>
            </div>
          </div>
          <div style="display: flex;">
            <img src="" alt="img" style="width: 94px; height: 94px; border: 1px solid gray;">
            <div style="flex-direction: column;">
              <div style="margin: 10px;">
                <div style="font-weight: bold; font-size: 12px;">주소</div>
                <div style="font-size:10px">${currMarker.address}</div>
              </div>
              <div style="margin: 10px;">
                <div style="font-weight: bold; font-size: 12px;">특이사항</div>
                <div style="font-size:10px">${currMarker.content}</div>
              </div>
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: gray; color: white; font-weight: bold;" onclick="window.pooDetailHandler('${currMarker.pooId}', '${currMarker.UserId}', '${currMarker.address}', '${currMarker.content}', '${currMarker.imageUrl}', '${currMarker.createdAt}')">상세 보기</div>
            <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: #8722ED; color: white; font-weight: bold;">길 찾기</div>
          </div>
        </div>`;
            infowindow.setContent(iwContent);
            infowindow.open(map, currMarker);
          };
        })(marker),
      );
    }
    // 지도 영역을 설정한 경계에 맞춤
    function setBounds() {
      map.setBounds(bounds);
      const center = map.getCenter();
      map.setLevel(3);
      map.setCenter(center);
    }
    // 인포 윈도우 닫기
    function closeInfoWindow() {
      infowindow.close();
    }

    // 상세보기 이동 핸들러
    function pooDetailHandler(
      pooId,
      address,
      content,
      imageUrl,
      createdAt,
      UserId,
    ) {
      closeInfoWindow();
      window.location.href = `/map/${pooId}
      ?address=${encodeURIComponent(address)}
      &content=${encodeURIComponent(content)}
      &imageUrl=${encodeURIComponent(imageUrl)}
      &pooId=${encodeURIComponent(pooId)}
      &UserId=${encodeURIComponent(UserId)}
      &createdAt=${encodeURIComponent(createdAt)}`;
    }

    // closeInfoWindow 함수를 전역 범위로 결합시키기 위해 window 객체에 연결
    window.closeInfoWindow = closeInfoWindow;
    window.pooDetailHandler = pooDetailHandler;

    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    const iwContent = `
      <div style="padding:10px; width: 270px; height: 200px; display: flex; flex-direction: column; gap: 10px; border:1px solid black; border-radius: 10px; ">
      <div>
        <div style="display: flex; justify-content: center; justify-content: space-between;">
          <div style="display: flex; gap: 5px;">
            <div style="font-size: 20px; font-weight: bold;">푸박스 정보</div>
          </div>
            <div style="display: flex;">
              <div onClick=window.closeInfoWindow() style="cursor: pointer;"> X </div>
            </div>
          </div>
        </div>
      <div style="display: flex;">
          <img src="" alt="img" style="width: 94px; height: 94px; border: 1px solid gray;">
          <div style="flex-direction: column;">
        <div style="margin: 10px;">
          <div style="font-weight: bold; font-size: 12px;">주소</div>
          <div style="font-size:10px">${marker.address}</div>
        </div>
        <div style="margin: 10px;">
          <div style="font-weight: bold; font-size: 12px;">특이사항</div>
          <div style="font-size:10px">${marker.content}</div>
        </div>
      </div>
      </div>
      <div style="display:flex; gap:10px;">
      <div style="display:flex; gap:10px;">
            <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: gray; color: white; font-weight: bold;" onclick="window.pooDetailHandler('${marker.pooId}', '${marker.UserId}', '${marker.address}', '${marker.content}', '${marker.imageUrl}', '${marker.createdAt}')">상세 보기</div>
        <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: #8722ED; color: white; font-weight: bold;">길 찾기</div>
      </div>
    </div>`;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });

    setBounds();

    // 브라우저의 위치 정보 사용 가능한 경우 마커와 정보창 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding-left: 3rem ">내 위치</div>';
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
    const iwRemoveable = false;

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
