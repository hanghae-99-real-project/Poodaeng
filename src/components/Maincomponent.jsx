/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Tabbar from './Tabbar';
// import TmapAPI from './Tmap/TmapAPI';
// import Infowindow from './Tmap/Infowindow';
import Kakaoserch from './Kakaoserch';
import { getPostLost } from '../api/daengFinder';
import Loading from './common/Loading';
// import TmapApi from './TmapApi';

function Maincomponent() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('getPostLost', getPostLost);
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    <div>오류가 발생했습니다.</div>;
  }

  console.log('data >>>', data);

  const AlertNavigateHander = () => {
    navigate('/alert');
  };

  return (
    <>
      <div className='flex flex-row justify-between w-[375px]'>
        <img
          className='ml-[20px] mb-[8px] object-contain'
          src='./images/Logo.png'
          alt='PooDaeng.png'
        />
        <img
          className='mr-[22px] mb-[20px] object-contain cursor-pointer'
          src='./images//Group 120.png'
          alt='Alert.png'
          onClick={AlertNavigateHander}
        />
      </div>
      <div className='max-h-[586px]'>
        <div
          className='flex justify-center items-center w-[375px] h-[150px] ml-[12px] border-t border-b cursor-pointer'
          role='none'
          onClick={() => navigate('/events')}
        >
          <div className=''>
            <img
              className='w-[375px] h-[150px] object-cover'
              src='./images/Event.png'
              alt='eventbanner'
            />
          </div>
        </div>
        <div className='relative'>
          <div className='ml-[30px] mt-[10px] font-[700] text-[20px] '>
            내 주변 푸박스 찾기
          </div>
          <div className='ml-[30px] mt-[4px] font-[500] text-[11px] text-[#808080]'>
            지금 내 주변에 있는 푸박스의 위치를 확인하세요.
          </div>
          <div className='relative w-[330px] h-[155px] border ml-[30px] overflow-y-hidden'>
            <Kakaoserch />
            <div
              className='relative z-50 bg-[#4a3c7b] w-7 h-7 rounded-full bottom-10 left-72'
              onClick={() => navigate('/map')}
            >
              <img
                src='./images/Vector 56.png'
                alt='button'
                className='absolute z-30 top-[50%] left-[53%] -translate-x-1/2 -translate-y-1/2 '
              />
            </div>
          </div>
          <div className='border mt-4' />
        </div>
        <div className='mt-[10px] ml-[30px] font-[700]'>내 주변 실종신고</div>
        <div className='ml-[30px] mt-[4px] font-[500] mb-[20px] text-[11px] text-[#808080]'>
          주변의 실종 반려동물들을 찾아주세요.
        </div>
        <div className='flex gap-[10px] w-[370px] h-52 overflow-x-auto ml-[30px] flex-wrap'>
          {data.data.map(item => (
            <div
              className='border w-[102px] h-[102px] rounded-xl'
              key={item.id}
            >
              <img
                src={item.lostPhotoUrl[0]}
                alt='image'
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='-mt-0.5'>
        <div className='mt-14'>
          <Tabbar />
        </div>
      </div>
    </>
  );
}

export default Maincomponent;
