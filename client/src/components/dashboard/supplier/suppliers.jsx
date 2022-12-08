import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

import OneSupplier from "./oneSupplier";

const Supplier = (props) => {
    return (
        <tr>
            <td>{props.sup.name}</td>
            <td>{props.sup.address.city}</td>
            <td>{props.sup.address.country}</td>
            <td>
                <Link className="btn btn-link" to={`${props.sup.name}`} element={<OneSupplier 
                    sup={props.sup}
                    deleteSupplier={props.deleteSupplier}
                    key={props.sup.name}
                />}>View supplier's details</Link> |
                <button className="btn btn-link"
                    onClick={() => {
                        props.deleteSupplier(props.sup.name);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

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
    }, [suppliers.length]);

    const deleteSupplier = async (name) => {
        try {
            const res = await fetch(`${baseDashboardURL}/suppliers/${name}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    function suppliersList() {
        return suppliers.map((supplier) => {
            return (
                <Supplier
                    sup={supplier}
                    deleteSupplier={() => deleteSupplier(supplier.name)}
                    key={supplier.name}
                />
            );
        });
    }

    return (
        <div>
            <h1>Suppliers List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{suppliersList()}</tbody>
            </table>
            <h3>
                    <Link to="new">Add a new supplier</Link>
            </h3>
        </div>
    )
}

export default Suppliers;