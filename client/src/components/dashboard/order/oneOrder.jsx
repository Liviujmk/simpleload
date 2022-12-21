import { useNavigate, Link, Route, Routes, useParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';

const OneOrder = () => {
    const orderNr = useParams().id;
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`${baseDashboardURL}/orders/${orderNr}`, {
                method: 'GET',
                credentials: 'include',
            });

            const orderData = await response.json();
            console.log('orderData: ', orderData)
            setOrder(orderData.order);
        }
        fetchOrder();
    }, [orderNr]);
    
    console.log('order: ', order)
    return (
        <>
            {
            order? 
                <section>
                    <h1>Order {order.nr}</h1>
                    <p>Load supplier: {order.loadSupplier}</p>
                    <p>Truck assigned: {order.carrier.truckAssigned}</p>
                    <p>Command date: {order.commandDate}</p>
                    <p>Credit note nr: {order.creditNoteNr}</p>
                    <p>Credit note date: {order.creditNoteDate}</p>
                    <br />
                    <h4>Loadings:</h4>
                    <ul>
                        {order.loadings.map((loading, index) => (
                            <li key={index}>
                                <p>Company: {loading.loadCompany}</p>
                                <p>Address: {loading.loadAddress}</p>
                            </li>
                        ))}
                    </ul>
                    <h4>Unloadings:</h4>
                    <ul>
                        {order.unloadings.map((unloading, index) => (
                            <li key={index}>
                                <p>Company: {unloading.unloadCompany}</p>
                                <p>Address: {unloading.unloadAddress}</p>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <p>Distance: {order.km} km</p>
                    <p>Price: ${order.price}</p>
                    <Link to="../">Back to orders</Link>
                </section>
            : <p>No order yet</p>
            }
        </>
    )
}

export default OneOrder;