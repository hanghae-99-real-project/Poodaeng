/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSocial from '../components/LoginSocial';
import Alert from '../pages/Alert';
import KakaoAuthCheck from '../pages/KakaoAuthCheck';
import SignInCompletePage from '../pages/SignInCompletePage';
import DaengFinder from '../pages/DaengFinder';
import DaengFinderDetail from '../pages/DaengFinderDetail';
import Events from '../pages/Events';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Map from '../pages/Map';
import MyBookMark from '../pages/MyBookMark';
import MyPost from '../pages/MyPost';
import Mypage from '../pages/Mypage';
import PooPost from '../pages/PooPost';
import ProfileEdit from '../pages/ProfileEdit';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignupPage';
import Layout from './Layout';
import LinkFooterLayout from './LinkFooterLayout';
import ScrollLayout from './ScrollLayout';
import DaengFinderSearchPage from '../pages/DaengFinderSearchPage';
import DaengFinderCommentPage from '../pages/DaengFinderCommentPage';
import DaengFinderWritePage from '../pages/DaengFinderWritePage';
import PooDetail from '../pages/PooDetail';
import TmapPage from '../pages/Tmappage';
import TabbarsOutlet from './TabbarsOutlet';
import MyPooboxcomponent from '../components/MyPooboxcomponent';
import Unknown from '../pages/Unknown';
import PasswordFind from '../pages/PasswordFind';
import RouteChangeTracker from '../google/RouteChangeTracker';
import PasswordEdit from '../pages/PasswordEdit';


// import TokenCheck from '../utils/TokenCheck';
/* Token 체크를 작성 업로드, 삭제, 수정 시에만 토큰을 보내서 확인하도록 구성하자. */
function Router() {
  // console.log("Router 렌더링 발생하였습니다.")
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/poopost" element={<PooPost />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/loginsocial' element={<LoginSocial />} />
          <Route path='/auth' element={<KakaoAuthCheck />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/signin' element={<SignInPage />}/>
          {/* <Route path='/test' element={<LogoutTest />}/> */}
          <Route path='/tmap/:pooId' element={<TmapPage />} />
          <Route path='/map/:pooId' element={<PooDetail />} />
          <Route path='/unknown' element={<Unknown />} />
          <Route path='/profileedit' element={<ProfileEdit />}/>
          <Route path='/passwordedit' element={<PasswordEdit />}/>
        </Route>
        <Route element={<ScrollLayout />}>
          nothing yet
        </Route>
        <Route element={<LinkFooterLayout />}>
          <Route path='/findpassword' element={<PasswordFind />}/>
          <Route path='/signincomplete' element={<SignInCompletePage />}/>
          <Route path='/daengfinder/detail/:postId' element={<DaengFinderDetail/>}/>
          <Route path='/daengfinder/detail/:postOwnerId/comment/:postId' element={<DaengFinderCommentPage />}/>
          <Route path='/daengfinder/write' element={<DaengFinderWritePage />}/>
        </Route>
        <Route element={<TabbarsOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path="/alert" element={<Alert />} /> 
          <Route path="/events" element={<Events />} />
          <Route path="/map" element={<Map />} />
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/mypost' element={<MyPost />}/>
          <Route path='/mybookmark' element={<MyBookMark />}/>
          <Route path='/daengfinder' element={<DaengFinder />}/>
          <Route path='/daengfinder/search' element={<DaengFinderSearchPage />} />
          <Route path='/mypoobox' element={<MyPooboxcomponent />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
