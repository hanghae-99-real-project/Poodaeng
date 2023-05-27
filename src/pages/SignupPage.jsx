import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from 'react-query';
import Headers from '../components/Headers';
import Buttons from '../components/common/Buttons';
import { sendCodeNumber, validateCodeNumber, signUp } from '../api/sendCode';
import { SET_TIMER } from '../redux/modules/timerSlice';
import AuthTimer from '../utils/AuthTimer';
import 'react-toastify/dist/ReactToastify.css';
import useInput from '../hooks/useInput';

function SignUpPage() {
  const [getAuthMode, setGetAuthMode] = useState(false);
  const [checkTimeMode, setCheckTimeMode] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAuthNumber, setIsAuthNumber] = useState(false);
  const [message, setMessage] = useState(false);
  const [inputs, onChangeInputs, onClearInputs, onValidator] = useInput({
    phoneNumber: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    code: '',
  });
  const errorMsg = [
    '번호 형식이 맞지 않습니다.(- 없이 10~11자)',
    '공백은 입력할 수 없습니다.',
    '비밀번호 형식이 맞지 않습니다.',
    '비밀번호가 일치하지 않습니다.',
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* get 인증하기 동시에 모달 진입하면서 */
  const getAuthHandler = async () => {
    console.log(typeof inputs.phoneNumber);
    const response = await sendCodeNumber({ phoneNumber: inputs.phoneNumber });
    console.log('send code response >>> ', response);
    if (response.status === 200) {
      const currentTime = new Date();
      const expireDate = new Date(currentTime.getTime() + 1000 * 60 * 3);
      setCheckTimeMode(true);
      dispatch(SET_TIMER(expireDate));
    } else {
      console.log('send code error >>> ', response);
      setMessage(true);
      toast.error(`휴대폰 인증번호 발송 에러 발생`, {
        // toast.error(`요청한 데이터 형식이 올바르지 않습니다.!`, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
      });
    }
    return response;
  };

  /* number check & form open */
  const checkNumberForm = async () => {
    if (onValidator('phoneNumber')) {
      const response = await getAuthHandler();
      const { status } = response;
      if (status === 200) {
        console.log('메시지 발송완료');
        setGetAuthMode(true);
      } else if (status >= 400) {
        console.log('error response', response);
        console.log('error Message', response.errorMessage);
      }
    } else {
      console.log('전화번호 형식이 맞지 않습니다.');
    }
  };

  /* getRe */
  const getReAuthHandler = async () => {
    /* 기존 거 언마운트 */
    const response = await sendCodeNumber(inputs.phoneNumber);
    if (response.status === 200) {
      setCheckTimeMode(prev => !prev);
      const currentTime = new Date();
      const expireDate = new Date(currentTime.getTime() + 1000 * 60 * 3);
      dispatch(SET_TIMER(expireDate));
      console.log('send code response >>> ', response);
      /* 다시 카운트 */
      setCheckTimeMode(prev => !prev);
    } else {
      console.log('send code error >>> ', response);
      console.log(
        'send code error response.errorMessage>>> ',
        response.errorMessage,
      );
    }
  };

  /* CodeNumber Validation */
  const codeMutation = useMutation(validateCodeNumber, {
    onSuccess: data => {
      console.log('code number validate success');
      console.log('인증 번호 확인 성공 결과 >>>', data);
      setIsAuthNumber(true);
      setGetAuthMode(false);
    },
    onError: error => {
      console.log('code number validate error');
      console.log('인증 번호 확인 실패 결과 >>>', error);
    },
  });

  const codeSendHandler = async () => {
    /* 이거 inputs.code 이벤트 타입 숫자로 오려나? */
    codeMutation.mutate(inputs.code);
  };

  /* register form */
  const mutation = useMutation(signUp, {
    onSuccess: data => {
      console.log('회원가입 제출 res >> ', data);
      onClearInputs();
      navigate('/signin');
    },
    onError: error => {
      console.log('회원가입 제출 error >> ', error);
      setMessage(true);
      toast.error(`회원가입에 실패했습니다.`, {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'sign-up-error-toast',
      });
    },
  });

  const registerHandler = async e => {
    e.preventDefault();
    if (!isAuthNumber) {
      console.log('휴대폰 번호를 인증받으세요!');
      return;
    }
    if (inputs.nickname.trim() === '') {
      console.log('공백은 입력할 수 없습니다.');
      return;
    }
    if (!onValidator('password')) {
      console.log('비밀번호 형식이 맞지 않습니다.');
      return;
    }
    if (!onValidator('passwordConfirm')) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = {
      phoneNumber: inputs.phoneNumber,
      password: inputs.password,
      nickname: inputs.nickname,
      position: localStorage.getItem('agreed'),
    };
    mutation.mutate(result);
  };

  return (
    <div>
      <div className={`fixed z-30 inset-0 ${getAuthMode ? '' : 'hidden'}`}>
        {message && <ToastContainer />}
        <div
          role='none'
          className='absolute inset-0 bg-black opacity-30 '
          onClick={() => setGetAuthMode(false)}
        />
        <div className='fixed flex flex-col items-center bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit px-5 py-10 '>
          <div className='text-xs'>입력하신 번호로 인증번호를 보냈어요</div>
          <div className='text-lg font-bold'>인증번호를 입력해주세요</div>
          <div className='relative flex flex-col gap-1 w-full h-8 py-10 mb-10'>
            <div className='flex flex-row justify-between'>
              <input
                type='number'
                name='code'
                value={inputs.code}
                onChange={onChangeInputs}
                className='w-full'
              />
              <div className='flex flex-row items-center w-fit gap-1'>
                {/* <div className='text-sm text-[#FF4444]'>03:00</div> */}
                {checkTimeMode && <AuthTimer />}
                <button
                  type='button'
                  className='w-16 py-1 border border-[#777777] rounded-md font-semibold text-xs '
                  onClick={getReAuthHandler}
                >
                  재요청
                </button>
              </div>
            </div>
            <div className='w-full  border border-[#777777]' />
          </div>
          <button
            className={`large-button  text-white font-bold text-base ${
              inputs.code
                ? 'bg-mainColor cursor-pointer'
                : 'bg-[#C2C2C2] cursor-not-allowed'
            }`}
            disabled={inputs.code}
            onClick={codeSendHandler}
          >
            인증하기
          </button>
        </div>
      </div>
      <div className='mb-[61px]'>
        <Headers text icon destination='signin'>
          회원가입
        </Headers>
      </div>
      <div className='flex flex-col px-[22px] font-bold text-xl mb-11'>
        <p>푸댕과 함께 </p>
        <p>더 편리한 산책을 시작해볼까요?</p>
      </div>
      <form className='flex flex-col items-center' onSubmit={registerHandler}>
        <div className='flex flex-col items-center gap-10 '>
          {/* <div className='relative flex flex-col after:content-["Goodbye"] after:text-amber-300 after:text-2xl'> */}
          <div className='relative flex flex-col '>
            <input
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
              className='absolute top-0 right-0 px-4 py-1 border border-[#777777] rounded-2xl font-semibold text-sm '
              onClick={checkNumberForm}
            >
              인증하기
            </button>
            {!onValidator('phoneNumber') && (
              <span className='error-msg'>{errorMsg[0]}</span>
            )}
            {/* {checkCodeNumber && (
              <span className='error-msg'>{errorMsg[0]}</span>
            )} */}
          </div>
          <div className='relative flex flex-col '>
            <input
              type='text'
              name='nickname'
              value={inputs.nickname}
              onChange={onChangeInputs}
              placeholder='닉네임'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] after:content-["Byebye"] after:text-amber-300 after:text-sm'
            />
            {onValidator('nickname') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('nickname') && (
              <span className='error-msg'>{errorMsg[1]}</span>
            )}
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={onChangeInputs}
              placeholder='비밀번호'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            {onValidator('password') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('password') && (
              <span className='error-msg'>{errorMsg[2]}</span>
            )}
          </div>
          <div className='relative flex flex-col '>
            <input
              type='password'
              name='passwordConfirm'
              value={inputs.passwordConfirm}
              onChange={onChangeInputs}
              placeholder='비밀번호 확인'
              className='w-80 pb-2 font-bold text-xl border-b border-[#DBDBDB] placeholder:text-[#DBDBDB
                ] '
            />
            {inputs.passwordConfirm && onValidator('passwordConfirm') && (
              <BsCheckLg className='absolute top-0 right-5 text-3xl text-[#76B5FF]' />
            )}
            {!onValidator('passwordConfirm') && (
              <span className='error-msg'>{errorMsg[3]}</span>
            )}
          </div>
        </div>
        <div className='absolute bottom-[52px]'>
          <Buttons type='submit' bgColor='#C2C2C2' textColor='#fff'>
            다음
          </Buttons>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
