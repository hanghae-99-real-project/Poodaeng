import React, { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import { getMyBookMark, getMyPost } from '../api/myPage';
// import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';
import { tokenStore } from '../pages/SignInPage';
import { toastError, toastSuccess } from '../utils/ToastFreeSetting';
import { ReactComponent as MyPageNoResult } from '../assets/images/MyPageNoResult.svg';
import Card from './DaengFinder/Card';
import Headers from './Headers';
import Loading from './common/Loading';

function MyPostcomponent({ BookmarkMode, deleteComplete }) {
  const [errorMsg, setErrorMsg] = useState(false);
  const { userId } = tokenStore(
    state => ({
      userId: state.tokenState.userId,
    }),
    shallow,
  );
  const navigate = useNavigate();

  const res = useQueries([
    {
      queryKey: ['getPostLost', Number(userId), 'getMyPost'],
      queryFn: getMyPost,
      onSuccess: () => {
        if (deleteComplete) {
          setErrorMsg(true);
          toastSuccess(deleteComplete);
        }
      },
      onError: () => {
        // console.log('errorData >>>', errorData);
        setErrorMsg(true);
        toastError('데이터를 불러오는 데 실패 했습니다.');
      },
      refetchOnWindowFocus: false,
      enabled: BookmarkMode === false,
    },
    {
      queryKey: ['getPostLost', Number(userId), 'getMyBookMark'],
      queryFn: getMyBookMark,
      onSuccess: () => {
        if (deleteComplete) {
          setErrorMsg(true);
          toastSuccess(deleteComplete);
        }
      },
      onError: () => {
        // console.log('errorData >>>', errorData);
        setErrorMsg(true);
        toastError('데이터를 불러오는 데 실패 했습니다.');
      },
      refetchOnWindowFocus: false,
      enabled: BookmarkMode === true,
    },
  ]);

  useEffect(() => {
    if (deleteComplete) {
      setErrorMsg(true);
      toastSuccess(deleteComplete);
    }
  }, [res[0].data, res[1].data]);

  if (res[0].isLoading || res[1].isLoading) {
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (res[0].isError || res[1].isError) {
    navigate('/mypage', {
      state: res[0].error || res[1].error,
    });
  }
  // console.log('data depth myPostData check >>>', res[0].data);
  // console.log('data depth myBookmarkData check >>>', res[1].data);
  const data = BookmarkMode ? res[1].data : res[0].data;
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
        <div className='h-full w-full f-fc-ic-jc gap-3 relative top-1/3 left-1/2 -translate-x-40 -translate-y-72'>
          {/* <NoResult /> */}
          <MyPageNoResult />
          <p className='text-[#A0A0A0] font-medium antialiased whitespace-nowrap -translate-x-4'>
            {BookmarkMode ? '북마크한 글이 없습니다.' : '작성한 글이 없습니다.'}
          </p>
        </div>
      )}
    </>
  );
}

export default MyPostcomponent;
