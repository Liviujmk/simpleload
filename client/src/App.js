import React from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Register from './components/index/register';
import Login from './components/index/login'; 
import Dashboard from './components/dashboard/dashboard';
import Suppliers from './components/dashboard/supplier/suppliers';
import NewSupplier from './components/dashboard/supplier/newSupplier';
import OneSupplier from './components/dashboard/supplier/oneSupplier';
import RequireAuth from './components/RequireAuth';

import Trucks from './components/dashboard/truck/trucks';
import NewTruck from './components/dashboard/truck/newTruck';
import OneTruck from './components/dashboard/truck/oneTruck';

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
            <Route element={<RequireAuth />} >
              <Route path="dashboard">
                <Route index element={<Dashboard />} />
                <Route path="editor" element={<h1>EDITOR</h1>} />
                <Route path="suppliers" >
                  <Route index element={<Suppliers />} />
                  <Route path="new" element={<NewSupplier />} />
                  <Route path=":name" element={<OneSupplier />} />
                </Route>
                <Route path="trucks">
                  <Route index element={<Trucks />} />
                  <Route path="new" element={<NewTruck />} />
                  <Route path=":number" element={<OneTruck />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          <Route />
        </Routes>
      </div>
    </>
  );
}

export default App;
