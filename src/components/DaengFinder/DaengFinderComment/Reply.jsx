import React, { useState } from 'react';
import Badge from '../../../assets/images/Badge1.svg';
import { ReactComponent as Ddaeng } from '../../../assets/images/Ddaeng.svg';
import { ReactComponent as Cancel } from '../../../assets/images/XSmallButton.svg';
import { dateConvert2 } from '../../../utils/DateConvert';
import { ReactComponent as Arrow } from '../../../assets/images/ArrowCurve.svg';

function Reply({ reply, onReplyMode }) {
  const [editMode, setEditMode] = useState(false);
  // const { userPhoto, childComment, createdAt, isPrivate } = reply;
  const { userPhoto, childComment, createdAt, isPrivate } = reply;

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };
  return (
    <div
      className={`relative f-fc gap-4 py-6 px-6 pl-12 border-b border-solid ${
        isPrivate && 'bg-[#F6F6F6]'
      }`}
    >
      <div className='f-fr-ic justify-between'>
        <div className='f-fr-ic gap-2'>
          <Arrow className='w-3 h-4' />
          <div className='f-ic-jc rounded-full overflow-hidden w-6 h-6'>
            <img className='image' src={userPhoto || Badge} alt='photoThumb' />
          </div>
          <h1 className='f-fr-ic font-semibold text-base leading-4'>닉네임</h1>
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
          {/* 헉 저 아까 가로수길 지나가다가 어쩌구~ */}
          {childComment}
        </div>
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

export default Reply;
