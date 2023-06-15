import React from 'react';
import Headers from '../components/Headers';
import Kakaoserch from '../components/Kakaoserch';

function Map() {
  return (
    <>
      <Headers text icon destination=''>
        푸박스 찾기
      </Headers>
      <Kakaoserch />
    </>
  );
}

export default Map;
