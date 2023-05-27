import React from 'react';
import Kakaoserch from '../components/Kakaoserch';
import Headers from '../components/Headers';
import Tabbar from '../components/Tabbar';

function Map() {
  return (
    <>
      <Headers text icon destination=''>
        푸 박스 찾기
      </Headers>
      <Kakaoserch />
      <Tabbar />
    </>
  );
}

export default Map;
