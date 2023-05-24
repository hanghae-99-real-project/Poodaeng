import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './Layout';
import Alert from '../pages/Alert';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/alert" element={<Alert />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
