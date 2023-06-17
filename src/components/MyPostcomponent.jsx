/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { getMyBookMark, getMyPost } from '../api/myPage';
import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';
import { tokenStore } from '../pages/SignInPage';
import { toastError } from '../utils/ToastFreeSetting';
import Card from './DaengFinder/Card';
import Headers from './Headers';
import Loading from './common/Loading';

function MyPostcomponent({ BookmarkMode }) {
  const [errorMsg, setErrorMsg] = useState(false);
  const { userId } = tokenStore(
    state => ({
      userId: state.tokenState.userId,
    }),
    shallow,
  );
  const navigate = useNavigate();

  // const result = useQueries([
  //   {
  //     queryKey: ['getMyPost', userId],
  //     queryFn: getMyPost,
  //     onSuccess: successData => {
  //       console.log('successData >>>', successData);
  //     },
  //     onError: errorData => {
  //       console.log('errorData >>>', errorData);
  //       setErrorMsg(true);
  //       toastError('데이터를 불러오는 데 실패 했습니다.');
  //     },
  //     refetchOnWindowFocus: false,
  //     enabled: !BookmarkMode,
  //   },
  //   {
  //     queryKey: ['getMyBookMark', userId],
  //     queryFn: getMyBookMark,
  //     onSuccess: successData => {
  //       console.log('successData >>>', successData);
  //     },
  //     onError: errorData => {
  //       console.log('errorData >>>', errorData);
  //       setErrorMsg(true);
  //       toastError('데이터를 불러오는 데 실패 했습니다.');
  //     },
  //     refetchOnWindowFocus: false,
  //     enabled: BookmarkMode,
  //   },
  // ]);
  // result.some(result => result.isLoading);

  const {
    isLoading,
    data: postData,
    isError,
    error,
  } = useQuery(['getMyPost', userId], getMyPost, {
    onSuccess: successData => {
      // console.log('successData >>>', successData);
    },
    onError: errorData => {
      // console.log('errorData >>>', errorData);
      setErrorMsg(true);
      toastError('데이터를 불러오는 데 실패 했습니다.');
    },
    refetchOnWindowFocus: false,
    enabled: BookmarkMode === false,
  });

  const {
    isLoading: bookMarkIsLoading,
    data: bookmarkData,
    isError: bookmarkIsError,
    error: bookmarkError,
  } = useQuery(['getMyBookMark', userId], getMyBookMark, {
    onSuccess: successData => {
      // console.log('successData >>>', successData);
    },
    onError: errorData => {
      // console.log('errorData >>>', errorData);
      setErrorMsg(true);
      toastError('데이터를 불러오는 데 실패 했습니다.');
    },
    refetchOnWindowFocus: false,
    enabled: BookmarkMode === true,
  });

  if (isLoading || bookMarkIsLoading) {
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError || bookmarkIsError) {
    navigate('/mypage', {
      state: error || bookmarkError,
    });
  }
  // console.log('data depth myPostData check >>>', postData);
  // console.log('data depth myBookmarkData check >>>', bookmarkData);
  const data = BookmarkMode ? bookmarkData : postData;
  const dataDeep = BookmarkMode
    ? data?.data?.getMyBookmarkData
    : data?.data?.mypagePosts;

  return (
    <>
      <Headers text icon destination='mypage'>
        {BookmarkMode ? '북마크' : '내가 작성한 글'}
      </Headers>
      {errorMsg && <ToastContainer />}
      {/* {data?.data?.mypagePosts?.length ? ( */}
      {dataDeep?.length ? (
        <div
          // 46.6875rem
          // h-[69.95%]
          className='flex flex-col gap-3 w-full h-full pt-4 pb-[20%] px-6
          overflow-y-scroll'
        >
          {/* {data?.data?.mypagePosts?.map(card => { */}
          {dataDeep?.map(card => {
            return (
              <Card
                key={card.postId}
                isDetail
                data={card}
                linkAddress={BookmarkMode ? '/mybookmark' : '/mypost'}
              />
            );
          })}
        </div>
      ) : (
        <div className='h-full w-full f-ic-jc relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <NoResult />
        </div>
      )}
    </>
  );
}

export default MyPostcomponent;
