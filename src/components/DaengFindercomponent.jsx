import React, { useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { SlMenu } from 'react-icons/sl';
import { areaList } from '../data/Areas';

function DaengFindercomponent() {
  const [selectedArea, setSelectedArea] = useState('마포구 연남동');
  const [isShow, setIsShow] = useState(false);
  const [isDetail, setIsDetail] = useState(true);

  const selectAreaHandler = e => {
    const { innerText } = e.target;
    setSelectedArea(innerText);
  };
  const selectOpenHandler = () => {
    setIsShow(prev => !prev);
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between h-7 w-[375px]  px-[34px] pb-5 mb-7 border-b shadow-md'>
        <div className='w-[30px]' />
        <div className='font-bold text-xl '>댕 finder</div>
        <RxMagnifyingGlass className='text-3xl' />
      </div>
      <div className='w-full flex flex-row justify-between px-5 mb-6'>
        <div
          className={`flex flex-col justify-center relative w-40 h-9  border border-[#ACACAC] shadow-md rounded-md
          after:content-[${(
            <RiArrowUpSFill className='text-amber-300 after:text-sm ' />
          )}] 
          cursor-pointer`}
          onClick={selectOpenHandler}
        >
          {isShow ? (
            <RiArrowUpSFill className='absolute top-1/2 right-1 -translate-y-1/2 text-2xl text-[#ACACAC]' />
          ) : (
            <RiArrowDownSFill className='absolute top-1/2 right-1 -translate-y-1/2 text-2xl text-[#ACACAC]' />
          )}
          <label className='pl-3 text-left cursor-pointer'>
            {selectedArea}
          </label>
          <ul
            className={`${
              isShow ? '' : 'hidden'
            } absolute top-9  text-left z-20 w-full rounded-md bg-white border border-[#ACACAC] shadow-md ${
              isShow ? 'max-h-[350px]' : 'max-h-0'
            } overflow-hidden flex flex-col cursor-pointer`}
          >
            {areaList.map(area => {
              return (
                <li
                  role='none'
                  key={area}
                  value={area}
                  onClick={selectAreaHandler}
                  className='pl-3 z-20 w-full focus:bg-[#ACACAC] hover:bg-[#ACACAC] active:bg-[#ACACAC] '
                >
                  {area}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex flex-row bg-[#F2F2F2] gap-1 p-1'>
          <div
            className={`p-1  ${
              isDetail ? 'shadow-md rounded-sm bg-[#FFFFFF]' : ''
            } cursor-pointer transition duration-150`}
            onClick={() => setIsDetail(true)}
          >
            <BiCategory
              className={`text-xl  ${
                isDetail ? 'text-[#0A0A0A]' : 'text-[#CDCDCD]'
              } cursor-pointer transition duration-150`}
            />
          </div>
          <div
            className={`p-1  ${
              !isDetail ? 'shadow-md rounded-sm bg-[#FFFFFF]' : ''
            } cursor-pointer transition duration-150`}
            onClick={() => setIsDetail(false)}
          >
            <SlMenu
              className={`text-xl  ${
                !isDetail ? 'text-[#0A0A0A]' : 'text-[#CDCDCD]'
              } cursor-pointer transition duration-150`}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col px-6 gap-3 h-full overflow-y-scroll'>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 py-3 border-b border-[#ECECEC]'>
          <div className='w-24 h-24 border border-[#9E9E9E]'>
            <img src='' alt='photoThumb' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-bold'>방금 말티즈를 발견했어요</h1>
              <p className='text-xs'>
                강아지가 저를 물었어요. 저도 그래서 강아지를 물었어요.
              </p>
            </div>
            <div>
              <p className='text-xs font-medium text-[#969696]'>2시간 전</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DaengFindercomponent;
