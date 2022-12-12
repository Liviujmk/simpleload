import { useNavigate, Link, Outlet } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import axios, { baseDashboardURL, baseURL } from '../../api/axios';
import useAuth from "../../hooks/useAuth";
import cookie from 'js-cookie';

import Sidebar from '../layouts/sidebar';

const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auth } = useAuth();
    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint
        // then setAuth({}) and navigate to /login
        await axios.get('http://127.0.0.1:3300/logout', {
            withCredentials: true,
            credentials: 'include'
        });
        localStorage.removeItem('accessToken');
        cookie.remove('accessToken');
        setAuth({});
        navigate('/linkPage');
    }

    const [data, setData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:3300/dashboard/profile`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                setProfile(actualData.profile);
                setError(null);
            })
    }, []);
    return (
        <>
            <Sidebar user={profile?.name}/>
            <main class="dash">
                <div class="container">
                    <div class="cont-element">
                        <h1>Welcome back, {profile?.email}!</h1>
                    </div>
                    <section>
                        <h2>Profile details:</h2>
                        {
                            <div>
                                <p>Name: {profile?.name}</p>
                                <p>Email: {profile?.email}</p>
                                <p>Nr. of loadSuppliers: {profile?.loadSuppliers.length}</p>
                                <p>Nr. of drivers: {profile?.drivers.length}</p>
                                <p>Nr. of trucks: {profile?.trucks.length}</p>
                                <p>Current revenue: ${profile?.currentRevenue}</p>
                            </div>
                        }
                        <br />
                        <br />
                        <button onClick={logout}>Logout</button>


                        <br />
                    </section>
                    <Outlet />
                </div>
            </main>

        </>
    )
}

export default Dashboard;