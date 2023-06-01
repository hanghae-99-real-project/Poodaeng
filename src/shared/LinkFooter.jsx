import React from 'react';
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { ReactComponent as Bookmark } from '../assets/images/BookmarkFilled.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import { ReactComponent as Magnifier } from '../assets/images/Magnifier.svg';

/* immer 사용 */
/* import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer' // npm install immer 필요

const useBeeStore = create(
  immer((set) => ({ // <- 바로 요기 부분
    bees: 0,
    addBees: (by) =>
      set((state) => {
        state.bees += by
      }),
  }))
) */

// import { immer } from 'zustand/middleware/immer' // npm install immer 필요
/* create 밑줄은 사용되면 자연스럽게 사라짐. */
// const useBeeStore = create(set => ({
//   bees: 0,
//   immerInc: () =>
//     set(() => ({
//       bees: 0,
//     })),
//   // immerInc: () =>
//   //   set(
//   //     produce(state => {
//   //       state.bees += 1;
//   //     }),
//   //   ),
// }));

export const useClipStore = create(set => ({
  /* 서버에서 먼저 axios 요청 때 bookmark 된 상태인지 확인 받은 후에 색깔 변경해주는 식으로 ㄱ */
  isBookmark: false,
  onModal: false,
  modalComment: '',
  onClipBoard: () => {
    // set(preState => ({ isClipped: !preState.isClipped }));
    set(() => ({
      onModal: true,
      modalComment: '공유 URL을 복사했어요!',
    }));
    setTimeout(() => set(prevState => ({ onModal: !prevState.onModal })), 1000);
  },
  onCancelBookmark: () =>
    set(() => ({
      isBookmark: false,
    })),
  onBookmark: () => {
    // set(preState => ({ isBookmark:!preState.isBookmark }));
    set(() => ({
      isBookmark: true,
      onModal: true,
      modalComment: '북마크에 등록했어요!',
    }));
    setTimeout(() => set(prevState => ({ onModal: !prevState.onModal })), 1000);
  },
}));

function LinkFooter() {
  /* 나중에 Bookmarked 들도 객체 형태로 만들어서 관리해야 할 듯 */
  // const [isBookmarked, setIsBookmarked] = useState(false);
  /* react의 비교로직과 달리 state로 가져온 사용법은 === 연산자를 쓰기 때문에 조금 더 효율적인 랜더링이 가능합니다. ( zustand가 내세우는 장점 중에 하나입니다 ) */
  const { isBookmark, onClipBoard, onCancelBookmark, onBookmark } =
    useClipStore(
      state => ({
        isBookmark: state.isBookmark,
        onClipBoard: state.onClipBoard,
        onCancelBookmark: state.onCancelBookmark,
        onBookmark: state.onBookmark,
      }),
      shallow,
    );
  const bookmarkHandler = () => {
    if (isBookmark) {
      onCancelBookmark();
      return;
    }
    onBookmark();
  };

  const clipHandler = () => {
    onClipBoard();
  };

  /* 여기 나중에 zustand나 redux로 전역으로 관리해서 게시글 눌렀을 때 그 인덱스 여기로 넘겨줘야 함. */
  return (
    <div className='relative bottom-0 z-50 w-full h-24 pt-3 px-5 border-t border-solid shadow-md'>
      <div className='f-fr-ic justify-between flex-wrap'>
        <div className='f-fr gap-6 w-fit flex-wrap h-5'>
          <Magnifier className='cursor-pointer' />
          <Clip onClick={clipHandler} cursor-pointer />
        </div>
        <Bookmark
          className={`${isBookmark && 'fill-[#C699F4]'} cursor-pointer`}
          onClick={bookmarkHandler}
        />
      </div>
    </div>
  );
}

export default LinkFooter;
