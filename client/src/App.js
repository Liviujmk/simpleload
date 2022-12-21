import React from 'react';
import './App.css';
import { Route, Routes} from "react-router-dom"
import Register from './components/index/register';
import Login from './components/index/login'; 
import RequireAuth from './components/RequireAuth';

import Dashboard from './components/dashboard/dashboard';
import Admin from './components/dashboard/admin';

import Orders from './components/dashboard/order/orders';
import NewOrder from './components/dashboard/order/newOrder';
import OneOrder from './components/dashboard/order/oneOrder';
import EditOrder from './components/dashboard/order/editOrder';


import Suppliers from './components/dashboard/supplier/suppliers';
import NewSupplier from './components/dashboard/supplier/newSupplier';
import OneSupplier from './components/dashboard/supplier/oneSupplier';
import EditSupplier from './components/dashboard/supplier/editSupplier';

import Trucks from './components/dashboard/truck/trucks';
import NewTruck from './components/dashboard/truck/newTruck';
import OneTruck from './components/dashboard/truck/oneTruck';
import EditTruck from './components/dashboard/truck/editTruck';

import Drivers from './components/dashboard/driver/drivers';
import NewDriver from './components/dashboard/driver/newDriver';
import OneDriver from './components/dashboard/driver/oneDriver';
import EditDriver from './components/dashboard/driver/editDriver';

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
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Admin />} />
                <Route path="orders">
                  <Route index element={<Orders />} />
                  <Route path="new" element={<NewOrder />} />
                  <Route path=":id" element={<OneOrder />} />
                  <Route path=":id/edit" element={<EditOrder />} />
                </Route>
                <Route path="suppliers" >
                  <Route index element={<Suppliers />} />
                  <Route path="new" element={<NewSupplier />} />
                  <Route path=":name" element={<OneSupplier />} />
                  <Route path=":name/edit" element={<EditSupplier />} />
                </Route>
                <Route path="trucks">
                  <Route index element={<Trucks />} />
                  <Route path="new" element={<NewTruck />} />
                  <Route path=":number" element={<OneTruck />} />
                  <Route path=":number/edit" element={<EditTruck />} />
                </Route>
                <Route path="drivers">
                  <Route index element={<Drivers />} />
                  <Route path="new" element={<NewDriver />} />
                  <Route path=":name" element={<OneDriver />} />
                  <Route path=":name/edit" element={<EditDriver />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
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
