import React from 'react';
import Tabbar from './Tabbar';
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
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
      <Tabbar />
    </>
  );
}

export default Eventcomponent;
