/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as PooBox } from '../assets/images/Poobox.svg';
// '../../assets/images/poobox.svg';

function Tabbar({ homeState = true, mapState = false, pooState = false }) {
  const navigate = useNavigate();
  const [isHome] = useState(homeState);
  const [isMap] = useState(mapState);
  const [isPoobox] = useState(pooState);
  // const [isDaengFinder, setIsDaengFinder] = useState(false);
  // const [isProfile, setIsProfile] = useState(false);

  const location = useLocation(); // 현재 페이지로 넘어왔을 때 넘어온 값을 뽑아줌. 검색 키워드 : react-router-dom V6 useLocation, navigate, Outlet
  const { state } = location;
  console.log('페이지 넘어왔을 때 location state >>>', state); // 맨 처음 초기값 null -> state에 아무것도 안 담겨있다. // navigate로 넘어온 값을 false true false로 찍는다.

  const HomeIconHandler = () => {
    navigate('/');
    // setIsHome(true);
    console.log('home', isHome);
    console.log('map', isMap);
    console.log('poobox', isPoobox);
    navigate('/', {
      state: {
        /** @check_point */
        homeState: true, // true
        mapState: false, // true
        pooState: false, // false
      },
    });
  };

  const MapIconHandler = async () => {
    // setIsHome(homeState);
    // setIsMap(mapState); // false -> true
    // setIsPoobox(pooState);
    console.log('넘어가기 전의 state');
    console.log('home', isHome); // true
    console.log('map', isMap); // false
    console.log('poobox', isPoobox); // false
    // 중요한 건 navigate로 넘어갔을 때 tabbar가 가장 상위에서 안쪽 컨텐츠를 감싸고 있는게 아니라면  state는 초기화 된다.
    // 가장 좋은 구조는 아래와 같은 구조가 되어야 한다! 이렇게 해야 Footer가 초기화 되지 않고(Header랑 Footer를 공통으로 가짐) 이전 state를 기억하게 된다.
    // 결국 Outlet은 Header와 Footer를 제외한 페이지를 넘어갈 때마다 달라지는 안쪽 중간의 컨텐츠들을 의미한다.
    // <canvas>
    //   <Header />
    //     <Outlet />
    //   <Footer />
    // </canvas>
    navigate('/map', {
      state: {
        /** @check_point */
        homeState: false, // true
        mapState: true, // true
        pooState: false, // false
      },
    });

    /* functional state update 함수형 업데이트 => 이전 state를 기억(stale closure를 방지) */
  };

  const PooPostIconHandler = () => {
    navigate('/poopost');
    // setIsPoobox(true);
    console.log('home', isHome);
    console.log('map', isMap);
    console.log('poobox', isPoobox);
  };
  return (
    <div className='absolute left-0 bottom-0 border bg-[#FFFFFF] z-20'>
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
