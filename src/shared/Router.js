import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSocial from '../components/LoginSocial';
import LogoutTest from '../components/LogoutTest';
import Alert from '../pages/Alert';
import AuthCheck from '../pages/AuthCheck';
import CompletePage from '../pages/CompletePage';
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
import PooDetail from '../pages/PooDetail';

// import TokenCheck from '../utils/TokenCheck';
/* Token 체크를 작성 업로드, 삭제, 수정 시에만 토큰을 보내서 확인하도록 구성하자. */
function Router() {
  console.log("렌더링 발생하였습니다.")
  return (
    <BrowserRouter>
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
          <Route path='/signupcomplete' element={<CompletePage />}/>
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
          <Route path='/daengfindDetail' element={<DaengFinderDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
