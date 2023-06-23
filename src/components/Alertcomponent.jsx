import React from 'react';
import Headers from './Headers';

function Alertcomponent() {
  // const [backColor, setBackColor] = useState(false);

  // const onClickHandler = () => {
  //   setBackColor(true);
  // };

  return (
    <div className='h-full'>
      <Headers text icon destination=''>
        알림
      </Headers>
      {/* <div className='h-5/6'>
        <div
          className={`flex border ml-3 my-3 mr-3 p-5 rounded-md 
        ${backColor ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'}`}
          onClick={onClickHandler}
          role='none'
        >
          <img
            className='flex bg-cover w-11 h-11 border rounded-full mr-3'
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
      <div className=''>
        <Tabbar />
      </div> */}
      <div className='flex w-full h-full items-center justify-center'>
        준비중 입니다
      </div>
    </div>
  );
}

export default Alertcomponent;
