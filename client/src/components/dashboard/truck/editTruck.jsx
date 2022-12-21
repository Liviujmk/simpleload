import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';

const EditTruck = () => {
    const navigate = useNavigate();
    const truckNumber = useParams().number;
    
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
                //remove drivers that are already assigned to a truck
                const driversList = data1.drivers.filter(driver => driver.currentTruck === '');
                setDrivers(driversList);
                console.log('driversList', driversList)
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

    useEffect(() => {
        async function getTruck() {
            try {
                const res = await fetch(`${baseDashboardURL}/trucks/${truckNumber}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) { 
                    console.log('error in fetching getTruck');
                    return;
                }
                const data1 = await res.json();
                console.log(data1);
                setTruckForm(data1.truck);

            } catch (err) {
                setTruckForm(err.message);
            }
        }
        getTruck();
    }, [truckNumber]);




    const updateTruck = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/trucks/${truckNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(truckForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(truckForm);
            navigate('/dashboard/trucks');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <section>
                <h1>Update truck: {truckNumber}</h1>
                <br />
                <form onSubmit={updateTruck}>
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
                    <select value={truckForm.currentTruck} name="currentDriver" id="currentDriver" onChange={(e) => setTruckForm({ ...truckForm, currentDriver: e.target.value })}>
                        <option value="">Select a driver</option>
                        {drivers.map((driver) => (
                            <option value={driver.name}>{driver.name}</option>
                            ))}
                    </select>
                    
                    <label  htmlFor="currentSupplier">Current loadSupplier</label>
                    <select value={truckForm.currentLoadSupplier} name="currentLoadSupplier" id="currentLoadSupplier" onChange={(e) => setTruckForm({ ...truckForm, currentLoadSupplier: e.target.value })}>
                        <option value="">Select a loadSupplier</option>
                        {loadSuppliers.map((loadSupplier) => (
                            <option value={loadSupplier.name}>{loadSupplier.name}</option>
                        ))}
                    </select>
                    <br />
                    <button type="submit">Update truck</button>
                </form>
                <br />
                <br />
            </section>
        </>
    )
}

export default EditTruck;