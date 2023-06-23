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
        <div className='f-fc-ic relative'>
          <HomeIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 ${
              location.pathname === '/' ? 'fill-mainColor' : ''
            } -translate-y-[0.6rem] cursor-pointer`}
            onClick={() => handleIconClick('/', 'home')}
          />
          <text className='absolute left-1/2 -translate-x-1/2 top-[1.375rem] antialiased text-sm whitespace-nowrap'>
            홈
          </text>
        </div>
        <div className='f-fc-ic relative'>
          <MapIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 ${
              location.pathname === '/map' ? 'fill-mainColor' : ''
            } -translate-y-[0.6rem] cursor-pointer`}
            onClick={() => handleIconClick('/map', 'map')}
          />
          <text className='absolute left-1/2 -translate-x-1/2 top-[1.375rem] antialiased text-sm whitespace-nowrap'>
            지도
          </text>
        </div>
        <div className='f-fc-ic relative'>
          <PooBox
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 ${
              location.pathname.includes('/poopost') ||
              location.pathname.includes('/poolanding')
                ? 'fill-mainColor'
                : ''
            } -translate-y-[0.6rem] cursor-pointer`}
            onClick={() => handleIconClick('/poolanding', 'poopost')}
          />
          <text className='absolute left-1/2 -translate-x-1/2 top-[1.375rem] antialiased text-sm whitespace-nowrap'>
            푸박스
          </text>
        </div>
        <div className='f-fc-ic relative'>
          <DaengIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 ${
              location.pathname === '/daengfinder' ? 'fill-mainColor' : ''
            } -translate-y-[0.6rem] cursor-pointer`}
            onClick={() => handleIconClick('/daengfinder', 'daengfinder')}
          />
          <text className='absolute left-1/2 -translate-x-1/2 top-[1.375rem] antialiased text-sm whitespace-nowrap'>
            댕파인더
          </text>
        </div>
        <div className='f-fc-ic relative'>
          <ProfileIcon
            className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 ${
              location.pathname === '/mypage' ? 'fill-mainColor' : ''
            } -translate-y-[0.6rem] cursor-pointer`}
            onClick={() => handleIconClick('/mypage', 'mypage')}
          />
          <text className='absolute left-1/2 -translate-x-1/2 top-[1.375rem] antialiased text-sm whitespace-nowrap'>
            내 정보
          </text>
        </div>
      </div>
    </div>
  );
}

export default Tabbar;
