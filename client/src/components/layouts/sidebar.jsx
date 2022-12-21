// creat 404.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <>
            <div class="sidebar">
                <div class="sidebar-container">
                    <div class="sidebar-header sidebar-grid">
                        <div class="sidebar-title">
                            <h2>{props.user}</h2>
                        </div>
                        <div class="sidebar-close-open">
                            <span class="material-symbols-rounded mat-menu">menu</span>
                        </div>
                    </div>
                    <div class="sidebar-main">
                        <div class="sidebar-content sidebar-grid" id="sid">
                            <ul class="sidebarUL">
                                <NavLink to="/dashboard"
                                >
                                    {(isActive) => (
                                        <li className={(window.location.pathname === "/dashboard" || window.location.pathname === "/dashboard/") ? 'sid-icon-button btn-default active-nav': 'sid-icon-button btn-default' }>
                                            <span class="material-symbols-rounded">dashboard</span>
                                            <span class="btn-caption">Dashboard</span>
                                        </li>

                                    )}
                                </NavLink>
                                <NavLink to="/dashboard/suppliers"
                                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                                >
                                    {({ isActive }) => (
                                        <li class="sid-icon-button btn-default">
                                            <span class="material-symbols-rounded">warehouse</span>
                                            <span class="btn-caption">Suppliers</span>
                                        </li>
                                    )}
                                </NavLink>
                                <NavLink to="/dashboard/orders"
                                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                                >
                                    {({ isActive }) => (
                                        <li class="sid-icon-button btn-default">
                                            <span class="material-symbols-rounded">package</span>
                                            <span class="btn-caption">Orders</span>
                                        </li>
                                    )}
                                </NavLink>
                                <NavLink to="/dashboard/trucks"
                                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                                >
                                    {({ isActive }) => (
                                        <li class="sid-icon-button btn-default">
                                            <NavLink to="/dashboard/trucks" />
                                            <span class="material-symbols-rounded">local_shipping</span>
                                            <span class="btn-caption">Trucks</span>
                                        </li>
                                    )}
                                </NavLink>
                                <NavLink to="/dashboard/drivers"
                                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                                >
                                    {({ isActive }) => (
                                        <li class="sid-icon-button btn-default">
                                            <span class="material-symbols-rounded">person</span>
                                            <span class="btn-caption">Drivers</span>
                                        </li>
                                    )}
                                </NavLink>
                                <li class="sid-icon-button btn-default">
                                    <span class="material-symbols-rounded">wallet</span>
                                    <span class="btn-caption">Payment</span>
                                </li>
                                <li class="sid-icon-button btn-default">
                                    <span class="material-symbols-rounded">settings</span>
                                    <span class="btn-caption">Settings</span>
                                </li>
                            </ul>
                        </div>
                        <div class="sidebar-content sidebar-grid">
                            <ul class="sidebarUL">
                                <li class="sid-icon-button btn-default" onClick={props.logout}>
                                    <span class="material-symbols-rounded">logout</span>
                                    <span class="btn-caption">Log out</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;


