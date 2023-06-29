import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
