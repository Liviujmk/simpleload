import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const NewSupplier = () => {
    const navigate = useNavigate();

    const [truckForm, setTruckForm] = useState({
        number: '',
        brand: '',
        model: '',
        year: '',
    });

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
            });
            
        } catch (err) {
            console.log(err);
        }
    };


    return (
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
                <button type="submit">Create truck</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default NewSupplier;