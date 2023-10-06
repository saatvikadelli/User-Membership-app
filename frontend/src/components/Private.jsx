import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAdminRoute}) =>{

    const userInfo = useSelector((state) => state.auth.userInfo);
    //check if the route is specifically for admin users
    if (isAdminRoute) {
        if (userInfo && userInfo.role === 1) {
            return <Outlet />
        } else {
            return <Navigate to ='/login' replace />;
        }
    }
    return userInfo ? <Outlet /> : <Navigate to ='/login' replace />;
}

export default PrivateRoute;