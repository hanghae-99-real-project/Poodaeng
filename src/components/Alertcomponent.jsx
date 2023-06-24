/* eslint-disable react/jsx-pascal-case */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { putAlert } from '../api/main';
import { ReactComponent as MyPageNoResult } from '../assets/images/MyPageNoResult.svg';
import { ReactComponent as 프로필5 } from '../assets/images/프로필5.svg';
import { dateConvert2 } from '../utils/DateConvert';
import Headers from './Headers';

function Alertcomponent() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { data } = location.state;
  // console.log(data);
  // const { isLoading, isError, data } = useQuery('alert', getAlert);
  // if (isLoading) {
  //   return (
  //     <div className='flex flex-col h-[812px] justify-center items-center'>
  //       <Loading />
  //     </div>
  //   );
  // }
  // if (isError) {
  // console.log('geterror', isError);
  // }

  const { alertdata } = location.state;
  // console.log('alert', alertdata);
  const queryClient = useQueryClient();
  const mutation = useMutation(putAlert, {
    onSuccess: postData => {
      // console.log('수정요청', postData);
      queryClient.invalidateQueries('alert');
    },
    onError: errors => {
      // console.log('수정요청', errors);
    },
  });

  const AlertClickHandler = (notificationId, UserId, PostId) => {
    mutation.mutate(notificationId);
    navigate(`/daengfinder/detail/${UserId}/comment/${PostId}`);
  };

  return (
    <div className='h-full'>
      <Headers text icon destination=''>
        알림
      </Headers>
      <div className='h-full border'>
        {location.state.alertdata ? (
          location?.state?.alertdata.map(item => {
            return (
              <div key={item.notificationId}>
                <div
                  className={`flex border ml-3 my-3 mr-3 p-5 rounded-md cursor-pointer ${
                    item.isRead ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'
                  }`}
                  onClick={() =>
                    AlertClickHandler(
                      item.notificationId,
                      item.UserId,
                      item.PostId,
                    )
                  }
                  role='none'
                >
                  {item.User.userPhoto[0] ? (
                    <img
                      className='flex bg-cover w-11 h-11 border rounded-full mr-3'
                      src={item.User.userPhoto[0]}
                      alt='pt'
                    />
                  ) : (
                    <프로필5 />
                  )}
                  <div className='flex flex-col items-start justify-center'>
                    <div className='font-bold text-xs'>
                      {item.User.nickname}
                    </div>
                    <p
                      className='font-medium text-xs leading-5 '
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          item?.ChildComment?.childComment ||
                            item?.Comment?.comment,
                        ),
                      }}
                    />
                    <div className='font-normal text-[10px] text-[#787878]'>
                      {dateConvert2(item.createdAt)[1]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='h-full w-full f-fc-ic-jc gap-3 relative top-1/3 left-1/2 -translate-x-40 -translate-y-72'>
            <MyPageNoResult />
            <p className='text-[#A0A0A0] font-medium antialiased whitespace-nowrap -translate-x-4'>
              알림이 없습니다
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Alertcomponent;
