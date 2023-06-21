import React from 'react';
import { Mousewheel, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.css';

const PhotoSlide = ({ daengList }) => {
  return (
    <Swiper
      modules={[Mousewheel, Navigation, Pagination]}
      // slidesPerView='3'
      slidesPerView={1}
      centeredSlides
      // spaceBetween={15}
      // centeredSlides={preview.length > 2}
      // centeredSlides={3}
      // centerInsufficientSlides
      // centeredSlidesBounds
      pagination={{ clickable: true }}
      className='w-full h-full'
      mousewheel
      draggable
      grabCursor
    >
      {daengList.length &&
        daengList.map((daeng, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={idx}>
              <img src={daeng} alt='photoThumb' className='image' />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default PhotoSlide;
