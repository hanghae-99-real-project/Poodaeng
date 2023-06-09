/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCurrentLocation from '../hooks/useCurrentLocation';

function KakaoMap({
  width,
  height,
  rounded,
  lat,
  lng,
  getMarkerPosition,
  clickable,
}) {
  const [message, setMessage] = useState(false);
  // const [address, setAddress] = useState('');
  const mapContainer = useRef(null);
  const markerRef = useRef(null);
  const geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1 /* === 1 minute */,
    maximumAge: 1000 * 3600 * 24 /* === 24 hours */,
  };

  let latitude;
  let longitude;
  let error;
  if (!lat && !lng) {
    const result = useCurrentLocation(geoLocationOptions);
    // latitude = result?.location?.latitude + 0.00138377808305  - 0.0130874588651;
    // longitude = result?.location?.longitude + 0.0018242688706;
    latitude = result?.location?.latitude + 0.00138377808305 - 0.0130874588651;
    longitude = result?.location?.longitude + 0.0018242688706 - 0.009787794504;
    error = result.error;
  } else {
    latitude = lat;
    longitude = lng;
    error = false;
  }
  // const result = useCurrentLocation(geoLocationOptions);
  // const latitude = result?.location?.latitude + 0.00138377808305;
  // const longitude = result?.location?.longitude + 0.0018242688706;
  // const error = result.error;

  useEffect(() => {
    if (error) {
      setMessage(true);
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
    }
  }, [error]);

  useEffect(() => {
    if (latitude && longitude) {
      const options = {
        // center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);

      /**
       * @param {Object} markerOptions: 마커 옵션 객체
       * @param {Object} options.position: 마커 표시할 위치담은 객체(현재 위치를 표시하자)
       * @param {Boolean} options.draggable: 드래그 가능 여부(정적 지도에서는 드래그 막자)
       * @param {Object} options.map: 마커를 적용할 map(setMap으로 대체 가능!)
       */
      const markerOptions = {
        position: new window.kakao.maps.LatLng(latitude, longitude),
        draggable: clickable,
        map,
      };
      const marker = new window.kakao.maps.Marker(markerOptions);
      marker.setMap(map);
      /* marker는 ref 안 걸어도 될 듯? 나중에 지우던가 */
      markerRef.current = marker;
      if (getMarkerPosition) {
        // getMarkerPosition(latitude, longitude);
        getMarkerPosition(prev => ({
          ...prev,
          lostLatitude: latitude,
          lostLongitude: longitude,
        }));
      }

      // 마커 드래그 이벤트 처리
      /* 여기 markerRef.current 안써도 되나? */

      // lostLatitude: 37.173418250702696, lostLongitude: 128.4753615726882
      // lostLatitude: 37.186510178083054, lostLongitude: 128.4851522688706
      // {lostLatitude: 37.1734227194403, lostLongitude: 128.47536447436661}
      if (clickable) {
        window.kakao.maps.event.addListener(map, 'click', mouseEvent => {
          const newLatLng = mouseEvent.latLng;
          marker.setPosition(newLatLng);
          const newPosition = marker.getPosition(); // 마커의 새로운 위치 좌표 얻기
          const newLatitude = newPosition.getLat();
          const newLongitude = newPosition.getLng();
          // marker.setPosition(newLatitude, newLongitude);

          console.log('새로운 위치 좌표:', newLatitude, newLongitude);
          if (getMarkerPosition) {
            // getMarkerPosition(newLatitude, newLongitude);
            getMarkerPosition(prev => ({
              ...prev,
              lostLatitude: newLatitude,
              lostLongitude: newLongitude,
            }));
          }
        });

        // window.kakao.maps.event.addListener(marker, 'dragend', () => {
        //   const newPosition = marker.getPosition(); // 마커의 새로운 위치 좌표 얻기
        //   const newLatitude = newPosition.getLat();
        //   const newLongitude = newPosition.getLng();
        //   marker.setPosition(newLatitude, newLongitude);

        //   console.log('새로운 위치 좌표:', newLatitude, newLongitude);
        //   if (getMarkerPosition) {
        //     // getMarkerPosition(newLatitude, newLongitude);
        //     getMarkerPosition(prev => ({
        //       ...prev,
        //       lostLatitude: newLatitude,
        //       lostLongitude: newLongitude,
        //     }));
        //   }
        // });
      }
    }
  }, [latitude, longitude, getMarkerPosition, markerRef]);

  return (
    <>
      {message && <ToastContainer />}
      <div
        id='map'
        ref={mapContainer}
        className={`${width} ${height} ${rounded}`}
      />
    </>
  );
}

