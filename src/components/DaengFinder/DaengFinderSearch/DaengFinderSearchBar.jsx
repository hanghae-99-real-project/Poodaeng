import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import Input from '../../../zustand/components/Input';
import { ReactComponent as SearchCancelButton } from '../../../assets/images/SearchCancelButton.svg';

const DaengFinderSearchBar = ({
  setShowRecent,
  searchDaengFinderPost,
  showSearchList,
  searchCancelHandler,
}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full relative z-30 f-fr items-center justify-between px-4 shadow-md pb-3'>
      <IoIosArrowBack
        className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
        onClick={() => navigate('/daengfinder')}
      />
      <Input
        setShowRecent={setShowRecent}
        searchDaengFinderPost={searchDaengFinderPost}
      />
      {showSearchList && (
        <div onClick={searchCancelHandler} className='absolute right-12 pr-2'>
          <SearchCancelButton className='cursor-pointer' />
        </div>
      )}
      <RxMagnifyingGlass
        className='text-3xl cursor-pointer transition duration-300 ease-in-out hover:scale-110'
        onClick={searchDaengFinderPost}
      />
    </div>
  );
};

export default DaengFinderSearchBar;
