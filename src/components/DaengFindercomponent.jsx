import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { SlMenu } from 'react-icons/sl';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { getPostLost } from '../api/daengFinder';
import { ReactComponent as DaengFinderButton } from '../assets/images/DaengFinderMenu.svg';
import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';
import useCurrentLocation from '../hooks/useCurrentLocation';
import useScroll from '../hooks/useScroll';
import { toastSuccess } from '../utils/ToastFreeSetting';
import { useLocationStore } from '../zustand/example/zustandAPI';
import Card from './DaengFinder/Card';
import Loading from './common/Loading';

function DaengFindercomponent() {
  const [isDetail, setIsDetail] = useState(true);
  const [alertMsg, setAlertMsg] = useState(false);
  // useScroll('scroller', true);
  const { setLocation } = useLocationStore(
    prev => ({
      setLocation: prev.setLocation,
    }),
    shallow,
  );
  const response = useCurrentLocation();
  const loc = useLocation();
  const location = response?.location;
  const latitude = location?.latitude;
  const longitude = location?.longitude;
  const checkRefreshToken = Cookies.get('refreshToken');
  setLocation(latitude, longitude);

  const navigate = useNavigate();
  // const selectAreaHandler = e => {
  //   const { innerText } = e.target;
  //   setSelectedArea(innerText);
  // };
  // const selectOpenHandler = () => {
  //   setIsShow(prev => !prev);
  // };

  const moveToDaengFinderWrite = () => {
    if (!checkRefreshToken) {
      setAlertMsg(true);
      toast.error('로그인 후 이용해 주세요', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    navigate('/daengfinder/write');
  };

  const { data, isLoading, error, isError } = useQuery(
    'getPostLost',
    getPostLost,
    {
      refetchOnWindowFocus: false,
    },
  );

  useScroll('scroller', loc.state?.isScroll, data);

  useEffect(() => {
    if (loc.state?.deleteComplete) {
      setAlertMsg(true);
      toastSuccess(loc.state.deleteComplete);
    }
  }, []);

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
      {alertMsg && <ToastContainer />}
      <div className='flex flex-row items-center justify-between h-7 w-[375px]  px-[34px] pb-5 mb-7 border-b shadow-md'>
        <div className='w-[30px]' />
        <div className='font-bold text-xl '>댕 finder</div>
        <RxMagnifyingGlass
          className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
          onClick={() => navigate('/daengfinder/search')}
        />
      </div>
      <div className='w-full flex flex-row justify-between px-5 mb-3'>
        <div role='none' />

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

      {data?.data?.lostPostsData?.length ? (
        <div
          // 46.6875rem
          id='scroller'
          className={`${
            isDetail
              ? 'flex flex-col gap-3  w-full'
              : 'grid grid-cols-2 gap-3 auto-cols-auto'
          } px-6 min-h-[75%] pb-[5rem] overflow-y-scroll `}
          // } min-h-[35.5rem] overflow-y-scroll `}
        >
          {data?.data?.lostPostsData?.map(card => {
            return <Card key={card.postId} isDetail={isDetail} data={card} />;
          })}
        </div>
      ) : (
        <div className='h-full w-full f-ic-jc relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <NoResult />
        </div>
      )}
      <div className='relative w-full bottom-16 '>
        <DaengFinderButton
          className='absolute bottom-4 right-4 cursor-pointer'
          onClick={moveToDaengFinderWrite}
        />
      </div>
    </>
  );
}

export default DaengFindercomponent;
