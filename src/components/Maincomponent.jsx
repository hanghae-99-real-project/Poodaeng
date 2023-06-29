/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import TmapAPI from './Tmap/TmapAPI';
// import Infowindow from './Tmap/Infowindow';
import { useQuery } from 'react-query';
import Kakaoserch from './Kakaoserch';
// import Loading from './common/Loading';
// import TmapApi from './TmapApi';
import { ReactComponent as Alert } from '../assets/images/Alert.svg';
// import { ReactComponent as Alerton } from '../assets/images/Alerton.svg';
import { getAlert } from '../api/main';
import { ReactComponent as NextBt } from '../assets/images/NextBt.svg';
import { ReactComponent as Event } from '../assets/images/event.svg';
import { ReactComponent as Logo } from '../assets/images/푸댕.svg';
import { getCookie } from '../utils/Cookies';
import Slidecomponent from './Slidecomponent/Slidecomponent';
// import getDaengMain from '../api/main';

function Maincomponent() {
  const navigate = useNavigate();
  const { data } = useQuery('main', getAlert);
  // if (isLoading) {
  //   return (
  //     <div className='flex flex-col h-[812px] justify-center items-center'>
  //       <Loading />
  //     </div>
  //   );
  // }
  // if (isError) {
  //   console.log(isError);
  // }

  const alertdata = data?.data?.notificationsData;
  // console.log(data.data.notificationsData);
  // const refreshToken = Cookies.get('refreshToken');
  const refreshToken = getCookie('refreshToken');

  const handleAlertClick = () => {
    if (!refreshToken) {
      navigate('/unknown');
    } else {
      navigate('/alert', { state: { alertdata } });
    }
  };

  return (
    <>
      <div className='flex flex-row justify-between w-96 h-10 mt-5 mb-2 px-5 bg-white'>
        <Logo />
        {data?.data?.notificationsData?.some(item => item.isRead === false) ? (
          <div>
            <span class='animate-ping absolute right-3 top-5 h-2 w-2 rounded-full bg-mainColor' />
            <span class='absolute right-3 top-5 h-2 w-2 rounded-full bg-mainColor' />
            <Alert
              className='cursor-pointer mt-0.5'
              onClick={handleAlertClick}
            />
          </div>
        ) : (
          <Alert className='cursor-pointer mt-0.5' onClick={handleAlertClick} />
        )}
        {/* <Alert
          className='cursor-pointer mt-0.5'
          onClick={() => navigate('/alert')}
        /> */}
      </div>
      <div className='max-h-[586px]'>
        <div
          className='flex justify-center items-center w-auto h-40 cursor-pointer'
          role='none'
          // onClick={() => navigate('/events')}
        >
          <div className=''>
            <Event />
          </div>
        </div>
        <div className='relative'>
          <div className='ml-2 mt-2 font-bold text-xl '>
            내 주변 푸박스 찾기
          </div>
          <div className='ml-2 mt-1 font-medium text-xs text-[#808080] mb-2'>
            지금 내 주변에 있는 푸박스의 위치를 확인하세요.
          </div>
          <div className='relative w-[360px] h-40  ml-2 overflow-hidden rounded-xl'>
            <Kakaoserch />
            <div
              className='relative left-3/4 bottom-10 flex items-center justify-center z-10 bg-white w-20 h-7 rounded-md text-xs text-mainColor font-bold shadow-xl cursor-pointer'
              onClick={() => navigate('/map')}
            >
              <div>지도 보기</div>
              <NextBt className='ml-1' />
            </div>
          </div>
          <div className=' mt-3 w-full border' />
        </div>
        <div className='ml-2 font-bold text-xl mt-2'>내 주변 실종신고</div>
        <div className='ml-2 font-medium text-xs text-[#808080] mt-1 mb-2'>
          주변의 실종 반려동물들을 찾아주세요.
        </div>
        <div className='flex justify-center items-center w-[360px] h-56 flex-wrap ml-2  rounded-xl'>
          <Slidecomponent />
        </div>
      </div>
      <div className='mt-1'>
        <div className='mt-24' />
      </div>
    </>
  );
}

export default Maincomponent;
