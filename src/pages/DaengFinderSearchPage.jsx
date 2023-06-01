import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Xbutton } from '../assets/images/Xbutton.svg';
import Input, { searchListStore } from '../zustand/components/Input';
import { ReactComponent as NoResult } from '../assets/images/NoResult.svg';

function DaengFinderSearchPage() {
  const { word, searchList, setSearchList, onDeleteSearch } = searchListStore(
    store => ({
      /* test  */
      // searchList: [...store.searchList],
      word: store.word,
      searchList: store.searchList,
      setSearchList: store.setSearchList,
      onDeleteSearch: store.onDeleteSearch,
    }),
    shallow,
  );

  const matchResult = [];
  console.log('render occured');

  const navigate = useNavigate();
  /* 812px - 40px 하고 시작했어야 했는데... 이미 375로 다 잡고 하고 있으니까 어쩔 수 없네 */
  return (
    <div className='w-full h-full'>
      <div className='w-full relative f-fr items-center justify-between px-4 shadow-md pb-5'>
        <IoIosArrowBack
          className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
          onClick={() => navigate('/daengfinder')}
        />
        <Input />
        <RxMagnifyingGlass
          className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
          onClick={setSearchList}
        />
      </div>
      <div className='h-full px-7 py-8'>
        <div className='relative h-full'>
          {word && (
            <>
              <label className='block text-sm font-bold leading-5 pb-4'>
                최근 검색
              </label>
              <ul className='f-fc gap-2 max-h-[38.75rem] overflow-y-scroll '>
                {searchList.length
                  ? searchList.map(ele => {
                      return (
                        <li
                          key={ele.id}
                          className='f-fr-ic justify-between font-medium leading-4 text-[#424242]'
                        >
                          {ele.item}{' '}
                          <Xbutton
                            width='1.25rem'
                            height='1.25rem'
                            onClick={() => onDeleteSearch(ele.id)}
                          />
                        </li>
                      );
                    })
                  : null}
              </ul>
            </>
          )}

          <div
            className={`${
              (word || matchResult.length) && 'hidden'
            } h-full w-full f-ic-jc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            <NoResult />
          </div>

          {/* <li className='f-fr-ic justify-between font-medium leading-4 text-[#424242]'>
            시바견 <Xbutton className='w-5 h-5' />
          </li>
          <li className='f-fr-ic justify-between font-medium leading-4 text-[#424242]'>
            연희동 <Xbutton className='w-5 h-5' />
          </li>
          <li className='f-fr-ic justify-between font-medium leading-4 text-[#424242]'>
            하얀 강아지 <Xbutton className='w-5 h-5' />
          </li> */}
        </div>
      </div>
    </div>
  );
}

export default DaengFinderSearchPage;
