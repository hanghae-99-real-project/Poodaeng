import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMyPooBox } from '../api/poobox';
import Headers from './Headers';
import Loading from './common/Loading';
import { dateConvert2 } from '../utils/DateConvert';
import { ReactComponent as MyPageNoResult } from '../assets/images/MyPageNoResult.svg';

function MyPooboxcomponent() {
  const { isLoading, isError, data } = useQuery('poobox', getMyPooBox);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }
  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }
  const pooData = data?.data?.getMyPooData;
  // console.log('mypoobox', data.data.getMyPooData);

  const pooDetailHandler = (
    pooId,
    UserId,
    address,
    content,
    pooPhotoUrl,
    createdAt,
    pooLatitude,
    pooLongitude,
  ) => {
    const params = new URLSearchParams();
    params.append('pooId', pooId);
    params.append('UserId', UserId);
    params.append('address', address);
    params.append('content', content);
    params.append('imageUrl', pooPhotoUrl);
    params.append('createdAt', createdAt);
    params.append('pooLatitude', pooLatitude);
    params.append('pooLongitude', pooLongitude);

    const queryString = params.toString();

    navigate(`/map/${pooId}?${queryString}`);
  };

  return (
    <div className='h-full'>
      <Headers text icon destination='mypage'>
        등록한 푸박스
      </Headers>
      {pooData && pooData.length === 0 ? (
        <div className='h-full w-full f-fc-ic-jc gap-3 relative top-1/3 left-1/2 -translate-x-40 -translate-y-72'>
          <MyPageNoResult />
          <div className='text-[#A0A0A0] font-medium antialiased whitespace-nowrap -translate-x-4'>
            등록한 푸박스가 없습니다.
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3 auto-rows-min auto-cols-min p-4 ml-1'>
          {pooData &&
            pooData.map(item => {
              return (
                <div
                  className='w-40 h-56 overflow-hidden'
                  key={item.id}
                  onClick={() =>
                    pooDetailHandler(
                      item.pooId,
                      item.UserId,
                      item.address,
                      item.content,
                      item.pooPhotoUrl,
                      item.createdAt,
                      item.pooLatitude,
                      item.pooLongitude,
                    )
                  }
                >
                  <div className='w-40 h-40  rounded-lg overflow-auto'>
                    <img
                      src={item.pooPhotoUrl}
                      alt='img'
                      className='w-40 h-40 object-cover'
                    />
                  </div>
                  <div className='mt-1 text-sm font-bold'>{item.address}</div>
                  <div className=' text-xs text-[#969696]'>
                    {dateConvert2(item.createdAt)[0]}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default MyPooboxcomponent;
