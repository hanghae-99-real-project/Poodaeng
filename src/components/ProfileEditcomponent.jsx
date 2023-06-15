/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMypageCount, newPutImage } from '../api/myPage';
import { ReactComponent as Edit } from '../assets/images/Edit.svg';
import useInput from '../hooks/useInput';
import FileUploader from './FileUploader';
import Headers from './Headers';
import Loading from './common/Loading';

function ProfileEditcomponent() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [nickEdit, setNickEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    nickname: '',
    password: '',
  });

  const { isLoading, isError, data } = useQuery('profile', getMypageCount);
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        {/* <Loading /> */} 로딩중
      </div>
    );
  }
  if (isError) {
    // if (status !== 401) {
    //   return navigate('/unknown');
    // }
    console.log('geterror', isError);
  }
  const { getMyInfoData } = data.data;
  console.log(data.data.getMyInfoData);

  // 파일값
  const handleFileUpload = file => {
    setUploadedFile(file);
    console.log(file);
  };

  // 닉네임 변경
  const nickEditHandler = () => {
    setNickEdit(true);
    console.log('nickname edit', nickEdit);
  };
  if (!uploadedFile) {
    console.log('이미지없음');
  }

  // 닉네임 유효성 검사
  const onValidatorNickName = e => {
    const { name } = e.target;
    console.log('name>>>', name);
    const result = onValidator(name);
    console.log('nickname>>>>>', result);
  };

  // 비밀번호 유효성 검사
  const onValidatorPassword = e => {
    const { name } = e.target;
    console.log('PWname>>>', name);
    const result = onValidator(name);
    console.log('PWnickname>>>>>', result);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const closeModal = () => {
    setNickEdit(false);
    setImgEdit(false);
    setInputValue('');
    console.log('Modal closed');
  };
  const [image, setImage] = useState(null);
  const setThumbnail = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  // 이미지 변경
  const imgEditHandler = () => {
    setImgEdit(true);
    console.log('nickname edit', nickEdit);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(newPutImage, {
    onSuccess: postData => {
      console.log('query success response >>> ', postData);
      queryClient.invalidateQueries('poobox');
      navigate('/map');
    },
    onError: errors => {
      console.log(errors);
    },
  });

  const formData = new FormData();
  formData.append('pooPhotoUrl', uploadedFile);

  const handleComplete = () => {
    console.log('Input value:', inputValue);
    mutation.mutate(formData);
    closeModal();
  };

  return (
    <div>
      <Headers text icon destination='mypage'>
        프로필 수정
      </Headers>
      <div className='flex flex-col items-center my-8 gap-3'>
        {imgEdit ? (
          <>
            <div className='flex rounded-full'>
              <div
                className='flex items-center justify-center border w-36 h-36 bg-[#D9D9D9] rounded-full'
                onClick={imgEditHandler}
              >
                +
              </div>
            </div>
            <div
              className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50'
              onClick={closeModal}
            >
              <div className='absolute bottom-5 rounded'>
                <div className='flex items-center mb-4'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    className='w-full py-2 rounded-lg rounded-r-none shadow'
                    onClick={e => e.stopPropagation()} // 클릭 이벤트 전파 중단
                  />
                  <button
                    onClick={handleComplete}
                    className='bg-blue-500 text-white w-20 py-2 rounded-lg rounded-l-none'
                  >
                    완료
                  </button>
                </div>
                <div className='flex justify-end' />
              </div>
            </div>
          </>
        ) : (
          <div className='flex rounded-full'>
            <div
              className='flex items-center justify-center border w-36 h-36 bg-[#D9D9D9] rounded-full'
              onClick={imgEditHandler}
            >
              +
            </div>
          </div>
        )}

        {nickEdit ? (
          <>
            <div className='flex items-center justify-center w-full font-bold text-lg'>
              {getMyInfoData.nickname}
            </div>
            <div
              className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50'
              onClick={closeModal}
            >
              <div className='absolute bottom-28 rounded'>
                <div className='flex items-center mb-4'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    className='w-full py-2 rounded-lg rounded-r-none shadow'
                    onClick={e => e.stopPropagation()} // 클릭 이벤트 전파 중단
                  />
                  <button
                    onClick={handleComplete}
                    className='bg-mainColor text-white w-20 py-2 rounded-lg rounded-l-none'
                  >
                    완료
                  </button>
                </div>
                <div className='flex justify-end' />
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center w-full font-bold text-lg'>
            {getMyInfoData.nickname}
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
