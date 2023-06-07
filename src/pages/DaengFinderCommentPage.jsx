/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Camera } from '../assets/images/Camera.svg';
import { ReactComponent as Cancel } from '../assets/images/Cancel.svg';
import { ReactComponent as Lock } from '../assets/images/Lock.svg';
import { ReactComponent as XsmallBtn } from '../assets/images/XSmallButton.svg';
import Comment from '../components/DaengFinder/DaengFinderComment/Comment';
import Reply from '../components/DaengFinder/DaengFinderComment/Reply';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';

function DaengFinderCommentPage() {
  /**
   * @description JSON 주석 풀어야 함. myId = 2 는 지워야 함.
   */
  // const myId = parseInt(JSON.parse(localStorage.getItem('userId')), 10);
  const myId = 2;
  const [alertMsg, setAlertMsg] = useState(false);
  const [commentList, setCommentList] = useState([
    {
      commentId: 1,
      PostId: 1,
      UserId: 1,
      comment: '그만 탈출해...',
      commentPhotoUrl:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      nickname: '보라돌이',
      userPhoto:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: true,
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
    {
      commentId: 2,
      PostId: 1,
      UserId: 2,
      comment: '그만 탈출해...',
      commentPhotoUrl:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      nickname: '보라돌이',
      userPhoto: '',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: false,
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
    {
      commentId: 3,
      PostId: 1,
      UserId: 3,
      comment: '그만 탈출해...',
      commentPhotoUrl: '',
      nickname: '보라돌이',
      userPhoto: '',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: true,
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
    {
      commentId: 4,
      PostId: 1,
      UserId: 4,
      comment: '그만 탈출해...',
      commentPhotoUrl:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      nickname: '보라돌이',
      userPhoto: '',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: false,
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
    {
      commentId: 5,
      PostId: 1,
      UserId: 5,
      comment: '그만 탈출해...',
      commentPhotoUrl:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      nickname: '보라돌이',
      userPhoto: '',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: false,
      commentLatitude: 'DECIMAL(17, 14)',
      commentLongitude: 'DECIMAL(17, 14)',
      address: 'STRING',
    },
  ]);

  const [replyList, setReplyList] = useState([
    {
      childCommentId: '1',
      CommentId: 1,
      UserId: 1,
      childComment: '헉 저 아까 가로수길 지나가다가 어쩌구~',
      nickname: '뚜비',
      userPhoto:
        'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
      createdAt: Date(),
      updatedAt: 'DATE',
      isPrivate: true,
    },
    {
      childCommentId: '2',
      CommentId: 1,
      UserId: 10,
      childComment: 'STRING',
      nickname: 'STRING',
      userPhoto: '',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: true,
    },
    {
      childCommentId: '3',
      CommentId: 1,
      UserId: 1,
      childComment: 'STRING',
      nickname: 'STRING',
      // userPhoto: 'JSON',
      userPhoto: '',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: true,
    },
    {
      childCommentId: '4',
      CommentId: 4,
      UserId: 1,
      childComment: 'STRING',
      nickname: 'STRING',
      // userPhoto: 'JSON',
      userPhoto: '',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: true,
    },
    {
      childCommentId: '5',
      CommentId: 4,
      UserId: 1,
      childComment: 'STRING',
      nickname: 'STRING',
      // userPhoto: 'JSON',
      userPhoto: '',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: true,
    },
    {
      childCommentId: '6',
      CommentId: 4,
      UserId: 1,
      childComment: 'STRING',
      nickname: 'STRING',
      // userPhoto: 'JSON',
      userPhoto: '',
      createdAt: 'DATE',
      updatedAt: 'DATE',
      isPrivate: true,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [inputMode, setInputMode] = useState(false);
  const [privateComment, setPrivateComment] = useState(false);
  const [inputComment, setInputComment] = useState('');
  // const [modeInfo, setModeInfo] = useState('댓글');
  const [image, setImage] = useState({
    photo: '',
    preview: '',
  });
  const imageRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { postOwnerId } = location.state;
  // console.log(
  //   'postOwnerId type >>>',
  //   typeof postOwnerId, // number
  //   'postOwnerId >>>',
  //   postOwnerId, // 1
  // );

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

  const enlargePhoto = e => {
    console.log(e.target.src);
    setModalImg(e.target.src);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalImg('');
  };

  const imageHandler = event => {
    console.log('event >>>', event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (!file) return;

    // check file type
    /* if (file.type!== 'image/jpeg' && file.type!== 'image/png' && file.type!== 'image/jpg') {
      alert('이미지 형식이 아닙니다.');
      return;
    } */

    const fileType = file.type.split('/')[0];
    if (fileType !== 'image') {
      setAlertMsg(true);
      toast.error('이미지 파일이 아닙니다', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const maxSize = 1024 * 1024 * 25;
    if (file.size > maxSize) {
      setAlertMsg(true);
      toast.error('이미지 최대 크기는 25MB입니다.', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (file) URL.revokeObjectURL(file);
    const url = URL.createObjectURL(file);
    setImage({
      photo: url,
      preview: url,
    });
  };

  const onCloseHandler = () => {
    /* Photo도 false로 비워야 하나? */
    setImage(prev => ({ ...prev, preview: '' }));
    setInputMode(false);
  };

  const onCommentMode = () => {
    // setModeInfo('댓글');
    setInputMode(true);
  };
  const onReplyMode = () => {
    // setModeInfo('답글');
    setInputMode(true);
  };
  const saveInputHandler = () => {
    /* 댓글 저장 로직 */
    // setImage((prev)=> ({...prev, preview: ''}));

    /* 밑 로직 useMutation으로 옮겨야 함 */
    setImage({ photo: '', preview: '' });
    setInputMode(false);
  };

  useEffect(() => {
    SwitchFooter(false);
  });

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   console.log('comment page error >>>', error);
  //   navigate('/daengfinder/detail');
  //   // navigate('/404')
  // }

  return (
    <div className='w-full max-h-[812px]'>
      <LinkHeader icon destination='/daengfinder/detail'>
        {/* 댓글&nbsp;{commentCount}{' '} */}
        <div className='f-fr'>
          댓글&nbsp;
          <p className='text-[#DB00FF]'>
            {commentList.length + replyList.length}
          </p>
        </div>
      </LinkHeader>

      <div className={`fixed inset-0 z-30 ${!modalVisible && 'hidden'} `}>
        <div className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed f-fc-ic-jc gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='f-ic-jc w-80 h-80 shadow-xl rounded-lg overflow-hidden'>
            <img src={`${modalImg}`} alt='photoThumb' className='image' />
          </div>
          <div
            className='rounded-full w-12 h-12 bg-white overflow-hidden shadow-md cursor-pointer'
            onClick={closeModal}
          >
            <Cancel className='image shadow-md' />
          </div>
        </div>
      </div>
      {/* 문제점 반만 잘려서 보인다. pb주는 건 임시방편 방법인가... => 바로 고침 */}
      <div className='h-[45.6875rem] box-border overflow-y-scroll'>
        {commentList.map(comment => {
          return (
            <>
              <Comment
                key={comment.commentId}
                cmt={comment}
                myId={myId}
                enlargePhoto={enlargePhoto}
                onReplyMode={onReplyMode}
              />
              {replyList
                .filter(ele => ele.CommentId === comment.commentId)
                .map(reply => {
                  return (
                    <Reply
                      key={reply.childCommentId}
                      reply={reply}
                      myId={myId}
                      onReplyMode={onReplyMode}
                    />
                  );
                })}
            </>
          );
        })}
      </div>
      {/* 모달 댓글 등록 창 컴포넌트로 분리 & zustand 해서 렌더링 최적화 ㄱ */}
      <div
        className={`absolute inset-0 bg-black opacity-30 ${
          inputMode ? '' : 'hidden'
        }`}
        onClick={onCloseHandler}
      />
      <div className='absolute z-20 bottom-4 left-0 right-0 bg-transparent px-6'>
        {inputMode && image.preview ? (
          <div className='relative f-ic-jc w-40 h-40 mb-2 bg-white shadow-md rounded-md'>
            <img src={image.preview} alt='photoThumb' className='image' />
            <div
              className='f-ic-jc rounded-full overflow-hidden w-7 h-7 absolute -top-1 -right-2 bg-[#FFFFFF] shadow-md cursor-pointer'
              onClick={() => setImage({ photo: '', preview: '' })}
            >
              <XsmallBtn className='image' />
            </div>
          </div>
        ) : null}
        <div className={`f-fr-ic gap-2 mb-2 ${!inputMode && 'hidden'}`}>
          <div
            className={`w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white ${
              privateComment && 'bg-[#F1E2FF]'
            } shadow-md cursor-pointer`}
            onClick={() => setPrivateComment(prev => !prev)}
          >
            <Lock
              className={`object-contain w-3 h-auto  ${
                privateComment ? 'fill-[#A54BFF]' : 'fill-[#747474]'
              }`}
            />
          </div>
          <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white shadow-md cursor-pointer'>
            <Camera
              title='upload image'
              className='object-contain w-4 h-auto'
              onClick={() => imageRef.current.click()}
            />
            <input
              ref={imageRef}
              type='file'
              id='imageInput'
              accept='image/*'
              className='hidden'
              onChange={imageHandler}
            />
          </div>
        </div>
        <div
          className={`f-fr-ic-jb overflow-hidden ${
            !inputMode && 'border opacity-60'
          }  rounded-lg shadow-md`}
          onFocus={onCommentMode}
        >
          <textarea
            className='h-fit max-h-12 px-4 w-full text-base placeholder:text-sm font-medium leading-6 '
            // placeholder={`${modeInfo}을 입력해주세요`}
            placeholder='댓글을 입력해주세요'
            value={inputComment}
            onChange={e => setInputComment(e.target.value)}
          />
          <button
            className={`w-16 px-3 py-3 font-bold text-base  text-white ${
              inputMode ? 'bg-mainColor' : 'bg-[#E2CAFB]'
            }`}
            disabled={!inputMode}
            onClick={saveInputHandler}
          >
            등록
          </button>
        </div>
      </div>
      {/* <div className='absolute z-20 bottom-4 left-0 right-0  bg-transparent px-6'>
        <div className='f-fr-ic'>
          <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white'>
            <Unlock className='object-contain w-3 h-auto' />
          </div>
          <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white'>
            <Camera className='object-contain w-4 h-auto' />
          </div>
        </div>
        <div className='f-fr-ic-jb overflow-hidden border border-solid rounded-lg'>
          <textarea
            className='h-fit max-h-12 px-4 w-full text-base placeholder:text-sm font-medium leading-6 '
            placeholder='댓글을 입력해주세요'
          />
          <button className='w-16 px-3 py-3 font-bold text-base  text-white bg-[#E2CAFB]'>
            등록
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default DaengFinderCommentPage;
