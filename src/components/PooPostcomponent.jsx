/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import Headers from './Headers';
import FileUploader from './FileUploader';
import Buttons from './common/Buttons';
import KakaoClickMap from './KakaoClickMap';
import addPooBox from '../api/poopost';

function PooPostcomponent() {
  const [latlng, setLatlng] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [content, setContent] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const { accessToken } = useSelector(store => store.auth);

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
  };

  // 좌표값
  const handleMapClick = newLatlng => {
    setLatlng(newLatlng);
  };

  // 특이사항 값
  const handleContentChange = e => {
    setContent(e.target.value);
  };

  // const handleFileChange = e => {
  //   const { name, files } = e.target;
  //   setForm({ ...form, [name]: files[0] });
  // };

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
    // formData.append('content', content);
    // formData.append('pooLatitude', latlng.La);
    // formData.append('pooLongitude', latlng.Ma);

    const postData = {
      accessToken,
      pooPhotoUrl: uploadedFile,
      pooLatitude: latlng.La,
      pooLongitude: latlng.Ma,
      content,
    };

    // formData.append('content', JSON.stringify(content));
    // console.log(content);
    // formData.append('pooLatitude', latlng.La);
    // console.log(latlng.La);
    // formData.append('pooLongitude', latlng.Ma);
    // console.log(latlng.Ma);

    // formData.append(
    //   'pooPhotoUrl',
    //   new Blob([JSON.stringify([uploadedFile])], { type: 'image/jpeg' }),
    // );
    // formData.append(
    //   'pooPhotoUrl',
    //   new Blob([JSON.stringify(uploadedFile)], { type: 'application/json' }),
    // );
    // formData.append(
    //   'content',
    //   new Blob([JSON.stringify(content)], { type: 'application/json' }),
    // );
    // formData.append(
    //   'pooLatitude',
    //   new Blob([JSON.stringify(latlng.La)], { type: 'application/json' }),
    // );
    // formData.append(
    //   'pooLongitude',
    //   new Blob([JSON.stringify(latlng.Ma)], { type: 'application/json' }),
    // );
    // data.formData = formData;
    // data.accessToken = accessToken;
    mutation.mutate(postData);
  };

  return (
    <form method='post' encType='multipart/form-data'>
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
        <div className='flex justify-center text-sm text-[#FF4444]'>
          {errormsg}
        </div>
      </div>
    </form>
  );
}
export default PooPostcomponent;
