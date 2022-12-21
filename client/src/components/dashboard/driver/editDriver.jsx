import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const EditDriver = () => {
    const navigate = useNavigate();
    const nameParam  = useParams().name

    const [trucks, setTrucks] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [driverForm, setDriverForm] = useState({
        currentTruck: '',
    });

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

    const updateDriver = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/drivers/${nameParam}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            setDriverForm({
                currentTruck: '',
            });
            navigate('../'); 
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section>
            <h1>Update driver ~ {nameParam} ~</h1>
            <br />
            <form onSubmit={updateDriver}>
                <label htmlFor="brand">Current Truck</label>
                <select
                    name="currentTruck"
                    id="currentTruck"
                    value={driverForm.currentTruck}
                    onChange={(e) => {
                        setDriverForm({
                            ...driverForm,
                            currentTruck: e.target.value,
                        });
                    }}
                >
                    <option value="">Select a truck</option>
                    {trucks.map((truck) => (
                        <option key={truck.number} value={truck.number}>
                            {truck.number}
                        </option>
                    ))}
                </select>

                <br />
                <button type="submit">Update driver</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default EditDriver;