/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
// import { create } from 'zustand';
import { useParams } from 'react-router-dom';
import Badge from '../../../assets/images/Badge1.svg';
import { ReactComponent as CommentLocker } from '../../../assets/images/CommentLocker.svg';
import { ReactComponent as Ddaeng } from '../../../assets/images/Ddaeng.svg';
import { ReactComponent as Cancel } from '../../../assets/images/XSmallButton.svg';
import { dateConvert2 } from '../../../utils/DateConvert';

// const modalStore = create(set => ({
//   closModal: () => set(() => ({})),
// }));

function Comment({ cmt, enlargePhoto, setIsCommentMode, setEditMode }) {
  // const [editMode, setEditMode] = useState(false);

  /**
   * @description 가져온 comment의 userId와 내 accessToken의 userId가 일치하는지 확인한다.
   * 일치하면 비밀댓글을 볼 수 있게 설정.
   * 1. 내 아이디가 comment의 userId랑 동일하면 볼 수 있음.
   * 2. 내 아이디가 상세 포스트의 userId랑 동일하면 다 볼 수 있음.
   * 근데 만약 새로고침 할 경우? private 변수는 휘발. local은 살아남음.
   * 액세스 토큰에 내 userId가 있음. 그걸 디코드 해서 비교해야 함.
   * 어쨌든 서버에서 액세스 토큰을 채워줬을 때 (status 203이면 interceptor 해서 다시 보내도록 해야 함.)
   * @requires 포스트 작성자 postOwnerId랑 myId가 같으면 다 볼 수 있음.
   */
  /* 포스트 주인 userId가 10이라고 가정. 포스트 주인은 userId에 상관없이 다 볼 수 있음. */
  /* 나는 제 3자 */
  /* Comment의 주인은 userId가 1이라고 가정. */

  const {
    UserId,
    userPhoto,
    commentPhotoUrl,
    nickname,
    comment,
    createdAt,
    isPrivate,
    commentId,
  } = cmt;

  const params = useParams();
  const postId = parseInt(params?.postId, 10); // string -> number
  const postOwnerId = parseInt(params?.postOwnerId, 10); // string -> number
  const myId = parseInt(JSON.parse(localStorage.getItem('userId')), 10);
  const userId = parseInt(UserId, 10);

  /** @description 누르면 답글 모드 */
  const onReplyMode = () => {
    setIsCommentMode(prev => ({
      ...prev,
      inputMode: true,
      commentId,
      targetComment: false,
      absolutePrivate: isPrivate,
    }));
  };

  // const [isEditMode, setEditMode] = useState({
  //   editMode: false,
  //   targetComment: true,
  //   userId: null, // 댓글 단 사람의 UserId
  //   commentId: null,
  //   childCommentId: null,
  //   contents: '',
  // });

  const openEditMode = () => {
    setEditMode({
      editMode: true,
      editModal: true,
      targetComment: true,
      userId: UserId,
      commentId,
      childCommentId: null,
      contents: comment,
      absolutePrivate: isPrivate,
    });
  };

  // const closeEditMode = () => {
  //   setEditMode(false);
  // };

  return (
    <div>
      {isPrivate && userId !== myId && postOwnerId !== myId ? (
        <div className='relative f-fr-ic gap-4 px-10 py-6 border-b border-solid bg-[#F6F6F6] text-xl text-[#525252] leading-6 font-medium'>
          <CommentLocker className='-translate-y-[0.1rem]' />
          비밀댓글입니다.
        </div>
      ) : (
        /** @description isPrivate일 때 제3자의 경우는 userId !== myId니까 위에서 다 걸러짐. */
        /* 아 근데 비회원은 버튼...은 보여야겠지? 누르면 로그인으로 이동시켜야 하니까? */
        <div
          className={`relative f-fc gap-4 py-6 px-6 border-b border-solid ${
            isPrivate ? 'bg-[#F6F6F6]' : ''
          }`}
        >
          <div className='f-fr-ic justify-between'>
            <div className='f-fr-ic gap-2'>
              <div className='f-ic-jc rounded-full w-8 h-auto overflow-hidden'>
                <img
                  className='image'
                  src={userPhoto || Badge}
                  alt='photoThumb'
                />
              </div>
              <h1
                className={`f-fr-ic font-semibold ${
                  nickname.length > 3 ? 'text-base' : 'text-xl'
                } leading-6`}
              >
                {nickname}{' '}
                <div>{isPrivate && <IoMdLock className='text-base' />}</div>
              </h1>
            </div>
            <Ddaeng className='w-2 h-5 cursor-pointer' onClick={openEditMode} />
          </div>
          <div className='f-fc gap-1 pl-10'>
            {commentPhotoUrl && (
              <div className='f-ic-jc w-28 h-28 mb-3'>
                <img
                  role='none'
                  src={`${commentPhotoUrl}`}
                  alt='photoThumb'
                  className='image rounded-xl shadow-md cursor-pointer'
                  onClick={enlargePhoto}
                />
              </div>
            )}
            <div className='pr-12 font-medium text-sm'>{comment}</div>
            <div className='f-fr-ic-jb'>
              <span className='font-medium text-sm text-[#A8A8A8]'>
                {dateConvert2(createdAt)[0]}
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
      )}
    </div>
    // <div
    //   className={`relative f-fc gap-4 py-6 px-6 border-b border-solid ${
    //     isPrivate && 'bg-[#F6F6F6]'
    //   }`}
    // >
    //   <div className='f-fr-ic justify-between'>
    //     <div className='f-fr-ic gap-2'>
    //       <div className='f-ic-jc rounded-full w-8 h-8 overflow-hidden'>
    //         {/* <img className='image' src={Badge} alt='no' /> */}
    //         <img className='image' src={userPhoto || Badge} alt='photoThumb' />
    //       </div>
    //       <h1 className='f-fr-ic font-semibold text-xl leading-6'>
    //         {nickname} {isPrivate && <IoMdLock className='text-base' />}
    //       </h1>
    //     </div>
    //     {editMode && (
    //       <div>
    //         <div
    //           role='none'
    //           className='absolute inset-0'
    //           onClick={closeEditMode}
    //         />
    //         <div className='absolute right-4 top-5 rounded-md overflow-hidden bg-white shadow-lg'>
    //           <div className='relative py-3 px-20 border-b border-solid '>
    //             수정하기
    //             <Cancel
    //               className='absolute right-1 top-1 w-5 h-5'
    //               onClick={closeEditMode}
    //             />
    //           </div>
    //           <div className='py-3 px-20'>삭제하기</div>
    //         </div>
    //       </div>
    //     )}
    //     {/* {editMode && (
    //       <div className='absolute right-4 top-5 rounded-md overflow-hidden bg-white shadow-lg'>
    //         <div className='relative py-3 px-20 border-b border-solid '>
    //           수정하기
    //           <Cancel
    //             className='absolute right-1 top-1 w-5 h-5'
    //             onClick={closeEditMode}
    //           />
    //         </div>
    //         <div className='py-3 px-20'>삭제하기</div>
    //       </div>
    //     )} */}
    //     <Ddaeng className='w-1 h-5' onClick={openEditMode} />
    //   </div>
    //   <div className='f-fc gap-1 pl-10'>
    //     {commentPhotoUrl && (
    //       <div className='f-ic-jc w-28 h-28 mb-3'>
    //         <img
    //           role='none'
    //           src={`${commentPhotoUrl}`}
    //           alt='photoThumb'
    //           className='image rounded-xl shadow-md'
    //           onClick={enlargePhoto}
    //         />
    //       </div>
    //     )}
    //     <div className='pr-12 font-medium text-sm'>{comment}</div>
    //     <div className='f-fr-ic-jb'>
    //       <span className='font-medium text-sm text-[#A8A8A8]'>
    //         {/* 2023. 5. 12 17:03 */}
    //         {dateConvert2(createdAt)[0]}
    //       </span>
    //       <button
    //         className='px-2 py-1 whitespace-nowrap font-medium text-xs leading-5 border border-solid rounded-2xl'
    //         onClick={onReplyMode}
    //       >
    //         답글달기
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Comment;
