import { useNavigate, Link, Route, Routes, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

const OneDriver = () => {
    const driverName = useParams().name;
    const [driver, setDriver] = useState(null)

    useEffect(() => {
        const fetchDriver = async () => {
            const response = await fetch(`${baseDashboardURL}/drivers/${driverName}`, {
                method: 'GET',
                credentials: 'include',
            });

            const driverData = await response.json();
            console.log('driverData: ', driverData)
            setDriver(driverData.driver);
        }
        fetchDriver();
    }, [driverName]);
    
    console.log('driver: ', driver)
    return (
        <>
            {
            driver? 
                <section>
                    <h1>One Driver</h1>
                    <h3>Name: {driver.name}</h3>
                    <h3>Current Truck: {driver.currentTruck}</h3>
                    <Link to="../">Back to drivers</Link>
                </section>
            : <p>No driver yet</p>
            }
        </>
    )
}

export default OneDriver;