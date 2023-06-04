/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Badge } from '../assets/images/Badge1.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import KakaoMap from '../kakao/KakaoMap';
import { useClipStore } from '../shared/LinkFooter';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import convertCoordinates from '../kakao/KakaoApi';
// import useCurrentLocation from '../hooks/useCurrentLocation';

function DaengFinderDetail() {
  const [daeng, setDaeng] = useState('/images/DoggyExample.png');
  const [activeBtn, setActiveBtn] = useState(0);
  /* 이거 마커 포지션 안움직일 수도 있으니까 initVal을 현재 위치로 해야 함 */
  const [markerPotision, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  // useCurrentLocation();
  const { onModal, modalComment } = useClipStore(
    state => ({
      onModal: state.onModal,
      modalComment: state.modalComment,
    }),
    shallow,
  );
  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );
  const navigate = useNavigate();

  console.log('markerposition >>> ', markerPotision);
  const imageList = [
    '/images/DoggyExample.png',
    '/images/DoggyExample.png',
    '/images/DoggyExample.png',
    '/images/MockImg.svg',
  ];

  const imageHandler = idx => {
    setDaeng(imageList[idx]);
    setActiveBtn(idx);
  };

  useEffect(() => {
    /* 잘 되는구만 캬캬 */
    const response = convertCoordinates(
      markerPotision.latitude,
      markerPotision.longitude,
    );
    console.log('좌표 변환 값 >>>', response);
  }, [markerPotision.latitude, markerPotision.longitude]);

  useEffect(() => {
    SwitchFooter(true);
  }, []);

  return (
    <div className='h-full w-full'>
      <IoIosArrowBack
        className='absolute z-30 top-7 left-4 text-xl'
        onClick={() => navigate('/daengfinder')}
      />
      <div className={`fixed inset-0 z-30 ${onModal ? '' : 'hidden'}`}>
        <div role='none' className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 f-fc-ic-jc  bg-[#FFFFFF] rounded-md  shadow-lg px-14 py-8'>
          <div className='f-fc-ic gap-2 '>
            <Clip className='blur-none' />
            <div className='w-36 text-center text-sm whitespace-nowrap font-bold leading-4 blur-none'>
              {modalComment}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center relative w-full h-80'>
        <div className='absolute bottom-3 f-fr-jc gap-3'>
          {imageList.map((image, idx) => {
            return (
              <input
                key={image}
                type='button'
                className={`w-2 h-2 rounded-full ${
                  activeBtn === idx ? 'bg-[#FFFFFF]' : 'bg-[#B3B3B3]'
                } cursor-pointer transition duration-150 `}
                onClick={() => imageHandler(idx)}
              />
            );
          })}
        </div>
        <img
          src={`${process.env.PUBLIC_URL}${daeng}`}
          alt='photoThumb'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='bg-[#FFFFFF] px-5 h-[25rem] overflow-y-scroll'>
        <div className='f-fr text-xl font-semibold gap-2 border-b border-solid border-[#ECECEC] py-5'>
          <Badge />
          닉네임
        </div>
        <div className='py-4'>
          <div className='text-xl font-semibold pb-3'>제목제목</div>
          <div className='f-fc gap-2'>
            <p className='text-xs font-bold'>
              반려동물 이름
              <span className='pl-3 font-medium text-xs text-[#515151]'>
                뽀삐
              </span>
            </p>
            <p className='text-xs font-bold'>
              실종 위치{' '}
              <span className='pl-2 font-medium text-xs text-[#515151]'>
                마포구 연남동
              </span>
            </p>
            <p className='text-xs font-bold'>
              실종 시각{' '}
              <span className='pl-2 font-medium text-xs text-[#515151]'>
                2023년 5월 2일 오후 06:00
              </span>
            </p>
          </div>
          <div className='pt-5'>
            <p className='font-medium text-xs leading-5 text-[#8C8C8C]'>
              우리 강아지는 하얗고 귀여운 말티즈 뽀삐예요우리 강아지는 하얗고
              귀여운 말티즈 뽀삐예요우리 강아지는 하얗고 귀여운 말티즈 뽀삐예요{' '}
            </p>
          </div>
          <div className='pt-5'>
            <label className='text-xs font-bold mb-2'>상세위치</label>
            <KakaoMap
              width='w-80'
              height='h-36'
              rounded='rounded-sm'
              getMarkerPosition={setMarkerPosition}
            />
            <div className='pt-5 f-fr gap-2 parent font-medium text-xs text-[#969696]'>
              <span>2023.05.03</span>
              <span>|</span>
              <span>조회 34 회</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaengFinderDetail;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="col-start-1 col-end-5 p-1 bg-mainPurple rounded-l-md"></div> */
}
