/* eslint-disable import/prefer-default-export */
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { shallow } from "zustand/shallow"

/* eslint-disable no-unused-vars */
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
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


const { SwitchFooter } = useFooterLayout(
  state => ({
    SwitchFooter: state.SwitchFooter,
  }),
  shallow,
);


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