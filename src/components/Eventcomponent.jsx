import React from 'react';
import Tabbar from './Tabbar';
import Headers from './Headers';

function Eventcomponent() {
  return (
    <div className='container'>
      <Headers>이벤트</Headers>
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
      <Tabbar />
    </div>
  );
}

export default Eventcomponent;
