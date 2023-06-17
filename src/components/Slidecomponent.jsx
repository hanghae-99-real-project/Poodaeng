/* eslint-disable import/no-unresolved */
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper'; // Navigation 모듈은 제거합니다.
import getDaengMain from '../api/main';
import { resetUserInfoLog } from '../zustand/example/zustandAPI';
// import { resetUserInfoLog } from '../zustand/example/zustandAPI';

export default function Slidecomponent() {
  const navigate = useNavigate('');
  const { isLoading, isError, data } = useQuery('getDaengMain', getDaengMain, {
    onError: error => {
      if (error.response.status === 403) {
        resetUserInfoLog();
      }
    },
  });
  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center items-center'>
        {/* <Loading /> */} 로딩중 입니다.
      </div>
    );
  }
  if (isError) {
    return <div>실종 정보가 없습니다</div>;
  }

  const daengData = data?.data?.lostPostsData;
  // console.log('main>>>>>>>>>', data.data.lostPostsData);
  const pooDetailHandler = postId => {
    navigate(`/daengfinder/detail/${postId}`);
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className='mySwiper w-80 h-52 object-cover'
    >
      {daengData?.length > 0
        ? daengData?.map(item => {
            return (
              <SwiperSlide
                key={item.postId}
                onClick={() => pooDetailHandler(item.postId)}
                className='cursor-pointer'
              >
                <img
                  src={item.lostPhotoUrl[0]}
                  alt='사진'
                  className='w-80 h-44 object-cover'
                />
                <div className='flex items-center font-bold text-sm mt-1 ml-1'>
                  실종 위치 : {item.address}
                </div>
              </SwiperSlide>
            );
          })
        : null}
    </Swiper>
  );
}
