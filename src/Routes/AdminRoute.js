import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../Contexts/AuthContext';
import Spinner from '../Components/Spinner'
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(userContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Spinner></Spinner>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;