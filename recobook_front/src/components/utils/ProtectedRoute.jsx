import {useContext} from "react";
import {Route, Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "./AuthContext.jsx";

const ProtectedRoute = ({roles, ...rest}) => {
    const {isAuthenticated, hasRole} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.some(role => hasRole(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet {...rest} />;
}

export default ProtectedRoute;