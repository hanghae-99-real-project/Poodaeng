import React, { useState } from 'react';
import Headers from './Headers';
import Tabbar from './Tabbar';

function Alertcomponent() {
  const [backColor, setBackColor] = useState(false);

  const onClickHandler = () => {
    setBackColor(true);
  };

  return (
    <div className='h-[812px]'>
      <Headers text icon destination=''>
        알림
      </Headers>
      <div className='h-5/6'>
        <div
          className={`flex border ml-[10px] my-[10px] mr-[10px] p-[19px] rounded-[6px] 
        ${backColor ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'}`}
          onClick={onClickHandler}
          role='none'
        >
          <img
            className='flex bg-cover w-[43px] h-[43px] border rounded-full mr-[10px] '
            src='https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202008/17/newsen/20200817160051331jsfk.jpg'
            alt='pt'
          />
          <div>
            <div className='font-[700] text-[12px]'>title</div>
            <div className='font-[400] text-[10px]'>content</div>
            <div className='font-[400] text-[10px] text-[#787878]'>date</div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Tabbar />
      </div>
    </div>
  );
}

export default Alertcomponent;
