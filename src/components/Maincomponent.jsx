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
import { ReactComponent as NextBt } from '../assets/images/NextBt.svg';

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

  console.log(data.data.lostPostsData);
  if (isError) {
    <div>오류가 발생했습니다.</div>;
  }

  const AlertNavigateHander = () => {
    navigate('/alert');
  };

  return (
    <>
      <div className='flex flex-row justify-between w-96'>
        <img
          className='ml-5 mb-2 object-contain'
          src='./images/Logo.png'
          alt='PooDaeng.png'
        />
        <img
          className='mr-5 mb-5 object-contain cursor-pointer'
          src='./images//Group 120.png'
          alt='Alert.png'
          onClick={AlertNavigateHander}
        />
      </div>
      <div className='max-h-[586px]'>
        <div
          className='flex justify-center items-center w-auto h-40 ml- border-t border-b cursor-pointer'
          role='none'
          onClick={() => navigate('/events')}
        >
          <div className=''>
            <img
              className='w-96 h-40 object-cover'
              src='./images/Event.png'
              alt='eventbanner'
            />
          </div>
        </div>
        <div className='relative'>
          <div className='ml-7 mt-3 font-[700] text-xl '>
            내 주변 푸박스 찾기
          </div>
          <div className='ml-7 mt-1 font-[500] text-xs text-[#808080] mb-1'>
            지금 내 주변에 있는 푸박스의 위치를 확인하세요.
          </div>
          <div className='relative w-[340px] h-40 border ml-4 overflow-y-hidden'>
            <Kakaoserch />
            <div
              className='relative left-60 bottom-10 flex items-center justify-center z-50 bg-white w-20 h-7 rounded-md text-xs text-mainColor font-bold shadow-xl'
              onClick={() => navigate('/map')}
            >
              <div>지도 보기</div>
              <NextBt className='ml-1' />
            </div>
          </div>
          <div className='border mt-4' />
        </div>
        <div className='ml-7 mt-3 font-[700] text-xl'>내 주변 실종신고</div>
        <div className='ml-7 mt-1 font-[500] text-xs text-[#808080] mb-1'>
          주변의 실종 반려동물들을 찾아주세요.
        </div>
        <div className='flex gap-3 w-auto justify-center h-52 overflow-x-auto flex-wrap'>
          {data.data.length > 0
            ? data?.data?.map(item => (
                <div className='border w-24 h-24 rounded-xl' key={item.id}>
                  <img
                    src={item.lostPhotoUrl[0]}
                    alt='image'
                    className='w-full h-full object-cover'
                  />
                </div>
              ))
            : null}
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
