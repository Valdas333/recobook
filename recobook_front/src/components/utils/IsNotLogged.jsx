import {useContext, useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const IsNotLogged = () => {
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        console.log('User authentication status:', isAuthenticated);
    }, [isAuthenticated]);

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default IsNotLogged;
