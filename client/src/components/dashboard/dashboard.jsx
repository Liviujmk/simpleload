import { useNavigate, Link } from "react-router-dom";
import  React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../api/axios';
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { auth } = useAuth();
    //const { token, setToken } = useToken();
    console.log(auth)
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

    const [oneSupplier, setOneSupplier] = useState(null);
    const getId = useRef(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      }

    async function getSupplierById() {
        try{
            const res = await fetch(`${baseDashboardURL}/suppliers/${getId.current.value}`, {
                method: 'GET',
                credentials: 'include',
            });
    
            const data = await res.json();
    
            /*const result = {
              data
            };*/
            console.log(data.loadSupplier.name);
            setOneSupplier(data.loadSupplier);
        } catch(err) {
            setOneSupplier(err.message);    
        }
    }
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>Hi {profile?.profile?.name}! You are logged in now!</p>
            <br />
            <p>your supplier is {data?.loadSuppliers[0]?.name}</p>
            <br />
            <input type="text" ref={getId} value={data?.loadSuppliers[0]?.name} />
            <button onClick={getSupplierById}>Get supplier</button>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
            <br />
            <br />
            <br />
            { oneSupplier && <div className="alert alert-secondary mt-2" role="alert"><pre>{oneSupplier.name}</pre></div> }
        </section>
    )
}

export default Dashboard;