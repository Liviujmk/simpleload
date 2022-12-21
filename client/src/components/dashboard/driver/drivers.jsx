import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

import OneDriver from "./oneDriver";

const Driver = (props) => {
    return (
        <tr>
            <td>{props.driver.name}</td>
            <td>{props.driver.currentTruck}</td>
            <td>
                <Link className="btn btn-link" to={`${props.driver.name}`} element={<OneDriver 
                    truck={props.truck}
                    deleteDriver={props.deleteDriver}
                    key={props.driver.name}
                />}>View driver's details</Link> |
                <button className="btn btn-link"
                    onClick={() => {
                        props.deleteDriver(props.driver.name);
                    }}
                >
                    Delete driver
                </button>
                <Link className="btn btn-link btn-main" to={`${props.driver.name}/edit`}>Edit driver</Link>
            </td>
        </tr>
    );
}

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

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

    const deleteDriver = async (name) => {
        try {
            const res = await fetch(`${baseDashboardURL}/drivers/${name}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    function driversList() {
        return drivers.map((driver) => {
            return (
                <Driver
                    driver={driver}
                    deleteDriver={() => deleteDriver(driver.name)}
                    key={driver.name}
                />
            );
        });
    }

    return (
        <>
            <div>
                <h1>Drivers List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Current truck</th>
                        </tr>
                    </thead>
                    <tbody>{driversList()}</tbody>
                </table>
                <br />
                <br />
                <h3>
                    <Link to="new">Add new driver</Link>
                </h3>
            </div>
        </>
    )
}

export default Drivers;