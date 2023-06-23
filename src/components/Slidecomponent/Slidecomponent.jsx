/* eslint-disable import/no-unresolved */
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// import required modules
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper'; // Navigation 모듈은 제거합니다.
import getDaengMain from '../../api/main';
import { resetUserInfoLog } from '../../zustand/example/zustandAPI';
// import { resetUserInfoLog } from '../zustand/example/zustandAPI';

export default function Slidecomponent() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('getDaengMain', getDaengMain, {
    onError: error => {
      // console.log('error 여기 에러로그 처리!>>>', error);
      if (error?.response?.status === 403) {
        resetUserInfoLog();
      }
    },
    refetchOnWindowFocus: false,
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
  const pagination = {
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}" style="background-color: #dcdcdc;"></span>`;
    },
  };

  return (
    <Swiper
      pagination={pagination}
      slidesPerView={1}
      spaceBetween={10}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className='w-96 h-56 rounded-xl '
    >
      {daengData?.length > 0 ? (
        daengData?.map(item => {
          return (
            <SwiperSlide
              key={item.postId}
              onClick={() => pooDetailHandler(item.postId)}
              className='cursor-pointer flex items-center justify-center'
            >
              <img
                src={item.lostPhotoUrl[0]}
                alt='사진'
                className='w-full h-44 object-cover rounded-xl'
              />
              <div className='flex items-center font-bold text-sm mt-1 ml-1'>
                실종 위치 &nbsp;
                <span className='font-normal'>{item.address}</span>
              </div>
            </SwiperSlide>
          );
        })
      ) : (
        <div className='flex items-center justify-center w-[95%] h-44 '>
          실종 정보가 없습니다
        </div>
      )}
    </Swiper>
  );
}
