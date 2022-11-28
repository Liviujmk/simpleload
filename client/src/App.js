import React from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Register from './components/index/register';
import Login from './components/index/login'; 
import Dashboard from './components/dashboard/dashboard';
import RequireAuth from './components/RequireAuth';

import Layout from './components/layouts/layout';
import PageNotFound from './components/layouts/404';
import LinkPage from './components/index/linkPage';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="linkPage" element={<LinkPage />} />
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="editor" element={<h1>EDITOR</h1>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          <Route />
        </Routes>
      </div>
    </>
  );
}

export default App;
