import React from 'react';
import { useLocation } from 'react-router-dom';
import Kakaoserch from '../components/Kakaoserch';
import Headers from '../components/Headers';
import Tabbar from '../components/Tabbar';

function Map() {
  const location = useLocation();
  const {
    homeState = true,
    mapState = false,
    pooState = false,
  } = location.state;
  console.log('Map Page >>>', homeState, mapState, pooState); // false true false
  return (
    <>
      <Headers text icon destination=''>
        푸 박스 찾기
      </Headers>
      <Kakaoserch />
      <Tabbar homeState={homeState} mapState={mapState} pooState={pooState} />
    </>
  );
}

export default Map;
