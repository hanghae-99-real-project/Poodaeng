import React, { useState } from 'react';
import Headers from './Headers';
import FileUploader from './FileUploader';

function ProfileEditcomponent() {
  const [uploadedFile, setUploadedFile] = useState(null);
  // 파일값
  const handleFileUpload = file => {
    setUploadedFile(file);
    console.log(uploadedFile);
  };
  return (
    <div>
      <Headers text icon destination='mypage'>
        프로필 수정
      </Headers>
      <div className='flex flex-col items-center my-8 gap-3'>
        <div className='flex border rounded-full'>
          <FileUploader onFileUpload={handleFileUpload} />
        </div>
        <div className='font-bold text-[20px]'>닉네임</div>
        <div className='border '>수정버튼 대신 중복확인은 어떤가요?</div>
      </div>
      <div className='border' />
      <div className='flex flex-col'>
        <div className='font-bold m-5'>기본 정보</div>
        <div className='flex flex-col ml-5 gap-3'>
          <div>이메일</div>
          <div>소개글</div>
          <div>위치 정보 제공 동의</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditcomponent;
