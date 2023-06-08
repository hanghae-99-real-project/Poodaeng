/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Marker } from '../../../assets/images/MarkerPurple.svg';
import convertCoordinates from '../../../kakao/KakaoApi';
import KakaoMap from '../../../kakao/KakaoMap';
import { useLocationStore } from '../../../zustand/example/zustandAPI';
import Loading from '../../common/Loading2';

function DaengFinderMap({ latlng, setLatLng }) {
  // console.log('latlng >>>', latlng);

  // let currentPosition;
  // navigator.geolocation.getCurrentPosition(pos => {
  //     const latitude = pos?.coords?.latitude;
  //     const longitude = pos?.coords?.longitude;
  //     currentPosition= { latitude, longitude };
  //     // setLatLng({ lostLatitude: latitude, lostLongitude: longitude });
  //   });

  const { setRoadAddress } = useLocationStore(
    state => ({
      setRoadAddress: state.setRoadAddress,
    }),
    shallow,
  );

  const { data, isLoading, error, isError } = useQuery(
    'myData',
    // () => convertCoordinates(markerPotision.latitude, markerPotision.longitude),
    // () => convertCoordinates(latlng.lostLongitude, latlng.lostLatitude),
    () => convertCoordinates(latlng.lostLongitude, latlng.lostLatitude),
    {
      // enabled: !latlng.lat && !latlng.lng,
      refetchOnWindowFocus: false,
      // refetchOnMount: true,
      onSuccess: d => {
        console.log(
          'onSuccess >>>',
          d.data.documents[0].road_address.address_name,
        );
        setRoadAddress(d?.data?.documents[0]?.road_address?.address_name);
      },
      onError: e => {
        console.log('onError >>>', e);
      },
    },
  );
  // lazy 업데이트 하기
  if (isLoading) {
    // console.log('로딩 중');
    return (
      /** @absolute inset0으로 잡아야 하나? */
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }
  // console.log('DaengFinder full data >>>', data);
  // console.log(
  //   'DaengFinder 도로명주소 >>>',
  //   data?.data?.documents[0]?.road_address?.address_name,
  // );

  /* 이거 걍 위도경도 도로명 주소 zustand로 해버릴까 currentPosition이 아니라 marker 위치로 가져오기 */
  const adrs = data?.data?.documents[0]?.road_address?.address_name;

  return (
    <div className='relative w-full h-[45.6875rem]'>
      {adrs && (
        <div className='absolute f-fr-ic-jc w-full z-50 top-2'>
          <div className='f-fr-ic gap-2 px-5 py-3 font-medium text-base leading-4 bg-white rounded-md'>
            <Marker />
            {/* {!errMessage && adrs} */}
            {adrs}
          </div>
        </div>
      )}
      <KakaoMap
        width='w-full'
        height='h-full'
        rounded='rounded-sm'
        getMarkerPosition={setLatLng}
      />
      ;
    </div>
  );
}

export default DaengFinderMap;
