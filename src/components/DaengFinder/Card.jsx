import DOMPurify from 'dompurify';
import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateConvert2, getDateDiff } from '../../utils/DateConvert';
import ImageFallback from './ImageFallback';

const CardPhoto = lazy(() => import('./CardPhoto'));

function Card({ isDetail, data, linkAddress, justSearch }) {
  const navigate = useNavigate();

  const moveToDetail = () => {
    navigate(`/daengfinder/detail/${data.postId}`, {
      state: {
        destination: linkAddress || '',
      },
      preventScrollReset: true,
    });
  };
  return (
    <div
      className={`flex ${
        isDetail
          ? 'flex-row gap-3 pb-3 border-b border-[#ECECEC]'
          : 'flex-col gap-2'
      } transition duration-300 ease-in-out`}
    >
      <div
        className={`f-ic-jc relative ${
          isDetail ? 'w-24 h-24' : 'w-40 h-40'
        } rounded-lg border  overflow-hidden shadow`}
        onClick={() => !isDetail && moveToDetail()}
      >
        {data.status && (
          <div className='f-ic-jc text-center absolute left-[0.375rem] top-[0.375rem] py-[0.3875em] px-[0.5375em] text-[0.5rem] font-extrabold leading-[0.62375rem] text-mainColor antialiased bg-[#FFFFFF] rounded-xl shadow-lg'>
            찾았어요
          </div>
        )}
        <Suspense fallback={<ImageFallback />}>
          {data.lostPhotoUrl[0] && (
            <CardPhoto
              lostPhotoUrl={data.lostPhotoUrl[0]}
              isDetail={isDetail}
            />
          )}
        </Suspense>
        {/* <img
          // src={`${process.env.PUBLIC_URL}/images/DoggyExample.png`}
          src={data.lostPhotoUrl[0]}
          alt='photoThumb'
          className={`image transition duration-300 ease-in-out ${
            !isDetail && 'hover:scale-110 cursor-pointer'
          }`}
        /> */}
      </div>
      <div
        className={`flex flex-col justify-between ${
          isDetail && 'py-2 cursor-pointer'
        } ${!isDetail && 'gap-1'} `}
        onClick={() => isDetail && moveToDetail()}
      >
        <div className={`flex flex-col gap-1 ${isDetail && 'cursor-pointer'}`}>
          <h1 className='font-bold text-sm antialiased max-w-[14rem] truncate'>
            {data.title}
          </h1>
          {!justSearch && isDetail ? (
            // whitespace-normal 이랑 whitespace-nowrap이랑 똑같다
            // <p className=' text-xs w-56   line-clamp-3'>{data.content}</p>
            <p
              className='text-xs font-medium w-56 antialiased line-clamp-2'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.content, {
                  ALLOWED_TAGS: ['p'],
                }),
              }}
            />
          ) : null}
          {justSearch && (
            <p className=' text-xs w-56 antialiased line-clamp-2'>
              {data.address}
            </p>
          )}
        </div>
        <div>
          <p className='text-xs antialiased font-medium text-[#969696]'>
            {justSearch
              ? dateConvert2(data.createdAt)[0]
              : getDateDiff(data.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
