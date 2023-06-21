/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.css';
// import { Mousewheel, Navigation, Pagination } from 'swiper';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { Mousewheel, Pagination } from 'swiper';
import { ReactComponent as DaengFinderWriteCancelPhoto } from '../../../assets/images/DaengFinderWriteCancelPhoto.svg';

const DaengFinderPhotoBox = ({ imageHandler, preview, deleteImage }) => {
  const renderSlides = () => {
    // if (preview.length === 0) {
    //   return (
    //     <SwiperSlide>
    //       <label
    //         htmlFor='image-adder'
    //         title='사진등록은 최소 1개이상! 밑으로 스크롤 해보세요!'
    //         className='f-ic-jc w-28 h-28 bg-[#C7C7C7] rounded-md cursor-pointer'
    //       >
    //         <input
    //           className='hidden'
    //           id='image-adder'
    //           multiple
    //           accept='image/*'
    //           type='file'
    //           onChange={imageHandler}
    //         />
    //         <AiOutlinePlusSquare />
    //       </label>
    //     </SwiperSlide>
    //   );
    // }

    return preview.map((prv, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SwiperSlide key={index} className='w-full h-28'>
        <div className='relative w-28 h-28 rounded-md overflow-hidden'>
          <label
            htmlFor='image-adder'
            title='사진등록은 최소 1개이상! 밑으로 스크롤 해보세요!'
            className='absolute inset-0 cursor-pointer'
          >
            <input
              className='hidden'
              id='image-adder'
              multiple
              accept='image/*'
              type='file'
              onChange={imageHandler}
            />
            <img src={prv} alt='photoThumb' className='image' />
          </label>
          <DaengFinderWriteCancelPhoto
            className='absolute z-10 right-0 top-0 cursor-pointer shadow-sm'
            onClick={e => deleteImage(e, index)}
          />
        </div>
      </SwiperSlide>
    ));
  };
  //   return (
  //     <SwiperSlide>
  //       {preview.map((prv, index) => {
  //         return (
  //           <div key={index} className='w-fit f-fr-ic'>
  //             <div className='relative w-28 h-28 rounded-md overflow-hidden'>
  //               <label
  //                 htmlFor='image-adder'
  //                 title='사진등록은 최소 1개이상! 밑으로 스크롤 해보세요!'
  //                 className='absolute inset-0 cursor-pointer'
  //               >
  //                 <input
  //                   className='hidden'
  //                   id='image-adder'
  //                   multiple
  //                   accept='image/*'
  //                   type='file'
  //                   onChange={imageHandler}
  //                 />
  //                 <img src={prv} alt='photoThumb' className='image' />
  //               </label>
  //               <DaengFinderWriteCancelPhoto
  //                 className='absolute z-10 right-0 top-0 cursor-pointer shadow-sm'
  //                 onClick={e => deleteImage(e, index)}
  //               />
  //             </div>
  //             {preview.length - 1 === index && (
  //               <div className='w-28 h-28'>
  //                 <label
  //                   htmlFor='image-adder'
  //                   title='사진등록은 최소 1개이상! 밑으로 스크롤 해보세요!'
  //                   className='f-ic-jc w-28 h-28 bg-[#C7C7C7] rounded-md cursor-pointer'
  //                 >
  //                   <input
  //                     className='hidden'
  //                     id='image-adder'
  //                     multiple
  //                     accept='image/*'
  //                     type='file'
  //                     onChange={imageHandler}
  //                   />
  //                   <AiOutlinePlusSquare />
  //                 </label>
  //               </div>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </SwiperSlide>
  //   );
  // };
  // return preview.map((prv, index) => (
  //   // eslint-disable-next-line react/no-array-index-key
  //   <SwiperSlide key={index} className='w-full h-28'>
  //     <div className='relative w-28 h-28 rounded-md overflow-hidden'>
  //       <label
  //         htmlFor='image-adder'
  //         title='사진등록은 최소 1개이상! 밑으로 스크롤 해보세요!'
  //         className='absolute inset-0 cursor-pointer'
  //       >
  //         <input
  //           className='hidden'
  //           id='image-adder'
  //           multiple
  //           accept='image/*'
  //           type='file'
  //           onChange={imageHandler}
  //         />
  //         <img src={prv} alt='photoThumb' className='image' />
  //       </label>
  //       <DaengFinderWriteCancelPhoto
  //         className='absolute z-10 right-0 top-0 cursor-pointer shadow-sm'
  //         onClick={e => deleteImage(e, index)}
  //       />
  //     </div>
  //   </SwiperSlide>
  // ));
  // };

  return (
    <>
      <div className='w-28 h-28'>
        <label
          htmlFor='image-adder'
          title='사진등록은 최소 1개이상! 옆으로 스크롤 해보세요!'
          className='f-ic-jc w-28 h-28 bg-[#C7C7C7] rounded-md cursor-pointer'
        >
          <input
            className='hidden'
            id='image-adder'
            multiple
            accept='image/*'
            type='file'
            onChange={imageHandler}
          />
          <AiOutlinePlusSquare />
        </label>
      </div>
      <Swiper
        modules={[Mousewheel, Pagination]}
        // slidesPerView='3'
        slidesPerView={1}
        spaceBetween={16}
        // centeredSlides={preview.length > 1}
        // style={{ scrollMarginBlockStart: 0, scrollMarginBlockEnd: 0 }}
        // centeredSlides={3}
        // centerInsufficientSlides
        // centeredSlidesBounds
        // pagination={{ clickable: true }}
        width={100}
        pagination
        // height={112}
        mousewheel
        draggable
        className={`w-full ${preview.length === 1 && 'm-0'}`}
      >
        {renderSlides()}
      </Swiper>
    </>
  );
};

export default DaengFinderPhotoBox;
