/* eslint-disable no-unused-vars */
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { bookMarkLostPost } from '../api/daengFinder';
import { ReactComponent as Bookmark } from '../assets/images/BookmarkFilled.svg';
import { ReactComponent as Clip } from '../assets/images/Clip.svg';
import { ReactComponent as Comment } from '../assets/images/Magnifier.svg';

const store = (set, get) => ({
  /**
   * @description 서버에서 먼저 axios 요청 때 bookmark 된 상태인지 확인 받은 후에 색깔 변경해주는 식으로 ㄱ
   *  */
  isBookmark: false,
  onModal: false,
  modalComment: '',
  postId: null,
  userId: null,
  url: '',
  // refreshToken: Cookies.get('refreshToken'),
  // accessToken: null,
  // setAccessToken: (accessToken) => {
  //   set(()=>({
  //     accessToken
  //   }))
  // },
  getPostId: postId => {
    set(() => ({
      postId: parseInt(postId, 10),
    }));
  },
  getUserId: userId => {
    set(() => ({
      userId: parseInt(userId, 10),
    }));
  },
  // getBookmarkState: isBookmark => {

  //   set(() => ({
  //     isBookmark
  //   }));
  // },
  getBookmarkState: isBookmarkArray => {
    set(() => ({
      isBookmark: isBookmarkArray?.length > 0,
    }));
  },
  setClipAddress: clipAddress => {
    set(() => ({
      url: `https://poodaeng.vercel.app${clipAddress}`,
    }));
  },
  onClipBoard: () => {
    // set(preState => ({ isClipped: !preState.isClipped }));
    set(() => ({
      onModal: true,
      modalComment: '공유 URL을 복사했어요!',
    }));
    setTimeout(() => set(prevState => ({ onModal: !prevState.onModal })), 1000);
  },
  // onCancelBookmark: () =>
  //   set(() => ({
  //     isBookmark: false,
  //   })),
  onBookmark: async () => {
    // set(preState => ({ isBookmark:!preState.isBookmark }));
    const inputs = {
      postId: get().postId,
    };
    try {
      const response = await bookMarkLostPost(inputs);
      // console.log('onBookMark response >>>', response);
      set(() => ({
        modalComment: get().isBookmark
          ? '북마크를 취소했어요!'
          : '북마크에 등록했어요!',
        isBookmark: !get().isBookmark,
        onModal: true,
        // modalComment: '북마크에 등록했어요!',
      }));
      // set((prev) => ({
      //   modalComment: prev.isBookmark
      //     ? '북마크를 취소했어요!'
      //     : '북마크에 등록했어요!',
      //   isBookmark: !prev.isBookmark,
      //   onModal: true,
      //   // modalComment: '북마크에 등록했어요!',
      // }));
      setTimeout(
        () => set(prevState => ({ onModal: !prevState.onModal })),
        1000,
      );
    } catch (error) {
      // console.log(error);

      set(() => ({
        isBookmark: false,
        onModal: true,
        modalComment:
          error.code === 'ECONNABORTED'
            ? '로그인 후 이용할 수 있습니다.'
            : '북마크 등록 실패!',
      }));
      setTimeout(
        () => set(prevState => ({ onModal: !prevState.onModal })),
        1000,
      );
    }
  },
});

export const useClipStore = create(
  process.env.NODE_ENV === 'development' ? devtools(store) : store,
);

function LinkFooter() {
  /* 나중에 Bookmarked 들도 객체 형태로 만들어서 관리해야 할 듯 */
  // const [isBookmarked, setIsBookmarked] = useState(false);
  /* react의 비교로직과 달리 state로 가져온 사용법은 === 연산자를 쓰기 때문에 조금 더 효율적인 랜더링이 가능합니다. ( zustand가 내세우는 장점 중에 하나입니다 ) */
  const {
    postId,
    userId,
    isBookmark,
    url,
    onClipBoard,
    // onCancelBookmark,
    onBookmark,
  } = useClipStore(
    state => ({
      postId: state.postId,
      userId: state.userId,
      isBookmark: state.isBookmark,
      url: state.url,
      onClipBoard: state.onClipBoard,
      // onCancelBookmark: state.onCancelBookmark,
      onBookmark: state.onBookmark,
    }),
    shallow,
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const bookmarkHandler = () => {
    onBookmark();
    queryClient.invalidateQueries(['daengFinderDetail', postId]);
    // if (isBookmark) {
    //   onCancelBookmark();
    //   return;
    // }
    // onBookmark();
  };

  const clipHandler = e => {
    console.log(e);
    onClipBoard();
  };

  /* 여기 나중에 zustand나 redux로 전역으로 관리해서 게시글 눌렀을 때 그 인덱스 여기로 넘겨줘야 함. */
  return (
    <div className='sticky bottom-0 z-10 w-full h-18 py-5 px-5 border-t border-solid shadow-md bg-white'>
      <div className='f-fr-ic justify-between flex-wrap'>
        <div className='f-fr gap-6 w-fit flex-wrap h-5'>
          <CopyToClipboard text={url} onCopy={e => clipHandler(e)}>
            <Clip className='cursor-pointer' />
            {/* <Clip onClick={clipHandler} className='cursor-pointer' /> */}
          </CopyToClipboard>
          <Comment
            className='cursor-pointer'
            onClick={
              () => navigate(`/daengfinder/detail/${userId}/comment/${postId}`)
              // navigate(`/daengfinder/detail/${userId}/comment/${postId}`, {
              //   state: { postOwnerId: userId },
              // })
            }
          />
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
