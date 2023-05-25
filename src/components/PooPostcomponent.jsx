/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from './Headers';
import FileUploader from './FileUploader';
import Buttons from './common/Buttons';

function PooPostcomponent() {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <Headers text>
        <img
          className='absolute left-5 scale-[-1] mt-1 cursor-pointer'
          src='Vector 56.png'
          alt='<'
          onClick={() => navigate('/')}
          role='none'
        />
        <div className='font-[700]'>푸박스 등록</div>
      </Headers>
      <div className='ml-[23px] mt-[31px]'>
        <div className='font-[600] text-[15px]'>푸박스 위치</div>
        <input
          className='border-b font-[400] text-[15px] pb-[8px] mt-[13px] w-[330px]'
          placeholder='주소 입력하기'
        />
      </div>
      <div className='ml-[23px] mt-[31px]'>
        <div className='font-[600] text-[15px]'>사진 등록</div>
        <FileUploader />
      </div>
      <div className='ml-[23px] mt-[31px]'>
        <div className='font-[600] text-[15px]'>푸박스 특이사항 설명</div>
        <textarea
          className='border-none font-[400] text-[15px] pb-[8px] mt-[13px] w-[330px] h-[200px] resize-none'
          placeholder='특이사항 입력'
        />
        <Buttons className='ml-[23px]'>등록하기</Buttons>
      </div>
    </div>
  );
}

export default PooPostcomponent;
