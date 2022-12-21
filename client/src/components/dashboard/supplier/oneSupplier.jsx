import { useNavigate, Link, Route, Routes, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

const OneSupplier = () => {
    const supName = useParams().name;
    const [supplier, setSupplier] = useState(null)

    useEffect(() => {
        const fetchSupplier = async () => {
            const response = await fetch(`${baseDashboardURL}/suppliers/${supName}`, {
                method: 'GET',
                credentials: 'include',
            });

            const supplierData = await response.json();
            setSupplier(supplierData.loadSupplier);
        }
        fetchSupplier();
    }, [supName]);
    
    console.log('supplier: ', supplier)
    return (
        <>
            {
            supplier? 
                <section>
                    <h1>One Supplier</h1>
                    <h3>Name: {supplier.name}</h3>
                    <p>Country: {supplier.address.country}</p>
                    <p>City: {supplier.address.city}</p>
                    <p>Street: {supplier.address.street}</p>
                    <p>Nr: {supplier.address.number}</p>
                    <p>ZIP: {supplier.address.zip}</p>
                    <h4>Assigned trucks</h4>
                    <ul>
                        {supplier.currentTrucksAssigned.map(truck => <li key={truck.truckNr}>{truck.truckNr}</li>)}
                    </ul>
                    <Link to="../">Back to Suppliers</Link>
                </section>
            : <p>No supplier</p>
            }
        </>
    )
}

export default OneSupplier;