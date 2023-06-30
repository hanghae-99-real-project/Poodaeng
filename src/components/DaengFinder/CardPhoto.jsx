import React, { useEffect, useRef, useState } from 'react';
import ImageFallback from './ImageFallback';

let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

const onIntersection = (entries, io) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const CardPhoto = ({ lostPhotoUrl, isDetail, scrollRef }) => {
  const imgRef = useRef(null);
  // const [isLoad, setIsLoad] = useState(true);
  const [isLoad, setIsLoad] = useState(Boolean(lostPhotoUrl));
  // const observer = useRef(null);
  /**
   * @description CustomEvent : event를 직접 정의해서 사용할 수 있도록 해준다. 해당 이벤트를 발생시킴.
   * 문제: onIntersection 함수는 첫 번째 이미지 내부 함수
   * 다른 이미지들에 대해서는 제대로 동작하지 않는다.
   *
   * 해결방법: onIntersection 함수를 밖으로 분리. 함수 외부에서 호출 가능한 방법 찾아야 함.-> CustomEvent 사용
   * 첫 번째 인자는 type(event 이름 지정 하는 거)
   */

  useEffect(() => {
    const loadImage = () => {
      setIsLoad(true);
    };
    const newLoadImage = () => {
      setIsLoad(false);
    };
    // if (!observer.current) {
    //   observer.current = new IntersectionObserver(onIntersection, {
    //     rootMargin: '0px 0px 50px 0px',
    //   });
    // }

    const ImgEL = imgRef.current;
    if (ImgEL) {
      ImgEL.addEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    }
    return () => {
      if (ImgEL) {
        ImgEL.removeEventListener(LOAD_IMG_EVENT_TYPE, newLoadImage);
      }
    };
    // if (ImgEL) {
    //   observer.current.observe(ImgEL);
    //   ImgEL.addEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    // }
    // return () => {
    //   if (ImgEL) {
    //     ImgEL.removeEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    //   }
    // };
  }, [lostPhotoUrl]);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, {
        root: scrollRef.current || null,
        rootMargin: '200px',
      });
    }
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    // return () => {
    //   observer.disconnect();
    // };
  }, [lostPhotoUrl]);

  return (
    <div className='w-full h-full'>
      {isLoad ? (
        <img
          ref={imgRef}
          src={lostPhotoUrl}
          alt='photoThumb'
          loading='lazy'
          className={`image transition duration-300 ease-in-out ${
            !isDetail && 'hover:scale-110 cursor-pointer'
          }`}
        />
      ) : (
        <ImageFallback />
      )}
    </div>
  );
};

export default CardPhoto;
