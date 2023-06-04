import React, { useState } from 'react';
import { IoMdLock } from 'react-icons/io';
// import { create } from 'zustand';
import Badge from '../../../assets/images/Badge1.svg';
import { ReactComponent as Ddaeng } from '../../../assets/images/Ddaeng.svg';
import { ReactComponent as Cancel } from '../../../assets/images/XSmallButton.svg';
import { dateConvert2 } from '../../../utils/DateConvert';

// const modalStore = create(set => ({
//   closModal: () => set(() => ({})),
// }));

function Comment({ cmt, enlargePhoto, onReplyMode }) {
  const [editMode, setEditMode] = useState(false);
  const {
    userPhoto,
    commentPhotoUrl,
    nickname,
    comment,
    createdAt,
    isPrivate,
  } = cmt;

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  return (
    <div
      className={`relative f-fc gap-4 py-6 px-6 border-b border-solid ${
        isPrivate && 'bg-[#F6F6F6]'
      }`}
    >
      <div className='f-fr-ic justify-between'>
        <div className='f-fr-ic gap-2'>
          <div className='f-ic-jc rounded-full w-8 h-8 overflow-hidden'>
            {/* <img className='image' src={Badge} alt='no' /> */}
            <img className='image' src={userPhoto || Badge} alt='photoThumb' />
          </div>
          <h1 className='f-fr-ic font-semibold text-xl leading-6'>
            {nickname} {isPrivate && <IoMdLock className='text-base' />}
          </h1>
        </div>
        {editMode && (
          <div>
            <div
              role='none'
              className='absolute inset-0'
              onClick={closeEditMode}
            />
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
          </div>
        )}
        {/* {editMode && (
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
        )} */}
        <Ddaeng className='w-1 h-5' onClick={openEditMode} />
      </div>
      <div className='f-fc gap-1 pl-10'>
        {commentPhotoUrl && (
          <div className='f-ic-jc w-28 h-28 mb-3'>
            <img
              role='none'
              src={`${commentPhotoUrl}`}
              alt='photoThumb'
              className='image rounded-xl shadow-md'
              onClick={enlargePhoto}
            />
          </div>
        )}
        <div className='pr-12 font-medium text-sm'>{comment}</div>
        <div className='f-fr-ic-jb'>
          <span className='font-medium text-sm text-[#A8A8A8]'>
            {/* 2023. 5. 12 17:03 */}
            {dateConvert2(createdAt)}
          </span>
          <button
            className='px-2 font-medium text-xs leading-5 border border-solid rounded-2xl'
            onClick={onReplyMode}
          >
            답글달기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
