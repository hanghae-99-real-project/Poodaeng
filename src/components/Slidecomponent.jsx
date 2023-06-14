import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import getDaengMain from '../api/main';
import Loading from './common/Loading';

const SlideComponent = () => {
  const slideRef = useRef({}); // 슬라이드 컨테이너의 참조를 저장하는 useRef 훅을 생성합니다.
  const [currentImgOrder, setCurrentImgOrder] = useState(0); // 현재 이미지의 순서를 저장하는 상태 변수를 생성합니다.
  const IMG_WIDTH = 218; // 이미지의 가로 너비를 설정합니다.
  const slideRange = currentImgOrder * IMG_WIDTH; // 현재 이미지의 순서에 따라 슬라이드 범위를 계산합니다.

  useEffect(() => {
    if (slideRef.current.style) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out'; // 슬라이드 이동에 대한 CSS transition 속성을 설정합니다.
      slideRef.current.style.transform = `translateX(-${slideRange}px)`; // 슬라이드 컨테이너를 X축 방향으로 이동시킵니다.
    }
  }, [currentImgOrder]);

  const moveToNextSlide = () => {
    if (currentImgOrder === 3) return; // 이미지 순서가 마지막 이미지인 경우, 더 이상 이동하지 않습니다.
    setCurrentImgOrder(currentImgOrder + 1.5); // 다음 이미지로 이동하기 위해 currentImgOrder 값을 증가시킵니다.
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return; // 이미지 순서가 첫 번째 이미지인 경우, 더 이상 이동하지 않습니다.
    setCurrentImgOrder(currentImgOrder - 1.5); // 이전 이미지로 이동하기 위해 currentImgOrder 값을 감소시킵니다.
  };

  const { isLoading, isError, data } = useQuery('getDaengMain', getDaengMain);

  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center items-center'>
        <Loading />
      </div>
    );
  }

  console.log(data);

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const daengData = data.data.lostPostsData;
  console.log('daengData>>>>>', daengData);

  return (
    <div className='flex'>
      <button
        onClick={moveToPrevSlide}
        className='absolute bottom-40 left-5 z-10'
      >
        prev
      </button>
      <div className='w-80 h-32 overflow-hidden border mt-4 p-2'>
        <div className='flex w-full gap-3' ref={slideRef}>
          {daengData.map(item => {
            return (
              <div className='w-24 h-24 shrink-0 bg-red-500' key={item.id}>
                <img
                  src={item.lostPhotoUrl[0]}
                  alt='img'
                  className='w-[96px] h-[96px] '
                />
                <div className='font-bold text-sm'>주소</div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={moveToNextSlide}
        className='absolute bottom-40 right-5 z-10'
      >
        next
      </button>
    </div>
  );
};

export default SlideComponent;
