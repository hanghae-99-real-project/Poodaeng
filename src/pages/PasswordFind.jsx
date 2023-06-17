/* eslint-disable no-unused-vars */
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { sendCodeNumber, validateCodeNumber } from '../api/sendCode';
import useInput from '../hooks/useInput';
import { SET_TIMER } from '../redux/modules/timerSlice';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';
import AuthTimer from '../utils/AuthTimer';
import { toastError } from '../utils/ToastFreeSetting';

const PasswordFind = () => {
  const [inputs, onChangeInputs, ClearInputs, onValidator] = useInput({
    phoneNumber: '',
    code: '',
  });
  const [getAuthMode, setGetAuthMode] = useState(false);
  const [checkTimeMode, setCheckTimeMode] = useState(false);
  const [isAuthNumber, setIsAuthNumber] = useState(false);
  const [message, setMessage] = useState(false);
  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );

  /**
   * @description 여기 api 바꾸셈!!!!!
   */
  const dispatch = useDispatch();
  /* get 인증하기 동시에 모달 진입하면서 */
  const getAuthHandler = async () => {
    console.log(
      'phoneNumber type check opening number form modal >>> ',
      typeof inputs.phoneNumber,
    );
    /**
     * @description 여기 api 바꾸셈!!!!!
     */
    const response = await sendCodeNumber({ phoneNumber: inputs.phoneNumber });
    console.log('send code response >>> ', response);
    return response;
  };

  /* number check & form open */
  const checkNumberForm = async () => {
    if (onValidator('phoneNumber')) {
      const response = await getAuthHandler();
      const { status } = response;
      if (status === 200) {
        const currentTime = new Date();
        const expireDate = new Date(currentTime.getTime() + 1000 * 60 * 3);
        // signUp expireDate check >>> Sun May 28 2023 20:26:05 GMT+0900 (한국 표준시)
        dispatch(SET_TIMER({ expireAt: expireDate }));
        setGetAuthMode(true);
        setCheckTimeMode(true);
      } else {
        console.log('error response opening number form >>> ', response);
        console.log(
          'error Message opening number form >>>',
          response.errorMessage,
        );
        setMessage(true);
        toast.error(`휴대폰 인증번호 발송 에러 발생`, {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'empty-comment-toast',
        });
      }
    } else {
      setMessage(true);
      toastError('전화번호 형식이 맞지 않습니다.');
    }
  };

  /* getRe */
  const getReAuthHandler = debounce(async () => {
    /* setCheckTimeMode 순서와 위치가 중요! */
    setCheckTimeMode(prev => !prev);
    const response = await sendCodeNumber({
      phoneNumber: inputs.phoneNumber,
    });
    if (response.status === 200) {
      /* 기존 거 언마운트 */
      /* state functional update * 2 */
      setCheckTimeMode(prev => !prev);
      const currentTime = new Date();
      const expireDate = new Date(currentTime.getTime() + 1000 * 60 * 3);
      dispatch(SET_TIMER({ expireAt: expireDate }));
      console.log('send code response >>> ', response);
      /* 다시 카운트 */
    } else {
      console.log('send code error >>> ', response);
      console.log(
        'send code error response.errorMessage>>> ',
        response.errorMessage,
      );
    }
  }, 200);

  const closeModal = () => {
    const event = {
      target: {
        name: 'phoneNumber',
        value: '',
      },
    };
    setCheckTimeMode(false);
    setGetAuthMode(false);
    onChangeInputs(event);
  };

  /**
   * @description 여기 api 바꾸셈!!!!!
   */
  /* CodeNumber Validation */
  const codeMutation = useMutation(validateCodeNumber, {
    onSuccess: data => {
      console.log('code number validate success');
      console.log('인증 번호 확인 성공 결과 message>>>', data);
      console.log('인증 번호 확인 성공 결과 >>>', data);
      setCheckTimeMode(false);
      setIsAuthNumber(true);
      setGetAuthMode(false);
    },
    onError: error => {
      console.log('code number validate error');
      console.log('인증 번호 확인 실패 결과 >>>', error);
      setMessage(true);
      toastError(`인증번호 불일치!`);
    },
  });
  const codeSendHandler = () => {
    codeMutation.mutate({
      code: inputs.code,
      phoneNumber: inputs.phoneNumber,
    });
  };

  useEffect(() => {
    SwitchFooter(false);
  }, []);
  return (
    <div className='w-full h-full'>
      <LinkHeader icon destination='/signin'>
        비밀번호 찾기
      </LinkHeader>
      <div className={`fixed z-30 inset-0 ${getAuthMode ? '' : 'hidden'}`}>
        <div
          role='none'
          className='absolute inset-0 bg-black opacity-30 '
          onClick={closeModal}
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
                className='text-center w-full'
              />
              <div className='flex flex-row items-center w-fit gap-3'>
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
            disabled={!inputs.code}
            onClick={codeSendHandler}
          >
            인증하기
          </button>
        </div>
      </div>
      <div className='px-6'>
        <div className='flex flex-col gap-10 pt-14'>
          <p className='w-4/5 text-base leading-5'>
            가입시 입력한 휴대번호를 통해{' '}
            <span className='block'>가입하신 아이디를 확인할 수 있습니다.</span>
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
              onClick={checkNumberForm}
            >
              인증하기
            </button>
            {isAuthNumber && (
              <span className='error-msg text-green-500'>번호 인증완료!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordFind;
