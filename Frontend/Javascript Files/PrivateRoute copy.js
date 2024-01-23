import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuth = () => {
    return !!localStorage.getItem('jwt');
};

const PrivateRoute = ({ element: Element }) => (
    isAuth() ? <Element /> : <Navigate to="/" />
);

export default PrivateRoute;