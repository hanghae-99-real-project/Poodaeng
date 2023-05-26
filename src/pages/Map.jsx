import React from 'react';
import Kakaoserch from '../components/Kakaoserch';
import Headers from '../components/Headers';

function Map() {
  return (
    <>
      <Headers text icon destination=''>
        푸 박스 찾기
      </Headers>
      <Kakaoserch />
    </>
  );
}

export default Map;
