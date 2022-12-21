import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams } from "react-router-dom";
import axios, { baseDashboardURL, baseURL } from './../../api/axios';

const Admin = (props) => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        const response = await fetch(`${baseDashboardURL}/profile`, {
            method: 'GET',
            credentials: 'include',
        });

        const profileData = await response.json();
        setProfile(profileData.profile);
    }

    useEffect(() => {
        fetchProfile();
    }, []);


    return (
        <>
            <div class="cont-element">
                <h1>Welcome back, {profile?.name}!</h1>
            </div>
            <div class="cont-element cards-heading">
                <h3 class="">Today reports</h3>
            </div>
            <div class="cont-element">
                <div class="flex">
                    <div class="small-card green-bg fc-item flex-column">
                        <div class="card-heading">
                            <h4>Revenue</h4>
                        </div>
                        <div class="card-content">
                            <span class="card-number">${profile?.currentRevenue}</span>
                        </div>
                        <button title="Press" type="button" class="btn btn-main">View more</button>
                    </div>
                    <div class="small-card green-bg fc-item flex-column">
                        <div class="card-heading">
                            <h4>Orders</h4>
                        </div>
                        <div class="card-content">
                            <span class="card-number">{profile?.orders.length}</span>
                        </div>
                        <Link to="orders" class="btn btn-main">View more</Link>
                    </div>
                    <div class="small-card green-bg fc-item flex-column">
                        <div class="card-heading">
                            <h4>Suppliers</h4>
                        </div>
                        <div class="card-content">
                            <span class="card-number">{profile?.loadSuppliers.length}</span>
                        </div>
                        <Link to="suppliers" class="btn btn-main">View more</Link>
                    </div>
                </div>
                <div class="flex">
                    <div class="small-card green-bg fc-item flex-column">
                        <div class="card-heading">
                            <h4>Drivers</h4>
                        </div>
                        <div class="card-content">
                            <span class="card-number">{profile?.drivers.length}</span>
                        </div>
                        <Link to="drivers" class="btn btn-main">View more</Link>
                    </div>
                    <div class="small-card green-bg fc-item flex-column">
                        <div class="card-heading">
                            <h4>Trucks</h4>
                        </div>
                        <div class="card-content">
                            <span class="card-number">{profile?.trucks.length}</span>
                        </div>
                        <Link to="trucks" class="btn btn-main">View more</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;