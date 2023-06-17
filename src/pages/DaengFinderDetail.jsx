/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { shallow } from 'zustand/shallow';
import {
  deleteMyPost,
  editToFoundPost,
  searchPostLostDetail,
} from '../api/daengFinder';
import { ReactComponent as Badge } from '../assets/images/Badge1.svg';
import { ReactComponent as CheckedPurple } from '../assets/images/CheckedPurple.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import { ReactComponent as WhiteDdaeng } from '../assets/images/WhiteDdaeng.svg';
import Loading from '../components/common/Loading2';
import KakaoMap from '../kakao/KakaoMap';
import { useClipStore } from '../shared/LinkFooter';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import { dateConvert2 } from '../utils/DateConvert';
import { tokenStore } from './SignInPage';
import { toastSuccess } from '../utils/ToastFreeSetting';

// import useCurrentLocation from '../hooks/useCurrentLocation';

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
  });
  const [markerPotision, setMarkerPosition] = useState({
    lostLatitude: 0,
    lostLongitude: 0,
  });
  const {
    onModal,
    modalComment,
    setClipAddress,
    getPostId,
    getUserId,
    getBookmarkState,
  } = useClipStore(
    state => ({
      onModal: state.onModal,
      modalComment: state.modalComment,
      setClipAddress: state.setClipAddress,
      getPostId: state.getPostId,
      getUserId: state.getUserId,
      getBookmarkState: state.getBookmarkState,
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
      queryClient.removeQueries(['daengFinderDetail', postId]);
      navigate(reDirection || '/daengfinder', {
        state: { deleteComplete: '게시글 삭제 완료' },
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
      // console.log('editToFoundMutation success >>>', data);
      queryClient.invalidateQueries(['daengFinderDetail', postId]);
    },
    onError: error => {
      // console.log('editToFoundMutation error >>>', error);
    },
  });

  const { isLoading, data, isError, error } = useQuery(
    ['daengFinderDetail', postId],
    () => searchPostLostDetail(postId),
    {
      enabled: !daeng,
      refetchOnWindowFocus: false,
      onSuccess: successData => {
        // console.log('useQuery >>>', successData);
      },
    },
  );

  const editToFound = () => {
    editToFoundMutation.mutate(postId);
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
      },
    });
  };
  useEffect(() => {
    SwitchFooter(true);
    if (editSuccess) {
      setErrorMsg(true);
      toastSuccess(editSuccess);
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
    const deepData = data?.data;
    getBookmarkState(deepData?.BookMarks);
    setDaengList(deepData?.lostPhotoUrl || []);
    setDaeng(deepData?.lostPhotoUrl[0] || null);
    setPassPostId(deepData?.postId);
    getPostId(deepData?.postId);
    getUserId(deepData?.UserId);
    setMoreInfo({
      createdAt: deepData?.createdAt,
      address: deepData?.address,
      title: deepData?.title,
      content: deepData?.content,
      dogname: deepData?.dogname,
    });
  }, [data]);

  /** @checkPoint return문 없어도(순차적인 렌더링 없이) query 적용되는지 확인해보자. */
  if (isLoading) {
    // console.log('isLoading >>> ');
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    // console.log('error >>> ', error);
    setErrorMsg(true);
    toast.error('Error occured while Loading', {
      position: toast.POSITION.TOP_CENTER,
      toastId: 'empty-comment-toast',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  /** @camelCase 아닌 게 많다. 조심. */
  // console.log('data 깊다 >>>', data?.data);
  const deepData = data?.data;
  const imageList = deepData?.lostPhotoUrl;
  const lostLatitude = deepData?.lostLatitude;
  const lostLongitude = deepData?.lostLongitude;
  const nickname = deepData?.nickname;
  const createdAt = deepData?.createdAt;

  return (
    // <div className='relative w-full'>
    <div className='relative h-[88.91625%] w-full'>
      {errorMsg && <ToastContainer />}
      <IoIosArrowBack
        className='absolute z-30 top-7 left-4 text-xl cursor-pointer'
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
      <div className={`fixed inset-0 z-30 ${onModal ? '' : 'hidden'}`}>
        <div role='none' className='absolute inset-0 bg-black opacity-30' />
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 f-fc-ic-jc  bg-[#FFFFFF] rounded-md  shadow-lg px-14 py-8'>
          <div className='f-fc-ic gap-2 '>
            <Clip className='blur-none' />
            <div className='w-36 text-center text-sm whitespace-nowrap font-bold leading-4 blur-none'>
              {modalComment}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[45rem] overflow-y-scroll'>
        <div className='flex items-center justify-center relative w-full h-80'>
          <div className='absolute bottom-3 f-fr-jc gap-3'>
            {daengList.length &&
              daengList.map((_, idx) => {
                return (
                  <input
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    type='button'
                    className={`w-2 h-2 rounded-full border-[#B3B3B3] ${
                      activeBtn === idx ? 'bg-[#FFFFFF]' : 'bg-[#B3B3B3]'
                    } cursor-pointer transition duration-150 `}
                    onClick={() => imageHandler(idx)}
                  />
                );
              })}
          </div>
          <img
            src={daeng}
            alt='photoThumb'
            className='object-cover w-full h-full'
          />
        </div>
        {/* <div className='bg-[#FFFFFF] px-5 h-[25rem] overflow-y-scroll'> */}
        <div className='bg-[#FFFFFF] px-5 '>
          <div className='f-fr text-xl font-semibold gap-2 border-b border-solid border-[#ECECEC] py-5'>
            <Badge />
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
                  {dateConvert2(deepData?.createdAt)[1]}
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
                isFound && 'text-[#D9D9D9]'
              } `}
              onClick={editToFound}
              disabled={deepData?.status}
            >
              <CheckedPurple
                className={`${
                  isFound ? 'bg-[#D9D9D9]' : 'bg-mainColor'
                } hover:scale-110 transition duration-300 rounded-sm`}
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
              onClick={() => deleteMutation.mutate(postId)}
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
