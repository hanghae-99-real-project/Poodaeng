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

export default function Slidecomponent() {
  const navigate = useNavigate('');
  const { isLoading, isError, data } = useQuery('getDaengMain', getDaengMain);
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
  console.log('main>>>>>>>>>', daengData);
  const pooDetailHandler = postId => {
    navigate(`/daengfinder/detail/${postId}`);
  };

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className='mySwiper w-80 h-40 object-cover'
    >
      {daengData?.length > 0
        ? daengData?.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                onClick={() => pooDetailHandler(item.postId)}
                className='cursor-pointer'
              >
                <img
                  src={item.lostPhotoUrl[0]}
                  alt='사진'
                  className='w-40 h-28 object-cover'
                />
                <div className='font-bold text-xs'>{item.address}</div>
              </SwiperSlide>
            );
          })
        : null}
    </Swiper>
  );
}
