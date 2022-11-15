import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useToken from "../hooks/useToken";
import axios from 'axios';

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

    /*if(!token) {
        return <h1>Not Logged In</h1>
    }*/

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Dashboard