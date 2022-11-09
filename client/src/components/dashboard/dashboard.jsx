import React from 'react';
import '../../index.css';
//import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import Login from '../index/login';

const Supplier = (props) => (
    <tr>
      <td>{props.supplier.name}</td>
      <td>{props.supplier.address.country}</td>
      <td>{props.supplier.address.city}</td>
      <td>{props.supplier.address.street}</td>
      <td>{props.supplier.address.number}</td>
      <td>{props.supplier.address.zip}</td>
    </tr>
);

export default function SuppliersList() {
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    // This method fetches the Suppliers from the database.
    useEffect(() => {
        async function getSuppliers() {
            const response = await fetch(`http://127.0.0.1:3300/dashboard/`);


            if (!response.ok) { 
                const message = `An error occured: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const Suppliers = await response.json();
            
            setSuppliers(Suppliers);
        }

        getSuppliers();
        return; 
    }, [suppliers.length]);

    // This method will map out the Suppliers on the table
    function supplierList() {
        //if(suppliers.message === "Login route")
        return suppliers.map((supplier) => {
            return (
                <Supplier
                supplier={supplier}
                key={supplier._id}
                />
            );
        });
    }
    // This following section will display the table with the Suppliers of individuals.
    if(suppliers.message === "Login route") navigate("/login");
    else {
        return (
            // create if statement to check if user is logged in 
            <div>
            <h3>Suppliers List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Number</th>
                    <th>Zip</th>
                </tr>
                </thead>
                <tbody>{supplierList()}</tbody>
            </table>
            </div>
        );
    }
}

