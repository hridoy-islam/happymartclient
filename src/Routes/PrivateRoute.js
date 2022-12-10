import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../Contexts/AuthContext';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(userContext);
    const location = useLocation();

    if(loading){
        return <h1> Loading.... </h1>
    }

    if (!user){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>;
    }

    return children;
};

export default PrivateRoute;