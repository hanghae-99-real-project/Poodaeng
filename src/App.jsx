// import {
//   BrowserView,
//   MobileView,
//   // isBrowser,
//   // isMobile,
// } from 'react-device-detect';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './shared/Router';
// import Something from './Something';

const queryClient = new QueryClient();

function App() {
  /* 모바일 viewport 변환 */
  // function setScreenSize() {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // }
  // useEffect(() => {
  //   setScreenSize();
  // });

  /* viewport 100vh adjustment */
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <>
      {/* 모바일 구분 1 */}
      {/* {isMobile && <MobilePage />}
      {isBrowser && <BrowserPage />} */}
      {/* {isMobile ? <MobilePage /> : <BrowserPage />} */}
      {/* <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider> */}
      {/* 모바일 구분 2 */}
      {/* <MobileView>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </MobileView>
      <BrowserView>
        <Something />
      </BrowserView> */}
      <QueryClientProvider client={queryClient}>
        <div className='absolute bg-background bg-cover w-full h-screen bg-center' />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  );
}

export default App;
