import { useNavigate, Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const EditSupplier = () => {
    const supplierName = useParams().name;
    const navigate = useNavigate();

    //asign more trucks to suppliers
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        async function getTrucks() {
            const res = await fetch(`${baseDashboardURL}/trucks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            //remove trucks that are already assigned to a supplier
            const trucksAssigned = data.trucks.filter(truck => truck.currentLoadSupplier !== null);
            setTrucks(trucksAssigned);
        }
        getTrucks();
    }, []);


    //trucks list for supplier
    
    const [supplierTrucks, setSupplierTrucks] = useState([{truckNr: ''}]);

    const [supplierForm, setSupplierForm] = useState({
        name: '',
        country: '',
        city: '',
        street: '',
        number: '',
        zip: '',
        currentTrucksAssigned: []
    });

    useEffect(() => {
        async function getSupplier() {
            const res = await fetch(`${baseDashboardURL}/suppliers/${supplierName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setSupplierForm({
                name: data.loadSupplier.name,
                country: data.loadSupplier.address.country,
                city: data.loadSupplier.address.city,
                street: data.loadSupplier.address.street,
                number: data.loadSupplier.address.number,
                zip: data.loadSupplier.address.zip,
                currentTrucksAssigned: data.loadSupplier.currentTrucksAssigned
            });
            setSupplierTrucks(data.loadSupplier.currentTrucksAssigned);
        }
        getSupplier();
    }, [supplierName]);

    const addTruck = () => {
        setSupplierTrucks([...supplierTrucks, {truckNr: ''}]);
    }

    const removeTruck = (index) => {
        // don't remove the last truck
        if (supplierTrucks.length === 1) return;
        const list = [...supplierTrucks];
        list.splice(index, 1);
        setSupplierTrucks(list);
        setSupplierForm({...supplierForm, currentTrucksAssigned: list});
        console.log(list)
    }

    const handleTruckChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...supplierTrucks];
        list[index][name] = value;
        setSupplierTrucks(list);
        console.log(supplierTrucks);
        setSupplierForm({...supplierForm, currentTrucksAssigned: list});
    }




    const updateSupplier = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/suppliers/${supplierName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(supplierForm);
            navigate('/dashboard/suppliers');
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section>
            <h1>Edit supplier</h1>
            <br />
            <form onSubmit={updateSupplier}>
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
                <label htmlFor="loadings">Add Trucks</label>
                {supplierTrucks.map((truck, index) => (
                    <div key={index}>
                        <select name="truckNr" value={truck.truckNr} onChange={(e) => handleTruckChange(e, index)}>
                            <option value="">Select truck</option>
                            {trucks.map((truck) => (
                                <option key={truck.number} value={truck.number}>{truck.number}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => removeTruck(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addTruck}>Add</button>
                <br />
                <br />
                <button type="submit">Update supplier</button>
            </form>
            <br />
            <br />
        </section>
    )
}

export default EditSupplier;