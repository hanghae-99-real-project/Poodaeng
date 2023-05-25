import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './Layout';
<<<<<<< HEAD
import Alert from '../pages/Alert';
import Events from '../pages/Events';
import Map from '../pages/Map';
import PooPost from '../pages/PooPost';
=======
import SignupPage from '../pages/SignupPage';
import SignInPage from '../pages/SignInPage';
>>>>>>> dbae0644d57babc0e64721ac7052c8291237c0f7

function Router() {
  console.log("렌더링 발생하였습니다.")
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/alert" element={<Alert />} />
          <Route path="/events" element={<Events />} />
          <Route path="/map" element={<Map />} />
          <Route path="/poopost" element={<PooPost />} />
=======
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
>>>>>>> dbae0644d57babc0e64721ac7052c8291237c0f7
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
