import React from 'react';
import { useRef, useState, useEffect } from 'react';
import '../../index.css';

import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios';


const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post('/login',
              JSON.stringify({ email, pwd }),
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                credentials: 'include'
              }
          );
          /*const response = await fetch('http://127.0.0.1:3300/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pwd }),
                credentials: 'include',
                withCredentials: true
            });*/
          console.log(response?.data?.accessToken);
          const accessToken = response?.data?.accessToken;
          setAuth({ email, pwd, accessToken });
          setEmail('');
          setPwd('');
          navigate(from);
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
          errRef.current.focus();
      }
  }

  return (

      <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
              />

              <label htmlFor="password">Password:</label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
              />
              <button type='submit'>Sign In</button>
          </form>
          <p>
              Need an Account?<br />
              <span className="line">
                  <Link to="/register">Sign Up</Link>
              </span>
          </p>
      </section>

  )
}

export default Login