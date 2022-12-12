import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';
import Select from 'react-select'

const NewTruck = () => {
    const navigate = useNavigate();

    
    const [drivers, setDrivers] = useState([]);
    const [loadSuppliers, setSuppliers] = useState([]);
    const [truckForm, setTruckForm] = useState({
        number: '',
        brand: '',
        model: '',
        year: '',
        currentDriver: '',
        currentLoadSupplier: '',
    });

    useEffect(() => {
        async function getDrivers() {
            try {
                const res = await fetch(`${baseDashboardURL}/drivers`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    console.log('error in fetching getDrivers');
                    return;
                }

                const data1 = await res.json();

                console.log(data1);
                setDrivers(data1.drivers);
            } catch (err) {
                setDrivers(err.message);
            }
        }

        getDrivers();
    }, [drivers.length]);

    useEffect(() => {
        async function getSuppliers() {
            try {
                const res = await fetch(`${baseDashboardURL}/suppliers`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    console.log('error in fetching getSuppliers');
                    return;
                }

                const data1 = await res.json();

                console.log(data1);
                setSuppliers(data1.loadSuppliers);
            } catch (err) {
                setSuppliers(err.message);
            }
        }

        getSuppliers();
    }, [loadSuppliers.length]);



    const createTruck = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/trucks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(truckForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(truckForm);
            setTruckForm({
                number: '',
                brand: '',
                model: '',
                year: '',
                currentDriver: '',
                currentLoadSupplier: '',
            });
            
        } catch (err) {
            console.log(err);
        }
    };
    console.log('drivers=====', drivers);
    console.log('loadSuppliers=====', loadSuppliers);
    return (
        <>
            <section>
                <h1>Create truck</h1>
                <br />
                <form onSubmit={createTruck}>
                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={truckForm.number}
                        onChange={(e) => setTruckForm({ ...truckForm, number: e.target.value })}
                    />
                    <br />
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={truckForm.brand}
                        onChange={(e) => setTruckForm({ ...truckForm, brand: e.target.value })}
                    />
                    <br />
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="Model"
                        name="model"
                        value={truckForm.model}
                        onChange={(e) => setTruckForm({ ...truckForm, model: e.target.value })}
                    />
                    <br />
                    <label htmlFor="year">Year</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={truckForm.year}
                        onChange={(e) => setTruckForm({ ...truckForm, year: e.target.value })}
                    />
                    <br />
                    <label htmlFor="currentDriver">Current Driver</label>
                    <select name="currentDriver" id="currentDriver" onChange={(e) => setTruckForm({ ...truckForm, currentDriver: e.target.value })}>
                        <option value="">Select a driver</option>
                        {drivers.map((driver) => (
                            <option value={driver.name}>{driver.name}</option>
                            ))}
                    </select>
                    
                    <label  htmlFor="currentSupplier">Current loadSupplier</label>
                    <select name="currentLoadSupplier" id="currentLoadSupplier" onChange={(e) => setTruckForm({ ...truckForm, currentLoadSupplier: e.target.value })}>
                        <option value="">Select a loadSupplier</option>
                        {loadSuppliers.map((loadSupplier) => (
                            <option value={loadSupplier.name}>{loadSupplier.name}</option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Create truck</button>
                </form>
                <br />
                <br />
            </section>
        </>
    )
}

export default NewTruck;