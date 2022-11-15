import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/index/App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);