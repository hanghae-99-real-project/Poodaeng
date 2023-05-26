/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Headers from './Headers';
import FileUploader from './FileUploader';
import Buttons from './common/Buttons';
import KakaoClickMap from './KakaoClickMap';

function PooPostcomponent() {
  const [latlng, setLatlng] = useState(null);

  const handleMapClick = newLatlng => {
    setLatlng(newLatlng);
  };
  console.log('poolating', latlng);
  return (
    <div>
      <Headers text icon destination=''>
        푸박스 등록
      </Headers>
      <div className='ml-[23px] mt-[31px]'>
        <div className='font-[600] text-[15px]'>푸박스 위치</div>
        <KakaoClickMap onMapClick={handleMapClick} />
      </div>
      <div className='ml-[23px] mt-[20px]'>
        <div className='font-[600] text-[15px]'>사진 등록</div>
        <div className='flex justify-center'>
          <FileUploader />
        </div>
      </div>
      <div className='ml-[23px] mt-[20px]'>
        <div className='font-[600] text-[15px]'>푸박스 특이사항 설명</div>
        <input
          className='border-none font-[400] text-[15px] pb-[8px] my-[13px] w-[330px]'
          placeholder='특이사항 입력'
        />
        <Buttons type='button' bgColor='#449AFF' textColor='#FFFFFF'>
          등록하기
        </Buttons>
      </div>
    </div>
  );
}

export default PooPostcomponent;
