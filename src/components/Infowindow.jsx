import React from 'react';

function InfoWindow({ address, content, pooId, userId, imageUrl, createdAt }) {
  console.log(address);
  console.log(content);
  console.log(pooId);
  console.log(userId);
  console.log(imageUrl);
  console.log(createdAt);

  // 인포 윈도우 닫기
  const closeInfoWindow = () => {
    console.log('닫기');
  };

  return (
    <div className='p-10 w-270 h-200 flex flex-col gap-10 border border-black rounded-10'>
      <div>
        <div className='flex justify-center space-between'>
          <div className='flex gap-5'>
            <div className='text-2xl font-bold'>푸박스 정보</div>
          </div>
          <div className='flex'>
            <div onClick={closeInfoWindow} className='cursor-pointer'>
              X
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <img src='' alt='img' className='w-24 h-24 border border-gray-500' />
        <div className='flex flex-col'>
          <div className='m-2'>
            <div className='font-bold text-sm'>주소</div>
            <div className='text-xs'>{address}</div>
          </div>
          <div className='m-2'>
            <div className='font-bold text-sm'>특이사항</div>
            <div className='text-xs'>{content}</div>
          </div>
        </div>
      </div>
      <div className='flex gap-10'>
        <div
          onClick={console.log('1')}
          className='flex justify-center items-center cursor-pointer rounded-lg w-28 h-8 bg-gray-500 text-white font-bold'
        >
          상세 보기
        </div>
        <div
          onClick={console.log('길찾기')}
          className='flex justify-center items-center cursor-pointer rounded-lg w-28 h-8 bg-indigo-700 text-white font-bold'
        >
          길 찾기
        </div>
      </div>
    </div>
  );
}

export default InfoWindow;
