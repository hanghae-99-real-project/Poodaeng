import React from 'react';
import Headers from './Headers';

function ProfileEditcomponent() {
  return (
    <div>
      <Headers text icon destination='mypage'>
        프로필 수정
      </Headers>
      <div className=''>이미지</div>
      <div>닉네임</div>
      <div className='border' />
      <div>기본 정보</div>
      <div>이메일</div>
      <div>소개글</div>
      <div>위치 정보 제공 동의</div>
    </div>
  );
}

export default ProfileEditcomponent;
