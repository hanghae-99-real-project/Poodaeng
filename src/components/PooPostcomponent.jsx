/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { addPooBox } from '../api/poobox';
import FileUploader from './FileUploader';
import Headers from './Headers';
import KakaoClickMap from './KakaoClickMap';
import Buttons from './common/Buttons';

function PooPostcomponent() {
  const [latlng, setLatlng] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [content, setContent] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(addPooBox, {
    onSuccess: data => {
      // console.log('query success response >>> ', data);
      queryClient.invalidateQueries('poobox');
      navigate('/map');
    },
    onError: error => {
      if (error.response?.status === 403) {
        setErrormsg('등록하려는 푸박스가 이미 등록된 푸박스인지 확인해주세요.');
      }
      // console.log('error', error);
    },
  });

  // 파일값
  const handleFileUpload = file => {
    setUploadedFile(file);
  };

  // 좌표값
  const handleMapClick = newLatlng => {
    setLatlng(newLatlng);
  };

  // 특이사항 값
  const handleContentChange = e => {
    setContent(e.target.value);
  };

  // post formdata
  const pooBoxSubmitHandler = () => {
    if (!latlng || !latlng.La || !latlng.Ma) {
      setErrormsg('지도에서 위치를 선택해주세요');
      return;
    }
    if (!uploadedFile) {
      setErrormsg('이미지를 추가해주세요');
      return;
    }

    // const data = {};
    const formData = new FormData();
    formData.append('pooPhotoUrl', uploadedFile);

    const postData = {
      pooPhotoUrl: uploadedFile,
      pooLatitude: latlng.La,
      pooLongitude: latlng.Ma,
      content,
    };

    mutation.mutate(postData);
  };

  return (
    <form method='post' encType='multipart/form-data'>
      <Headers text icon destination=''>
        푸박스 등록
      </Headers>
      <div className='h-[812px]'>
        <div className='overflow-y-scroll'>
          <div className='ml-6 mt-8'>
            <div className='font-[600] text-[15px]'>푸박스 위치</div>
            <KakaoClickMap onMapClick={handleMapClick} />
          </div>
          <div className='ml-6 mt-4'>
            <div className='font-[600] text-base'>사진 등록</div>
            <div className='flex justify-center'>
              <FileUploader onFileUpload={handleFileUpload} />
            </div>
          </div>
          <div className='ml-6 mt-4'>
            <div className='font-[600] text-base'>푸박스 특이사항 설명</div>
            <input
              className='border-none font-[400] text-base pb-2 my-3 w-80'
              placeholder='15자 이내로 입력해주세요'
              onChange={handleContentChange}
              maxLength={15}
            />
            <Buttons
              type='button'
              bgColor='#8722ED'
              textColor='#FFFFFF'
              onClick={pooBoxSubmitHandler}
            >
              등록하기
            </Buttons>
            <div className='flex justify-center text-sm text-[#FF4444]'>
              {errormsg}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PooPostcomponent;
