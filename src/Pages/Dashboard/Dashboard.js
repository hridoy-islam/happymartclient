import React, { useContext } from 'react';
import { userContext } from '../../Contexts/AuthContext';

const Dashboard = () => {
    const {user, role} = useContext(userContext);
    return (
        <div>
           <h1 className='text-3xl font-bold'> Welcome <span className='text-primary'>{user?.displayName}</span></h1>
           <p>{role}</p>
        </div>
    );
};

export default Dashboard;