import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Marker } from '../../../assets/images/MarkerPurple.svg';
import convertCoordinates from '../../../kakao/KakaoApi';
import KakaoMap from '../../../kakao/KakaoMap';
import { useLocationStore } from '../../../zustand/example/zustandAPI';

function DaengFinderMap({ latlng, setLatLng }) {
  const [adrs, setAdrs] = useState();
  const { setRoadAddress } = useLocationStore(
    state => ({
      setRoadAddress: state.setRoadAddress,
    }),
    shallow,
  );

  useEffect(() => {
    if (latlng.lostLongitude && latlng.lostLatitude) {
      const something = async () => {
        await convertCoordinates(
          latlng.lostLongitude,
          latlng.lostLatitude,
        ).then(d => {
          // console.log(d);
          const rdAd = d.data?.documents[0]?.road_address?.address_name;
          const ad = d.data?.documents[0]?.address?.address_name;
          setAdrs(rdAd || ad);
          setRoadAddress(rdAd || ad);
        });
        // .catch(err => console.log(err));
      };
      something();
    }
  }, [latlng]);

  return (
    <div className='relative w-full h-[47.6875rem]'>
      {adrs && (
        <div className='absolute f-fr-ic-jc w-full z-50 top-2'>
          <div className='f-fr-ic gap-2 px-5 py-3 font-medium text-base leading-4 bg-white rounded-md'>
            <Marker />
            {adrs}
          </div>
        </div>
      )}
      <KakaoMap
        width='w-full'
        height='h-full'
        rounded='rounded-sm'
        getMarkerPosition={setLatLng}
        clickable
      />
    </div>
  );
}

export default DaengFinderMap;
