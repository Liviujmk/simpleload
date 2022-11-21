import { useNavigate, Link } from "react-router-dom";
import  React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';

const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    //const { token, setToken } = useToken();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint
        // then setAuth({}) and navigate to /login
        await axios.get('http://127.0.0.1:3300/logout', {
            withCredentials: true,
            credentials: 'include'
        });
        setAuth({});
        navigate('/linkPage');
    }

    /*const [data, setData] = useState([]);
    
    /*if(!token) {
        return <h1>Not Logged In</h1>
    }
    useEffect(() => {
        const getData = async () => {
            const response1 = await axios.get('/dashboard', {
                withCredentials: true,
                credentials: 'include'
            }).then(response => {
                setData(response.data);
            });
            console.log(data);
        }
        getData();
    }, [data.length]);


    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>Hi {}! You are logged in now!</p>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )*/

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
                setProfile(actualData);
                setError(null);
            })
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:3300/dashboard/suppliers`, {
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
                setData(actualData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>Hi {profile?.profile?.name}! You are logged in now!</p>
            <br />
            <p>your supplier is {data?.loadSuppliers[0]?.name}</p>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Dashboard;