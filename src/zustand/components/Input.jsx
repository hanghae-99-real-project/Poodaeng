import React from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

const input = (set, get) => ({
  searchList: [],
  word: '',
  text: '',
  setSearchList: () => {
    const search = get().word;
    if (search.trim() === '') {
      console.log('empty search');
      return;
    }
    set(prev => ({
      searchList: [
        ...prev.searchList,
        {
          item: search,
          id: prev.searchList.length ? prev.searchList.at(-1).id + 1 : 0,
        },
      ],
    }));
  },
  onWordChanger: e =>
    set(() => ({
      word: e.target.value,
    })),
  onDeleteSearch: id => {
    set(prev => ({
      searchList: prev.searchList.filter(item => item.id !== id),
    }));
  },
  // onTextRef: ref => {
  //   set(() => ({
  //     text: ref.current.value,
  //   }));
  // },
});

export const searchListStore = create(subscribeWithSelector(input));

function Input() {
  const { onWordChanger, setSearchList } = searchListStore(
    state => ({
      onWordChanger: state.onWordChanger,
      setSearchList: state.setSearchList,
      // onTextRef: state.onTextRef,
    }),
    shallow,
  );
  const activeEnter = e => {
    if (e.key === 'Enter') {
      setSearchList();
    }
  };

  return (
    <div className='-translate-x-2'>
      <input
        onChange={onWordChanger}
        placeholder='검색내용을 입력하세요'
        className='w-64'
        onKeyDown={activeEnter}
        // ref={inputRef}
      />
    </div>
  );
}

export default Input;
