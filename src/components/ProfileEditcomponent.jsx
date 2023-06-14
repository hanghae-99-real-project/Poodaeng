/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMypageCount } from '../api/myPage';
import { ReactComponent as Edit } from '../assets/images/Edit.svg';
import useInput from '../hooks/useInput';
import FileUploader from './FileUploader';
import Headers from './Headers';
import Loading from './common/Loading';

function ProfileEditcomponent() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [nickEdit, setNickEdit] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    nickname: '',
    password: '',
  });

  const { isLoading, isError, data } = useQuery('profile', getMypageCount);
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }
  if (isError) {
    return navigate('/unknown');
  }
  const { getMyInfoData } = data.data;
  console.log(data.data.getMyInfoData);

  // 파일값
  const handleFileUpload = file => {
    setUploadedFile(file);
    console.log(file);
  };

  const nickEditHandler = () => {
    setNickEdit(!nickEdit);
  };

  if (!uploadedFile) {
    console.log('이미지없음');
  }

  const newNickNameHandler = e => {
    const pattern = /^[가-힣a-zA-Zㄱ-ㅎㅏ-ㅣ]*$/;
    if (!pattern.test(e.target.value)) {
      setNewNickname('');
    } else {
      setNewNickname(e.target.value);
    }
  };

  const onValidatorNickName = e => {
    const { name } = e.target;
    console.log('name>>>', name);
    const result = onValidator(name);
    console.log('nickname>>>>>', result);
  };

  const onValidatorPassword = e => {
    const { name } = e.target;
    console.log('PWname>>>', name);
    const result = onValidator(name);
    console.log('PWnickname>>>>>', result);
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
        {nickEdit ? (
          <input className='w-20' onChange={newNickNameHandler} />
        ) : (
          <div className='font-bold text-[20px]'>
            {newNickname || getMyInfoData.nickname}
          </div>
        )}
        <Edit className='cursor-pointer' onClick={nickEditHandler} />
      </div>
      <div className='border' />
      <div className='flex flex-col'>
        <div className='font-bold m-5'>기본 정보</div>
        <div className='flex flex-col ml-5 gap-3'>
          <div className='font-bold text-sm'>
            아이디
            <span className='ml-2 text-[#AEAEAE] text-xs font-sans'>
              {getMyInfoData.phoneNumber}
            </span>
          </div>
          <div className='font-bold text-sm'>비밀번호</div>
          <div className='font-bold text-sm'>비밀번호 확인</div>

          <input
            value={inputs.nickname}
            name='nickname'
            onChange={onChangeInputs}
          />
          <button name='nickname' onClick={onValidatorNickName}>
            버튼
          </button>
          <input
            value={inputs.password}
            name='password'
            onChange={onChangeInputs}
          />
          <button name='password' onClick={onValidatorPassword}>
            버튼
          </button>

          <div className='large-button bg-mainColor text-white flex justify-center items-center mt-44'>
            수정 완료
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditcomponent;
