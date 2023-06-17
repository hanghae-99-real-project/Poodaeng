import React from 'react';
import { Outlet } from 'react-router-dom';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import LinkFooter from './LinkFooter';



/* The set function has a second argument, false by default. Instead of merging, it will replace the state model. Be careful not to wipe out parts you rely on, like actions. */
/* 스토어를 분리시킬 수도 있음. */
const store = (set, get) => ({
  willUseFooter: false,
  willUseHeader: false,
  SwitchHeader: (boolean)=> set(()=>({
    willUseHeader: boolean,
  })),
  SwitchFooter: (boolean)=> set(()=>({
    willUseFooter: boolean,
  })),
  ConsoleHeaderState: () => {
    console.log("Header 사용유무 확인 >>> ", get().willUserHeader);
    const reply = get().willUseHeader;
    return reply
  },
  ConsoleFooterState: () => {
    console.log("Footer 사용유무 확인 >>> ", get().willUseFooter);
    const reply = get().willUseFooter;
    return reply
  },
})

/* devTools 사용 분기 처리 */
export const useFooterLayout = create(
  process.env.NODE_ENV !== 'production'? devtools(store, {name: 'checkFooter'}) : store
)


/* -------------------------------------------------- */



/* get() 사용 */
/* const storeA = create((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count;
    set({ count: currentCount + 1 });
  },
})); */

/* getState() 사용 */
/* const storeB = create((set, get) => ({
  updateStoreA: () => {
    const currentCount = storeA.getState().count;
    const updatedCount = currentCount + 1;
    storeA.setState({ count: updatedCount });
  },
})); */

function LinkFooterLayout() {
  const { willUseFooter} = useFooterLayout(state=>({
    willUseFooter: state.willUseFooter,
  }), shallow);

  return (
      <div className='w-screen h-screen flex justify-center items-center bg-yellow-400'>
        <div className='canvas h-[calc(var(--vh,1vh)*100 + 96px)] pt-0 '> 
          {/* {willUseHeader && <LinkHeader />} */}
          <Outlet />
          {willUseFooter && <LinkFooter/>}
        </div>
      </div>
    // </div>
  )
}

export default LinkFooterLayout;