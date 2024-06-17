import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function ProtectedRoute({ roles, element }) {
    const navigate = useNavigate();
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const userRoles = AuthService.getRoles();

    if (roles && !roles.some(role => userRoles.includes(role))) {
        navigate('/unauthorized');
        return null;
    }

    return element;
}
export default ProtectedRoute;
