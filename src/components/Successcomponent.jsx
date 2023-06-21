import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ReportCheck } from '../assets/images/reportcheck.svg';

function Successcomponent() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col w-full h-full items-center justify-between '>
      <div />
      <div className='flex flex-col items-center justify-center gap-3'>
        <ReportCheck />
        <div className='font-bold text-lg'>등록 완료했어요!</div>
      </div>
      <div
        className='large-button flexCenter bg-mainColor text-white'
        onClick={navigate('/map')}
      >
        확인
      </div>
    </div>
  );
}

export default Successcomponent;
