import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

function KakaoMarker({ location }) {
  const { latitude: lat, longitude: lng } = location;
  // console.log(lat, lng);
  const position = { lat, lng };
  /* draggable eslint 가 boolean 막아서 카카오가 어떻게 인식할지는 모르겠음 */
  /**
   * @check_point
   *  */
  return <MapMarker position={position} draggable />;
}

export default KakaoMarker;
