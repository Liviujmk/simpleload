import { useNavigate, Link, Route, Routes, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

const OneTruck = () => {
    const truckNumber = useParams().number;
    const [truck, setTruck] = useState(null)

    useEffect(() => {
        const fetchTrucks = async () => {
            const response = await fetch(`${baseDashboardURL}/trucks/${truckNumber}`, {
                method: 'GET',
                credentials: 'include',
            });

            const truckData = await response.json();
            console.log('truckData: ', truckData)
            setTruck(truckData.truck);
        }
        fetchTrucks();
    }, [truckNumber]);
    
    console.log('truck: ', truck)
    return (
        <>
            {
            truck? 
                <section>
                    <h1>One Supplier</h1>
                    <h3>Number: {truck.number}</h3>
                    <p>Brand: {truck.brand}</p>
                    <p>Model: {truck.model}</p>
                    <Link to="../">Back to trucks</Link>
                </section>
            : <p>No truck</p>
            }
        </>
    )
}

export default OneTruck;