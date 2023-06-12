import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as MapIcon } from '../assets/images/Map.svg';
import { ReactComponent as PooBox } from '../assets/images/Poobox.svg';
import { ReactComponent as DaengIcon } from '../assets/images/daengfinder.svg';
import { ReactComponent as HomeIcon } from '../assets/images/home.svg';
import { ReactComponent as ProfileIcon } from '../assets/images/myprofile.svg';

function Tabbar({ isActive, setIsActive }) {
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refreshToken');

  console.log('active', isActive);

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
      navigate('/login');
    } else {
      navigate('/mypage');
    }
    setIsActive('mypage');
  };

  return (
    <div className='absolute left-0 bottom-0 border bg-[#FFFFFF] z-20'>
      <div className='flex justify-evenly items-center w-[375px] h-[65px] shadow-sm'>
        <HomeIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            isActive === 'home' ? 'fill-mainColor' : ''
          }`}
          onClick={HomeIconHandler}
        />
        <MapIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            isActive === 'map' ? 'fill-mainColor' : ''
          }`}
          onClick={MapIconHandler}
        />
        <PooBox
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            isActive === 'poopost' ? 'fill-mainColor' : ''
          }`}
          onClick={PooPostIconHandler}
        />
        <DaengIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            isActive === 'daengfinder' ? 'fill-mainColor' : ''
          }`}
          onClick={DaengIconHandler}
        />
        <ProfileIcon
          className={`fill-[#AEAEAE] hover:fill-mainColor w-7 h-7 mt-1 ${
            isActive === 'mypage' ? 'fill-mainColor' : ''
          }`}
          onClick={ProfileIconHandler}
        />
      </div>
    </div>
  );
}

export default Tabbar;
