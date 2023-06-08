/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useSelector } from 'react-redux';
import { ReactComponent as PooBox } from '../assets/images/Poobox.svg';
import { ReactComponent as HomeIcon } from '../assets/images/home.svg';
import { ReactComponent as MapIcon } from '../assets/images/Map.svg';
import { ReactComponent as DaengIcon } from '../assets/images/daengfinder.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/myprofile.svg';

function Tabbar() {
  const navigate = useNavigate();
  // const { accessToken } = useSelector(store => store.auth);
  const refreshToken = Cookies.get('refreshToken');
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
    if (!refreshToken) {
      return navigate('/login');
    }
    navigate('/poopost');
  };

  const DaengIconHandler = () => {
    if (!refreshToken) {
      return navigate('/login');
    }
    navigate('/daengfinder');
  };

  const ProfileIconHandler = () => {
    if (!refreshToken) {
      return navigate('/login');
    }
    navigate('/mypage');
  };

  return (
    <div className='relative left-0 bottom-0 border bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <HomeIcon
          className='fill-[#AEAEAE] hover:fill-mainColor w-10 h-10 mt-1'
          onClick={HomeIconHandler}
        />
        <MapIcon
          className='fill-[#AEAEAE] hover:fill-mainColor w-10 h-10 mt-1'
          onClick={MapIconHandler}
        />
        <PooBox
          className='fill-[#AEAEAE] hover:fill-mainColor w-10 h-10 mt-1'
          onClick={PooPostIconHandler}
        />
        <DaengIcon
          className='fill-[#AEAEAE] hover:fill-mainColor w-10 h-10 mt-1'
          onClick={DaengIconHandler}
        />
        <ProfileIcon
          className='fill-[#AEAEAE] hover:fill-mainColor w-10 h-10 mt-1'
          onClick={ProfileIconHandler}
        />
      </div>
    </div>
  );
}

export default Tabbar;
