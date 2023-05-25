/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoMyPoint } from './Kakaomypoint';
import Tabbar from './Tabbar';

function Maincomponent() {
  const navigate = useNavigate();

  const AlertNavigateHander = () => {
    navigate('/alert');
  };

  return (
    <>
      <div className='flex flex-row justify-between border w-[375px] mt-[30px]'>
        <img
          className='ml-[20px] mt-[20px] mb-[8px] object-contain'
          src='./PooDaeng.png'
          alt='PooDaeng.png'
        />
        <img
          className='mr-[22px] mt-[20px] mb-[20px] object-contain cursor-pointer'
          src='./Group 120.png'
          alt='Alert.png'
          onClick={AlertNavigateHander}
        />
      </div>
      {/* 여기 밑에 height 크기를 지정해줘야 overflow를 인식할 수도 있음. */}
      <div className='max-h-[600px]'>
        <div
          className='flex justify-center items-center w-[373px] h-[150px] border-t border-b cursor-pointer'
          role='none'
          onClick={() => navigate('/events')}
        >
          <div className=''>eventBox</div>
        </div>
        <div>
          <div className='ml-[30px] mt-[10px] font-[700] text-[20px] '>
            내주변푸박스찾기
          </div>
          <div className='ml-[30px] mt-[4px] font-[500] text-[11px] text-[#808080]'>
            지금 내 주변에 있는 푸박스의 위치를 확인하세요.
          </div>
          <div className='w-[330px] h-[155px] border ml-[30px]'>
            <KakaoMyPoint className='w-[330px] h-[155px]' />
            <img
              src='./Ellipse 35.png'
              alt='button'
              className='relative bottom-8 left-[17rem] z-10 cursor-pointer'
              onClick={() => navigate('/map')}
            />
            <img
              src='./Vector 56.png'
              alt='button'
              className='relative bottom-14 left-[17.9rem] z-20'
            />
          </div>
          <div className='border mt-[39px]' />
        </div>
        <div className='mt-[25px] ml-[30px] font-[700]'>내 주변 실종신고</div>
        <div className='ml-[30px] mt-[4px] font-[500] mb-[20px] text-[11px] text-[#808080]'>
          주변의 실종 반려동물들을 찾아주세요.
        </div>
        <div className='flex gap-[10px] w-[370px] h-32 overflow-x-auto ml-[30px]'>
          <div className=' border w-[102px] h-[102px] rounded-xl'>
            board card1
          </div>
          <div className='border w-[102px] h-[102px] rounded-xl'>
            board card2
          </div>
          <div className=' border w-[102px] h-[102px] rounded-xl'>
            board card3
          </div>
        </div>
      </div>
      <Tabbar number='700' />
    </>
  );
}

export default Maincomponent;
