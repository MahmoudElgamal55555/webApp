import { useContext } from "react";
import { User } from "../../Components/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
    const user = useContext(User);
    const location = useLocation();

    // return user.auth.userDetails ? <Outlet /> : <Navigate to='/login' />

    return user.auth.userDetails ? (
        <Outlet />
    ) : (
        <Navigate state={{ form: location }} replace to="/login" />
    )

}