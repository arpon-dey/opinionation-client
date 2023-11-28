import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <p className="text-2xl mx-96 my-80">
            <span className="loading loading-infinity loading-lg mx-48"></span>
        </p>

    }
    if (user) {
        return children
    }
    return <Navigate state={{from: location}}  to='/login' replace></Navigate>
};

export default PrivateRoute;