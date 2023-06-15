import React from 'react';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

const input = (set, get) => ({
  searchList: [],
  word: '',
  searchWordSnapshot: '',
  setSearchList: () => {
    const search = get().word.trim();
    if (search === '') {
      console.log('empty search');
      return;
    }
    set(() => ({
      searchWordSnapshot: search,
    }));
    /** @description 중복 처리 로직 생각해보기 */
    const prevSearchList = get().searchList;
    const filterResult = prevSearchList.find(list => list.item === search);
    if (filterResult) {
      console.log('duplication of search');
    } else {
      set(prev => ({
        searchList: [
          ...prev.searchList,
          {
            item: search,
            id: prev.searchList.length ? prev.searchList.at(-1).id + 1 : 0,
          },
        ],
      }));
    }
  },
  onWordChanger: value =>
    set(() => ({
      word: value,
    })),
  onDeleteSearch: id => {
    set(prev => ({
      searchList: prev.searchList.filter(item => item.id !== id),
    }));
  },
  clearSearchList: () => set(() => ({ searchList: [] })),
  clearWord: () => set(() => ({ word: '', searchWordSnapshot: '' })),
  clearSearchWordAll: () =>
    set(() => ({ searchList: [], word: '', searchWordSnapshot: '' })),
});

/**
 * @description searchWordSnapshot 얘도 persist 해야 할 수도
 */
export const searchListStore = create(
  subscribeWithSelector(
    persist(input, {
      name: 'searchList',
      partialize: state => ({
        searchList: state.searchList,
        word: state.word,
        searchWordSnapshot: state.searchWordSnapshot,
      }),
    }),
  ),
);

// function Input({ setShowRecent }) {
function Input({ searchDaengFinderPost }) {
  const { word, onWordChanger } = searchListStore(
    state => ({
      word: state.word,
      onWordChanger: state.onWordChanger,
      setSearchList: state.setSearchList,
    }),
    shallow,
  );
  const activeEnter = e => {
    if (e.key === 'Enter') {
      // setSearchList();
      searchDaengFinderPost();
    }
  };

  return (
    <div className='pl-2'>
      <input
        autoFocus
        onChange={e => onWordChanger(e.target.value)}
        placeholder='검색내용을 입력하세요'
        className='w-64 py-2'
        onKeyDown={activeEnter}
        value={word}
      />
    </div>
  );
}

export default Input;
