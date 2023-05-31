import React from 'react';
import { ReactComponent as Badge } from '../assets/images/Badge1.svg';
import KakaoMap from '../kakao/KakaoMap';

function DaengFinderDetail() {
  return (
    <div className='h-full w-full bg-yellow-300'>
      <div className='flex items-center justify-center relative w-full h-80 mb-4'>
        <img src='' alt='photoThumb' className='object-cover w-full h-full' />
      </div>
      <div className='bg-[#FFFFFF] px-5 h-[24.5rem] overflow-y-scroll'>
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
            <KakaoMap width='w-80' height='h-36' rounded='rounded-sm' />
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
