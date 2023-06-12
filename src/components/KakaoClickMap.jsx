import React, { useEffect, useRef } from 'react';

function KakaoClickMap({ onMapClick }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const { kakao } = window;

    const mapOption = {
      center: new kakao.maps.LatLng(37.56665, 126.9785),
      level: 5,
    };

    const map = new kakao.maps.Map(mapContainerRef.current, mapOption);

    const markerImage = new kakao.maps.MarkerImage(
      './images/points.png',
      new kakao.maps.Size(22, 32),
    );

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage,
    });
    marker.setMap(map);

    const onClick = mouseEvent => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      onMapClick(latlng);
      const message = '';
      const resultDiv = document.getElementById('clickLatlng');
      resultDiv.innerHTML = message;
    };

    kakao.maps.event.addListener(map, 'click', onClick);

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const currentPosition = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(currentPosition);
          marker.setPosition(currentPosition);
          onMapClick(currentPosition);
        },
        error => {
          console.error('Error getting current position:', error);
        },
      );
    }

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
