/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { SlMenu } from 'react-icons/sl';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { getPostLost } from '../api/daengFinder';
import { ReactComponent as DaengFinderButton } from '../assets/images/DaengFinderMenu.svg';
import { areaList } from '../data/Areas';
import Card from './DaengFinder/Card';
// eslint-disable-next-line no-unused-vars
import { useLocationStore } from '../zustand/example/zustandAPI';
import Loading from './common/Loading';
import Loading2 from './common/Loading2';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';
// import Tabbar from './Tabbar';

function DaengFindercomponent() {
  const [selectedArea, setSelectedArea] = useState('마포구 연남동');
  const [isShow, setIsShow] = useState(false);
  const [isDetail, setIsDetail] = useState(true);
  const { setLocation } = useLocationStore(
    prev => ({
      setLocation: prev.setLocation,
    }),
    shallow,
  );
  const response = useCurrentLocation();
  const location = response?.location;
  const latitude = location?.latitude;
  const longitude = location?.longitude;
  setLocation(latitude, longitude);

  const navigate = useNavigate();
  const selectAreaHandler = e => {
    const { innerText } = e.target;
    setSelectedArea(innerText);
  };
  const selectOpenHandler = () => {
    setIsShow(prev => !prev);
  };

  const moveToDaengFinderWrite = () => {
    navigate('/daengfinder/write');
  };

  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, error, isError } = useQuery(
    'getPostLost',
    getPostLost,
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log('error >>>', error);
    navigate('/', {
      state: error,
    });
  }

  console.log('daengFindercomponent >>> ', data);
  console.log('data.data>>> ', data.data);

  return (
    <>
      <div className='flex flex-row items-center justify-between h-7 w-[375px]  px-[34px] pb-5 mb-7 border-b shadow-md'>
        <div className='w-[30px]' />
        <div className='font-bold text-xl '>댕 finder</div>
        <RxMagnifyingGlass
          className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
          onClick={() => navigate('/daengfinder/search')}
        />
      </div>
      <div className='w-full flex flex-row justify-between px-5 mb-6'>
        <div
          className={`flex flex-col justify-center relative w-40 h-9  border border-[#ACACAC] shadow-md rounded-md
          after:content-[${(
            <RiArrowUpSFill className='text-amber-300 after:text-sm ' />
          )}] 
          cursor-pointer`}
          onClick={selectOpenHandler}
        >
          {isShow ? (
            <RiArrowUpSFill className='absolute top-1/2 right-1 -translate-y-1/2 text-2xl text-[#ACACAC]' />
          ) : (
            <RiArrowDownSFill className='absolute top-1/2 right-1 -translate-y-1/2 text-2xl text-[#ACACAC]' />
          )}
          <label className='pl-3 text-left cursor-pointer'>
            {selectedArea}
          </label>
          <ul
            className={`${
              isShow ? '' : 'hidden'
            } absolute top-9  text-left z-20 w-full rounded-md bg-white border border-[#ACACAC] shadow-md ${
              isShow ? 'max-h-[350px]' : 'max-h-0'
            } overflow-hidden flex flex-col cursor-pointer`}
          >
            {areaList.map(area => {
              return (
                <li
                  role='none'
                  key={area}
                  value={area}
                  onClick={selectAreaHandler}
                  className='pl-3 z-20 w-full focus:bg-[#ACACAC] hover:bg-[#ACACAC] active:bg-[#ACACAC] '
                >
                  {area}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex flex-row bg-[#F2F2F2] gap-1 p-1'>
          <div
            className={`p-1  ${
              !isDetail ? 'shadow-md rounded-sm bg-[#FFFFFF]' : ''
            } cursor-pointer transition duration-150`}
            onClick={() => setIsDetail(false)}
          >
            <BiCategory
              className={`text-xl  ${
                !isDetail ? 'text-[#0A0A0A]' : 'text-[#CDCDCD]'
              } cursor-pointer transition duration-150`}
            />
          </div>
          <div
            className={`p-1  ${
              isDetail ? 'shadow-md rounded-sm bg-[#FFFFFF]' : ''
            } cursor-pointer transition duration-150`}
            onClick={() => setIsDetail(true)}
          >
            <SlMenu
              className={`text-xl  ${
                isDetail ? 'text-[#0A0A0A]' : 'text-[#CDCDCD]'
              } cursor-pointer transition duration-150`}
            />
          </div>
        </div>
      </div>

      {data?.data.length ? (
        <div
          // 46.6875rem
          className={`${
            isDetail
              ? 'flex flex-col gap-3 h-f w-full px-6 '
              : 'grid grid-cols-2 gap-3 auto-cols-auto px-6'
          } min-h-[35.5rem] overflow-y-scroll `}
        >
          {data?.data?.map(card => {
            return <Card key={card.postId} isDetail={isDetail} data={card} />;
          })}
          {/* <Card isDetail={isDetail} />
        <Card isDetail={isDetail} />
        <Card isDetail={isDetail} />
        <Card isDetail={isDetail} />
        <Card isDetail={isDetail} />
        <Card isDetail={isDetail} /> */}
        </div>
      ) : (
        <div className='h-full w-full f-ic-jc relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <NoResult />
        </div>
      )}
      <div className='relative left-0 right-0 '>
        <DaengFinderButton
          className='absolute bottom-4 left-[6.5rem] cursor-pointer'
          onClick={moveToDaengFinderWrite}
        />
      </div>
    </>
  );
}

export default DaengFindercomponent;
