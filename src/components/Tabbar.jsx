/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as PooBox } from '../assets/images/Poobox.svg';
// '../../assets/images/poobox.svg';

function Tabbar() {
  const navigate = useNavigate();
  const [isHome] = useState();
  const [isMap] = useState();
  // const [isDaengFinder, setIsDaengFinder] = useState(false);
  // const [isProfile, setIsProfile] = useState(false);

  const auth = useSelector(store => store.auth);

  const HomeIconHandler = () => {
    navigate('/');
  };

  const MapIconHandler = async () => {
    navigate('/map');
  };
  // 중요한 건 navigate로 넘어갔을 때 tabbar가 가장 상위에서 안쪽 컨텐츠를 감싸고 있는게 아니라면  state는 초기화 된다.
  // 가장 좋은 구조는 아래와 같은 구조가 되어야 한다! 이렇게 해야 Footer가 초기화 되지 않고(Header랑 Footer를 공통으로 가짐) 이전 state를 기억하게 된다.
  // 결국 Outlet은 Header와 Footer를 제외한 페이지를 넘어갈 때마다 달라지는 안쪽 중간의 컨텐츠들을 의미한다.
  // <canvas>
  //   <Header />
  //     <Outlet />
  //   <Footer />
  // </canvas>

  /* functional state update 함수형 업데이트 => 이전 state를 기억(stale closure를 방지) */

  const PooPostIconHandler = () => {
    if (!auth.accessToken) {
      return navigate('/login');
    }
    navigate('/poopost');
  };

  return (
    <div className='relative left-0 bottom-0 border bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        {isHome ? (
          <img
            src='./images/HomeOn.png'
            alt='Home'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={HomeIconHandler}
            role='none'
          />
        ) : (
          <img
            src='./images/HomeOff.png'
            alt='Home'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={HomeIconHandler}
            role='none'
          />
        )}
        {isMap ? (
          <img
            src='./images/MapOn.png'
            alt='Map'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={MapIconHandler}
            role='none'
          />
        ) : (
          <img
            src='./images/MapOff.png'
            alt='Map'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={MapIconHandler}
            role='none'
          />
        )}
        {/* <img
          src={`${process.env.PUBLIC_URL}/images/Poobox.svg`}
          alt='photoThumb'
          className='border w-[45px] h-[41px] rounded-[8px]'
        /> */}
        <PooBox
          className='fill-[#AEAEAE] hover:fill-mainColor w-12 h-12 mt-1'
          onClick={PooPostIconHandler}
        />
        {/* {isPoobox ? (
          <img
            src='./images/PooboxOn.png'
            alt='PooPost'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={PooPostIconHandler}
            role='none'
          />
        ) : (
          <img
            src='./images/PooboxOff.png'
            alt='PooPost'
            className='border w-[45px] h-[41px] rounded-[8px]'
            onClick={PooPostIconHandler}
            role='none'
          />
        )} */}

        <img
          src=''
          alt='DaengFinder'
          className='border w-[45px] h-[41px] rounded-[8px]'
          onClick={() => navigate('/daengfinder')}
          role='none'
        />

        <div
          src=''
          alt='MyPage.png'
          className='border w-[45px] h-[41px] flex items-center justify-center
          rounded-[8px]'
          onClick={() => navigate('/mypage')}
          role='none'
        >
          <div>
            <img
              className='w-9 h-9 rounded-full object-contain bg-cover'
              src='https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202008/17/newsen/20200817160051331jsfk.jpg'
              alt='img'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabbar;
