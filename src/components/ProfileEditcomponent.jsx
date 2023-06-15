/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { newPutImage } from '../api/myPage';
import { ReactComponent as Edit } from '../assets/images/Edit.svg';
import { ReactComponent as 프로필1 } from '../assets/images/프로필1.svg';
import { ReactComponent as 프로필2 } from '../assets/images/프로필2.svg';
import { ReactComponent as 프로필3 } from '../assets/images/프로필3.svg';
import { ReactComponent as 프로필4 } from '../assets/images/프로필4.svg';
import { ReactComponent as 프로필5 } from '../assets/images/프로필5.svg';
import { ReactComponent as 사진기 } from '../assets/images/사진기.svg';
import useInput from '../hooks/useInput';
import Headers from './Headers';
import ProfileUploader from './ProfileUploader';

function ProfileEditcomponent() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [nickEdit, setNickEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState(null);
  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    nickname: '',
    password: '',
  });

  // const { isLoading, isError, data } = useQuery('profile', getMypageCount);
  // if (isLoading) {
  //   return (
  //     <div className='flex flex-col h-[812px] justify-center  items-center'>
  //       {/* <Loading /> */} 로딩중
  //     </div>
  //   );
  // }
  // if (isError) {
  //   console.log('geterror', isError);
  // }
  // const getMyInfoData = data?.data?.getMyInfoData;
  // console.log(data);

  // 닉네임 변경
  const nickEditHandler = () => {
    setNickEdit(true);
    console.log('nickname edit', nickEdit);
  };

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
    // setInputValue(e.target.value);
  };

  const closeModal = () => {
    setNickEdit(false);
    setImgEdit(false);
    // setInputValue('');
    console.log('Modal closed');
  };
  const [image, setImage] = useState(null);
  const setThumbnail = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
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

  const handleFileUpload = file => {
    setUploadedFile(file);

    const newFormData = new FormData();
    newFormData.append('pooPhotoUrl', file);
    console.log();
    setFormData(newFormData);
  };

  const handleComplete = () => {
    // console.log('Input value:', inputValue);

    if (formData) {
      mutation.mutate(formData);
      closeModal();
    } else {
      console.log('이미지 없음');
    }
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
              <form className='absolute w-[375px] bottom-2 rounded animate-slide-up'>
                <div>
                  <div
                    className='flex flex-wrap items-center justify-center p-5 bg-white rounded-xl rounded-b-none '
                    onClick={e => e.stopPropagation()} // 클릭 이벤트 전파 중단
                  >
                    <h2 className='font-bold text-xl mb-5'>
                      프로필 이미지 선택
                    </h2>
                    <div className='flex flex-wrap gap-3 bg-white'>
                      <프로필1 />
                      <프로필2 />
                      <프로필3 />
                      <프로필4 />
                      <프로필5 />
                      <ProfileUploader onFileUpload={handleFileUpload} />
                    </div>
                    <div
                      className='large-button flexCenter bg-mainColor text-white mt-3'
                      onClick={handleComplete}
                    >
                      적용하기
                    </div>
                  </div>
                </div>
              </form>
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
              {/* {getMyInfoData.nickname} */}
              닉네임
            </div>
            <div
              className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50'
              onClick={closeModal}
            >
              <div className='absolute bottom-28 rounded'>
                <div className='flex items-center mb-4'>
                  <input
                    type='text'
                    // value={inputValue}
                    // onChange={handleInputChange}
                    className='w-full py-2 rounded-lg rounded-r-none shadow'
                    onClick={e => e.stopPropagation()} // 클릭 이벤트 전파 중단
                  />
                  <button
                    // onClick={handleComplete}
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
            {/* {getMyInfoData.nickname} */}
            닉네임
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
              {/* {getMyInfoData?.phoneNumber} */}
              폰넘버
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
