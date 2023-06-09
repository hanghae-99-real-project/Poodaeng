/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { searchPostLostDetail } from '../api/daengFinder';
import { ReactComponent as Badge } from '../assets/images/Badge1.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import Loading from '../components/common/Loading2';
import KakaoMap from '../kakao/KakaoMap';
import { useClipStore } from '../shared/LinkFooter';
import { useFooterLayout } from '../shared/LinkFooterLayout';
import { dateConvert2 } from '../utils/DateConvert';
// import useCurrentLocation from '../hooks/useCurrentLocation';

function DaengFinderDetail() {
  const [daengList, setDaengList] = useState([]);
  // const [daeng, setDaeng] = useState('/images/DoggyExample.png');
  const [daeng, setDaeng] = useState();
  const [activeBtn, setActiveBtn] = useState(0);
  /* 이거 마커 포지션 안움직일 수도 있으니까 initVal을 현재 위치로 해야 함 */
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

  /**
   * @checkPoint
   * @param {Number} latitude
   * @param {Number} longitude
   */

  const { SwitchFooter } = useFooterLayout(
    state => ({
      SwitchFooter: state.SwitchFooter,
    }),
    shallow,
  );
  const navigate = useNavigate();
  const location = useLocation();
  console.log('location >>>', location);

  const params = useParams();
  /**
   * @description {postId} 얘 문자형 숫자임.
   */
  const { postId } = params;

  console.log('markerposition >>> ', markerPotision);
  // const imageList = [
  //   '/images/DoggyExample.png',
  //   '/images/DoggyExample.png',
  //   '/images/DoggyExample.png',
  //   '/images/MockImg.svg',
  // ];

  // const imageHandler = idx => {
  //   // eslint-disable-next-line no-use-before-define
  //   setDaeng(imageList[idx]);
  //   setActiveBtn(idx);
  // };
  const imageHandler = idx => {
    // eslint-disable-next-line no-use-before-define
    setDaeng(daengList[idx]);
    setActiveBtn(idx);
  };

  // useEffect(() => {
  //   /* 잘 되는구만 캬캬 */
  //   const response = convertCoordinates(
  //     markerPotision.latitude,
  //     markerPotision.longitude,
  //   );
  //   console.log('좌표 변환 값 >>>', response);
  // }, [markerPotision.latitude, markerPotision.longitude]);

  useEffect(() => {
    SwitchFooter(true);
    setClipAddress(location.pathname);
  }, []);

  const { isLoading, data, isError, error } = useQuery(
    ['daengFinderDetail', postId],
    () => searchPostLostDetail(postId),
    {
      enabled: !daeng,
      refetchOnWindowFocus: false,
      // onSuccess: () => {
      //   setDaengList(data?.data?.data?.lostPhotoUrl || []);
      //   setDaeng(data?.data?.data?.lostPhotoUrl[0] || null);
      // },
    },
  );

  useEffect(() => {
    console.log('useEffect processed');
    setDaengList(data?.data?.data?.lostPhotoUrl || []);
    setDaeng(data?.data?.data?.lostPhotoUrl[0] || null);
    getPostId(data?.data?.data?.postId);
    getUserId(data?.data?.data?.UserId);
  }, [data]);

  /** @checkPoint return문 없어도(순차적인 렌더링 없이) query 적용되는지 확인해보자. */
  if (isLoading) {
    console.log('isLoading >>> ');
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    console.log('error >>> ', error);
    return (
      <div className='f-ic-jc w-full h-full'>
        <Loading />
      </div>
    );
  }

  /** @camelCase 아닌 게 많다. 조심. */
  console.log('data 깊다 >>>', data?.data?.data);
  const deepData = data?.data?.data;
  const imageList = data?.data?.data?.lostPhotoUrl;
  const lostLatitude = data?.data?.data?.lostLatitude;
  const lostLongitude = data?.data?.data?.lostLongitude;
  const nickname = data?.data?.data?.nickname;
  const createdAt = data?.data?.data?.createdAt;

  return (
    <div className='h-full w-full'>
      <IoIosArrowBack
        className='absolute z-30 top-7 left-4 text-xl cursor-pointer'
        onClick={() => navigate('/daengfinder')}
      />
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
                    className={`w-2 h-2 rounded-full ${
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
            <div className='text-xl font-semibold pb-3'>
              {data?.data?.data.title}
            </div>
            <div className='f-fc gap-2'>
              <p className='text-xs font-bold'>
                반려동물 이름
                <span className='pl-3 font-medium text-xs text-[#515151]'>
                  {data?.data?.data.dogname}
                </span>
              </p>
              <p className='text-xs font-bold'>
                실종 위치{' '}
                <span className='pl-2 font-medium text-xs text-[#515151]'>
                  {data?.data?.data.address}
                </span>
              </p>
              <p className='text-xs font-bold'>
                실종 시각{' '}
                <span className='pl-2 font-medium text-xs text-[#515151]'>
                  {dateConvert2(data?.data?.data.createdAt)[1]}
                </span>
              </p>
            </div>
            <div className='pt-5'>
              <p className='font-medium text-xs leading-5 text-[#8C8C8C]'>
                {data.data.data.content}
              </p>
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
                <span>조회 34 회</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='h-full w-full'>
    //   <IoIosArrowBack
    //     className='absolute z-30 top-7 left-4 text-xl'
    //     onClick={() => navigate('/daengfinder')}
    //   />
    //   <div className={`fixed inset-0 z-30 ${onModal ? '' : 'hidden'}`}>
    //     <div role='none' className='absolute inset-0 bg-black opacity-30' />
    //     <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 f-fc-ic-jc  bg-[#FFFFFF] rounded-md  shadow-lg px-14 py-8'>
    //       <div className='f-fc-ic gap-2 '>
    //         <Clip className='blur-none' />
    //         <div className='w-36 text-center text-sm whitespace-nowrap font-bold leading-4 blur-none'>
    //           {modalComment}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='flex items-center justify-center relative w-full h-80'>
    //     <div className='absolute bottom-3 f-fr-jc gap-3'>
    //       {imageList.map((_, idx) => {
    //         return (
    //           <input
    //             // eslint-disable-next-line react/no-array-index-key
    //             key={idx}
    //             type='button'
    //             className={`w-2 h-2 rounded-full ${
    //               activeBtn === idx ? 'bg-[#FFFFFF]' : 'bg-[#B3B3B3]'
    //             } cursor-pointer transition duration-150 `}
    //             onClick={() => imageHandler(idx)}
    //           />
    //         );
    //       })}
    //     </div>
    //     <img
    //       src={`${process.env.PUBLIC_URL}${daeng}`}
    //       alt='photoThumb'
    //       className='object-cover w-full h-full'
    //     />
    //   </div>
    //   <div className='bg-[#FFFFFF] px-5 h-[25rem] overflow-y-scroll'>
    //     <div className='f-fr text-xl font-semibold gap-2 border-b border-solid border-[#ECECEC] py-5'>
    //       <Badge />
    //       닉네임
    //     </div>
    //     <div className='py-4'>
    //       <div className='text-xl font-semibold pb-3'>제목제목</div>
    //       <div className='f-fc gap-2'>
    //         <p className='text-xs font-bold'>
    //           반려동물 이름
    //           <span className='pl-3 font-medium text-xs text-[#515151]'>
    //             뽀삐
    //           </span>
    //         </p>
    //         <p className='text-xs font-bold'>
    //           실종 위치{' '}
    //           <span className='pl-2 font-medium text-xs text-[#515151]'>
    //             마포구 연남동
    //           </span>
    //         </p>
    //         <p className='text-xs font-bold'>
    //           실종 시각{' '}
    //           <span className='pl-2 font-medium text-xs text-[#515151]'>
    //             2023년 5월 2일 오후 06:00
    //           </span>
    //         </p>
    //       </div>
    //       <div className='pt-5'>
    //         <p className='font-medium text-xs leading-5 text-[#8C8C8C]'>
    //           우리 강아지는 하얗고 귀여운 말티즈 뽀삐예요우리 강아지는 하얗고
    //           귀여운 말티즈 뽀삐예요우리 강아지는 하얗고 귀여운 말티즈 뽀삐예요{' '}
    //         </p>
    //       </div>
    //       <div className='pt-5'>
    //         <label className='text-xs font-bold mb-2'>상세위치</label>
    //         <KakaoMap
    //           width='w-80'
    //           height='h-36'
    //           rounded='rounded-sm'
    //           getMarkerPosition={setMarkerPosition}
    //           // getMarkerPosition={getMarkerPosition}
    //         />
    //         <div className='pt-5 f-fr gap-2 parent font-medium text-xs text-[#969696]'>
    //           <span>2023.05.03</span>
    //           <span>|</span>
    //           <span>조회 34 회</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DaengFinderDetail;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="col-start-1 col-end-5 p-1 bg-mainPurple rounded-l-md"></div> */
}
