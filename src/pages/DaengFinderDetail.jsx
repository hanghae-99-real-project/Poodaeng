import React from 'react';

function DaengFinderDetail() {
  return (
    <div className='h-full w-full selection:bg-yellow-300'>
      <div>
        <img src='' alt='photoThumb' />
      </div>
      <div className='bg-mainColor'>
        <div>닉네임</div>
        <div>
          <div>제목제목</div>
          <div>
            <p>
              반려동물 이름 <span>뽀삐</span>
            </p>
            <p>
              실종 위치 <span>마포구 연남동</span>
            </p>
            <p>
              실종 시각 <span>2023년 5월 2일 오후 06:00</span>
            </p>
          </div>
          <div>
            <textarea>하위</textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaengFinderDetail;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className="col-start-1 col-end-5 p-1 bg-mainPurple rounded-l-md"></div> */
}
