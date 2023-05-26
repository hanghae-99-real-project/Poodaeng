// KakaoClickMap.js
import React, { useEffect, useRef } from 'react';

function KakaoClickMap({ onMapClick }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const { kakao } = window;

    const mapOption = {
      center: new kakao.maps.LatLng(37.56665, 126.9785),
      level: 8,
    };

    const map = new kakao.maps.Map(mapContainerRef.current, mapOption);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);

    const onClick = mouseEvent => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      // 부모 컴포넌트의 상태를 업데이트합니다.
      onMapClick(latlng);

      const message = '';

      const resultDiv = document.getElementById('clickLatlng');
      resultDiv.innerHTML = message;
    };

    kakao.maps.event.addListener(map, 'click', onClick);

    return () => {
      kakao.maps.event.removeListener(map, 'click', onClick);
    };
  }, []);

  return (
    <div>
      <div
        id='map'
        ref={mapContainerRef}
        style={{ width: '95%', height: '300px' }}
      />
      <div id='clickLatlng' />
    </div>
  );
}
export default KakaoClickMap;
