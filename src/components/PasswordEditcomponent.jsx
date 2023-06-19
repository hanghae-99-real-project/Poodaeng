/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { newPutPassword } from '../api/myPage';
import { ReactComponent as SuccessMarker } from '../assets/images/Success.svg';
import Headers from './Headers';

function PasswordEditcomponent() {
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isPasswordValid1, setIsPasswordValid1] = useState(false);
  const [isPasswordValid2, setIsPasswordValid2] = useState(false);

  const passwordMutation = useMutation(newPutPassword, {
    onSuccess: putData => {
      queryClient.invalidateQueries('profile');
      navigate('/mypage');
    },
    onError: errors => {
      // console.log(errors);
    },
  });

  useEffect(() => {
    if (newPassword1 && newPassword2) {
      if (newPassword1 !== newPassword2) {
        setIsPasswordValid2(false);
        setErrorMsg('비밀번호가 일치하지 않습니다');
      } else {
        setIsPasswordValid2(true);
        setErrorMsg('');
        console.log('pw2!!!', isPasswordValid2);
      }
    }
  }, [
    isPasswordValid2,
    newPassword1,
    newPassword2,
    setIsPasswordValid2,
    setErrorMsg,
  ]);

  const passwordChangeHandler = event => {
    const { value, name } = event.target;

    if (name === 'password1') {
      setNewPassword1(value);
      console.log('pw1', value);

      if (
        !/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(value)
      ) {
        setIsPasswordValid1(false);
        setErrorMsg(
          '비밀번호는 영문자, 숫자, 특수문자를 포함한 8~15자여야 합니다',
        );
      } else {
        setIsPasswordValid1(true);
        setErrorMsg('');
      }
    }
    if (name === 'password2') {
      setNewPassword2(value);
      console.log('pw2', value);
    }
  };

  const newPasswordSubmit = () => {
    if (
      !/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
        newPassword2,
      )
    ) {
      setErrorMsg(
        '비밀번호는 영문자, 숫자, 특수문자를 포함한 8~15자여야 합니다',
      );
    } else {
      passwordMutation.mutate(newPassword2);
    }
  };

  return (
    <>
      <Headers text icon destination='mypage'>
        비밀번호 변경
      </Headers>
      <div className='h-full'>
        <div className='flex flex-col gap-5 h-full'>
          <div className='font-bold w-32 mt-10'>
            새로운 비밀번호를 입력해주세요
          </div>
          <div className='flex flex-col items-center'>
            <div className='relative w-80'>
              <input
                type='password'
                onChange={passwordChangeHandler}
                className='w-full py-2 rounded-lg border-b mb-2'
                placeholder=' 새 비밀번호 '
                name='password1'
              />
              {isPasswordValid1 && (
                <div className='absolute right-4 top-5 '>
                  <SuccessMarker />
                </div>
              )}

              <input
                type='password'
                onChange={passwordChangeHandler}
                className='w-full py-2 rounded-lg border-b '
                placeholder=' 새 비밀번호 확인 '
                name='password2'
              />
              {isPasswordValid2 && (
                <div className='absolute right-4 top-14 '>
                  <SuccessMarker />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='sticky bottom-10 w-full h-36 '>
          <div className='flex justify-center w-72 h-12 text-red-500 font-bold'>
            {errorMsg ? (
              <div className='border-box'>{errorMsg}</div>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>

          <button
            onClick={newPasswordSubmit}
            className='bg-mainColor text-white w-full py-2 rounded-lg '
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
}

export default PasswordEditcomponent;
