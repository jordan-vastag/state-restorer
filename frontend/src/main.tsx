import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Routes } from './Routes';
import { App } from './App';

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
      <App />
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
  </React.StrictMode>,
);