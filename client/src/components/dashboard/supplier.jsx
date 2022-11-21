import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';

const Supplier = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getId = useRef(null);

    // get suppliers by id

    useEffect(() => {
        fetch(`http://127.0.0.1:3300/dashboard/suppliers/${getId.current.value}`, {
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
            <h1>Supplier: </h1>
            <br />
        </section>
    )
}

export default Supplier;