/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import convertCoordinates from '../../../kakao/KakaoApi';
import KakaoMap from '../../../kakao/KakaoMap';
import Loading from '../../common/Loading2';
import { ReactComponent as Marker } from '../../../assets/images/MarkerPurple.svg';

function DaengFinderMap({ setLatLng }) {
  const [markerPotision, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { data, isLoading, error, isError } = useQuery(
    'myData',
    () => convertCoordinates(markerPotision.latitude, markerPotision.longitude),
    {
      refetchOnWindowFocus: false,
    },
  );
  // lazy 업데이트 하기
  if (isLoading) {
    console.log('로딩 중중');
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <Loading />;
  }
  console.log('DaengFinder full data >>>', data);
  console.log(
    'DaengFinder 도로명주소 >>>',
    data.data.documents[0].road_address.address_name,
  );
  /* 이거 걍 위도경도 도로명 주소 zustand로 해버릴까 currentPosition이 아니라 marker 위치로 가져오기 */
  setLatLng({
    lostLatitude: markerPotision.latitude,
    lostLongitude: markerPotision.longitude,
  });
  const adrs = data.data.documents[0].road_address.address_name;

  return (
    <div className='relative w-full h-[45.6875rem]'>
      <div className='absolute f-fr-ic-jc w-full z-50 top-2'>
        <div className='f-fr-ic gap-2 px-5 py-3 font-medium text-base leading-4 bg-white rounded-md'>
          <Marker />
          {adrs}
        </div>
      </div>
      <KakaoMap
        width='w-full'
        height='h-full'
        rounded='rounded-sm'
        getMarkerPosition={setMarkerPosition}
      />
      ;
    </div>
  );
}

export default DaengFinderMap;
