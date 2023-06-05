import React from 'react';
import { useLocation } from 'react-router-dom';
import Headers from './Headers';
import { ReactComponent as Report } from '../assets/images/report.svg';

function PooDetailcomponent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const address = params.get('address');
  const content = params.get('content');
  const imageUrl = params.get('imageUrl');
  const createdAt = params.get('createdAt');
  const pooId = params.get('pooId');
  const UserId = params.get('UserId');

  // pooId
  // UserId
  // address
  // content
  // imageUrl
  // createdAt

  console.log(
    'address>>>>>>>>',
    address,
    'content>>>>>>>>',
    content,
    'imageUrl>>>>>>>>',
    imageUrl,
    'createdAt>>>>>>>>',
    createdAt,
    'pooId>>>>>>>>',
    pooId,
    'UserId>>>>>>>>',
    UserId,
  );
  return (
    <div>
      <Headers text icon destination='map'>
        푸박스 정보
      </Headers>
      <div>
        <img src={imageUrl} alt='img' className='w-full h-80 border' />
        <div className='flex flex-col justify-between h-96 px-7 py-14'>
          <div className='flex justify-between'>
            <div>
              <div className='font-bold'>주소</div>
              <div>{address}</div>
            </div>
            <Report className='cursor-pointer' />
          </div>
          <div className='flex'>
            <div className='font-bold'>등록 날짜</div>
            &nbsp; <div>{createdAt}</div>
          </div>
          <div>
            <div className='font-bold'>특이사항</div>
            <div>{content}</div>
          </div>
          <button className='bg-mainColor text-white w-full h-12 rounded-xl'>
            여기로 길 찾기 시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default PooDetailcomponent;
