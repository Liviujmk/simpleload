import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import axios, { baseDashboardURL, baseURL } from '../../../api/axios';


const Order = (props) => {
    return (
        <>
            {
                props.order ?
                    <table>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Supplier</th>
                                <th>Payment status</th>
                                <th>Km</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.order.nr}</td>
                                <td>{props.order.loadSupplier}</td>
                                <td>{props.order.paymentStatus}</td>
                                <td>{props.order.km}</td>
                                <td>{props.order.price}</td>
                                <td>
                                    <Link className="btn btn-link" to={`${props.order.nr}`}>View order's details</Link> |
                                    <button className="btn btn-link"
                                        onClick={() => {
                                            props.deleteOrder(props.order.nr);
                                        }}
                                    >
                                        Delete
                                    </button>
                                    or
                                    <Link className="btn btn-link btn-main" to={`${props.order.nr}/edit`}>Edit</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    : <p>There are no orders</p>
            }
        </>
    );
}

const Orders = () => {
    const [orders, setorders] = useState([]);

    useEffect(() => {
        async function getOrders() {
            try {
                const res = await fetch(`${baseDashboardURL}/orders`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) {
                    console.log('error in fetching getorders');
                    return;
                }

                const data1 = await res.json();

                console.log(data1);
                setorders(data1.orders);
            } catch (err) {
                setorders(err.message);
            }
        }

        getOrders();
    }, [orders.length]);

    const deleteOrder = async (number) => {
        try {
            const res = await fetch(`${baseDashboardURL}/orders/${number}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    function ordersList() {
        return orders.map((order) => {
            return (
                <Order
                    order={order}
                    deleteOrder={() => deleteOrder(order.nr)}
                    key={order.nr}
                />
            );
        });
    }

    return (
        <>
            <div>
                <h1>Orders List</h1>
                {ordersList()}
                <h3>
                    <Link to="new">Add new order</Link>
                </h3>
            </div>
        </>
    )
}

export default Orders;