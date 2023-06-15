import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { searchPostLost } from '../api/daengFinder';
import { ReactComponent as Xbutton } from '../assets/images/Xbutton.svg';
// import Loading from '../components/common/Loading';
// import Loading2 from '../components/common/Loading2';
import { ReactComponent as NoRecentResult } from '../assets/images/NoRecentResult.svg';
import { ReactComponent as NoSearchResult } from '../assets/images/NoSearchResult.svg';
import Card from '../components/DaengFinder/Card';
import DaengFinderSearchBar from '../components/DaengFinder/DaengFinderSearch/DaengFinderSearchBar';
import { searchListStore } from '../zustand/components/Input';

function DaengFinderSearchPage() {
  const [searchQueryStart, setSearchQueryStart] = useState(false);
  const [showRecent, setShowRecent] = useState(true);
  const [showSearchList, setShowSearchList] = useState(false);
  const {
    word,
    searchWordSnapshot,
    searchList,
    onWordChanger,
    setSearchList,
    onDeleteSearch,
    clearWord,
  } = searchListStore(
    store => ({
      word: store.word,
      searchWordSnapshot: store.searchWordSnapshot,
      searchList: store.searchList,
      onWordChanger: store.onWordChanger,
      setSearchList: store.setSearchList,
      onDeleteSearch: store.onDeleteSearch,
      clearWord: store.clearWord,
    }),
    shallow,
  );
  // const matchResult = [];
  console.log('render occured');
  const searchDaengFinderPost = useCallback(
    debounce(() => {
      setShowRecent(false);
      setSearchList();
      setSearchQueryStart(true);
    }, 200),
    [],
  );

  const searchCancelHandler = () => {
    /**
     * @description 모달로 하고 싶은데 디자인 물어봐야겠다.
     */
    setShowSearchList(false);
    setShowRecent(true);
    clearWord();
  };

  const { data, isLoading, error, isError, remove } = useQuery(
    ['searchPostLost'],
    () => searchPostLost(word),
    {
      enabled: searchQueryStart,
      refetchOnWindowFocus: false,
      onSettled: () => {
        setSearchQueryStart(false);
        setShowSearchList(true);
      },
    },
  );

  useEffect(() => {
    return () => {
      setSearchQueryStart(false);
      clearWord();
      remove();
    };
  }, []);

  if (isLoading) {
    console.log('is loading');
  }
  if (isError) {
    console.log('error 발생 >>>', error);
  }
  console.log('가져온 데이터 >>>', data);

  /* 812px - 40px 하고 시작했어야 했는데... 이미 375로 다 잡고 하고 있으니까 어쩔 수 없네 */
  /**
   * @description
   * 1. 서치바 클릭하면 최근 검색어 보여야 함.
   * 2. 검색 누르면 검색 내용 보여야 함.
   * 3. 최초 진입 시 최근 검색어 보여야 함.
   */
  return (
    <div className='w-full h-full'>
      <DaengFinderSearchBar
        setShowRecent={setShowRecent}
        searchDaengFinderPost={searchDaengFinderPost}
        showSearchList={showSearchList}
        searchCancelHandler={searchCancelHandler}
      />
      <div className='h-full px-7 py-4'>
        <div className='relative'>
          {(showRecent || showSearchList) && (
            <div className='w-full absolute z-40'>
              <div className='f-fr-ic-jb pb-4 leading-5'>
                <label className='block text-sm font-bold'>
                  {showSearchList && !showRecent ? (
                    <span className='font-medium'>
                      <span className='font-bold'>`{searchWordSnapshot}`</span>
                      로 검색한 내용
                    </span>
                  ) : (
                    '최근 검색'
                  )}
                </label>
                {showSearchList && (
                  <div className='text-sm font-bold'>
                    <span className='text-[#DB00FF]'>
                      {data?.data?.posts?.length}
                    </span>
                    &nbsp;건
                  </div>
                )}
              </div>
              {searchList.length > 0 && !showSearchList ? (
                <ul className=' f-fc gap-2 max-h-[14.5rem] overflow-y-scroll '>
                  {searchList.map(ele => {
                    return (
                      <div key={ele.id} className='f-fr-ic-jb'>
                        <li
                          role='none'
                          className='font-medium leading-4 text-[#424242] cursor-pointer'
                          onClick={() => onWordChanger(ele.item)}
                        >
                          {ele.item}
                        </li>
                        <Xbutton
                          width='1.25rem'
                          height='1.25rem'
                          className='cursor-pointer'
                          onClick={() => onDeleteSearch(ele.id)}
                        />
                      </div>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          )}
        </div>
        {showSearchList && (
          <div
            // 46.6875rem
            // min-h-[70%] pb-[2%]
            className='relative top-9 flex flex-col gap-3  w-full
            h-[80%] overflow-y-scroll'
          >
            {data?.data?.posts?.map(card => {
              return <Card key={card.postId} isDetail data={card} justSearch />;
            })}
          </div>
        )}
      </div>
      <div
        className={`${
          (word || searchList.length || showSearchList) && 'hidden'
        } h-full w-full f-ic-jc absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/2`}
      >
        <NoRecentResult />
      </div>
      <div
        className={`${
          (showRecent || data?.data?.posts?.length) && 'hidden'
        } h-full w-full f-ic-jc absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-1/2`}
      >
        <NoSearchResult />
      </div>
    </div>
  );
}

export default DaengFinderSearchPage;
