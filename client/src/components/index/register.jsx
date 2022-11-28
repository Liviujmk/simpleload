import React from 'react';
import '../../index.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../api/config';
import cookie from 'js-cookie';

function Register() {
    const navigate = useNavigate();
    if(cookie.get('accessToken')) 
        navigate('/dashboard');

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errMsg, setErrMsg] = useState("");

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newCompany = { ...form };

        await fetch(`${BASE_API_URL}register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCompany),
        })
        .then((res) => res.json())
        .then((data) => {
            if(!data.statusOk) {
                setErrMsg(data.emailAlready ?? data.nameAlready ?? data.error);
            } else {
                console.log("Company created successfully! - ", newCompany);
                setForm({ name: "", position: "", level: "" });
                navigate("/login");
            }
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Company</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default Register;