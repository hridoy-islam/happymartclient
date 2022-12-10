import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../Contexts/AuthContext';
import Spinner from '../Components/Spinner'
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading} = useContext(userContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <Spinner></Spinner>
    }
    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;