/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import { debounce, throttle } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { SlMenu } from 'react-icons/sl';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { getPostLost } from '../../api/daengFinder';
import { ReactComponent as DaengFinderButton } from '../../assets/images/DaengFinderMenu.svg';
import { ReactComponent as NoResult } from '../../assets/images/NoResult.svg';
import useCurrentLocation from '../../hooks/useCurrentLocation';
// eslint-disable-next-line import/no-useless-path-segments, import/no-cycle
import { ReactComponent as CheckBoxDaengFinder } from '../../assets/images/CheckedPurple.svg';
import useScroll from '../../hooks/useScroll';
import { toastSuccess } from '../../utils/ToastFreeSetting';
import { useLocationStore } from '../../zustand/example/zustandAPI';
import Loading from '../common/Loading';
import Card from './Card';
import { FadeInWhenVisible1 } from './FadeInWhenVisible';

function DaengFindercomponent() {
  const [getNewPage, setGetNewPage] = useState(true);
  const [totalData, setTotalData] = useState([]);

  const [page, setPage] = useState(1);
  const [isDetail, setIsDetail] = useState(true);
  const [alertMsg, setAlertMsg] = useState(false);
  const [total, setTotal] = useState(true);
  const [nextPageElements, setNextPageElements] = useState(true);
  const { setLocation } = useLocationStore(
    prev => ({
      setLocation: prev.setLocation,
    }),
    shallow,
  );
  const navigate = useNavigate();
  const response = useCurrentLocation();
  const loc = useLocation();
  const location = response?.location;
  const latitude = location?.latitude;
  const longitude = location?.longitude;
  const checkRefreshToken = Cookies.get('refreshToken');

  useEffect(() => {
    setLocation(latitude, longitude);
  }, [latitude, longitude]);

  const moveToDaengFinderWrite = () => {
    if (!checkRefreshToken) {
      setAlertMsg(true);
      toast.error('로그인 후 이용해 주세요', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 3000,
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

  // const getPostLostList = async () => {
  //   try {
  //     const res = await getPostLost(page);
  //     console.log('response >>>', res);
  //     totalData.push(...res?.data?.lostPostsData);
  //     setTotalData([...totalData]);
  //     setPage(prevPage => prevPage + 1);
  //     // setGetNewPage(false)
  //   } catch (err) {
  //     console.log('err >>>', err);
  //   }
  // };

  // useEffect(() => {
  //   getPostLostList();
  // }, []);

  // const [ref, inview] = useInView();
  // const scrollRef = useRef();
  // const [ScrollUpTop] = useScroll(
  //   scrollRef,
  //   loc.state?.isScroll,
  //   'scroller',
  //   totalData,
  // );

  // useEffect(() => {
  //   console.log('inView start >>>', inview);
  //   if (inview) {
  //     console.log('page >>>', page);
  //     // setGetNewPage(true);
  //     getPostLostList();
  //   }
  // }, [inview]);

  // const ListAll = totalData;
  // const ListMissing = totalData?.filter(card => card.status === false);

  const { data, isLoading, error, isError } = useQuery(
    // ['getPostLost', page],
    // ['getPostLost', { page }],
    'getPostLost',
    () => getPostLost(page),
    {
      enabled: nextPageElements && getNewPage,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: dt => {
        setGetNewPage(false);
        setPage(prevPage => prevPage + 1);
        console.log('getPostLost success >>>', dt);
        if (dt?.data?.lostPostsData?.length > 0) {
          totalData.push(...dt?.data?.lostPostsData);
          // const sumData = [...totalData, ...data?.data?.lostPostsData];
          // const sumData = totalData.push(...data?.data?.lostPostsData);
          setTotalData([...totalData]);
        }
        if (dt?.data?.lostPostsData?.length < 10) {
          setNextPageElements(false);
        }
      },
      onError: err => {
        // setGetNewPage(false);
        console.log('getPostLost err >>>', err);
      },
    },
  );

  const [ref, inview] = useInView();
  const scrollRef = useRef();
  const [ScrollUpTop] = useScroll(
    scrollRef,
    loc.state?.isScroll,
    'scroller',
    data,
  );

  useEffect(() => {
    console.log('inView start >>>', inview);
    if (inview) {
      console.log('이전 page >>>', page);
      setGetNewPage(true);
    }
  }, [inview]);

  // useEffect(() => {
  //   console.log('data >>>', data);
  //   if (data?.data?.lostPostsData?.length > 0) {
  //     totalData.push(...data?.data?.lostPostsData);
  //     // const sumData = [...totalData, ...data?.data?.lostPostsData];
  //     // const sumData = totalData.push(...data?.data?.lostPostsData);
  //     setTotalData([...totalData]);
  //   }
  // }, [data]);

  useEffect(() => {
    if (loc.state?.deleteComplete) {
      setAlertMsg(true);
      toastSuccess(loc.state?.deleteComplete);
    }
    if (loc.state?.writeComplete) {
      setAlertMsg(true);
      toastSuccess(loc.state?.writeComplete);
    }
  }, []);

  if (isLoading && !totalData.length) {
    return (
      // <div className='w-full h-full flex flex-col justify-center  items-center'>
      //   <Loading />
      // </div>
      <Loading />
    );
  }

  if (isError) {
    navigate('/', {
      state: error,
    });
  }
  // console.log('daengFindercomponent >>> ', data);
  // console.log('data.data>>> ', data?.data);
  // const ListAll = data?.data?.lostPostsData;
  // const ListMissing = data?.data?.lostPostsData?.filter(
  //   card => card.status === false,
  // );

  const ListAll = totalData;
  const ListMissing = totalData?.filter(card => card.status === false);

  return (
    <>
      {alertMsg && <ToastContainer />}
      <div className='relative top-0'>
        <div className='sticky top-0 flex flex-row items-center justify-between h-7 w-[375px]  px-[34px] py-7 mb-7 border-b shadow-md z-50'>
          <div className='w-[30px]' />
          <div className='font-bold text-xl '>댕 finder</div>
          <RxMagnifyingGlass
            className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
            onClick={() => navigate('/daengfinder/search')}
          />
        </div>
      </div>
      <div className='w-full flex flex-row justify-between px-5 mb-3'>
        <div
          className={`z-10 f-fr-ic-jc pl-2 leading-[0.93625rem] font-semibold ${
            total && 'text-[#A3A3A3]'
          } transition duration-300 cursor-pointer`}
          onClick={() => setTotal(!total)}
        >
          <div className='rounded-sm cursor-pointer overflow-hidden hover:scale-110 transition duration-300'>
            <CheckBoxDaengFinder
              className={`${
                total ? 'bg-[#A3A3A3]' : 'bg-mainColor'
              } hover:text-[#BD88F3] transition duration-300`}
            />
          </div>
          &nbsp;찾은 강아지 빼고 보기
        </div>
        <div className='z-10 flex flex-row bg-[#F2F2F2] gap-1 p-1'>
          <div
            className={`p-1  ${
              !isDetail ? 'shadow-md rounded-sm bg-[#FFFFFF]' : ''
            } cursor-pointer transition duration-150`}
            onClick={() => setIsDetail(false)}
          >
            <BiCategory
              className={`text-xl  ${
                !isDetail ? 'text-mainColor' : 'text-[#CDCDCD]'
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
                isDetail ? 'text-mainColor' : 'text-[#CDCDCD]'
              } cursor-pointer transition duration-150`}
            />
          </div>
        </div>
      </div>

      {/* {data?.data?.lostPostsData?.length ? ( */}
      {totalData?.length ? (
        <div
          // 46.6875rem
          ref={scrollRef}
          inview={inview}
          className={`${
            isDetail
              ? 'flex flex-col gap-3  w-full'
              : 'grid grid-cols-2 gap-3 auto-rows-min auto-cols-min'
            // } px-6 h-[38.0625rem] overflow-y-scroll transition duration-300 ease-in-out`}
          } px-6 min-h-[75%]  overflow-y-scroll transition duration-300 ease-in-out`}
          // } px-6 min-h-[75%]  overflow-y-scroll transition duration-300 ease-in-out`}
          // } px-6 min-h-[75%] pb-[5rem] overflow-y-scroll transition duration-300 ease-in-out`}
          // } min-h-[35.5rem] overflow-y-scroll `}
        >
          {/* {total
            ? ListAll?.map((card, idx) => {
                return (
                  <>
                    <Card key={card.postId} isDetail={isDetail} data={card} />
                    {idx === ListAll.length - 1 && <div ref={ref} />}
                  </>
                );
              })
            : ListMissing?.map((card, idx) => {
                return (
                  <>
                    <Card key={card.postId} isDetail={isDetail} data={card} />
                    {idx === ListAll.length - 1 && <div ref={ref} />}
                  </>
                );
              })} */}
          {total
            ? ListAll?.map((card, idx) => {
                return (
                  <FadeInWhenVisible1 key={card.postId}>
                    <Card isDetail={isDetail} data={card} />
                    {idx === ListAll.length - 1 && <div ref={ref} />}
                  </FadeInWhenVisible1>
                );
              })
            : ListMissing?.map((card, idx) => {
                return (
                  <FadeInWhenVisible1 key={card.postId}>
                    <Card isDetail={isDetail} data={card} />
                    {idx === ListAll.length - 1 && <div ref={ref} />}
                  </FadeInWhenVisible1>
                );
              })}
        </div>
      ) : (
        <div className='h-full w-full f-ic-jc relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <NoResult />
        </div>
      )}
      <ScrollUpTop useScrollTop />
      <DaengFinderButton
        className='absolute bottom-20 right-4 cursor-pointer'
        onClick={moveToDaengFinderWrite}
      />
    </>
  );
}

export default DaengFindercomponent;
