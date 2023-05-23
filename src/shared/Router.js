import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainPage />} />
        <Route element={<FullBackground />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<Layout />}>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/chatpage" element={<ChattingPage />} />
            <Route element={<AuthCheck />}>
              <Route path="/match" element={<MatchingPage />} />
              <Route path="/chatlist" element={<MyChatListPage />} />
            </Route>
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
