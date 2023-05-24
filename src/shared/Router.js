import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import SignupPage from '../pages/SignupPage';
import SignInPage from '../pages/SignInPage';

function Router() {
  console.log("렌더링 발생하였습니다.")
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
