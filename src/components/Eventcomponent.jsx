import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Headers';
import Tabbar from './Tabbar';

function Eventcomponent() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <Header>
        <img
          className='absolute left-5 scale-[-1] mt-1 cursor-pointer'
          src='Vector 56.png'
          alt='<'
          onClick={() => navigate('/')}
          role='none'
        />
        <div className='font-[700]'>이벤트</div>
      </Header>
      <div className='flex justify-center m-auto'>
        진행중인 이벤트가 없습니다
      </div>
      <Tabbar />
    </div>
  );
}

export default Eventcomponent;
