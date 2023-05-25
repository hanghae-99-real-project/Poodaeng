import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Logo from './common/Logo';
import Loading from './Loading';

function LoginAgree({ setRedirectPage }) {
  // const navigate = useNavigate();
  const withAgree = () => {
    setRedirectPage({
      agree: true,
      next: true,
      social: true,
    });
    /* 소켓 on 로직 */
  };
  const withoutAgree = () => {
    setRedirectPage({
      agree: false,
      next: true,
      social: true,
    });
    /* 소켓 off 로직 */
  };
  const isLoading = false;

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Logo st='w-[169px] h-[31px] bg-contain bg-no-repeat mb-3' />
          <div className='flex flex-col items-center gap-4'>
            <div className='w-[213px] h-[187px] bg-slate-500 rounded-md' />
            <div className='text-xl font-bold'>푸댕은 위치기반 서비스예요</div>
          </div>
          <div className='text-sm w-[240px] mb-3'>
            위치 정보 관련 문구 위치 정보 관련 문구위치 정보 관련 문구위치 정보
            관련 문구위치 정보 관련 문구위치 정보 관련 문구 위치 정보 관련
            문구위치 정보 관련 문구위치
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <button
              className='large-button bg-[#449AFF] text-[#fff]'
              type='button'
              onClick={withAgree}
            >
              동의하고 시작하기
            </button>
            <button
              className='large-button bg-[#CBCBCB] text-[#fff]'
              type='button'
              onClick={withoutAgree}
            >
              위치 정보없이 시작하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginAgree;
