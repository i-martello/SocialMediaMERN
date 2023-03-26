import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <AppProvider>
        <App />
    </AppProvider>
    </React.StrictMode>
  </BrowserRouter>
);