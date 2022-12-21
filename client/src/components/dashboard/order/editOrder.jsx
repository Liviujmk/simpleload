import { useNavigate, Link, useParams} from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import axios, {baseDashboardURL, baseURL} from '../../../api/axios';


const EditOrder = () => {
    const navigate = useNavigate();
    const orderNr = useParams().id

    //get trucks from db
    const [trucks, setTrucks] = useState([]);
    const [loadSuppliers, setLoadSuppliers] = useState([]);

    useEffect(() => {
        const getTrucks = async () => {
            const res = await fetch(`${baseDashboardURL}/trucks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setTrucks(data.trucks);
            //remove trucks that are already assigned to a driver
            const trucksAssigned = data.trucks.filter(truck => truck.currentDriver !== null);
            setTrucks(trucksAssigned);
        }
        getTrucks();
    }, []);

    useEffect(() => {
        const getLoadSuppliers = async () => {
            const res = await fetch(`${baseDashboardURL}/suppliers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setLoadSuppliers(data.loadSuppliers);
        }
        getLoadSuppliers();
    }, []);

    //get order from db
    const [order, setOrder] = useState({});

    const [loadings, setLoadings] = useState([{
        loadCompany: '',
        loadAddress: ''
    }]);

    const [unloadings, setUnloadings] = useState([{
        unloadCompany: '',
        unloadAddress: ''
    }]);

    const [orderForm, setOrderForm] = useState({
        loadSupplier: '',
        truckAssigned: '',
        nr: '',
        commandDate: '',
        creditNoteNr: '',
        creditNoteDate: '',
        loadings: [],
        unloadings: [],
        paymentStatus: '',
        km: '',
        price: ''
    });

    //set order form

    useEffect(() => {
        const getOrder = async () => {
            const res = await fetch(`${baseDashboardURL}/orders/${orderNr}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            setOrder(data.order);

            setOrderForm({
                loadSupplier: data.order.loadSupplier,
                truckAssigned: data.order.truckAssigned,
                nr: data.order.nr,
                commandDate: data.order.commandDate,
                creditNoteNr: data.order.creditNoteNr,
                creditNoteDate: data.order.creditNoteDate,
                loadings: loadings,
                unloadings: unloadings,
                paymentStatus: data.order.paymentStatus,
                km: data.order.km,
                price: data.order.price
            });

            setLoadings(data.order.loadings);

            setUnloadings(data.order.unloadings);
        }
        getOrder();
    }, [orderNr]);

    const addLoading = () => {
        setLoadings([...loadings, {
            loadCompany: '',
            loadAddress: ''
        }]);
    };

    const addUnloading = () => {
        setUnloadings([...unloadings, {
            unloadCompany: '',
            unloadAddress: ''
        }]);
    };

    const removeLoading = (index) => {
        const list = [...loadings];
        list.splice(index, 1);
        setLoadings(list);
    };

    const removeUnloading = (index) => {
        const list = [...unloadings];
        list.splice(index, 1);
        setUnloadings(list);
    };

    const handleLoadingChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...loadings];
        list[index][name] = value;
        setLoadings(list);
        setOrderForm({ ...orderForm, loadings: list });
    };

    const handleUnloadingChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...unloadings];
        list[index][name] = value;
        setUnloadings(list);
        setOrderForm({ ...orderForm, unloadings: list });
    };



    //update order
    const updateOrder = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${baseDashboardURL}/orders/${orderNr}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderForm),
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
            console.log(orderForm);
            navigate('../');
            
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <section>
            <h1>Update order - nr: {orderNr}</h1>
            <br />
            <form onSubmit={updateOrder}>
                <label htmlFor="loadSupplier">Load supplier</label>
                <select name="loadSupplier" id="loadSupplier" value={orderForm.loadSupplier} onChange={(e) => setOrderForm({...orderForm, loadSupplier: e.target.value})}>
                    <option value="">Select load supplier</option>
                    {loadSuppliers.map((loadSupplier) => (
                        <option key={loadSupplier.name} value={loadSupplier.name}>{loadSupplier.name}</option>
                    ))}
                </select>
                <label htmlFor="truckAssigned">Truck assigned</label>
                <select name="truckAssigned" id="truckAssigned" value={orderForm.truckAssigned} onChange={(e) => setOrderForm({...orderForm, truckAssigned: e.target.value})}>
                    <option value="">Select truck</option>
                    {trucks.map((truck) => (
                        <option key={truck.number} value={truck.number}>{truck.number}</option>
                    ))}
                </select>

                <label htmlFor="nr">Nr</label>
                <input type="text" name="nr" id="nr" value={orderForm.nr} onChange={(e) => setOrderForm({...orderForm, nr: e.target.value})} />

                <label htmlFor="commandDate">Command date</label>
                <input type="date" name="commandDate" id="commandDate" value={orderForm.commandDate} onChange={(e) => setOrderForm({...orderForm, commandDate: e.target.value})} />

                <label htmlFor="creditNoteNr">Credit note nr</label>
                <input type="text" name="creditNoteNr" id="creditNoteNr" value={orderForm.creditNoteNr} onChange={(e) => setOrderForm({...orderForm, creditNoteNr: e.target.value})} />

                <label htmlFor="creditNoteDate">Credit note date</label>
                <input type="date" name="creditNoteDate" id="creditNoteDate" value={orderForm.creditNoteDate} onChange={(e) => setOrderForm({...orderForm, creditNoteDate: e.target.value})} />

                <label htmlFor="loadings">Loadings</label>
                {loadings.map((loading, index) => (
                    <div key={index}>
                        <input type="text" name="loadCompany" placeholder="Company" value={loading.loadCompany} onChange={(e) => handleLoadingChange(e, index)} />
                        <input type="text" name="loadAddress" placeholder="Address" value={loading.loadAddress} onChange={(e) => handleLoadingChange(e, index)} />
                        <button type="button" onClick={() => removeLoading(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addLoading}>Add loading</button>

                <label htmlFor="unloadings">Unloadings</label>
                {unloadings.map((unloading, index) => (
                    <div key={index}>
                        <input type="text" name="unloadCompany" placeholder="Company" value={unloading.unloadCompany} onChange={(e) => handleUnloadingChange(e, index)} />
                        <input type="text" name="unloadAddress" placeholder="Address" value={unloading.unloadAddress} onChange={(e) => handleUnloadingChange(e, index)} />
                        <button type="button" onClick={() => removeUnloading(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addUnloading}>Add unloading</button>

                <label htmlFor="paymentStatus">Payment status</label>
                <input type="text" name="paymentStatus" id="paymentStatus" value={orderForm.paymentStatus} onChange={(e) => setOrderForm({...orderForm, paymentStatus: e.target.value})} />

                <label htmlFor="km">Km</label>
                <input type="text" name="km" id="km" value={orderForm.km} onChange={(e) => setOrderForm({...orderForm, km: e.target.value})} />

                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" value={orderForm.price} onChange={(e) => setOrderForm({...orderForm, price: e.target.value})} />

                <button type="submit">Create order</button>
            </form>

            <br />
            <br />
        </section>
    )
}

export default EditOrder;