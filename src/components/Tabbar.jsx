/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { ReactComponent as DaengIcon } from '../assets/images/newDaengfinder.svg';
import { ReactComponent as HomeIcon } from '../assets/images/newHome.svg';
import { ReactComponent as MapIcon } from '../assets/images/newMap.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/newMyprofile.svg';
import { ReactComponent as PooBox } from '../assets/images/newPoobox.svg';
import { tokenStore } from '../pages/SignInPage';

function Tabbar({ setIsActive }) {
  const navigate = useNavigate();
  const location = useLocation();

  const refreshToken = Cookies.get('refreshToken');

  // console.log('active', isActive);
  const { deleteToken } = tokenStore(
    state => ({
      deleteToken: state.deleteToken,
    }),
    shallow,
  );

  const HomeIconHandler = () => {
    navigate('/');
    setIsActive('home');
  };

  const MapIconHandler = () => {
    navigate('/map');
    setIsActive('map');
  };

  const PooPostIconHandler = () => {
    if (!refreshToken) {
      deleteToken();
      navigate('/login');
    } else {
      navigate('/poopost');
    }
    setIsActive('poopost');
  };

  const DaengIconHandler = () => {
    navigate('/daengfinder');
    setIsActive('daengfinder');
  };

  const ProfileIconHandler = () => {
    if (!refreshToken) {
      navigate('/unknown');
    } else {
      navigate('/mypage');
    }
    setIsActive('mypage');
  };

  const handleIconClick = (route, iconName) => {
    navigate(route);
  };
  return (
    <div className='sticky bottom-0 bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <div data-homeicon-tooltip='푸댕 메인페이지'>
          <HomeIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
              location.pathname === '/' ? 'fill-mainColor' : ''
            } cursor-pointer`}
            onClick={() => handleIconClick('/', 'home')}
          />
        </div>
        <div data-mapicon-tooltip='푸박스 네비게이션을 이용할 수 있어요.'>
          <MapIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
              location.pathname === '/map' ? 'fill-mainColor' : ''
            } cursor-pointer`}
            onClick={() => handleIconClick('/map', 'map')}
          />
        </div>
        <div data-poobox-tooltip='푸박스 위치를 등록할 수 있어요.'>
          <PooBox
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
              location.pathname.includes('/poopost') ||
              location.pathname.includes('/poolanding')
                ? 'fill-mainColor'
                : ''
            } cursor-pointer`}
            onClick={() => handleIconClick('/poolanding', 'poopost')}
          />
        </div>
        <div data-daengicon-tooltip='실종 반려견 리스트를 볼 수 있어요.'>
          <DaengIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
              location.pathname === '/daengfinder' ? 'fill-mainColor' : ''
            } cursor-pointer`}
            onClick={() => handleIconClick('/daengfinder', 'daengfinder')}
          />
        </div>
        <div data-mypage-tooltip='푸댕 마이페이지'>
          <ProfileIcon
            className={` fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
              location.pathname === '/mypage' ? 'fill-mainColor' : ''
            } cursor-pointer`}
            onClick={() => handleIconClick('/mypage', 'mypage')}
          />
        </div>
      </div>
    </div>
  );
}

export default Tabbar;
