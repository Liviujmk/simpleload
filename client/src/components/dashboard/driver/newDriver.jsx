import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const NewDriver = () => {
    const navigate = useNavigate();

    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);

    //fetch trucks
    useEffect(() => {
        fetch(`${baseDashboardURL}/trucks`, {
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
                // remove trucks that are already assigned to a driver
                const trucks = actualData.trucks.filter(truck => truck.currentDriver === '');
                setTrucks(trucks);
            })
    }, []);




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
            navigate('/dashboard/drivers');
            
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
                <label htmlFor="brand">Current Truck</label>
                <select
                    id="currentTruck"  
                    name="currentTruck"
                    value={driverForm.currentTruck}
                    onChange={(e) => setDriverForm({ ...driverForm, currentTruck: e.target.value })}
                >
                    <option value="">Select truck</option>
                    {trucks.map((truck) => (
                        <option value={truck.number}>{truck.number}</option>
                    ))}
                </select>
                <br />
                <button type="submit">Create driver</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default NewDriver;