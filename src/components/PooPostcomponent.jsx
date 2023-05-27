/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Headers from './Headers';
import FileUploader from './FileUploader';
import Buttons from './common/Buttons';
import KakaoClickMap from './KakaoClickMap';
import addPooBox from '../api/poopost';

function PooPostcomponent() {
  const [latlng, setLatlng] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();
  const mutation = useMutation(addPooBox, {
    onSuccess: () => {
      queryClient.invalidateQueries('pooPost');
    },
    onError: error => {
      console.log(error);
    },
  });

  // 파일값
  const handleFileUpload = file => {
    setUploadedFile(file);
    console.log(uploadedFile);
  };

  // 좌표값
  const handleMapClick = newLatlng => {
    setLatlng(newLatlng);
  };
  console.log('poolating', latlng);

  // 특이사항 값
  const handleContentChange = e => {
    setContent(e.target.value);
    console.log(content);
  };

  // post formdata
  const pooBoxSubmitHandler = () => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append(
      'content',
      new Blob([JSON.stringify(content)], { type: 'application/json' }),
    );
    formData.append(
      'pooLatitude',
      new Blob([JSON.stringify(latlng.La)], { type: 'application/json' }),
    );
    formData.append(
      'pooLongitude',
      new Blob([JSON.stringify(latlng.Ma)], { type: 'application/json' }),
    );
    if (!uploadedFile) {
      console.log('이미지를 추가해주세요');
    }
    if (!latlng.La || !latlng.Ma || !latlng) {
      console.log('위치를 추가해주세요');
    }
    if (latlng && uploadedFile && content) {
      mutation.mutate(formData);

      // form 조회
      // for (let [key, value] of formData.entries()) { console.log(`${key}:`, value); }
    }
  };

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
          <FileUploader onFileUpload={handleFileUpload} />
        </div>
      </div>
      <div className='ml-[23px] mt-[20px]'>
        <div className='font-[600] text-[15px]'>푸박스 특이사항 설명</div>
        <input
          className='border-none font-[400] text-[15px] pb-[8px] my-[13px] w-[330px]'
          placeholder='특이사항 입력'
          onChange={handleContentChange}
        />
        <Buttons
          type='button'
          bgColor='#449AFF'
          textColor='#FFFFFF'
          onClick={pooBoxSubmitHandler}
        >
          등록하기
        </Buttons>
      </div>
    </div>
  );
}
export default PooPostcomponent;
