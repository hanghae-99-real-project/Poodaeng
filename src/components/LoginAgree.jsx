import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Map } from '../assets/images/AgreeScreen.svg';
import { ReactComponent as LogoText } from '../assets/images/Poodaeng.svg';
import { ReactComponent as Poo } from '../assets/images/PurplePoo.svg';
import Loading from './common/Loading';
import { resetUserInfoLog } from '../zustand/example/zustandAPI';

function LoginAgree() {
  const navigate = useNavigate();
  const withAgree = () => {
    localStorage.setItem('agreed', true);
    navigate('/loginsocial');
  };
  const withoutAgree = () => {
    localStorage.setItem('agreed', false);
    navigate('/loginsocial');
  };
  const isLoading = false;

  useEffect(() => {
    resetUserInfoLog();
  }, []);

  return (
    <div className='flex flex-col items-center gap-5'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='f-fc-ic-jc gap-1 '>
            <Poo className='w-7 h-6' />
            <LogoText className='w-20 h-9' />
          </div>
          <div className='f-fc-ic-jc gap-6'>
            <div className='flex flex-col items-center'>
              <Map className='w-56' />
            </div>
            <div>
              <div className='text-xl leading-6 font-extrabold tracking-tighter mb-2'>
                푸댕은 위치기반 서비스예요
              </div>
              <div className='text-xs text-[#000000] text-center leading-4 w-full mb-3 tracking-tight'>
                <p>위치 정보를 제공해주시면 산책하고 있는 곳에서</p>
                <p>가까운 푸박스를 찾아볼 수 있어요!</p>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <button
                type='button'
                className='large-button bg-mainColor text-[#fff]'
                onClick={withAgree}
              >
                동의하고 시작하기
              </button>
              <button
                type='button'
                className='large-button bg-[#C7C7C7] text-[#fff]'
                onClick={withoutAgree}
              >
                위치 정보없이 시작하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginAgree;
