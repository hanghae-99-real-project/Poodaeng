/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Headers from './Headers';
import FileUploader from './FileUploader';
import Buttons from './common/Buttons';

function PooPostcomponent() {
  return (
    <div className='container'>
      <Headers text icon destination=''>
        푸박스 등록
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
