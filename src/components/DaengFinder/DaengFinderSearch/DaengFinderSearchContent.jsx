import React from 'react';
import { shallow } from 'zustand/shallow';
import { searchListStore } from '../../../zustand/components/Input';
// import { ReactComponent as NoResult } from '../../../assets/images/NoResult.svg';
import { ReactComponent as Xbutton } from '../../../assets/images/Xbutton.svg';

function DaengFinderSearchContent() {
  const { word, searchList, onDeleteSearch } = searchListStore(
    store => ({
      /* test  */
      // searchList: [...store.searchList],
      word: store.word,
      searchList: store.searchList,
      // setSearchList: store.setSearchList,
      onDeleteSearch: store.onDeleteSearch,
    }),
    shallow,
  );
  // const matchResult = [];
  console.log('render occured');

  /* search 페이지에서 검색을 누를 시 안쪽 컨텐트가 페이지 이동이 돼야 할 듯 */
  /* state로 검색 모드를 관리할 거면 굳이 navigate 안해도 되고 state 관리 안할거면 navigate 써야 함. */

  return (
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
        {/* <div
          className={`${
            (word || matchResult.length) && 'hidden'
          } h-full w-full f-ic-jc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <NoResult />
        </div> */}
      </div>
    </div>
  );
}

export default DaengFinderSearchContent;
