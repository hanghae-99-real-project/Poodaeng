/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Headers from './Headers';
import { ReactComponent as Report } from '../assets/images/report.svg';
import { reportPooBox } from '../api/poobox';
import { dateConvert2 } from '../utils/DateConvert';

function PooDetailComponent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const address = params.get('address'); // UserId
  const content = params.get('content'); // address
  const imageUrl = params.get('imageUrl'); // content
  const pooId = params.get('pooId'); // pooId
  const UserId = params.get('UserId'); // createdAT
  const createdAt = params.get('createdAt'); // imgage
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refreshToken');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState('');
  const { accessToken } = useSelector(store => store.auth);

  console.log('address', address);
  console.log('content', content);
  console.log('imageUrl', imageUrl);
  console.log('pooId', pooId);
  console.log('UserId', UserId);
  console.log('createdAt', createdAt);

  const reportContent = {
    reportContent: contents,
  };

  const reportData = {
    pooId,
    UserId: address,
    accessToken,
    reportContent,
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(reportPooBox, {
    onSuccess: () => {
      queryClient.invalidateQueries('poobox');
      console.log('신고 완료');
    },
    onError: error => {
      console.log(error);
    },
  });

  const openModal = () => {
    if (!refreshToken) {
      return navigate('/login');
    }
    return setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contentsClick = item => {
    setContents(item);
  };

  const reportHandler = () => {
    mutation.mutate(reportData);
    closeModal();
  };

  return (
    <div>
      <Headers text icon destination='map'>
        푸박스 정보
      </Headers>
      <div>
        <img
          src={createdAt}
          alt='img'
          className='w-full h-80 border object-cover'
        />
        <div className='flex flex-col justify-between h-96 px-7 py-14'>
          <div className='flex justify-between'>
            <div>
              <div className='font-bold'>주소</div>
              <div>{content}</div>
            </div>
            <Report className='cursor-pointer' onClick={openModal} />
          </div>
          <div className='flex'>
            <div className='font-bold'>등록 날짜</div>
            &nbsp; <div>{dateConvert2(UserId)[1]}</div>
          </div>
          <div>
            <div className='font-bold'>특이사항</div>
            <div>{imageUrl}</div>
          </div>
          <button className='bg-mainColor text-white w-full h-12 rounded-xl'>
            여기로 길 찾기 시작
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white w-80 p-4 rounded-lg'>
            <div className='flex justify-between'>
              <div />
              <div className='text-xl font-bold mb-4'>신고 사유</div>
              <div className='cursor-pointer' onClick={closeModal}>
                X
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <ul className='flex flex-col gap-3'>
                <li
                  onClick={() =>
                    contentsClick('해당 위치에 푸박스가 없어졌어요.')
                  }
                >
                  <input
                    type='radio'
                    checked={contents === '해당 위치에 푸박스가 없어졌어요.'}
                  />
                  해당 위치에 푸박스가 없어졌어요.
                </li>
                <li onClick={() => contentsClick('푸박스가 설명과 달라요.')}>
                  <input
                    type='radio'
                    checked={contents === '푸박스가 설명과 달라요.'}
                  />
                  푸박스가 설명과 달라요.
                </li>
                기타
                <input
                  className='w-full h-10 border'
                  onChange={e => contentsClick(e.target.value)}
                />
              </ul>

              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                onClick={reportHandler}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PooDetailComponent;
