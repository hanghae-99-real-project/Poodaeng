/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPooBox } from '../api/poobox';
import { ReactComponent as MyGeo } from '../assets/images/MyGeo.svg';
import Loading from './common/Loading';

function Kakaoserch() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const location = useLocation();
  const isMapPage = location.pathname === '/map';

  const { isLoading, isError, data } = useQuery('poobox', getPooBox);
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  // console.log('map>>>>>>>>>', data);

  // 카카오 맵 API를 로드하는 스크립트를 동적으로 추가
  // useEffect(() => {
  const script = document.createElement('script');
  script.src = process.env.REACT_APP_KAKAO_KEY;
  script.async = true;
  script.onload = () => {
    const { kakao } = window;
    if (mapContainer.current !== null) {
      kakao.maps.load(() => {
        initializeMap();
      });
    }
  };

  document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  // 지도를 초기화하는 함수
  function initializeMap() {
    // 지도 옵션 설정 (중심 좌표)
    const mapOption = {
      center: new kakao.maps.LatLng(37.5652352, 127.0284288),
    };
    if (mapContainer.current === null) {
      window.location.reload();
    }
    // 지도 객체 생성 후 컨테이너에 지도 표시
    const map = new kakao.maps.Map(mapContainer.current, mapOption);
    const pointsMarkerImageSrc = './images/points.png';
    const pointsMarkerImageSize = new kakao.maps.Size(22, 32);
    const pointsMarkerImageOption = { offset: new kakao.maps.Point(7, 25) };
    const pointsMarkerImage = new kakao.maps.MarkerImage(
      pointsMarkerImageSrc,
      pointsMarkerImageSize,
      pointsMarkerImageOption,
    );
    // 지도 영역 설정을 위한 경계 객체 생성
    const bounds = new kakao.maps.LatLngBounds();

    // 지도에 표시할 마커의 좌표 배열
    const points = data?.data?.getPooAll?.map(
      item => new kakao.maps.LatLng(item.pooLatitude, item.pooLongitude),
    ) || [new kakao.maps.LatLng(37.5652352, 127.0284288)];

    // 마커를 지도에 표시하고 경계 객체에 추가
    let i;
    let marker;
    const infowindow = new kakao.maps.InfoWindow(); // infowindow 변수 선언 및 초기화
    for (i = 0; i < points?.length; i++) {
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
      marker.imageUrl = data.data.getPooAll[i].pooPhotoUrl;
      marker.createdAt = data.data.getPooAll[i].createdAt;
      marker.pooLatitude = data.data.getPooAll[i].pooLatitude;
      marker.pooLongitude = data.data.getPooAll[i].pooLongitude;

      // 각 마커에 클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(
        marker,
        'click',
        (function (currMarker) {
          return function () {
            const iwContent = `<div style="padding:15px 24px 15px 24px; width: 300px; height: 210px; display: flex; flex-direction: column; gap: 10px; border-radius: 10px; ">
            <div>
              <div style="display: flex; justify-content: center; justify-content: space-between;">
                <div style="display: flex; gap: 5px; bord">
                  <div style="font-size: 15px; font-weight: bold;">푸박스 정보</div>
                </div>
                <div style="display: flex;">
                  <div onClick="window.closeInfoWindow()" style="cursor: pointer;"> X </div>
                </div>
              </div>
            </div>
            <div style="display: flex;">
              <img src="${currMarker.imageUrl}" alt="img" style="width: 94px; height: 94px; border: 1px solid gray; object-fit: cover;">
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
            <div style="display:flex; gap:10px; margin-bottom:20px; justify-content:center;">
              <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: gray; color: white; font-weight: bold;" onclick="window.pooDetailHandler('${currMarker.pooId}', '${currMarker.UserId}', '${currMarker.address}', '${currMarker.content}', '${currMarker.imageUrl}', '${currMarker.createdAt}','${currMarker.pooLatitude}','${currMarker.pooLongitude}')">상세 보기</div>
              <div style="display:flex; justify-content: center; align-items: center; cursor: pointer; border-radius: 8px; width: 120px; height: 30px; background-color: #8722ED; color: white; font-weight: bold;" onclick="window.loadFindHandler('${currMarker.pooId}', '${currMarker.pooLatitude}','${currMarker.pooLongitude}','${currMarker.address}')">길 찾기</div>
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
      map.setLevel(4);
      map.setCenter(center);
    }
    // 인포 윈도우 닫기
    function closeInfoWindow() {
      infowindow.close();
    }
    // 상세보기 핸들러
    function pooDetailHandler(
      pooId,
      UserId,
      address,
      content,
      imageUrl,
      createdAt,
      pooLatitude,
      pooLongitude,
    ) {
      const params = new URLSearchParams();
      params.append('pooId', pooId);
      params.append('UserId', UserId);
      params.append('address', address);
      params.append('content', content);
      params.append('imageUrl', imageUrl);
      params.append('createdAt', createdAt);
      params.append('pooLatitude', pooLatitude);
      params.append('pooLongitude', pooLongitude);
      const queryString = params.toString();
      navigate(`/map/${pooId}?${queryString}`);
    }
    function loadFindHandler(pooId, pooLatitude, pooLongitude, address) {
      const params = new URLSearchParams();
      params.append('pooLatitude', pooLatitude);
      params.append('pooLongitude', pooLongitude);
      params.append('address', address);
      const queryString = params.toString();
      navigate(`/tmap/${pooId}?${queryString}`);
    }
    // closeInfoWindow 함수를 전역 범위로 결합시키기 위해 window 객체에 연결
    window.closeInfoWindow = closeInfoWindow;
    window.pooDetailHandler = pooDetailHandler;
    window.loadFindHandler = loadFindHandler;
    setBounds();

    // 브라우저의 위치 정보 사용 가능한 경우 마커와 정보창 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        displayMarker(map, locPosition);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      displayMarker(map, locPosition);
    }
  }

  // 마커와 정보창을 표시하는 함수
  function displayMarker(map, locPosition) {
    // 마커 이미지 설정
    const imageSrc = './images/mypoint.png';
    const imageSize = new kakao.maps.Size(32, 32);
    const imageOption = { offset: new kakao.maps.Point(15, 25) };
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
    // const iwContent = message;
    const iwRemoveable = true;

    // 정보창 객체 생성
    const infowindow = new kakao.maps.InfoWindow({
      // content: iwContent,
      removable: iwRemoveable,
    });

    // 정보창을 지도에 연결 (마커와 함께 표시)
    infowindow.open(map, marker);
    infowindow.close();
    map.setCenter(locPosition);
  }

  // 지도가 표시될 컨테이너 반환
  return (
    <div id='map2' ref={mapContainer} style={{ width: '100%', height: '100%' }}>
      {isMapPage && (
        <MyGeo
          role='none'
          onClick={initializeMap}
          className='absolute z-10 w-12 h-12 right-3 bottom-3 cursor-pointer'
        />
      )}
    </div>
  );
}
export default Kakaoserch;
