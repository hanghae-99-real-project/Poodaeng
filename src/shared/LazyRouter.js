/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import LoginSocial from '../components/LoginSocial';
import LogoutTest from '../components/LogoutTest';
import AuthCheck from '../pages/KakaoAuthCheck';
import SignInCompletePage from '../pages/SignInCompletePage';
import DaengFinder from '../pages/DaengFinder';
import DaengFinderCommentPage from '../pages/DaengFinderCommentPage';
import DaengFinderDetail from '../pages/DaengFinderDetail';
import DaengFinderSearchPage from '../pages/DaengFinderSearchPage';
import DaengFinderWritePage from '../pages/DaengFinderWritePage';
import Events from '../pages/Events';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Map from '../pages/Map';
import MyBookMark from '../pages/MyBookMark';
import MyPost from '../pages/MyPost';
import Mypage from '../pages/Mypage';
import PooDetail from '../pages/PooDetail';
import PooPost from '../pages/PooPost';
import ProfileEdit from '../pages/ProfileEdit';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignupPage';
import Layout from './Layout';
import LinkFooterLayout from './LinkFooterLayout';
import ScrollLayout from './ScrollLayout';

const Alert = lazy(() => import('../pages/Alert'));

// import TokenCheck from '../utils/TokenCheck';
/* Token 체크를 작성 업로드, 삭제, 수정 시에만 토큰을 보내서 확인하도록 구성하자. */
function LazyRouter() {
  // console.log("렌더링 발생하였습니다.")
  return (
    <BrowserRouter>
      <Router>
        <Suspense key='1' fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/alert" element={<Alert />} />
              <Route path="/events" element={<Events />} />
              <Route path="/map" element={<Map />} />
              <Route path='/map/:pooId' element={<PooDetail />} />
              <Route path="/poopost" element={<PooPost />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/loginsocial' element={<LoginSocial />} />
              <Route path='/auth' element={<AuthCheck />}/>
              <Route path='/signin' element={<SignInPage />}/>
              <Route path='/signup' element={<SignUpPage />}/>
              <Route path='/signincomplete' element={<SignInCompletePage />}/>
              <Route path='/mypage' element={<Mypage />}/>
              <Route path='/test' element={<LogoutTest />}/>
              <Route path='/mypost' element={<MyPost />}/>
              <Route path='/mybookmark' element={<MyBookMark />}/>
              <Route path='/profileedit' element={<ProfileEdit />}/>
              <Route path='/daengfinder' element={<DaengFinder />}/>
              <Route path='/daengfinder/search' element={<DaengFinderSearchPage />} />
            </Route>
            <Route element={<ScrollLayout />}>
              nothing yet
            </Route>
            <Route element={<LinkFooterLayout />}>
              <Route path='/daengfinder/detail/:postId' element={<DaengFinderDetail/>}/>
              <Route path='/daengfinder/comment/:postId' element={<DaengFinderCommentPage />}/>
              <Route path='/daengfinder/write' element={<DaengFinderWritePage />}/>
            </Route>
          </Routes>
        </Suspense>
        <Suspense key='2' fallback={<div>Loading ...</div>}>
          <Routes>
            <Route path='/alert' element={<Alert />} />
          </Routes>
        </Suspense>
      </Router>
    </BrowserRouter>
  );
}

export default LazyRouter;
