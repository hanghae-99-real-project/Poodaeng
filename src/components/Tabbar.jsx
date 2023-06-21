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
    setIsActive(iconName);
  };
  return (
    <div className='sticky bottom-0 border bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <HomeIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            location.pathname === '/' ? 'fill-mainColor' : ''
          }`}
          onClick={() => handleIconClick('/', 'home')}
        />
        <MapIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            location.pathname === '/map' ? 'fill-mainColor' : ''
          }`}
          onClick={() => handleIconClick('/map', 'map')}
        />
        <PooBox
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            location.pathname === '/poopost' ? 'fill-mainColor' : ''
          }`}
          onClick={() => handleIconClick('/poopost', 'poopost')}
        />
        <DaengIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            location.pathname === '/daengfinder' ? 'fill-mainColor' : ''
          }`}
          onClick={() => handleIconClick('/daengfinder', 'daengfinder')}
        />
        <ProfileIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            location.pathname === '/mypage' ? 'fill-mainColor' : ''
          }`}
          onClick={() => handleIconClick('/mypage', 'mypage')}
        />
      </div>
    </div>
  );
}

export default Tabbar;
