/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import { getMyPost } from '../api/myPage';
import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';
import { tokenStore } from '../pages/SignInPage';
import Card from './DaengFinder/Card';
import Headers from './Headers';
import Loading from './common/Loading';

function MyPostcomponent() {
  const [errorMsg, setErrorMsg] = useState(false);
  const { userId } = tokenStore(
    state => ({
      userId: state.tokenState.userId,
    }),
    shallow,
  );
  const navigate = useNavigate();

  const { isLoading, data, isError, error } = useQuery(
    ['getMyPost', userId],
    getMyPost,
    {
      onSuccess: successData => {
        console.log('successData >>>', successData);
      },
      onError: errorData => {
        console.log('errorData >>>', errorData);
      },
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    navigate('/mypage', {
      state: error,
    });
  }
  console.log('data depth check >>>', data);

  return (
    <>
      <Headers text icon destination='mypage'>
        내가 작성한 글
      </Headers>
      {errorMsg && <ToastContainer />}
      {data?.data?.mypagePosts?.length ? (
        <div
          // 46.6875rem
          // h-[69.95%]
          className='flex flex-col gap-3  w-full px-6
          h-full overflow-y-scroll'
        >
          {data?.data?.mypagePosts?.map(card => {
            return (
              <Card
                key={card.postId}
                isDetail
                data={card}
                linkAddress='/mypost'
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
