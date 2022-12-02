import { useNavigate, Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../api/axios';


const Suppliers = () => {
    const navigate = useNavigate();

    const [oneSupplier, setOneSupplier] = useState(null);
    const getSupplier = useRef(null);
    const deleteSupplier = useRef(null);

    const [supplierForm, setSupplierForm] = useState({
        name: '',
        country: '',
        city: '',
        street: '',
        number: '',
        zip: '',
    });

    async function getSupplierById() {
        try{
            const res = await fetch(`${baseDashboardURL}/suppliers/${getSupplier.current.value}`, {
                method: 'GET',
                credentials: 'include',
            });
    
            const data1 = await res.json();

            console.log(data1);
            setOneSupplier(data1);
        } catch(err) {
            setOneSupplier(err.message);    
        }
    }

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

    const DeleteSupplierById = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/suppliers/${deleteSupplier.current.value}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
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
            <h1>Suppliers page</h1>
            <br />
            <input type="text" ref={getSupplier} />
            <button onClick={getSupplierById}>Get supplier</button>
            <br />
            <p>{oneSupplier?.loadSupplier?.name || oneSupplier?.message}</p>
            <br />
            <br />
            <br />
            <h1>Delete Supplier </h1>
            <br />
            <input type="text" ref={deleteSupplier} />
            <button onClick={DeleteSupplierById}>Delete supplier</button>
            <br />
        </section>
    )
}

export default Suppliers;