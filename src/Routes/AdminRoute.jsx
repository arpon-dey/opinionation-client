import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <p className="text-2xl mx-96 my-80">
            <span className="loading loading-infinity loading-lg mx-48"></span>
        </p>

    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate state={{from: location}}  to='/login' replace></Navigate>
};

export default AdminRoute;