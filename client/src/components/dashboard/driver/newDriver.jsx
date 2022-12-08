import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const NewDriver = () => {
    const navigate = useNavigate();

    const [driverForm, setDriverForm] = useState({
        name: '',
        currentTruck: '',
    });

    const createDriver = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/drivers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(driverForm);
            setDriverForm({
                name: '',
                currentTruck: '',
            });
            
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section>
            <h1>Create driver</h1>
            <br />
            <form onSubmit={createDriver}>
                <label htmlFor="number">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={driverForm.name}
                    onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                />
                <br />
                <label htmlFor="brand">Current Driver</label>
                <input
                    type="text"
                    id="currentTruck"
                    name="currentTruck"
                    value={driverForm.currentTruck}
                    onChange={(e) => setDriverForm({ ...driverForm, currentTruck: e.target.value })}
                />
                <br />
                <button type="submit">Create driver</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default NewDriver;