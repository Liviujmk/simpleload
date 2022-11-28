import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import cookie from 'js-cookie';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    /*if (!auth?.email && !cookie.get('jwt'))
        localStorage.removeItem('accessToken');*/

    return (
        (cookie.get('accessToken') )
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;