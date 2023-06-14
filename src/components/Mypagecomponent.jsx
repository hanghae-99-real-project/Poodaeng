import Cookies from 'js-cookie';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { getMypageCount } from '../api/myPage';
import { signOut } from '../api/sendCode';
import { resetUserInfoLog } from '../zustand/example/zustandAPI';
import Headers from './Headers';
import Tabbar from './Tabbar';
import Loading from './common/Loading';

function Mypagecomponent() {
  const refreshToken = Cookies.get('refreshToken');
  const navigate = useNavigate();

  const mutation = useMutation(signOut, {
    onSuccess: data => {
      resetUserInfoLog();
      console.log('logout query success response >>> ', data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
    navigate('/login');
  };

  const { isLoading, isError, data } = useQuery('profile', getMypageCount);

  if (isLoading) {
    return (
      <div className='flex flex-col h-[812px] justify-center  items-center'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return navigate('/unknown');
  }

  const { mypageContent } = data.data;

  // const pooData = data?.data?.getMyPooData;
  // if (!pooData) {
  //   return <Loading />;
  // }

  return (
    <div>
      {refreshToken ? (
        <div className='flex flex-col'>
          <Headers text>마이페이지</Headers>
          <div className='flex flex-col ml-5 mt-5'>
            <div className='flex'>
              <div>
                <img
                  className='w-24 h-24 rounded-full object-contain bg-cover'
                  src='https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202008/17/newsen/20200817160051331jsfk.jpg'
                  alt='profile img'
                />
              </div>
              <div className='flex flex-col justify-center gap-2 ml-3'>
                <div className='font-bold text-2xl '>
                  _yujin_an<span className='text-[#A4A4A4] ml-1'>님</span>
                </div>
                <div className='w-32 h-4 text-sm text-[#AEAEAE]'>
                  _yujin_an@IVE.com
                </div>
              </div>
            </div>
            <div className='flex justify-evenly mt-4 mr-5 mb-5 h-24 text-sm border rounded-lg p-2 bg-[#F3F3F3]'>
              <div
                className='flex flex-col items-center justify-center w-20 gap-2 cursor-pointer'
                onClick={() =>
                  navigate('/mypost', {
                    state: {
                      BookmarkMode: false,
                    },
                  })
                }
              >
                <div> 작성한글</div>
                <div className='font-bold text-mainColor'>
                  {mypageContent[1]}
                  <span className='text-black'>개</span>
                </div>
              </div>
              <div className='border' />
              <div
                className='flex flex-col items-center justify-center w-20 gap-2 cursor-pointer'
                onClick={() => navigate('/mypoobox')}
              >
                <div> 등록한 푸박스</div>
                <div className='font-bold text-mainColor'>
                  {mypageContent[0]}
                  <span className='text-black'>개</span>
                </div>
              </div>
              <div className='border' />
              <div
                className='flex flex-col items-center justify-center w-20 gap-2 cursor-pointer'
                onClick={() =>
                  navigate('/mybookmark', {
                    state: {
                      BookmarkMode: true,
                    },
                  })
                }
              >
                <div> 북마크</div>
                <div className='font-bold text-mainColor'>
                  {mypageContent[2]}
                  <span className='text-black'>개</span>
                </div>
              </div>
            </div>
            <div className='border mb-5' />
          </div>
          <div className='ml-5 h-52 mb-1.5'>
            <div
              className='large-button flex items-center text-lg cursor-pointer'
              onClick={() => navigate('/profileedit')}
            >
              프로필 설정하기
            </div>
            <div
              className='large-button flex items-center text-lg cursor-pointer'
              onClick={logoutHandler}
            >
              로그아웃
            </div>
          </div>
          <div className='mt-40'>
            <Tabbar />
          </div>
        </div>
      ) : (
        navigate('/unknown')
      )}
    </div>
  );
}

export default Mypagecomponent;
