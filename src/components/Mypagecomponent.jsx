import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import Headers from './Headers';
import MypageUnknown from './MypageUnknown';
import Tabbar from './Tabbar';
import { signOut } from '../api/sendCode';

function Mypagecomponent() {
  // const tokens = Cookies.get('tokens');
  // const istoken = true;
  const istoken = true;
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(signOut, {
    onSuccess: data => {
      console.log('logout query success response >>> ', data);
      queryClient.invalidateQueries('logout');
    },
    onError: error => {
      console.log(error);
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
    navigate('/login');
  };

  return (
    <div>
      {istoken ? (
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
                <div className='font-bold text-lg '>_yujin_an</div>
                <div className='w-32 h-4 text-sm text-[#AEAEAE]'>
                  _yujin_an@IVE.com
                </div>
              </div>
            </div>
            <div className='mt-4 mr-5 mb-5 h-24 text-sm'>안유진 AN YUJIN</div>
            <div className='border mb-5' />
          </div>
          <div className='ml-5 h-52 mb-1.5'>
            <div
              className='large-button flex items-center text-lg cursor-pointer'
              onClick={() => navigate('/mypost')}
            >
              내가 작성한 글 보기
            </div>
            <div
              className='large-button flex items-center text-lg cursor-pointer'
              onClick={() => navigate('/mybookmark')}
            >
              북마크
            </div>
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
        <MypageUnknown />
      )}
    </div>
  );
}

export default Mypagecomponent;
