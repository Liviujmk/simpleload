import React from 'react';
import '../../index.css';
import { Route, Routes} from "react-router-dom"
import Register from './register';
import Login from './login'; 
import Dashboard from '../dashboard/dashboard';
import RequireAuth from '../RequireAuth';

import Layout from '../layouts/layout';
import LinkPage from '../index/linkPage';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="linkPage" element={<LinkPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/editor" element={<h1>EDITOR</h1>} />
            </Route>
            <Route path="*" element={<h1>404: Not Found</h1>} />
          <Route />
        </Routes>
      </div>
    </>
  );
}

export default App;
