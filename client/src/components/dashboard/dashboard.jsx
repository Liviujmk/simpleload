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
            <Sidebar user={profile?.name} logout={logout}/>
            <main class="dash">
                <div class="container">
                    <Outlet />
                </div>
            </main>

        </>
    )
}

export default Dashboard;