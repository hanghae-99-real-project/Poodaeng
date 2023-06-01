/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import Badge from '../assets/images/Badge1.svg';
import { ReactComponent as Ddaeng } from '../assets/images/Ddaeng.svg';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';

function DaengFinderCommentPage() {
  const [commentList, setCommentList] = useState([
    {
      commentId: 1,
      PostId: 1,
      UserId: 'INTEGER',
      comment: '그만 탈출해...',
      commentPhotoUrl: 'JSON',
      nickname: '보라돌이',
      userPhoto: 'JSON',
      createdAt: new Date(),
      updatedAt: 'DATE',
      isPrivate: 'Boolean',
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
  ]);
  const [replyList, setReplyList] = useState([
    {
      childCommentId: 'INTEGER',
      CommentId: 'INTEGER',
      UserId: 'INTEGER',
      childComment: 'STRING',
      nickname: 'STRING',
      userPhoto: 'JSON',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: 'BOOLEAN',
    },
  ]);
  const navigate = useNavigate();

  // const { data, isLoading, error, isError } = useQuery(
  //   'getComment',
  //   () => getComment(),
  //   {
  //     refetchOnWindowFocus: false,
  //   },
  // );

  const { SwitchFooter } = useFooterLayout(
    store => ({
      SwitchFooter: store.SwitchFooter,
    }),
    shallow,
  );
  useEffect(() => {
    SwitchFooter(false);
  });
  const commentCount = 4;
  const image =
    'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg';

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   console.log('comment page error >>>', error);
  //   navigate('/daengfinder/detail');
  //   // navigate('/404')
  // }

  return (
    <div className='w-full'>
      <LinkHeader icon destination='-1'>
        댓글&nbsp;{commentCount}{' '}
      </LinkHeader>
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2'>
        <div className='f-fr-ic-jb  border border-solid rounded-md'>
          {/* 여기 수정하셈 */}
          <textarea
            className='px-4 h-fit w-64  text-base placeholder:text-sm font-medium leading-3 '
            placeholder='댓글을 입력해주세요'
          />
          <button className='w-16 px-3 py-3 font-bold text-base  text-white bg-[#E2CAFB]'>
            등록
          </button>
        </div>
      </div>
      <div className='h-4/5 box-border pb-32 overflow-y-scroll'>
        <div className='f-fc gap-4 py-6 px-6 border-b border-solid'>
          <div className='f-fr-ic justify-between'>
            <div className='f-fr-ic gap-2'>
              <div className='f-ic-jc rounded-full w-8 h-8'>
                <img className='image' src={Badge} alt='no' />
              </div>
              <h1 className='f-fr-ic font-semibold text-xl leading-6'>
                닉네임 <IoMdLock />
              </h1>
            </div>
            <Ddaeng className='w-1 h-5' />
          </div>
          <div className='f-fc gap-1 pl-10'>
            {image && (
              <div className='f-ic-jc w-28 h-28 mb-3'>
                <img
                  src={`${image}`}
                  alt='photoThumb'
                  className='image rounded-xl shadow-md'
                />
              </div>
            )}
            <div className='pr-12 font-medium text-sm'>
              헉 저 아까 가로수길 지나가다가 어쩌구~
            </div>
            <div className='f-fr-ic-jb'>
              <span className='font-medium text-sm text-[#A8A8A8]'>
                2023. 5. 12 17:03
              </span>
              <button className='px-2 font-medium text-xs leading-5 border border-solid rounded-3xl'>
                답글달기
              </button>
            </div>
          </div>
        </div>
        <div className='f-fc gap-4 py-6 px-6 pl-12 border-b border-solid'>
          <div className='f-fr-ic justify-between'>
            <div className='f-fr-ic gap-2'>
              <div className='f-ic-jc rounded-full w-6 h-6'>
                <img className='image' src={Badge} alt='no' />
              </div>
              <h1 className='f-fr-ic font-semibold text-base leading-4'>
                닉네임
              </h1>
            </div>
            <Ddaeng className='w-1 h-5' />
          </div>
          <div className='f-fc gap-1 pl-10'>
            <div className='pr-12 font-medium text-sm'>
              헉 저 아까 가로수길 지나가다가 어쩌구~
            </div>
            <div className='f-fr-ic-jb'>
              <span className='font-medium text-sm text-[#A8A8A8]'>
                2023. 5. 12 17:03
              </span>
              <button className='px-2 font-medium text-xs leading-5 border border-solid rounded-3xl'>
                답글달기
              </button>
            </div>
          </div>
        </div>

        <div className='f-fc gap-4 py-6 px-6 border-b border-solid'>
          <div className='f-fr-ic justify-between'>
            <div className='f-fr-ic gap-2'>
              <div className='f-ic-jc rounded-full w-8 h-8'>
                <img className='image' src={Badge} alt='no' />
              </div>
              <h1 className='font-semibold text-xl leading-6'>닉네임</h1>
            </div>
            <Ddaeng className='w-1 h-5' />
          </div>
          <div className='f-fc gap-1 pl-10'>
            {image && (
              <div className='f-ic-jc w-28 h-28 mb-3'>
                <img
                  src={`${image}`}
                  alt='photoThumb'
                  className='image rounded-xl shadow-md'
                />
              </div>
            )}
            <div className='pr-12 font-medium text-sm'>
              헉 저 아까 가로수길 지나가다가 어쩌구~
            </div>
            <div className='f-fr-ic-jb'>
              <span className='font-medium text-sm text-[#A8A8A8]'>
                2023. 5. 12 17:03
              </span>
              <button className='px-2 font-medium text-xs leading-5 border border-solid rounded-3xl'>
                답글달기
              </button>
            </div>
          </div>
        </div>
        <div className='f-fc gap-4 py-6 px-6 border-b border-solid'>
          <div className='f-fr-ic justify-between'>
            <div className='f-fr-ic gap-2'>
              <div className='f-ic-jc rounded-full w-8 h-8'>
                <img className='image' src={Badge} alt='no' />
              </div>
              <h1 className='font-semibold text-xl leading-6'>닉네임</h1>
            </div>
            <Ddaeng className='w-1 h-5' />
          </div>
          <div className='f-fc gap-1 pl-10'>
            <div className='pr-12 font-medium text-sm'>
              헉 저 아까 가로수길 지나가다가 어쩌구~
            </div>
            <div className='f-fr-ic-jb'>
              <span className='font-medium text-sm text-[#A8A8A8]'>
                2023. 5. 12 17:03
              </span>
              <button className='px-2 font-medium text-xs leading-5 border border-solid rounded-3xl'>
                답글달기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaengFinderCommentPage;
