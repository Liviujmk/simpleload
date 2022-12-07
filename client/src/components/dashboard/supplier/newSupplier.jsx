import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const NewSupplier = () => {
    const navigate = useNavigate();

    const [supplierForm, setSupplierForm] = useState({
        name: '',
        country: '',
        city: '',
        street: '',
        number: '',
        zip: '',
    });

    const createSupplier = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/suppliers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(supplierForm);
            setSupplierForm({
                name: '',
                country: '',
                city: '',
                street: '',
                number: '',
                zip: '',
            });
            
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section>
            <h1>Create supplier</h1>
            <br />
            <form onSubmit={createSupplier}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={supplierForm.name}
                    onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                />
                <br />
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={supplierForm.country}
                    onChange={(e) => setSupplierForm({ ...supplierForm, country: e.target.value })}
                />
                <br />
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={supplierForm.city}
                    onChange={(e) => setSupplierForm({ ...supplierForm, city: e.target.value })}
                />
                <br />
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={supplierForm.street}
                    onChange={(e) => setSupplierForm({ ...supplierForm, street: e.target.value })}
                />
                <br />
                <label htmlFor="number">Number</label>
                <input
                    type="text"
                    id="number"
                    name="number"
                    value={supplierForm.number}
                    onChange={(e) => setSupplierForm({ ...supplierForm, number: e.target.value })}
                />
                <br />
                <label htmlFor="zip">Zip</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={supplierForm.zip}
                    onChange={(e) => setSupplierForm({ ...supplierForm, zip: e.target.value })}
                />
                <br />
                <button type="submit">Create</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default NewSupplier;