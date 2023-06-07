import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getDateDiff } from '../../utils/DateConvert';

function Card({ isDetail, data }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex ${
        isDetail
          ? 'flex-row gap-3 py-3 border-b border-[#ECECEC]'
          : 'flex-col gap-2'
      } `}
      // onClick={() => navigate('/daengfinder/detail')}
      onClick={() => navigate(`/daengfinder/detail/${data.postId}`)}
    >
      <div
        className={`f-ic-jc ${
          isDetail ? 'w-24 h-24' : 'w-40 h-40'
        }  border border-[#9E9E9E] overflow-hidden`}
      >
        <img
          // src={`${process.env.PUBLIC_URL}/images/DoggyExample.png`}
          src={data.lostPhotoUrl[0]}
          alt='photoThumb'
          className={`image transition duration-300 ease-in-out ${
            !isDetail && 'hover:scale-110 cursor-pointer'
          }`}
        />
      </div>
      <div className={`flex flex-col justify-center gap-2 `}>
        <div className={`flex flex-col gap-1 ${isDetail && 'cursor-pointer'}`}>
          <h1 className='font-bold text-sm truncate'>{data.title}</h1>
          {isDetail ? (
            // whitespace-normal 이랑 whitespace-nowrap이랑 똑같다
            <p className=' text-xs w-56   line-clamp-3'>{data.content}</p>
          ) : null}
        </div>
        <div>
          <p className='text-xs font-medium text-[#969696]'>
            {getDateDiff(data.createdAt)}
          </p>
        </div>
      </div>
    </div>
    // <div
    //   className={`flex ${
    //     isDetail
    //       ? 'flex-row gap-3 py-3 border-b border-[#ECECEC]'
    //       : 'flex-col gap-2'
    //   } `}
    //   onClick={() => navigate('/daengfinder/detail')}
    // >
    //   <div
    //     className={`f-ic-jc ${
    //       isDetail ? 'w-24 h-24' : 'w-40 h-40'
    //     }  border border-[#9E9E9E] overflow-hidden`}
    //   >
    //     <img
    //       src={`${process.env.PUBLIC_URL}/images/DoggyExample.png`}
    //       alt='photoThumb'
    //       className={`image transition duration-300 ease-in-out ${
    //         !isDetail && 'hover:scale-110 cursor-pointer'
    //       }`}
    //     />
    //   </div>
    //   <div className={`flex flex-col justify-center gap-2 `}>
    //     <div className={`flex flex-col gap-1 ${isDetail && 'cursor-pointer'}`}>
    //       <h1 className='font-bold text-sm truncate'>
    //         방금 말티즈를 발견했어요. 너무 무서웠어요.
    //       </h1>
    //       {isDetail ? (
    //         // whitespace-normal 이랑 whitespace-nowrap이랑 똑같다
    //         <p className=' text-xs w-56   line-clamp-3'>
    //           강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요. 강아지가
    //           저를 물었어요. 저도 그래서 강아지를 물었어요. 강아지가 저를
    //           물었어요. 저도 그래서 강아지를 물었어요. 강아지가 저를 물었어요.
    //           저도 그래서 강아지를 물었어요.
    //         </p>
    //       ) : null}
    //     </div>
    //     <div>
    //       <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Card;
