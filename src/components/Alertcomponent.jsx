import React, { useState } from 'react';
import Tabbar from './Tabbar';
import Headers from './Headers';

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
      <div
        className={`flex border ml-[10px] mt-[10px] mr-[10px] p-[19px] rounded-[6px] 
        ${backColor ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'}`}
        onClick={onClickHandler}
        role='none'
      >
        <img
          className='flex bg-cover w-[43px] h-[43px] border rounded-full mr-[10px] '
          src='./KakaoTalk_20230130_153856319.jpg'
          alt='pt'
        />
        <div>
          <div className='font-[700] text-[12px]'>title</div>
          <div className='font-[400] text-[10px]'>content</div>
          <div className='font-[400] text-[10px] text-[#787878]'>date</div>
        </div>
      </div>

      <Tabbar top='30px' />
    </div>
  );
}

export default Alertcomponent;
