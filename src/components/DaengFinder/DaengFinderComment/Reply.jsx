/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPostReply } from '../../../api/daengFinder';
import { ReactComponent as Arrow } from '../../../assets/images/ArrowCurve.svg';
import { ReactComponent as CommentLocker } from '../../../assets/images/CommentLocker.svg';
import { ReactComponent as Badge } from '../../../assets/images/Badge1.svg';
import { ReactComponent as Cancel } from '../../../assets/images/Cancel.svg';
import { ReactComponent as Ddaeng } from '../../../assets/images/Ddaeng.svg';
import { dateConvert2 } from '../../../utils/DateConvert';

function Reply({ commentId, onReplyMode }) {
  const [editMode, setEditMode] = useState(false);
  // const { userPhoto, childComment, createdAt, isPrivate } = reply;
  // const { UserId, userPhoto, childComment, createdAt, isPrivate } = reply;
  const params = useParams();
  const postId = parseInt(params?.postId, 10); // string -> number
  const postOwnerId = parseInt(params?.postOwnerId, 10); // string -> number
  const myId = parseInt(JSON.parse(localStorage.getItem('userId')), 10);

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const payload = {
    postId,
    commentId,
  };

  const { isLoading, data, isError, error } = useQuery(
    ['getReply', commentId],
    () => getPostReply(payload),
    {
      enabled: !!commentId,
      refetchOnWindowFocus: false,
    },
  );

  // useEffect(() => {}, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log('isError >>>', error);
    return <div>{error.message}</div>;
  }

  console.log('reply data >>>>', data);
  console.log('reply data depth >>>', data.data?.childCommentsData);
  const isPrivate = data.data?.childCommentsData?.isPrivate;
  const UserId = data.data?.childCommentsData?.UserId;
  const userPhoto = data.data?.childCommentsData?.userPhoto;
  const childComment = data.data?.childCommentsData?.childComment;
  const createdAt = data.data?.childCommentsData?.createdAt;

  /**
   *
   * @description 대댓글 모드일 때는 카메라 안뜨게 해놔야 함.
   * 0. 게시물 작성자는 모든 비밀댓대댓글 조회 및 답글달기 가능
   * 0.5. if(userId 가 없는 유저) => [비밀댓글대댓글 빼고 다 조회 가능 => 이건 userId가 다르다는 로직에서 걸러짐.] =>  작성권한 없음 이 로직만 쓰면 됨.
   * 1. 일반 댓글에 일반 대댓글 작성 가능
   * 2. 일반 댓글에 비밀 대댓글 작성 가능 (# 비밀 대댓글 작성자, 상위 댓글 작성자, 게시물 작성자가 조회 가능)
   * 3. 비밀 댓글 or 비밀대댓글인데 userId가 같지 않으면 (답글달기 버튼 보이면 안 됨.) => 아예 비밀댓글입니다.로 덮어야 함.
   * 4. 비밀 대댓글 수정 시 Locker 보라색으로 isPrivate true로 고정되고 비밀댓글 해제 못하도록 해야 함.
   * @requires 포스트 작성자 postOwnerId랑 myId가 같으면 다 볼 수 있음.
   */
  return (
    // <div>대기</div>
    <div>
      {data.data?.childCommentsData?.length > 0
        ? data.data?.childCommentsData?.map(reply => {
            return reply.isPrivate &&
              reply.UserId !== myId &&
              postOwnerId !== myId ? (
              <div className='relative f-fr-ic gap-4 py-6 px-6 pl-12 border-b border-solid bg-[#F6F6F6] text-[#525252] text-base font-medium leading-4'>
                <Arrow className='-translate-y-[0.15rem]' />
                <CommentLocker />
                비밀댓글입니다.
              </div>
            ) : (
              <div
                className={`relative f-fc gap-4 py-6 px-6 pl-12 border-b border-solid ${
                  reply.isPrivate && 'bg-[#F6F6F6]'
                }`}
              >
                <div className='f-fr-ic justify-between'>
                  <div className='f-fr-ic gap-2'>
                    <Arrow className='w-3 h-4' />
                    <div className='f-ic-jc rounded-full overflow-hidden w-6 h-6'>
                      <img
                        className='image'
                        src={reply.userPhoto || Badge}
                        alt='photoThumb'
                      />
                    </div>
                    <h1 className='f-fr-ic font-semibold text-base leading-4'>
                      닉네임
                    </h1>
                  </div>
                  {editMode && (
                    <div className='absolute right-4 top-5 rounded-md overflow-hidden bg-white shadow-lg'>
                      <div className='relative py-3 px-20 border-b border-solid '>
                        수정하기
                        <Cancel
                          className='absolute right-1 top-1 w-5 h-5'
                          onClick={closeEditMode}
                        />
                      </div>
                      <div className='py-3 px-20'>삭제하기</div>
                    </div>
                  )}
                  <Ddaeng className='w-1 h-5' onClick={openEditMode} />
                </div>
                <div className='f-fc gap-1 pl-10'>
                  <div className='pr-12 font-medium text-sm'>
                    {childComment}
                  </div>
                  <div className='f-fr-ic-jb'>
                    <span className='font-medium text-sm text-[#A8A8A8]'>
                      {dateConvert2(reply.createdAt)[0]}
                    </span>
                    <button
                      className='px-2 py-1 whitespace-nowrap font-medium text-xs leading-5 border border-solid rounded-2xl'
                      onClick={onReplyMode}
                    >
                      답글달기
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
    // <div>
    //   {isPrivate && UserId !== myId ? (
    //     <div className='relative f-fr-ic gap-4 py-6 px-6 pl-12 border-b border-solid bg-[#F6F6F6] text-[#525252] text-base font-medium leading-4'>
    //       <Arrow className='-translate-y-[0.15rem]' />
    //       <CommentLocker />
    //       비밀댓글입니다.
    //     </div>
    //   ) : (
    //     <div
    //       className={`relative f-fc gap-4 py-6 px-6 pl-12 border-b border-solid ${
    //         isPrivate && 'bg-[#F6F6F6]'
    //       }`}
    //     >
    //       <div className='f-fr-ic justify-between'>
    //         <div className='f-fr-ic gap-2'>
    //           <Arrow className='w-3 h-4' />
    //           <div className='f-ic-jc rounded-full overflow-hidden w-6 h-6'>
    //             <img
    //               className='image'
    //               src={userPhoto || Badge}
    //               alt='photoThumb'
    //             />
    //           </div>
    //           <h1 className='f-fr-ic font-semibold text-base leading-4'>
    //             닉네임
    //           </h1>
    //         </div>
    //         {editMode && (
    //           <div className='absolute right-4 top-5 rounded-md overflow-hidden bg-white shadow-lg'>
    //             <div className='relative py-3 px-20 border-b border-solid '>
    //               수정하기
    //               <Cancel
    //                 className='absolute right-1 top-1 w-5 h-5'
    //                 onClick={closeEditMode}
    //               />
    //             </div>
    //             <div className='py-3 px-20'>삭제하기</div>
    //           </div>
    //         )}
    //         <Ddaeng className='w-1 h-5' onClick={openEditMode} />
    //       </div>
    //       <div className='f-fc gap-1 pl-10'>
    //         <div className='pr-12 font-medium text-sm'>{childComment}</div>
    //         <div className='f-fr-ic-jb'>
    //           <span className='font-medium text-sm text-[#A8A8A8]'>
    //             {dateConvert2(createdAt)[0]}
    //           </span>
    //           <button
    //             className='px-2 py-1 whitespace-nowrap font-medium text-xs leading-5 border border-solid rounded-2xl'
    //             onClick={onReplyMode}
    //           >
    //             답글달기
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

export default Reply;
