import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Logo from './common/Logo';
import { ReactComponent as Map } from '../assets/images/AgreeScreen.svg';
import { ReactComponent as LogoText } from '../assets/images/Poodaeng.svg';
import { ReactComponent as Poo } from '../assets/images/PurplePoo.svg';
import Loading from './common/Loading';

// function LoginAgree({ setRedirectPage }) {
function LoginAgree() {
  const navigate = useNavigate();
  const withAgree = () => {
    localStorage.setItem('agreed', true);
    navigate('/loginsocial');
    // navigate('/loginsocial', {
    //   state: {
    //     withAgree: true,
    //   },
    // });
  };
  const withoutAgree = () => {
    localStorage.setItem('agreed', false);
    navigate('/loginsocial');
  };
  // const withAgree = () => {
  //   setRedirectPage({
  //     agree: true,
  //     next: true,
  //     social: true,
  //   });
  //   /* 소켓 on 로직 */
  // };
  // const withoutAgree = () => {
  //   setRedirectPage({
  //     agree: false,
  //     next: true,
  //     social: true,
  //   });
  //   /* 소켓 off 로직 */
  // };
  const isLoading = false;

  return (
    <div className='flex flex-col justify-center items-center gap-6 '>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Poo className='w-7 h-6' />
          {/* <Logo st='w-[169px] h-[31px] bg-contain bg-no-repeat mb-3' /> */}
          <LogoText className='w-20 h-9' />
          <div className='flex flex-col items-center'>
            {/* <div className='w-[213px] h-[187px] bg-slate-500 rounded-md' /> */}
            <Map className='w-56' />
          </div>
          <div>
            <div className='text-xl font-bold tracking-tighter mb-2'>
              푸댕은 위치기반 서비스예요
            </div>
            <div className='text-xs text-center leading-4 w-full mb-3 tracking-tight'>
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
              className='large-button bg-[#000000] text-[#fff]'
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