export default React.memo(KakaoMap);
// export default KakaoMap;

// /* eslint-disable prefer-destructuring */
// import React, { useEffect, useRef, useState } from 'react';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import useCurrentLocation from '../hooks/useCurrentLocation';
// // import KakaoMarker from './KakaoMarker';

// function KakaoMap({ width, height, rounded }) {
//   // const [loc, setLoc] = useState();
//   // const { kakao } = window;
//   const [message, setMessage] = useState(false);
//   const mapContainer = useRef(null);
//   const geoLocationOptions = {
//     enableHighAccuracy: true,
//     timeout: 1000 * 60 * 1 /* === 1 minute */,
//     maximumAge: 1000 * 3600 * 24 /* === 24 hour */,
//   };
//   // const { latitude = 33.450701, longitude = 126.570667 } = useCurrentLocation(geoLocationOptions);
//   const result = useCurrentLocation(geoLocationOptions);
//   const latitude = result.location?.latitude;
//   const longitude = result.location?.longitude;
//   const error = result?.error;
//   console.log('KakaoMap latitude >>>', latitude);
//   console.log('longitude >>> ', longitude);
//   console.log('error >>> ', error);
//   useEffect(() => {
//     // const { location, error } = useCurrentLocation(geoLocationOptions);
//     // const latitude = location?.latitude;
//     // const longitude = location?.longitude;
//     // console.log('KakaoMap location >>>', location);
//     // console.log('location >>> ', location);
//     // console.log('error >>> ', error);

//     if (error) {
//       setMessage(true);
//       toast.error(error, {
//         position: toast.POSITION.TOP_CENTER,
//         toastId: 'empty-comment-toast',
//       });
//       console.log(error);
//       // return;
//     }
//     // setLoc({ lat: latitude, lng: longitude });
//     // const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스

//     // const options = {
//     //   // center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
//     //   center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표(GeoLocation 사용하면 될 듯)
//     //   level: 3,
//     // };

//     // eslint-disable-next-line no-unused-vars
//     // // map을 담을 컨테이너, 옵션
//     // const map = new kakao.maps.Map(mapContainer.current, options); // 지도 생성 및 객체 리턴
//     // }, [location, error]);
//   }, [useCurrentLocation]);

//   return (
//     <>
//       {message && <ToastContainer />}
//       <Map
//         ref={mapContainer}
//         center={{ lat: latitude, lng: longitude }}
//         // center={{ lat: 33.5563, lng: 126.79581 }}
//         level={3}
//         className={`${width} ${height} ${rounded}`}
//       >
//         {/* 이거 location undefined 뜰 때도 있어서 state로 관리해서 넘겨야 할 수도 */}
//         <MapMarker position={{ lat: latitude, lng: longitude }} draggable />
//       </Map>
//     </>
//     // <>
//     //   {message && <ToastContainer />}
//     //   <div
//     //     id='map'
//     //     ref={mapContainer}
//     //     className={`${width} ${height} ${rounded}`}
//     //   >
//     //     {/* 이거 location undefined 뜰 때도 있어서 state로 관리해서 넘겨야 할 수도 */}
//     //     <MapMarker position={{ lat: latitude, lng: longitude }} draggable />
//     //   </div>
//     // </>
//   );
// }

// export default KakaoMap;
