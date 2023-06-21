import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactComponent as Landing } from '../assets/images/Landing.svg';
import { ReactComponent as Exclamation } from '../assets/images/Exclamation.svg';

function PoopostLanding() {
  const navigate = useNavigate(false);
  const refreshToken = Cookies.get('refreshToken');

  return (
    <div className='flex flex-col items-center h-full w-96 px-1 '>
      <div className='absolute flex justify-center h-7 py-3 z-10 w-full font-bold text-xl'>
        푸박스 등록
      </div>
      <Landing className='relative' />
      <div className='flex flex-col py-9 px-5 gap-4'>
        <div className='font-bold text-xl '>
          함께 만들어가는 반려견 배변 문화
        </div>
        <div className='font-normal text-base'>
          푸박스는 서울시에서 설치한 배변 봉투함 및 배변 처리가 가능한
          쓰레기통을 칭하는 말이예요! 함께 더 편리한 산책을 즐길 수 있도록
          발견한 푸박스의 위치와 사진을 공유해주세요.
        </div>
      </div>
      <div
        className='large-button flexCenter bg-mainColor text-white mt-20 cursor-pointer'
        onClick={() => navigate('/poopost')}
      >
        시작하기
      </div>
      {!refreshToken && (
        <div className='fixed inset-0 flex z-30 items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center bg-white w-80 h-auto p-10 rounded-lg gap-5'>
            <div className='flex flex-col items-center gap-4'>
              <Exclamation className='mt-14' />
              <div className='flex flex-col items-center font-bold text-xl w-40'>
                <div>푸박스 등록은 </div>
                <div>회원만 할 수 있어요!</div>
              </div>
            </div>
            <div className='flex flex-col w-full gap-3 mt-10 mb-12'>
              <button
                className='bg-[#C7C7C7] text-white font-bold py-3 px-4 rounded-lg w-full '
                onClick={() => navigate('/')}
              >
                돌아가기
              </button>
              <button
                className='bg-mainColor text-white font-bold py-3 px-4 rounded-lg w-full '
                onClick={() => navigate('/login')}
              >
                로그인 / 회원가입
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoopostLanding;
