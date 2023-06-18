import React from 'react';
import Headers from './Headers';

function Eventcomponent() {
  return (
    <>
      <Headers text icon destination=''>
        이벤트
      </Headers>
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
    </>
  );
}

export default Eventcomponent;
