import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../Contexts/AuthContext';
import {GoThreeBars} from 'react-icons/go'

const Header = () => {
    const {user, logout} = useContext(userContext)
    const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(err => console.log(err));
    }


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">HappyMart</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to={'/blogs'}>Blog</Link></li>
                    {
                        user?.uid ? <>
                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li><label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><GoThreeBars></GoThreeBars></label></li>
                        <li><button onClick={handleLogOut}>Logout</button></li></> 
                        : <li><Link to={'/login'}>Login</Link></li> 
                    }
                    
                </ul>
            </div>

            { user?.uid && <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt="" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <Link className="justify-between">
                            {user.displayName}
                        </Link>
                    </li>
                    <li><button onClick={handleLogOut}>Logout</button></li>
                </ul>
            </div>
            }
        </div>
    );
};

export default Header;