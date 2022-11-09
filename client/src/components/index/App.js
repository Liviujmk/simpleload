import React from 'react';
import '../../index.css';
import { Route, Routes, Link } from "react-router-dom"
import Register from './register';
import Login from './login'; 
import Dashboard from '../dashboard/dashboard';

function App() {
  return (
    <>
      <div className="App">
        <h1>Simple load App</h1>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register" element={<Register />}>Register</Link></li>
        <li><Link to="/login" element={<Login />}>Login</Link></li>
        <li><Link to="/dashboard" element={<Dashboard />} >Dashboard</Link></li>
        <Routes>
          <Route path="/" />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
