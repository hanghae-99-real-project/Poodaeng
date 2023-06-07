/* eslint-disable no-unused-vars */
import { omit } from "lodash"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import convertCoordinates from "../../kakao/KakaoApi"

const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))

/* 위도 경도 구한 값을을 DaengFinderWritePage 전에 혹은 DaengFinderMap을 바로 꽂아주자. */
/* 값 구하는 건 DaengFinderWritePage 이전 페이지에서 구해야 함. */
export const useLocationStore = create((set, get)=> ({
  location: {latitude: 0, longitude: 0},
  roadAddress: '',
  setLocation: (latitude, longitude)=> set(()=>({
    location: {latitude, longitude},
  })),
  setRoadAddress: (roadAddress)=> {
    if(roadAddress) {
      set(()=>({
        roadAddress,
      }))
    } else {
      set(()=>({
        roadAddress: '',
      }))
    }
  },
  getRoadAddress: async(latitude, longitude)=> {
    try {
      const response = await convertCoordinates(latitude, longitude)
      set(()=>({
        roadAddress:response
      }))
    } catch (error) {
      set(()=>({
        roadAddress: error
      }))
    }
  }
}))

// useClipStore.setState({postId: ~~})
// useClipStore.setState((prev)=>({postId: prev.postId + 1}))

/* -------------------------------------------------- */


const useFishStore2 = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // clears the entire store, actions included
  deleteTuna: () => set((state) => omit(state, ['tuna']), true),
}))




/* -------------------------------------------------- */
/* export const useFooterLayout = create(devtools(set => ({
  willUseFooter: false,
  SwitchFooter: (boolean)=> set(()=>({
    willUseFooter: boolean,
  }))
}))) */
/* The set function has a second argument, false by default. Instead of merging, it will replace the state model. Be careful not to wipe out parts you rely on, like actions. */
/* 스토어를 분리시킬 수도 있음. */
const store = (set, get) => ({
  willUseFooter: false,
  
  SwitchFooter: (boolean)=> set(()=>({
    willUseFooter: boolean,
  })),
  ConsoleFooterState: () => {
    console.log("메서드 안 콘솔 >>> ", get().willUseFooter);
    const sound = get().willUseFooter;
    return sound
  }
})

/* devTools 사용 분기 처리 */
export const useFooterLayout = create(
  process.env.NODE_ENV !== 'production'? devtools(store) : store
)


/* -------------------------------------------------- */


// const { SwitchFooter } = useFooterLayout(
//   state => ({
//     SwitchFooter: state.SwitchFooter,
//   }),
//   shallow,
// );


/* -------------------------------------------------- */

const storeA = create((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count;
    set({ count: currentCount + 1 });
  },
}));

const storeB = create((set, get) => ({
  updateStoreA: () => {
    const currentCount = storeA.getState().count;
    const updatedCount = currentCount + 1;
    storeA.setState({ count: updatedCount });
  },
}));



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