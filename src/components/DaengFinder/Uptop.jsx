import React from 'react';

const Uptop = ({ useScrollTop, checkScrollTop, scroller }) => {
  // console.log('hi');
  // console.log('useOrNot >>>', useScrollTop);
  // console.log('scrollTop >>>', checkScrollTop);
  // console.log('scroller >>>', scroller);
  const scrollToTop = () => {
    scroller.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button
      className={` ${
        (!useScrollTop || !checkScrollTop) && 'hidden'
      } sticky bottom-24 left-1/2 -translate-x-1/2 px-[0.975em] py-[0.4125em] font-bold text-center text-xs leading-[0.93625rem] text-mainColor rounded-md shadow-md bg-white hover:bg-[#e3d4f2] transition duration-200 ease-linear`}
      onClick={scrollToTop}
    >
      맨 위로 가기
    </button>
  );
};

export default Uptop;
