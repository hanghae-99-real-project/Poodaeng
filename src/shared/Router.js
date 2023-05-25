import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './Layout';
import Alert from '../pages/Alert';
import Events from '../pages/Events';
import Map from '../pages/Map';
import PooPost from '../pages/PooPost';
import LoginPage from '../pages/LoginPage';
import SignInPage from '../pages/SignInPage';
import SignupPage from '../pages/SignupPage';
import AuthCheck from '../pages/AuthCheck';
import DaengFinder from '../pages/DaengFinder';

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
          <Route path="/poopost" element={<PooPost />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/auth' element={<AuthCheck />}/>
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/daengfinder' element={<DaengFinder />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
