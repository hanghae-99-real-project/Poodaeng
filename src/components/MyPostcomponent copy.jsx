import React from 'react';
import Headers from './Headers';

function MyPostcomponent() {
  return (
    <div>
      <Headers text icon destination='mypage'>
        내가 작성한 글
      </Headers>
      <div className='flex flex-col px-6 gap-3 h-full overflow-y-scroll'>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPostcomponent;
