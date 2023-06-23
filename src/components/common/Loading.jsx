import React from 'react';
import { ReactComponent as LogoText } from '../../assets/images/Poodaeng.svg';
import { ReactComponent as Poo } from '../../assets/images/PurplePoo.svg';
// import Loading3 from './Loading3';
// import Logo from './common/Logo';

function Loading() {
  return (
    // <div className='relative inset-0 flex flex-col items-center justify-between bg-gradient-to-r from-mainColor from-[20.87%] to-purple-600 to-[100%] default:transition duration-150 rounded-2xl'>
    <div className='w-full h-full flex flex-col items-center justify-between bg-gradient-to-r from-mainColor from-[20.87%] to-purple-600 to-[100%] default:transition duration-150 rounded-2xl'>
      {/* <div
        className='logo-div'
        style={{ backgroundImage: `url(/images/PooDaeng.svg)` }}
      /> */}
      {/* <img
        className='px-24 pt-40 '
        src={`${process.env.PUBLIC_URL}/images/LoadingText.svg`}
        alt='photoThumb'
      /> */}
      <div className='f-fc-ic gap-3 mt-40 w-full'>
        <Poo width='2.201875rem' height='1.9125rem' fill='#FFFFFF' />
        <LogoText width='8.75rem' height='4.34625rem' fill='#FFFFFF' />
      </div>
      {/* <Loading3 /> */}
      <div className='relative bottom-0 f-fc-ic w-full h-fit'>
        <img
          className='absolute pb-28 z-20 animate-bounce motion '
          src={`${process.env.PUBLIC_URL}/images/DogPoo.svg`}
          alt='photoThumb'
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/WhiteDog.svg`}
          alt='photoThumb'
        />
      </div>
      {/* <img
        className='w-[121px] h-[115px] object-cover z-10 border rounded-md'
        src={`${process.env.PUBLIC_URL}/images/testImage.jpg`}
        alt='photoThumb'
      /> */}
      {/* <img
        className='w-14 h-14 object-cover z-10'
        src='/images/testImage.jpg'
        alt='photoThumb'
      /> */}
    </div>
  );
}

export default Loading;
