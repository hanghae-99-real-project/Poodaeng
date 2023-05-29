import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from '../api/sendCode';
import Logo from '../components/common/Logo';
import useInput from '../hooks/useInput';
// import { errorMsg } from '../data/inputs';

/* alt shift O = import 정렬 */
function SignInPage() {
  const [isError, setIsError] = useState(true);
  const [message, setMessage] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    phoneNumber: '',
    password: '',
  });
  // const isError = true;
  const navigate = useNavigate();
  const onClose = () => {
    setIsError(false);
  };

  const mutation = useMutation(signIn, {
    onSuccess: data => {
      console.log('login 성공 시 data >>>', data);
      const token = data.headers.authorization.split(' ')[1];
      const decodedToken = jwtDecode(token);
      // console.log("디코드 정보:", decodedToken);
      // eslint-disable-next-line no-unused-vars
      const { sub, exp, auth, username, userId } = decodedToken;
      const expireDate = new Date(exp * 1000); // 날짜단위로 변환해서 넣기.
      Cookies.set('authentication', token, {
        expires: expireDate,
      });
      onClearInputs();
      navigate('/');
    },
    onError: () => {
      toast.error('로그인 실패', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
      setIsError(true);
    },
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log('onSubmitHandler');
    // onClearInputs();
    if (!onValidator('phoneNumber') || !onValidator('password')) {
      setMessage(true);
      toast.error(`유효하지 않은 전화번호 혹은 비밀번호!`, {
        position: toast.POSITION.TOP_CENTER,
        // toastId: 'sign-up-error-toast',
        toastId: 'empty-comment-toast',
      });
      return;
    }
    mutation.mutate({
      phoneNumber: inputs.phoneNumber,
      password: inputs.password,
    });
  };

  const moveToSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <IoIosArrowBack
        className='absolute left-4 top-16 cursor-pointer'
        onClick={() => navigate('/loginsocial')}
      />
      {message && <ToastContainer />}
      <div className={`fixed z-30 inset-0 ${isError ? '' : 'hidden'}`}>
        <div
          role='none'
          className='absolute inset-0 bg-black opacity-30'
          onClick={onClose}
        />
        <div className='fixed flex flex-col justify-center items-center gap-7 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[72px] py-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-center items-center'>
              <BsFillExclamationCircleFill className=' text-[#449AFF] text-5xl ' />
            </div>
            <div className='flex justify-center items-center text-center text-sm font-bold w-[107px]'>
              존재하지 않는 회원 정보입니다.
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
          <Logo st='w-[169px] h-[31px] bg-contain bg-no-repeat mb-2' />
          <div className='text-base font-medium '>
            반려견 배변 처리 위치 정보
          </div>
        </div>
        <form
          className='flex flex-col items-center mb-4'
          onSubmit={onSubmitHandler}
        >
          <div className='flex flex-col items-center gap-6 mb-8'>
            <div className='relative flex flex-col'>
              <input
                type='number'
                name='phoneNumber'
                value={inputs.phoneNumber}
                onChange={onChangeInputs}
                className='w-60 text-base font-bold border-b border-[#CACACA]'
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
                value={inputs.password}
                onChange={onChangeInputs}
                className='w-60 text-base font-bold border-b border-[#CACACA]'
                placeholder='비밀번호'
              />
              {/* {!onValidator('password') && (
                <span className='error-msg'>{errorMsg[2]}</span>
              )} */}
            </div>
          </div>
          <button
            className='w-[240px] h-12 bg-[#449AFF] text-[#FFFFFF] text-base font-bold rounded-md'
            type='submit'
          >
            로그인
          </button>
        </form>
        <div className='flex flex-row  justify-center gap-2 mb-11'>
          <button type='button' className='text-[#959595]'>
            아이디 찾기
          </button>
          <p className='text-[#959595]'>|</p>
          <button type='button' className='text-[#959595]'>
            비밀번호 찾기
          </button>
        </div>
        <div className='w-full flex justify-center items-center'>
          <button
            type='button'
            className=' px-2 text-sm font-bold border-b border-[#CACACA]'
            onClick={moveToSignUp}
          >
            이메일 회원가입
          </button>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
