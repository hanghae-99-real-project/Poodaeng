/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shallow } from 'zustand/shallow';
import {
  deleteMyPost,
  editToFoundPost,
  getCurrentBookmarkState,
  searchPostLostDetail,
} from '../api/daengFinder';
import { ReactComponent as Badge } from '../assets/images/Badge1.svg';
import PhotoSlide from '../components/DaengFinder/DaengFinderDetail/PhotoSlide';
// import Badge from '../assets/images/Badge1.svg';
import { ReactComponent as CheckedPurple } from '../assets/images/CheckedPurple.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import { ReactComponent as WhiteDdaeng } from '../assets/images/WhiteDdaeng.svg';
import Loading from '../components/common/Loading';
import KakaoMap from '../kakao/KakaoMap';
import { useClipStore } from '../shared/LinkFooter';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import { dateConvert2 } from '../utils/DateConvert';
import { toastError, toastSuccess } from '../utils/ToastFreeSetting';
import { tokenStore } from './SignInPage';
import { ReactComponent as BookmarkEmpty } from '../assets/images/BookmarkEmpty.svg';
import { ReactComponent as BookmarkFilled } from '../assets/images/BookMarkFill.svg';

function DaengFinderDetail() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [daengList, setDaengList] = useState([]);
  const [daeng, setDaeng] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [passPostId, setPassPostId] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [moreInfo, setMoreInfo] = useState({
    createdAt: '',
    address: '',
    title: '',
    content: '',
    dogname: '',
    lostTime: '',
  });
  const [markerPotision, setMarkerPosition] = useState({
    lostLatitude: 0,
    lostLongitude: 0,
  });
  const {
    onModal,
    modalComment,
    isBookmark,
    setClipAddress,
    getPostId,
    getUserId,
    getBookmarkState,
    getCommentsCount,
  } = useClipStore(
    state => ({
      onModal: state.onModal,
      isBookmark: state.isBookmark,
      modalComment: state.modalComment,
      setClipAddress: state.setClipAddress,
      getPostId: state.getPostId,
      getUserId: state.getUserId,
      getBookmarkState: state.getBookmarkState,
      getCommentsCount: state.getCommentsCount,
    }),
    shallow,
  );
  const { userId: myId } = tokenStore(
    state => ({
      userId: state.tokenState.userId,
    }),
    shallow,
  );
  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );

  const navigate = useNavigate();
  const location = useLocation();
  const reDirection = location.state?.destination || null;
  const editSuccess = location.state?.success || null;
  const commentError = location.state?.error || null;
  const params = useParams();
  /**
   * @description {postId} 얘 문자형 숫자임.
   */
  let { postId } = params;
  postId = parseInt(postId, 10);
  // console.log('success 살아있는지 확인 >>>', editSuccess);
  // console.log('postId 살아있는지 확인 >>>', postId);

  const imageHandler = idx => {
    setDaeng(daengList[idx]);
    setActiveBtn(idx);
  };

  const editModeHandler = () => {
    setEditModal(prev => !prev);
  };

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteMyPost, {
    onMutate: (variables, context) => {
      // console.log('Mutation about to start >>>', variables);
      const previous = context;
      // console.log('previous >>>', previous);
    },
    onSuccess: (data, variables) => {
      // console.log('deleteMutation success >>>', data);
      // console.log('deleteMutation parameter >>>', variables);
      // queryClient.removeQueries(['getPostLost', 'detail', postId]);
      // queryClient.invalidateQueries(['getMyBookMark']);
      const fetchKey =
        reDirection === '/mybookmark' ? 'getMyBookMark' : 'getMyPost';
      queryClient.setQueryData(['getPostLost', Number(myId), fetchKey], () => {
        navigate(reDirection || '/daengfinder', {
          state: {
            deleteComplete: '게시글 삭제 완료',
            BookmarkMode: reDirection === '/mybookmark',
          },
        });
      });
    },
    onError: error => {
      // console.log('deleteMutation error >>>', error);
    },
  });

  const editToFoundMutation = useMutation(editToFoundPost, {
    onMutate: () => {
      // console.log('editToFoundPost started');
    },
    onSuccess: data => {
      setIsFound(true);
      setEditModal(prev => !prev);
      setErrorMsg(true);
      toastSuccess(`'찾았어요'로 변경 완료!`);
      // console.log('editToFoundMutation success >>>', data);
      queryClient.invalidateQueries(['getPostLost', 'detail', postId]);
    },
    onError: error => {
      // console.log('editToFoundMutation error >>>', error);
    },
  });

  const res = useQueries([
    {
      queryKey: ['getPostLost', 'detail', 'bookmark', postId],
      queryFn: () => getCurrentBookmarkState(postId),
      onSuccess: dt => {
        console.log('getCurrentBookmarkState >>>', dt);
      },
      onError: err => {
        // console.log('err >>>', err);
      },
      refetchOnWindowFocus: false,
    },
    {
      queryKey: ['getPostLost', 'detail', postId],
      queryFn: () => searchPostLostDetail(postId),
      enabled: !daeng,
      refetchOnWindowFocus: false,
      onSuccess: successData => {
        console.log('searchPostLostDetail >>>', successData);
      },
    },
  ]);

  const editToFound = () => {
    editToFoundMutation.mutateAsync(postId);
  };

  const deletePost = async () => {
    await deleteMutation.mutateAsync(postId);
  };

  const moveToPostEditPage = () => {
    navigate('/daengfinder/write', {
      state: {
        passPostId,
        daengList,
        latitude: markerPotision.lostLatitude,
        longitude: markerPotision.lostLongitude,
        createdAt: moreInfo.createdAt,
        dogname: moreInfo.dogname,
        title: moreInfo.title,
        content: moreInfo.content,
        address: moreInfo.address,
        lostTime: moreInfo.lostTime,
      },
    });
  };
  useEffect(() => {
    SwitchFooter(true);
    if (editSuccess) {
      setErrorMsg(true);
      toastSuccess(editSuccess);
    }
    if (commentError) {
      toastError(commentError);
    }

    return () => {
      SwitchFooter(false);
    };
  }, []);

  useEffect(() => {
    setClipAddress(location.pathname);
  }, [location, navigate]);

  useEffect(() => {
    // console.log('useEffect processed');
    // const deepData = res[1].data?.data ? res[1].data?.data[0] : null;
    // const bookMarkData = res[0].data?.data?.bookmarkData
    //   ? res[0].data?.data?.bookmarkData.isBookmarked
    //   : null;
    // getBookmarkState(bookMarkData);
    // setIsFound(deepData?.status);
    // setDaengList(deepData?.lostPhotoUrl || []);
    // setDaeng(
    //   deepData?.lostPhotoUrl?.length > 0 ? deepData?.lostPhotoUrl[0] : null,
    // );
    // setPassPostId(deepData?.postId);
    // getPostId(deepData?.postId);
    // getUserId(deepData?.UserId);
    // setMoreInfo({
    //   createdAt: deepData?.createdAt,
    //   address: deepData?.address,
    //   title: deepData?.title,
    //   content: deepData?.content,
    //   dogname: deepData?.dogname,
    //   lostTime: deepData?.losttime,
    // });

    const deepData = res[1].data?.data ? res[1].data?.data : null;
    const bookMarkData = res[0].data?.data?.bookmarkData
      ? res[0].data?.data?.bookmarkData.isBookmarked
      : null;
    getBookmarkState(bookMarkData);
    setIsFound(deepData?.status);
    setDaengList(deepData?.lostPhotoUrl || []);
    setDaeng(
      deepData?.lostPhotoUrl?.length > 0 ? deepData?.lostPhotoUrl[0] : null,
    );
    getCommentsCount(deepData?.commentsCount);
    setPassPostId(deepData?.postId);
    getPostId(deepData?.postId);
    getUserId(deepData?.UserId);
    setMoreInfo({
      createdAt: deepData?.createdAt,
      address: deepData?.address,
      title: deepData?.title,
      content: deepData?.content,
      dogname: deepData?.dogname,
      lostTime: deepData?.losttime,
    });
  }, [res[0].data, res[1].data]);

  /** @checkPoint return문 없어도(순차적인 렌더링 없이) query 적용되는지 확인해보자. */
  if (res[0].isLoading || res[1].isLoading) {
    return (
      // <div className='f-ic-jc w-full h-full'>
      //   <Loading />
      // </div>
      <Loading />
    );
  }

  /**
   * @description 로딩만 계속 뜨는데 로딩 계쏙 뜨게 하지 말고 뒤로 돌아가게 해야 함.
   */

  if (res[0]?.isError || res[0]?.isError) {
    navigate(-1, {
      state: {
        error: '상세 게시글 조회에 실패하였습니다.',
      },
    });
  }

  /** @camelCase 아닌 게 많다. 조심. */
  // console.log('data 깊다 >>>', data?.data);
  // const deepData = res[1].data?.data ? res[1].data?.data[0] : null;
  // const userPhotoData = res[1].data?.data[1]?.length
  //   ? res[1].data?.data[1][0]
  //   : null;
  // const imageList = deepData?.lostPhotoUrl;
  // const lostLatitude = deepData?.lostLatitude;
  // const lostLongitude = deepData?.lostLongitude;
  // const nickname = deepData?.nickname;
  // const createdAt = deepData?.createdAt;
  // const lostTime = deepData?.losttime;
  // const status = deepData?.status;

  const deepData = res[1].data?.data ? res[1].data?.data : null;
  const userPhotoData = deepData?.User?.userPhoto[0]
    ? deepData?.User?.userPhoto[0]
    : null;
  const imageList = deepData?.lostPhotoUrl;
  const lostLatitude = deepData?.lostLatitude;
  const lostLongitude = deepData?.lostLongitude;
  const nickname = deepData?.User.nickname;
  const createdAt = deepData?.createdAt;
  const lostTime = deepData?.losttime;
  const status = deepData?.status;

  return (
    <div className='h-[812px] w-full'>
      {errorMsg && <ToastContainer />}
      <IoIosArrowBack
        className='absolute z-30 top-7 left-4 text-2xl text-[#FFFFFF] drop-shadow cursor-pointer hover:scale-110 transition'
        onClick={() =>
          navigate(reDirection ? '/mypost' : '/daengfinder', {
            state: {
              BookmarkMode: reDirection === '/mybookmark',
              isScroll: true,
            },
            preventScrollReset: true,
          })
        }
      />
      {deepData?.UserId === myId ? (
        <WhiteDdaeng
          className='absolute z-30 top-6 right-4  cursor-pointer'
          onClick={editModeHandler}
        />
      ) : null}
      <div className={`fixed inset-0 z-30 ${onModal.on ? '' : 'hidden'}`}>
        <div role='none' className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 f-fc-ic-jc  bg-white  bg-opacity-80 shadow backdrop-blur-[10px] rounded-md  px-14 py-8'>
          <div className='f-fc-ic gap-2 '>
            {onModal.sort === 'clipboard' ? (
              <Clip className='antialiased blur-none' />
            ) : onModal.sort === 'bookmark' && isBookmark ? (
              <BookmarkFilled className='antialiased' />
            ) : (
              <BookmarkEmpty className='antialiased' />
            )}
            <div className='w-36 text-center text-sm antialiased whitespace-nowrap font-bold leading-4'>
              {modalComment}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[45rem] overflow-y-scroll'>
        <div className='flex items-center justify-center relative w-full h-80'>
          <PhotoSlide daengList={daengList} />
        </div>
        {/* <div className='bg-[#FFFFFF] px-5 h-[25rem] overflow-y-scroll'> */}
        <div className='bg-[#FFFFFF] px-5 '>
          <div className='f-fr text-xl font-semibold gap-2 border-b border-solid border-[#ECECEC] py-5'>
            {userPhotoData ? (
              <img
                src={userPhotoData}
                alt='photoThumb'
                className='rounded-full image w-8 h-8'
              />
            ) : (
              <Badge />
            )}
            {nickname}
          </div>
          <div className='py-4'>
            <div className='text-xl font-semibold pb-3'>{deepData?.title}</div>
            <div className='f-fc gap-2'>
              <p className='text-xs font-bold'>
                반려동물 이름
                <span className='pl-3 font-medium text-xs text-[#515151]'>
                  {deepData?.dogname}
                </span>
              </p>
              <p className='text-xs font-bold'>
                실종 위치{' '}
                <span className='pl-2 font-medium text-xs text-[#515151]'>
                  {deepData?.address}
                </span>
              </p>
              <p className='text-xs font-bold'>
                실종 시각{' '}
                <span className='pl-2 font-medium text-xs text-[#515151]'>
                  {dateConvert2(lostTime)[1]}
                </span>
              </p>
            </div>
            <div className='pt-5'>
              {/* <p className='font-medium text-xs leading-5 text-[#8C8C8C]'>
                {data.data.data.content}
              </p> */}
              <p
                className='font-medium text-xs leading-5 text-[#8C8C8C]'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(deepData?.content),
                }}
              />
            </div>
            <div className='pt-5'>
              <label className='text-xs font-bold mb-2'>상세위치</label>
              <KakaoMap
                width='w-80'
                height='h-36'
                rounded='rounded-sm'
                lat={lostLatitude}
                lng={lostLongitude}
                getMarkerPosition={setMarkerPosition}
                // getMarkerPosition={getMarkerPosition}
              />
              <div className='pt-5 f-fr gap-2 parent font-medium text-xs text-[#969696]'>
                {/* <span>2023.05.03</span> */}
                {/* <span>{dateConvert2(createdAt)[2]}</span> */}
                <span>{dateConvert2(createdAt)[2]}</span>
                <span>|</span>
                <span>{deepData?.views}&nbsp;회</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editModal && (
        <div className='absolute z-20 inset-0'>
          <div role='none' className='absolute inset-0 bg-black opacity-30' />
          <div className='absolute f-fc justify-end bottom-0 left-0 right-0 rounded-t-xl bg-[#FFFFFF]'>
            <button
              className={`f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 overflow-hidden cursor-pointer ${
                !isFound && 'text-[#D9D9D9]'
              } `}
              onClick={editToFound}
              disabled={isFound}
            >
              <CheckedPurple
                className={`${
                  isFound
                    ? 'bg-mainColor'
                    : 'bg-[#D9D9D9] hover:scale-110 transition duration-300'
                }  rounded-sm`}
              />
              &nbsp;찾았어요
            </button>
            <div
              className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 cursor-pointer'
              onClick={moveToPostEditPage}
            >
              수정하기
            </div>

            <div
              className='f-ic-jc py-6 border-b border-solid border-[#E1E1E1] text-base font-bold leading-5 cursor-pointer'
              onClick={deletePost}
            >
              삭제하기
            </div>
            <div
              className='f-ic-jc py-6 pb-8 border-b border-solid text-white bg-mainColor cursor-pointer'
              onClick={editModeHandler}
            >
              취소
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DaengFinderDetail;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="col-start-1 col-end-5 p-1 bg-mainPurple rounded-l-md"></div> */
}
