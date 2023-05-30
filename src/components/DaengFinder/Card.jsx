import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ isDetail }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex ${
        isDetail
          ? 'flex-row gap-3 py-3 border-b border-[#ECECEC]'
          : 'flex-col gap-2'
      }  `}
      onClick={() => navigate('/daengfindDetail')}
    >
      <div
        className={`${
          isDetail ? 'w-24 h-24' : 'w-40 h-40'
        }  border border-[#9E9E9E]`}
      >
        <img src='' alt='photoThumb' />
      </div>
      <div className={`flex flex-col justify-center gap-2 `}>
        <div className='flex flex-col gap-1'>
          <h1 className='font-bold text-sm truncate'>
            방금 말티즈를 발견했어요
          </h1>
          {isDetail ? (
            <p className=' text-xs w-56  whitespace-normal line-clamp-3'>
              강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요. 강아지가
              저를 물었어요. 저도 그래서 강아지를 물었어요. 강아지가 저를
              물었어요. 저도 그래서 강아지를 물었어요. 강아지가 저를 물었어요.
              저도 그래서 강아지를 물었어요.
            </p>
          ) : null}
        </div>
        <div>
          <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
