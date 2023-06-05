import React from 'react';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { searchPostLost } from '../../../api/daengFinder';
import { ReactComponent as NoResult } from '../../../assets/images/NoResult.svg';
import { searchListStore } from '../../../zustand/components/Input';
import Loading from '../../common/Loading2';

function DaengFinderSearchResult() {
  const { word } = searchListStore(
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

  const { data, isLoading, error, isError } = useQuery(
    'searchPostLost',
    () => searchPostLost({ search: word }),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return (
      <div className='h-full px-7 py-8'>
        <div className='relative h-full'>
          <Loading />
        </div>
      </div>
    );
  }

  if (isError) {
    console.log('error >>>', error);
    return (
      <div className='h-full px-7 py-8'>
        <div className='relative h-full'>
          <Loading />
        </div>
      </div>
    );
  }

  console.log('data >>>', data);

  const matchResult = [];
  console.log('render occured');
  return (
    <div className='h-full px-7 py-8'>
      <div className='relative h-full'>
        <div
          className={`${
            (word || matchResult.length) && 'hidden'
          } h-full w-full f-ic-jc absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <NoResult />
        </div>
      </div>
    </div>
  );
}

export default DaengFinderSearchResult;
