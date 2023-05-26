import {
  BrowserView,
  MobileView,
  // isBrowser,
  // isMobile,
} from 'react-device-detect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import Something from './Something';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* {isMobile && <MobilePage />}
      {isBrowser && <BrowserPage />} */}
      {/* {isMobile ? <MobilePage /> : <BrowserPage />} */}
      {/* <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider> */}
      <MobileView>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </MobileView>
      <BrowserView>
        <Something />
      </BrowserView>
    </>
  );
}

export default App;
