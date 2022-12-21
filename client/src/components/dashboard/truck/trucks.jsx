import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

import OneTruck from "./oneTruck";

const Truck = (props) => {
    return ( 
        <tr>
            <td>{props.truck.number}</td>
            <td>{props.truck.brand}</td>
            <td>{props.truck.model}</td>
            <td>
                <Link className="btn btn-link" to={`${props.truck.number}`}>View Truck's details</Link> |
                <button className="btn btn-link"
                    onClick={() => {
                        props.deleteTruck(props.truck.number);
                    }}
                >
                    Delete
                </button>
                or
                <Link className="btn btn-link btn-main" to={`${props.truck.number}/edit`}>Edit</Link>
            </td>
        </tr>
    );
}

const Trucks = () => {
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        async function getTrucks() {
            try {
                const res = await fetch(`${baseDashboardURL}/trucks`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    console.log('error in fetching getTrucks');
                    return;
                }

                const data1 = await res.json();

                console.log(data1);
                setTrucks(data1.trucks);
            } catch (err) {
                setTrucks(err.message);
            }
        }

        getTrucks();
    }, [trucks.length]);

    const deleteTruck = async (number) => {
        try {
            const res = await fetch(`${baseDashboardURL}/trucks/${number}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    function trucksList() {
        return trucks.map((truck) => {
            return (
                <Truck
                    truck={truck}
                    deleteTruck={() => deleteTruck(truck.number)}
                    key={truck.number}
                />
            );
        });
    }

    return (
        <>
            <div>
                <h1>Trucks List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{trucksList()}</tbody>
                </table>
                <h3>
                    <Link to="new">Add new truck</Link>
                </h3>
            </div>
        </>
    )
}

export default Trucks;