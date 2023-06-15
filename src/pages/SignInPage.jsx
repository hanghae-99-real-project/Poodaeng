import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
// eslint-disable-next-line import/no-cycle
import { signIn } from '../api/sendCode';
import { ReactComponent as DaengPoo } from '../assets/images/DaengPoo.svg';
import { ReactComponent as Logo } from '../assets/images/Poodaeng.svg';
import useCurrentLocation from '../hooks/useCurrentLocation';
import useInput from '../hooks/useInput';

const initialState = {
  authenticated: false,
  userId:
    parseInt(JSON.parse(localStorage.getItem('userId'))?.state?.userId, 10) ||
    null,
  accessToken: null,
  expireTime: null,
};
const store = set => ({
  /** @description tokenState가 변경되면 initialState도 변경이 되는가? get()으로 접근이 가능한가? */
  tokenState: initialState,
  setToken: (userId, accessToken, acExpireDate) => {
    console.log('값 체크. 초기화 값은 절대 변경되면 안 됨. >>>', initialState);
    set(
      () => ({
        tokenState: {
          authenticated: true,
          userId,
          accessToken,
          expireTime: acExpireDate,
        },
      }),
      false,
      'setToken',
    );
  },
  deleteToken: () => {
    console.log('초기화 값인지 체크 >>>', initialState);
    set(() => ({
      tokenState: { ...initialState, userId: null },
    }));
  },
});

const persistTokenStore = persist(store, {
  name: 'userId',
  partialize: state => ({ userId: state.tokenState.userId }),
});

export const tokenStore = create(
  process.env.NODE_ENV !== 'production'
    ? devtools(persistTokenStore, { name: 'tokenStore' })
    : persistTokenStore,
);

/* alt shift O = import 정렬 */
function SignInPage() {
  const geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 3600 * 24, // 24 hour
  };
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(false);
  const { location, error } = useCurrentLocation(geoLocationOptions);
  const { setToken } = tokenStore(
    state => ({ setToken: state.setToken }),
    shallow,
  );

  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    phoneNumber: '',
    password: '',
  });
  const navigate = useNavigate();
  const onClose = () => {
    setIsError(false);
  };

  const mutation = useMutation(signIn, {
    onSuccess: async data => {
      console.log('login 성공 시 data >>>', data);
      /* Bearer 실종사건 */
      // const token = data.data.split(' ')[1];
      const { accessToken, refreshToken } = data.data;
      const decodedAcToken = await jwtDecode(accessToken);
      const decodedRfToken = await jwtDecode(refreshToken);

      console.log('decodedAcToken >>>', decodedAcToken);
      console.log('decodedRfToken >>>', decodedRfToken);

      const { exp: RF_EXP } = decodedRfToken;
      const rfExpireDate = new Date(RF_EXP * 1000);
      console.log('rfExpireDate >>>', rfExpireDate);
      Cookies.set('refreshToken', refreshToken, {
        expires: rfExpireDate,
      });
      const { exp: AC_EXP, userId } = decodedAcToken;
      console.log('이거 초 단위인가?  >>> ', AC_EXP);
      // const expireDate = new Date(AC_EXP * 1000); // 날짜단위로 변환해서 넣기.(ms 단위로 변환해서 넣기)
      const acExpireDate = AC_EXP * 1000; // ms 단위로 변환(?)해서 넣기
      console.log('expireDate type 확인', typeof acExpireDate);
      setToken(userId, accessToken, acExpireDate);

      onClearInputs();
      navigate('/');
    },
    onError: err => {
      console.log(err);
      setIsError(true);
    },
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log('onSubmitHandler activated');
    console.log('location >>> ', location);
    console.log('error >>> ', error);
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
      return;
    }

    if (!onValidator('phoneNumber') || !onValidator('password')) {
      setMessage(true);
      toast.error(`유효하지 않은 전화번호 혹은 비밀번호!`, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
      return;
    }
    console.log('latitude >>>', location.latitude);
    console.log('longitude >>>', location.longitude);
    const agreeCheck = localStorage.getItem('agreed') === 'true';
    mutation.mutate({
      phoneNumber: inputs.phoneNumber,
      password: inputs.password,
      position: agreeCheck,
      userLatitude: agreeCheck ? location.latitude : null,
      userLongitude: agreeCheck ? location.longitude : null,
    });
  };

  const moveToSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <IoIosArrowBack
        className='absolute left-4 top-16 text-4xl cursor-pointer'
        onClick={() => navigate('/loginsocial')}
      />
      {message && <ToastContainer className='absolute top-5' />}
      <div className={`fixed z-30 inset-0 ${isError ? '' : 'hidden'}`}>
        <div
          role='none'
          className='absolute inset-0 bg-black opacity-30'
          onClick={onClose}
        />
        <div className='fixed flex flex-col justify-center items-center gap-7 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[72px] py-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-center items-center'>
              <BsFillExclamationCircleFill className=' text-mainColor text-5xl ' />
            </div>
            <div className='flex justify-center items-center text-center text-sm font-bold w-[107px]'>
              {/* 존재하지 않는 회원 정보입니다. */}
              미등록 전화번호 혹은 비밀번호 불일치
            </div>
          </div>
          <button
            type='button'
            className='w-20 h-8 rounded-md font-bold text-white text-sm bg-[#B0B0B0]'
            onClick={onClose}
          >
            돌아가기
          </button>
        </div>
      </div>
      <div className='flex flex-col h-full justify-center items-center mb-7 '>
        <div className='flex flex-col items-center mb-[78px] '>
          <div className='f-fc-ic gap-3'>
            <DaengPoo className='w-24 h-16 translate-x-2' />
            <Logo className='w-28 h-14 mb-2' />
          </div>
        </div>
        <form
          className='flex flex-col items-center mb-4'
          onSubmit={onSubmitHandler}
        >
          <div className='flex flex-col items-center gap-6 mb-8'>
            <div className='relative flex flex-col'>
              <input
                autoFocus
                autoComplete='true'
                type='number'
                name='phoneNumber'
                value={inputs.phoneNumber}
                onChange={onChangeInputs}
                className='w-60 text-base font-bold placeholder:text-[#CACACA] py-1 border-b border-[#CACACA]'
                placeholder='휴대폰 번호'
              />
              {/* {!onValidator('phoneNumber') && (
                <span className='error-msg'>{errorMsg[0]}</span>
              )} */}
            </div>
            <div className='relative flex flex-col'>
              <input
                type='password'
                name='password'
                autoComplete='true'
                value={inputs.password}
                onChange={onChangeInputs}
                className='w-60 text-base font-bold placeholder:text-[#CACACA] py-1 border-b border-[#CACACA]'
                placeholder='비밀번호'
              />
              {/* {!onValidator('password') && (
                <span className='error-msg'>{errorMsg[2]}</span>
              )} */}
            </div>
          </div>
          <button
            className='w-[240px] h-12 bg-mainColor text-[#FFFFFF] text-base font-bold rounded-md'
            type='submit'
          >
            로그인
          </button>
        </form>
        <div className='flex flex-row  justify-center gap-2 mb-11'>
          <button type='button' className='text-[#959595]'>
            비밀번호 찾기
          </button>
          <p className='text-[#959595]'>|</p>
          <button
            type='button'
            className='text-[#959595]'
            onClick={moveToSignUp}
          >
            회원가입 하기
          </button>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
