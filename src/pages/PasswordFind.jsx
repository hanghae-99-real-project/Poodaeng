/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import { findPassword } from '../api/sendCode';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import { ReactComponent as PasswordChangeCheck } from '../assets/images/PasswordChangeCheck.svg';
import { errorMsg } from '../data/inputs';
import useInput from '../hooks/useInput';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';
import { toastError } from '../utils/ToastFreeSetting';

const PasswordFind = () => {
  const navigate = useNavigate();
  const [inputs, onChangeInputs, ClearInputs, onValidator] = useInput({
    phoneNumber: '',
    code: '',
  });
  const [message, setMessage] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [copyMessage, setCopyMessage] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );

  const getPasswordMutation = useMutation(findPassword, {
    // onSuccess: data => {
    //   console.log('data >>>', data);
    //   // data.data.message "새 비밀번호는 ^J6Y)4U3Ww4O&ze 입니다 "
    // },
    // onError: err => {
    //   console.log('err >>>', err);
    // },
  });
  const findPrevPassword = () => {
    if (!onValidator('phoneNumber')) {
      setMessage(true);
      toastError(errorMsg[0]);
      return;
    }
    setOnModal(true);
    getPasswordMutation.mutate({ phoneNumber: inputs.phoneNumber });
  };

  const copyMsgModal = () => {
    setCopyMessage(prev => !prev);
    setTimeout(() => {
      setCopyMessage(prevState => !prevState);
    }, 800);
  };

  const moveToLogin = () => {
    setOnModal(false);
    navigate('/signin');
  };
  // if (getPasswordMutation.isLoading) {
  //   setNewPassword('발급 받는 중중');
  // }

  // if (getPasswordMutation.isSuccess) {
  //   console.log(getPasswordMutation?.data);
  // }

  // useEffect(() => {
  //   if (getPasswordMutation?.data?.data) {
  //     console.log(getPasswordMutation?.data?.data?.message?.split(' ')[2]);
  //     setNewPassword(getPasswordMutation?.data?.data?.message?.split(' ')[2]);
  //   }
  // }, [getPasswordMutation]);
  useEffect(() => {
    SwitchFooter(false);
  }, []);
  return (
    <div className='w-full h-full'>
      {errorMsg && <ToastContainer />}
      <LinkHeader icon destination='/signin'>
        비밀번호 찾기
      </LinkHeader>
      <div className={`fixed inset-0 z-40 ${copyMessage ? '' : 'hidden'}`}>
        <div role='none' className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 f-fc-ic-jc  bg-[#FFFFFF] rounded-md  shadow-lg px-14 py-8'>
          <div className='f-fc-ic gap-2 '>
            <Clip className='blur-none' />
            <div className='w-36 text-center text-sm whitespace-nowrap font-bold leading-4 blur-none'>
              클립보드 복사완료
            </div>
          </div>
        </div>
      </div>
      <div
        className={`animate-emerge fixed z-30 inset-0 ${!onModal && 'hidden'}`}
      >
        <div role='none' className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed flex flex-col justify-center items-center gap-7 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[72px] py-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-center items-center'>
              <PasswordChangeCheck />
            </div>
            <div
              className={`${
                !getPasswordMutation.isSuccess && 'animate-pulse'
              } flex justify-center items-center text-center text-sm font-bold w-[107px]`}
            >
              {getPasswordMutation?.data ? (
                <div className='f-fc-ic-jc gap-1'>
                  임시 비밀번호 {getPasswordMutation.isLoading && '발급 중'}
                  {getPasswordMutation.isSuccess && (
                    <CopyToClipboard
                      text={
                        getPasswordMutation?.data?.data?.message?.split(' ')[2]
                      }
                      onCopy={copyMsgModal}
                    >
                      <div className='f-fr-ic text-base cursor-pointer'>
                        <Clip />
                        &nbsp;
                        {
                          getPasswordMutation?.data?.data?.message?.split(
                            ' ',
                          )[2]
                        }
                      </div>
                    </CopyToClipboard>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <button
            type='button'
            className='px-5 h-8 rounded-md font-bold text-white text-sm bg-mainColor'
            onClick={moveToLogin}
          >
            로그인 하러 가기
          </button>
        </div>
      </div>
      <div className='px-6'>
        <div className='flex flex-col gap-10 pt-14'>
          <p className='w-4/5 text-base leading-5'>
            가입 시 입력한 휴대번호를 통해{' '}
            <span className='block'>임시 비밀번호를 발급받을 수 있습니다.</span>
          </p>
          <div className='relative f-fr-ic'>
            <input
              autoFocus
              type='number'
              name='phoneNumber'
              value={inputs.phoneNumber}
              onChange={onChangeInputs}
              placeholder='휴대폰 번호'
              className='w-80 pb-2  text-xl font-medium border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] placeholder:font-bold '
            />
            <button
              type='button'
              className='absolute top-0 right-2 px-4 py-1 border border-[#777777] rounded-2xl font-semibold text-sm '
              onClick={findPrevPassword}
            >
              발급받기
            </button>
            {!onValidator('phoneNumber') && (
              <span className='error-msg'>{errorMsg[0]}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordFind;
