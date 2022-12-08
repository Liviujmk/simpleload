import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/dashboard">Dashboard</Link>
            <br />
            <Link to="/dashboard/suppliers">Suppliers' Page</Link>
            <br />
            <Link to="/dashboard/trucks">Trucks' Page</Link>
            <br />
            <Link to="/dashboard/drivers">Drivers' Page</Link>
        </section>
    )
}

export default LinkPage