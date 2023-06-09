/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { getPostComment, writePostComment } from '../api/daengFinder';
import { ReactComponent as Camera } from '../assets/images/Camera.svg';
import { ReactComponent as Cancel } from '../assets/images/Cancel.svg';
import { ReactComponent as Lock } from '../assets/images/Lock.svg';
import { ReactComponent as XsmallBtn } from '../assets/images/XSmallButton.svg';
import Comment from '../components/DaengFinder/DaengFinderComment/Comment';
import Reply from '../components/DaengFinder/DaengFinderComment/Reply';
import Loading from '../components/common/Loading2';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import LinkHeader from '../shared/LinkHeader';
import { InputStore } from '../zustand/example/zustandAPI';

function DaengFinderCommentPage() {
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
  /**
   * @description 커멘트 모드 true면 댓글 모드, false면 대댓글 모드.
   */
  /**
   * @description 열었을 때 파악해야 하는 것
   * 0. 작성되어 있는 댓대댓글 내용이 필요함.
   * 1. 댓글 작성된 것을 수정/삭제하는 것인지, 대댓글을 수정/삭제하는 것인지 Boolean필요 => payload 키 값이 다르기 때문
   * 2. 그렇게 해서 열린 댓/대댓글의 id가 필요함. 댓글은 commentId가 필요. 대댓글은 commentId, childCommentId가 필요.
   * 3. 또한 userId와 myId가 다를 경우 신고하기&취소 버튼만 보여야 하고, useId와 myId가 같은 경우에는 수정하기, 삭제하기, 취소 버튼이 보여야 함.
   * 4. [@requires 전역변수: myId, postId ]  [댓글: commentId, UserId, myId, comment] [대댓글: commentId, childCommentId, myId, comment]
   * 5. setting
   * 6. editMode가 켜졌을 때 input 모드를 꺼야 함. editMode에서 수정하기/삭제하기
   * {
   *  editMode: false,
   *  targetComment: true, // 댓글을 바꾸는/삭제하는 모드인지 대댓글을 바꾸는/삭제하는 모드인지
   *  postId: null,
   *  userId: null,
   *  commentId: null,
   *  childCommentId: null,
   *  contents: ''
   * }
   *
   */
  /* 댓글/대댓글 작성도 따로 객체로 만들어야겠음. */
  const [isCommentMode, setIsCommentMode] = useState(true);
  const [editModeInfo, setEditMode] = useState({
    editMode: false,
    targetComment: true,
    postId: null,
    userId: null,
    commentId: null,
    childCommentId: null,
    contents: '',
  });
  const [privateComment, setPrivateComment] = useState(false);
  const [image, setImage] = useState({
    photo: '',
    preview: '',
  });
  const { initialComment, changeInitialVal, onClearInitialVal } = InputStore(
    state => ({
      initialComment: state.initialComment,
      changeInitialVal: state.changeInitialVal,
      onClearInitialVal: state.onClearInitialVal,
    }),
    shallow,
  );
  const { SwitchFooter } = useFooterLayout(
    store => ({
      SwitchFooter: store.SwitchFooter,
    }),
    shallow,
  );
  const imageRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const myId = parseInt(JSON.parse(localStorage.getItem('userId')), 10);
  // const myId = 2;
  const postId = parseInt(params?.postId, 10); // string -> number
  const postOwnerId = parseInt(params?.postOwnerId, 10); // string -> number
  // console.log('postId >>>', postId, 'postOwnerId >>>', postOwnerId);

  /**
   * @description
   * 1. comment 전부 불러옴 -> 각 CommentId 있음 -> map 돌림
   * 2. CommentId를 받아서 Reply 내부에서 쿼리를 부를 시 -> map을 Reply 안에서 돌려야 함.
   *
   * 1. comment 전부 불러옴 -> 각 commentId 있음 -> map 돌림
   * 2. map 돌릴 때 Reply[idx] 번째 query call ->
   */
  const { isLoading, data, isError, error } = useQuery(
    ['getComment', postId],
    () => getPostComment(postId),
    {
      enabled: !!postId,
      refetchOnWindowFocus: false,
    },
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(writePostComment, {
    // variables는 { postId: 123, formData: { ... } }와 같은 값
    // onSuccess: (dt, variables) => {
    onSuccess: dt => {
      console.log('writePostComment mutation success >>>', dt);
      queryClient.invalidateQueries(['getComment', postId]);
      // queryClient.invalidateQueries(['getComment', variables.postId]);
      if (image.preview) URL.revokeObjectURL(image.preview);
      setImage({ photo: '', preview: '' });
      setInputMode(false);
      setPrivateComment(false);
      onClearInitialVal();
      /**
       * @description check point
       */
    },
    onError: err => {
      console.log('writePostComment mutation error >>>', err);
    },
  });

  /**
   * @description 이거는 댓글의 사진 확대 했을 때 모달을 열고 사진 확대시키는 함수수
   */
  const enlargePhoto = e => {
    console.log(e.target.src);
    setModalImg(e.target.src);
    setModalVisible(true);
  };

  /**
   * @description 이거는 댓글의 사진 확대 했을 때의 모달을 닫고 사진을 지우는 함수
   */
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

    if (image.preview) URL.revokeObjectURL(image.preview);
    const url = URL.createObjectURL(file);
    setImage({
      photo: file,
      preview: url,
    });
  };

  /**
   * @description 이거는 댓글 모드 닫을 때 실행되는 함수
   */
  const onCloseHandler = () => {
    /* Photo도 false로 비워야 하나? image key는 안 비워도 될 듯. */
    /* 글은 실수로 누를 수도 있으니까 안 비워지게 */
    /* 메모리 사진은 지움. */
    if (image.preview) URL.revokeObjectURL(image.preview);
    // setImage(prev => ({ ...prev, preview: '' }));
    setImage({ photo: '', preview: '' });
    setInputMode(false);
  };

  /** @description 자물쇠 옆 카메라에서 선택한 사진 취소하기.  */
  const cancelPhotoSelect = () => {
    if (image.preview) URL.revokeObjectURL(image.preview);
    setImage({ photo: '', preview: '' });
  };

  /**
   * @description 댓글, 대댓글 모드 필요한 것
   * 1. 댓글로 쓰는 것인지 대댓글로 쓰는 것인지 판단.
   * -> Boolean 필요 (대댓글로 쓰려는 건 카메라 막기. 전송 시 필요한 payload if문으로 갈라서 담기.)
   * 2. InputMode 활성화 시키는 Boolean 필요
   * 3. 나머지는 전송 시 payload로 기존 useState이용.(아무 사진도 선택 안 했는데 이전 이미지 전송 안 되게 조심.)
   */
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
    // const formData = new FormData();
    // formData.append('comment', initialComment);
    // formData.append('isPrivate', privateComment);
    // const blobImg = new Blob([image.photo], { type: image.photo.type });
    // formData.append('commentPhotoUrl', blobImg, image.photo.name);
    // // formData.append('commentPhotoUrl', image.photo ? image.photo : null);
    // console.log('multipart 모드 인가요? >>>', image.photo);
    const inputs = {
      formData: {
        comment: initialComment,
        isPrivate: privateComment,
        commentPhotoUrl: image.photo ? image.photo : null,
      },
      postId,
    };
    mutation.mutate(inputs);
  };

  useEffect(() => {
    SwitchFooter(false);
  }, []);

  if (isLoading) {
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log('comment page error >>>', error);
    // navigate('/daengfinder');
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }
  console.log('getComment data >>>', data);
  console.log('dataList >>>', data.data?.commentsData);

  return (
    <div className='w-full max-h-[812px]'>
      <LinkHeader icon destination={`/daengfinder/detail/${postId}`}>
        {/* 댓글&nbsp;{commentCount}{' '} */}
        <div className='f-fr'>
          댓글&nbsp;
          <p className='text-[#DB00FF]'>
            {data.data?.commentsData?.length}
            {/* {data.data?.commentsData?.length + replyList.length} */}
          </p>
        </div>
      </LinkHeader>
      {/* 댓글 사진 모달(확대) */}
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
        {data.data?.commentsData?.length > 0
          ? data.data?.commentsData.map(comment => {
              return (
                <>
                  <Comment
                    key={comment.commentId}
                    cmt={comment}
                    // myId={myId}
                    enlargePhoto={enlargePhoto}
                    onReplyMode={onReplyMode}
                    setEditMode={setEditMode}
                  />
                  <Reply
                    commentId={comment.commentId}
                    // key={reply.childCommentId}
                    // reply={reply}
                    // myId={myId}
                    onReplyMode={onReplyMode}
                    setEditMode={setEditMode}
                  />
                </>
              );
            })
          : null}
        {/* {commentList.map(comment => {
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
        })} */}
      </div>
      {/* 모달 댓글 등록 창 컴포넌트로 분리 & zustand 해서 렌더링 최적화 ㄱ */}
      {/* 댓글 모드 모달 */}
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
              onClick={cancelPhotoSelect}
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
              // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
              // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
              onClick={e => {
                e.target.value = null;
              }}
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
            // value={inputComment}
            name='comment'
            onChange={e => changeInitialVal(e)}
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
      {/* <div className='fixed inset-0'>
        <div className=''>

        </div>
      </div> */}
    </div>

    // <div className='w-full max-h-[812px]'>
    //   <LinkHeader icon destination={`/daengfinder/detail/${postId}`}>
    //     {/* 댓글&nbsp;{commentCount}{' '} */}
    //     <div className='f-fr'>
    //       댓글&nbsp;
    //       <p className='text-[#DB00FF]'>
    //         {commentList.length + replyList.length}
    //       </p>
    //     </div>
    //   </LinkHeader>

    //   <div className={`fixed inset-0 z-30 ${!modalVisible && 'hidden'} `}>
    //     <div className='absolute inset-0 bg-black opacity-30' />
    //     <div className='fixed f-fc-ic-jc gap-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    //       <div className='f-ic-jc w-80 h-80 shadow-xl rounded-lg overflow-hidden'>
    //         <img src={`${modalImg}`} alt='photoThumb' className='image' />
    //       </div>
    //       <div
    //         className='rounded-full w-12 h-12 bg-white overflow-hidden shadow-md cursor-pointer'
    //         onClick={closeModal}
    //       >
    //         <Cancel className='image shadow-md' />
    //       </div>
    //     </div>
    //   </div>
    //   {/* 문제점 반만 잘려서 보인다. pb주는 건 임시방편 방법인가... => 바로 고침 */}
    //   <div className='h-[45.6875rem] box-border overflow-y-scroll'>
    //     {commentList.map(comment => {
    //       return (
    //         <>
    //           <Comment
    //             key={comment.commentId}
    //             cmt={comment}
    //             myId={myId}
    //             enlargePhoto={enlargePhoto}
    //             onReplyMode={onReplyMode}
    //           />
    //           <Reply
    //             commentId={comment.commentId}
    //             // key={reply.childCommentId}
    //             // reply={reply}
    //             myId={myId}
    //             onReplyMode={onReplyMode}
    //           />
    //         </>
    //       );
    //     })}
    //     {/* {commentList.map(comment => {
    //       return (
    //         <>
    //           <Comment
    //             key={comment.commentId}
    //             cmt={comment}
    //             myId={myId}
    //             enlargePhoto={enlargePhoto}
    //             onReplyMode={onReplyMode}
    //           />
    //           {replyList
    //             .filter(ele => ele.CommentId === comment.commentId)
    //             .map(reply => {
    //               return (
    //                 <Reply
    //                   key={reply.childCommentId}
    //                   reply={reply}
    //                   myId={myId}
    //                   onReplyMode={onReplyMode}
    //                 />
    //               );
    //             })}
    //         </>
    //       );
    //     })} */}
    //   </div>
    //   {/* 모달 댓글 등록 창 컴포넌트로 분리 & zustand 해서 렌더링 최적화 ㄱ */}
    //   <div
    //     className={`absolute inset-0 bg-black opacity-30 ${
    //       inputMode ? '' : 'hidden'
    //     }`}
    //     onClick={onCloseHandler}
    //   />
    //   <div className='absolute z-20 bottom-4 left-0 right-0 bg-transparent px-6'>
    //     {inputMode && image.preview ? (
    //       <div className='relative f-ic-jc w-40 h-40 mb-2 bg-white shadow-md rounded-md'>
    //         <img src={image.preview} alt='photoThumb' className='image' />
    //         <div
    //           className='f-ic-jc rounded-full overflow-hidden w-7 h-7 absolute -top-1 -right-2 bg-[#FFFFFF] shadow-md cursor-pointer'
    //           onClick={() => setImage({ photo: '', preview: '' })}
    //         >
    //           <XsmallBtn className='image' />
    //         </div>
    //       </div>
    //     ) : null}
    //     <div className={`f-fr-ic gap-2 mb-2 ${!inputMode && 'hidden'}`}>
    //       <div
    //         className={`w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white ${
    //           privateComment && 'bg-[#F1E2FF]'
    //         } shadow-md cursor-pointer`}
    //         onClick={() => setPrivateComment(prev => !prev)}
    //       >
    //         <Lock
    //           className={`object-contain w-3 h-auto  ${
    //             privateComment ? 'fill-[#A54BFF]' : 'fill-[#747474]'
    //           }`}
    //         />
    //       </div>
    //       <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white shadow-md cursor-pointer'>
    //         <Camera
    //           title='upload image'
    //           className='object-contain w-4 h-auto'
    //           onClick={() => imageRef.current.click()}
    //         />
    //         <input
    //           ref={imageRef}
    //           type='file'
    //           id='imageInput'
    //           accept='image/*'
    //           className='hidden'
    //           onChange={imageHandler}
    //         />
    //       </div>
    //     </div>
    //     <div
    //       className={`f-fr-ic-jb overflow-hidden ${
    //         !inputMode && 'border opacity-60'
    //       }  rounded-lg shadow-md`}
    //       onFocus={onCommentMode}
    //     >
    //       <textarea
    //         className='h-fit max-h-12 px-4 w-full text-base placeholder:text-sm font-medium leading-6 '
    //         // placeholder={`${modeInfo}을 입력해주세요`}
    //         placeholder='댓글을 입력해주세요'
    //         onChange={e => changeInitialVal(e)}
    //       />
    //       <button
    //         className={`w-16 px-3 py-3 font-bold text-base  text-white ${
    //           inputMode ? 'bg-mainColor' : 'bg-[#E2CAFB]'
    //         }`}
    //         disabled={!inputMode}
    //         onClick={saveInputHandler}
    //       >
    //         등록
    //       </button>
    //     </div>
    //   </div>
    //   {/* <div className='absolute z-20 bottom-4 left-0 right-0  bg-transparent px-6'>
    //     <div className='f-fr-ic'>
    //       <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white'>
    //         <Unlock className='object-contain w-3 h-auto' />
    //       </div>
    //       <div className='w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white'>
    //         <Camera className='object-contain w-4 h-auto' />
    //       </div>
    //     </div>
    //     <div className='f-fr-ic-jb overflow-hidden border border-solid rounded-lg'>
    //       <textarea
    //         className='h-fit max-h-12 px-4 w-full text-base placeholder:text-sm font-medium leading-6 '
    //         placeholder='댓글을 입력해주세요'
    //       />
    //       <button className='w-16 px-3 py-3 font-bold text-base  text-white bg-[#E2CAFB]'>
    //         등록
    //       </button>
    //     </div>
    //   </div> */}
    // </div>
  );
}

export default DaengFinderCommentPage;
