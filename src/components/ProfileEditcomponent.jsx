/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getMypageCount,
  newPutImage,
  newPutNickname,
  newPutPassword,
} from '../api/myPage';
import { ReactComponent as Edit } from '../assets/images/Edit.svg';
import { ReactComponent as 프로필1 } from '../assets/images/프로필1.svg';
import { ReactComponent as 프로필2 } from '../assets/images/프로필2.svg';
import { ReactComponent as 프로필3 } from '../assets/images/프로필3.svg';
import { ReactComponent as 프로필4 } from '../assets/images/프로필4.svg';
import { ReactComponent as 프로필5 } from '../assets/images/프로필5.svg';
import { ReactComponent as 사진기 } from '../assets/images/사진기.svg';
import Headers from './Headers';
import ProfileUploader from './ProfileUploader';
import Loading from './common/Loading';

function ProfileEditcomponent() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [nickEdit, setNickEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  // const [inputValue, setInputValue] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const { isLoading, isError, data } = useQuery('profile', getMypageCount);
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }
  if (isError) {
    // console.log('geterror', isError);
  }
  const getMyInfoData = data?.data?.getMyInfoData;

  // 닉네임 변경 클릭
  const nickEditHandler = () => {
    setNickEdit(true);
    // console.log('nickname edit', nickEdit);
  };

  // 비밀번호 변경 클릭
  const passwordEditHandler = () => {
    navigate('/passwordedit');
    // console.log('password edit', passEdit);
  };

  const closeModal = () => {
    setNickEdit(false);
    setImgEdit(false);
    // console.log('Modal closed');
  };

  // const [image, setImage] = useState(null);
  // const setThumbnail = event => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(URL.createObjectURL(file));
  //   }
  // };

  // 이미지 변경 모달
  const imgEditHandler = () => {
    setImgEdit(true);
    // console.log('nickname edit', nickEdit);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(newPutImage, {
    onSuccess: postData => {
      // console.log('query success response >>> ', postData);
      queryClient.invalidateQueries('profile');
      closeModal();
      navigate('/mypage');
    },
    onError: errors => {
      // console.log(errors);
    },
  });
  const handleProfileClick = index => {
    // console.log('클릭된 인덱스', index);
    if (selectedIcon === index) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(index);
    }
  };

  const handleFileUpload = file => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append('imagePhotoUrl', uploadedFile);
  };

  useEffect(() => {
    if (uploadedFile) {
      setSelectedIcon(null);
    }
  }, [uploadedFile]);

  // 이미지 or 인덱스 보내기
  const handleComplete = () => {
    const index = selectedIcon === null ? 5 : selectedIcon;
    if (index < 5) {
      mutation.mutate({ index });
    } else {
      mutation.mutate({ userPhoto: uploadedFile, index });
    }
  };

  // 닉네임 변경
  const nickNameMutation = useMutation(newPutNickname, {
    onSuccess: putData => {
      queryClient.invalidateQueries('profile');
      // console.log('query success response >>> ', putData);
      closeModal();
    },
    onError: errors => {
      // console.log(errors);
    },
  });

  // 비밀번호 변경
  // const passwordMutation = useMutation(newPutPassword, {
  //   onSuccess: putData => {
  //     queryClient.invalidateQueries('profile');
  //     // console.log('query success response >>> ', putData);
  //     closeModal();
  //   },
  //   onError: errors => {
  //     // console.log(errors);
  //   },
  // });

  const nicknameChangeHandler = e => {
    setNewNickname(e.target.value);
    // console.log(newNickname);
  };

  // const passwordChangeHandler = event => {
  //   const { value, name } = event.target;

  //   if (name === 'password1') {
  //     setNewPassword1(value);
  //   } else if (name === 'password2') {
  //     setNewPassword2(value);
  //   }
  // };

  const newNicknameSubmit = () => {
    if (!newNickname) {
      // setErrorMsg('변경 할 닉네임을 입력해주세요');
      nickNameMutation.mutate(getMyInfoData.nickname);
    } else {
      nickNameMutation.mutate(newNickname);
    }
  };

  // const newPasswordSubmit = () => {
  //   if (
  //     !/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
  //       newPassword1,
  //     )
  //   ) {
  //     setErrorMsg(
  //       '비밀번호는 영문자, 숫자, 특수문자를 포함한 8~15자여야 합니다',
  //     );
  //   } else if (!newPassword1 || !newPassword2) {
  //     setErrorMsg('비밀번호를 입력해주세요');
  //   } else if (newPassword1 !== newPassword2) {
  //     setErrorMsg('비밀번호가 일치하지 않습니다');
  //   } else {
  //     passwordMutation.mutate(newPassword1);
  //   }
  // };

  return (
    <div>
      <Headers text icon destination='mypage'>
        프로필 수정
      </Headers>
      {/* 이미지 업로드 */}
      <div className='flex flex-col items-center my-8 gap-3 z-60'>
        {imgEdit ? (
          <>
            <div className='flex rounded-full'>
              <div
                className='flex items-center justify-center border w-28 h-28 bg-[#D9D9D9] rounded-full'
                onClick={imgEditHandler}
              >
                <img
                  src={getMyInfoData.userPhoto[0]}
                  alt={<사진기 />}
                  className='flex items-center justify-center border w-28 h-28 rounded-full object-cover'
                />
              </div>
            </div>
            <div
              className='fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center bg-black bg-opacity-50'
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
                      <프로필1
                        onClick={() => handleProfileClick(0)}
                        className={selectedIcon === 0 ? 'selected-icon' : ''}
                      />
                      <프로필2
                        onClick={() => handleProfileClick(1)}
                        className={selectedIcon === 1 ? 'selected-icon' : ''}
                      />
                      <프로필3
                        onClick={() => handleProfileClick(2)}
                        className={selectedIcon === 2 ? 'selected-icon' : ''}
                      />
                      <프로필4
                        onClick={() => handleProfileClick(3)}
                        className={selectedIcon === 3 ? 'selected-icon' : ''}
                      />
                      <프로필5
                        onClick={() => handleProfileClick(4)}
                        className={selectedIcon === 4 ? 'selected-icon' : ''}
                      />

                      <ProfileUploader
                        className={selectedIcon === null ? 'selected-icon' : ''}
                        onFileUpload={handleFileUpload}
                        onClick={() => handleProfileClick(null)}
                      />
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
              className='flex items-center justify-center border w-28 h-28 bg-[#D9D9D9] rounded-full'
              onClick={imgEditHandler}
            >
              <img
                src={getMyInfoData.userPhoto[0]}
                alt={<사진기 />}
                className='flex items-center justify-center border w-28 h-28 rounded-full object-cover'
              />
            </div>
          </div>
        )}
        {/* 여기부터 닉네임  */}
        {nickEdit ? (
          <div className='rounded ' onClick={e => e.stopPropagation()}>
            <div className='flex flex-col justify-center items-center'>
              <input
                type='text'
                value={newNickname}
                onChange={nicknameChangeHandler}
                className='flex justify-center items-center w-full py-1 pb-2 px-2 border-b mb-1'
                placeholder={getMyInfoData.nickname}
                maxLength={15}
              />
              <button
                onClick={newNicknameSubmit}
                className='flex items-center justify-center bg-mainColor text-white w-9 h-5 my-2 rounded-xl text-xs'
              >
                완료
              </button>
            </div>
            <div className='flex justify-center ml-2 w-auto text-red-500 font-bold'>
              {errorMsg || <div> &nbsp; </div>}
            </div>
          </div>
        ) : (
          <>
            <div className='flex items-center justify-center w-full font-bold text-lg my-1'>
              {getMyInfoData.nickname}
            </div>
            <Edit className='cursor-pointer' onClick={nickEditHandler} />
            <div> &nbsp; </div>
          </>
        )}
      </div>
      {/* 여기부터 비밀번호 */}
      <div className='border' />
      <div className='flex flex-col z-60'>
        <div className='font-bold m-5'>기본 정보</div>
        <div className='flex flex-col ml-5 gap-3'>
          <div className='font-bold text-sm'>
            아이디
            <span className='ml-2 text-[#AEAEAE] text-xs font-sans'>
              {getMyInfoData.phoneNumber}
            </span>
          </div>
          <div className='flex items-center'>
            <div className='font-bold text-sm'>비밀번호</div>
            <div
              className='text-xs border-b ml-2 text-[#C7C7C7]'
              onClick={passwordEditHandler}
            >
              변경하기
            </div>
          </div>
          <div
            className='large-button bg-mainColor text-white flex justify-center items-center mt-44'
            onClick={() => navigate('/mypage')}
          >
            수정 완료
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditcomponent;
