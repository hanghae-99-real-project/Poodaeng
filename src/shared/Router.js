import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Alert from '../pages/Alert';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
