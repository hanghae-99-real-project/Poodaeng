/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import {
  deletePostComment,
  deletePostReply,
  editPostComment,
  getPostComment,
  writePostComment,
  writePostReply,
} from '../api/daengFinder';
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
  // const [commentList, setCommentList] = useState([
  //   {
  //     commentId: 1,
  //     PostId: 1,
  //     UserId: 1,
  //     comment: '그만 탈출해...',
  //     commentPhotoUrl:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     nickname: '보라돌이',
  //     userPhoto:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //     commentLatitude: 'DECIMAL(17, 14)',
  //     commentLongitude: 'DECIMAL(17, 14)',
  //     address: 'STRING',
  //   },
  //   {
  //     commentId: 2,
  //     PostId: 1,
  //     UserId: 2,
  //     comment: '그만 탈출해...',
  //     commentPhotoUrl:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     nickname: '보라돌이',
  //     userPhoto: '',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: false,
  //     commentLatitude: 'DECIMAL(17, 14)',
  //     commentLongitude: 'DECIMAL(17, 14)',
  //     address: 'STRING',
  //   },
  //   {
  //     commentId: 3,
  //     PostId: 1,
  //     UserId: 3,
  //     comment: '그만 탈출해...',
  //     commentPhotoUrl: '',
  //     nickname: '보라돌이',
  //     userPhoto: '',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //     commentLatitude: 'DECIMAL(17, 14)',
  //     commentLongitude: 'DECIMAL(17, 14)',
  //     address: 'STRING',
  //   },
  //   {
  //     commentId: 4,
  //     PostId: 1,
  //     UserId: 4,
  //     comment: '그만 탈출해...',
  //     commentPhotoUrl:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     nickname: '보라돌이',
  //     userPhoto: '',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: false,
  //     commentLatitude: 'DECIMAL(17, 14)',
  //     commentLongitude: 'DECIMAL(17, 14)',
  //     address: 'STRING',
  //   },
  //   {
  //     commentId: 5,
  //     PostId: 1,
  //     UserId: 5,
  //     comment: '그만 탈출해...',
  //     commentPhotoUrl:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     nickname: '보라돌이',
  //     userPhoto: '',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: false,
  //     commentLatitude: 'DECIMAL(17, 14)',
  //     commentLongitude: 'DECIMAL(17, 14)',
  //     address: 'STRING',
  //   },
  // ]);

  // const [replyList, setReplyList] = useState([
  //   {
  //     childCommentId: '1',
  //     CommentId: 1,
  //     UserId: 1,
  //     childComment: '헉 저 아까 가로수길 지나가다가 어쩌구~',
  //     nickname: '뚜비',
  //     userPhoto:
  //       'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036_1280.jpg',
  //     createdAt: Date(),
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  //   {
  //     childCommentId: '2',
  //     CommentId: 1,
  //     UserId: 10,
  //     childComment: 'STRING',
  //     nickname: 'STRING',
  //     userPhoto: '',
  //     createdAt: 'DATE',
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  //   {
  //     childCommentId: '3',
  //     CommentId: 1,
  //     UserId: 1,
  //     childComment: 'STRING',
  //     nickname: 'STRING',
  //     // userPhoto: 'JSON',
  //     userPhoto: '',
  //     createdAt: 'DATE',
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  //   {
  //     childCommentId: '4',
  //     CommentId: 4,
  //     UserId: 1,
  //     childComment: 'STRING',
  //     nickname: 'STRING',
  //     // userPhoto: 'JSON',
  //     userPhoto: '',
  //     createdAt: 'DATE',
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  //   {
  //     childCommentId: '5',
  //     CommentId: 4,
  //     UserId: 1,
  //     childComment: 'STRING',
  //     nickname: 'STRING',
  //     // userPhoto: 'JSON',
  //     userPhoto: '',
  //     createdAt: 'DATE',
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  //   {
  //     childCommentId: '6',
  //     CommentId: 4,
  //     UserId: 1,
  //     childComment: 'STRING',
  //     nickname: 'STRING',
  //     // userPhoto: 'JSON',
  //     userPhoto: '',
  //     createdAt: 'DATE',
  //     updatedAt: 'DATE',
  //     isPrivate: true,
  //   },
  // ]);

  /* 댓글에 있는 사진 모달(확대) */
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImg, setModalImg] = useState('');

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
   * 7. 문제점: 내가 답글을 달려고 하는 댓글이 이미 isPrivate이 true 면 밑의 답글은 privateComment 선택 못하게 막아야 함. absolutePrivate
   * 8. 대댓글 수정은 없다.
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
  /* private랑 이미지, 커멘트만 따로 관리 */
  // const [inputMode, setInputMode] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [isCommentMode, setIsCommentMode] = useState({
    inputMode: false,
    commentId: null,
    targetComment: true, // true면 댓글 false면 답글
    absolutePrivate: false, // true 면 private 모드 못 풀게 해야 함.
  });
  const [isEditMode, setEditMode] = useState({
    editMode: false,
    editModal: false,
    targetComment: true,
    userId: null, // 댓글 단 사람의 UserId
    commentId: null,
    childCommentId: null,
    contents: '',
    absolutePrivate: false,
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
   *
   *  @description 이미지 제외하고 다 초기화
   * */
  const resetFunc = () => {
    setIsCommentMode({
      inputMode: false,
      commentId: null,
      targetComment: true, // true면 댓글 false면 답글
      absolutePrivate: false, // true 면 private 모드 못 풀게 해야 함.
    });
    setEditMode({
      editMode: false,
      editModal: false,
      targetComment: true,
      userId: null, // 댓글 단 사람의 UserId
      commentId: null,
      childCommentId: null,
      contents: '',
      absolutePrivate: false,
    });
    onClearInitialVal();
    setPrivateComment(false);
  };

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
      onError: err => {
        console.log('useQuery Error >>>', err);
      },
    },
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(writePostComment, {
    // variables는 { postId: 123, formData: { ... } }와 같은 값
    // onSuccess: (dt, variables) => {
    onSuccess: dt => {
      console.log('writePostComment mutation success >>>', dt);
      resetFunc();
      queryClient.invalidateQueries(['getComment', postId]);
      // queryClient.invalidateQueries(['getComment', variables.postId]);
      if (image.preview) URL.revokeObjectURL(image.preview);
      setImage({ photo: '', preview: '' });
      toast.success('댓글 작성 완료!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: err => {
      console.log('writePostComment mutation error >>>', err);
      resetFunc();
      setAlertMsg(true);
      toast.error('댓글 작성 오류!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const mutation2 = useMutation(writePostReply, {
    onSuccess: dt => {
      console.log('writePostReply mutation success >>>', dt);
      // queryClient.invalidateQueries(['getReply', postId]);
      resetFunc();
      queryClient.invalidateQueries(['getReply', isCommentMode.commentId]);
      toast.success('답글 작성 완료!', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: err => {
      console.log('writePostReply error >>>', err);
      resetFunc();
      setAlertMsg(true);
      toast.error('답글 작성 오류', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const editPostCommentMutation = useMutation(editPostComment, {
    onSuccess: dt => {
      console.log('editPostCommentMutation success >>>', dt);
      resetFunc();
      queryClient.invalidateQueries(['getComment', postId]);
    },
    onError: err => {
      console.log('editPostCommentMutation error >>>', err);
      resetFunc();
      setAlertMsg(true);
      toast.error('댓글 수정 실패', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const deleteCommentMutation = useMutation(deletePostComment, {
    onSuccess: dt => {
      console.log('deleteCommentMutation success >>>', dt);
      resetFunc();
      queryClient.invalidateQueries(['getComment', postId]);
    },
    onError: err => {
      console.log('deleteCommentMutation error >>>', err);
      resetFunc();
      setAlertMsg(true);
      toast.error('댓글 삭제 오류', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  const deleteReplyMutation = useMutation(deletePostReply, {
    onSuccess: dt => {
      console.log('deleteReplyMutation success >>>', dt);
      queryClient.invalidateQueries(['getReply', isEditMode.commentId]);
      resetFunc();
    },
    onError: err => {
      console.log('deleteReplyMutation error >>>', err);
      resetFunc();
      setAlertMsg(true);
      toast.error('답글 삭제 오류', {
        position: toast.POSITION.TOP_CENTER,
        toastId: 'empty-comment-toast',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });

  /**
   * @description 이거는 댓글의 사진 확대 했을 때 모달을 열고 사진 확대시키는 함수
   */
  const enlargePhoto = e => {
    console.log(e.target.src);
    setModalImg(e.target.src);
    setModalVisible(true);
  };

  /**
   * @description 이거는 댓글의 사진 확대 했을 때의 모달을 닫고 중앙에 띄어준 사진을 치우는 함수
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
    resetFunc();
    if (image.preview) URL.revokeObjectURL(image.preview);
    // setImage(prev => ({ ...prev, preview: '' }));
    setImage({ photo: '', preview: '' });
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
   * 4. 댓글 모달 열리는 방법이 두 가지가 있네. 그냥 댓글, 그리고 답글글
   */

  /**
   * @description 그냥 댓글 열리는 모드 : 이건 좀 생각해보자.
   */
  const onCommentMode = event => {
    setIsCommentMode(prev => ({
      ...prev,
      inputMode: true,
      // commentId: null,
      // targetComment: true, // true면 댓글 false면 답글모드 + 카메라 불가능
      // absolutePrivate: false, // true면 무조건 private 모드 해제 불가능
    }));
    event.stopPropagation();
  };
  // const onReplyMode = () => {
  //   // setModeInfo('답글');
  //   setInputMode(true);
  // };

  const onEditCommentMode = () => {
    if (isEditMode.absolutePrivate) {
      setPrivateComment(true);
    }
    setIsCommentMode(prev => ({
      ...prev,
      inputMode: true,
    }));
    setEditMode(prev => ({
      ...prev,
      editModal: false,
    }));

    if (
      isEditMode.editMode &&
      isEditMode.targetComment &&
      isEditMode.contents
    ) {
      changeInitialVal(isEditMode.contents);
    }
  };

  const controllLockButton = () => {
    if (isCommentMode.absolutePrivate || isEditMode.absolutePrivate) {
      setPrivateComment(true);
    } else {
      setPrivateComment(prev => !prev);
    }
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
    let inputs;

    if (isEditMode.editMode) {
      if (isEditMode.targetComment) {
        inputs = {
          postId,
          commentId: isEditMode.commentId,
          comment: { comment: initialComment },
        };
        editPostCommentMutation.mutate(inputs);
        return;
      }
    }

    if (isCommentMode.targetComment) {
      inputs = {
        formData: {
          comment: initialComment,
          isPrivate: privateComment,
          commentPhotoUrl: image.photo ? image.photo : null,
        },
        postId,
      };
      mutation.mutate(inputs);
    } else if (!isCommentMode.targetComment) {
      inputs = {
        formData: {
          childComment: initialComment,
          isPrivate: privateComment,
        },
        commentId: isCommentMode.commentId,
        postId,
      };
      mutation2.mutate(inputs);
    }
  };

  const deleteCommentReply = () => {
    let inputs;
    if (isEditMode.targetComment) {
      inputs = {
        postId,
        commentId: isEditMode.commentId,
      };
      deleteCommentMutation.mutate(inputs);
    } else {
      inputs = {
        postId,
        commentId: isEditMode.commentId,
        childCommentId: isEditMode.childCommentId,
      };
      deleteReplyMutation.mutate(inputs);
    }
  };

  useEffect(() => {
    SwitchFooter(false);

    return () => {
      onClearInitialVal();
    };
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
  // console.log('getComment data >>>', data);
  // console.log('dataList >>>', data.data?.commentsData);

  // const [isCommentMode, setIsCommentMode] = useState({
  //   inputMode: false,
  //   postId: null,
  //   userId: null,
  //   commentId: null,
  //   childCommentId: null,

  console.log(
    '상태 체크 >>>',
    'isEditMode.editMode',
    isEditMode.editMode,
    'isEditMode.targetComment',
    isEditMode.targetComment,
    'isEditMode.contents',
    isEditMode.contents,
    'isCommentMode.absolutePrivate',
    isCommentMode.absolutePrivate,
    'isEditMode.absolutePrivate',
    isEditMode.absolutePrivate,
    'privateComment',
    privateComment,
  );

  // });
  return (
    <div className='w-full max-h-[812px]'>
      {alertMsg && <ToastContainer />}
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
                    // onReplyMode={onReplyMode}
                    setIsCommentMode={setIsCommentMode}
                    setEditMode={setEditMode}
                  />
                  <Reply
                    commentId={comment.commentId}
                    // key={reply.childCommentId}
                    // reply={reply}
                    // myId={myId}
                    // onReplyMode={onReplyMode}
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
          isCommentMode.inputMode ? '' : 'hidden'
        }`}
        onClick={onCloseHandler}
      />
      <div className='absolute z-20 bottom-4 left-0 right-0 bg-transparent px-6'>
        {isCommentMode.inputMode && image.preview ? (
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
        <div
          className={`f-fr-ic gap-2 mb-2 ${
            !isCommentMode.inputMode && 'hidden'
          }`}
        >
          <div
            className={`w-7 h-7 f-ic-jc overflow-hidden rounded-full bg-white ${
              (privateComment ||
                isCommentMode.absolutePrivate ||
                isEditMode.absolutePrivate) &&
              'bg-[#F1E2FF]'
            } shadow-md cursor-pointer`}
            onClick={controllLockButton}
          >
            {/* 내 화면상에서 구분해주려고 설정하는 거. 댓글 작성 때 절대 비밀, 수정 때 댓글 절대 비밀 */}
            {isCommentMode.absolutePrivate || isEditMode.absolutePrivate ? (
              <Lock
                className='object-contain w-3 h-auto  
                fill-[#A54BFF]'
              />
            ) : (
              <Lock
                className={`object-contain w-3 h-auto  ${
                  privateComment ? 'fill-[#A54BFF]' : 'fill-[#747474]'
                }`}
              />
            )}
          </div>
          {isCommentMode.inputMode &&
            isCommentMode.targetComment &&
            !isEditMode.editMode && (
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
            )}
        </div>
        <div
          // inputMode가 true여야지 투명이 아님. editMode가 true면 수정하기 버튼이 보여질테고
          // 그 수정하기 버튼을 누르면  수정하려고 input 연 것인지 아니면 댓글을 달려고 input을 연 것인지 판단 해야 함.
          // 어떻게 해줘야 하지?
          // input 모드가 아니거나 edit 모드가 아니면 불투명
          // 만약 input 모드가 true면
          // editMode는 상태 전달만 하고 사실상 input 을 띄울지 말지는 inputMode가 정한다. 세부적인 조건은 Editmode 이용.
          className={`f-fr-ic-jb overflow-hidden ${
            !isCommentMode.inputMode && 'border opacity-60'
          }  ${isEditMode.editModal && 'hidden'} rounded-lg shadow-md`}
          onFocus={event => onCommentMode(event)}
        >
          <textarea
            className='h-fit max-h-12 px-4 w-full text-base placeholder:text-sm font-medium leading-6 '
            // placeholder={`${modeInfo}을 입력해주세요`}
            placeholder='댓글을 입력해주세요'
            name='comment'
            value={initialComment}
            onChange={e => changeInitialVal(e.target.value)}
          />
          <button
            className={`w-16 px-3 py-3 font-bold text-base  text-white ${
              isCommentMode.inputMode ? 'bg-mainColor' : 'bg-[#E2CAFB]'
            }`}
            disabled={!isCommentMode.inputMode}
            onClick={saveInputHandler}
          >
            등록
          </button>
        </div>
      </div>
      {/* 두 가지 종류 중 absolutePrivate이 하나라도 true라면 privateComment를 true로 바꿔야 함. */}
      {isEditMode.editModal && (
        <div className='absolute z-50 inset-0'>
          <div role='none' className='absolute inset-0 bg-black opacity-30' />
          <div className='absolute f-fc justify-end bottom-0 left-0 right-0 rounded-t-xl bg-[#FFFFFF]'>
            {isEditMode.userId === myId ? (
              <>
                {isEditMode.targetComment && (
                  <div
                    className='f-ic-jc py-6 pt-8 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 cursor-pointer'
                    onClick={onEditCommentMode}
                  >
                    수정하기
                  </div>
                )}
                <div
                  className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 cursor-pointer'
                  onClick={deleteCommentReply}
                >
                  삭제하기
                </div>
              </>
            ) : (
              <div className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 cursor-pointer'>
                신고하기
              </div>
            )}
            <div
              className='f-ic-jc py-6 pb-8 border-b border-solid text-white bg-mainColor cursor-pointer'
              onClick={resetFunc}
            >
              취소
            </div>
          </div>
        </div>
      )}
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
    //   <div className='absolute z-50 inset-0'>
    //     <div role='none' className='absolute inset-0 bg-black opacity-30' />
    //     <div className='absolute f-fc justify-end bottom-0 left-0 right-0 rounded-t-xl bg-[#FFFFFF]'>
    //       {editModeInfo.userId === myId ? (
    //         <>
    //           <div className='f-ic-jc py-6 pt-8 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5'>
    //             수정하기
    //           </div>
    //           <div className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5'>
    //             삭제하기
    //           </div>
    //         </>
    //       ) : (
    //         <div className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5'>
    //           신고하기
    //         </div>
    //       )}
    //       <div className='f-ic-jc py-6 pb-8 border-b border-solid text-white bg-mainColor'>
    //         취소
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DaengFinderCommentPage;
