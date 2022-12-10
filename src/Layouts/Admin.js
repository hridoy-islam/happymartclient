import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { userContext } from '../Contexts/AuthContext';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Header from '../Pages/Shared/Header';

const Admin = () => {
    const { user } = useContext(userContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isBuyer] = useBuyer(user?.email)
    const [isSeller] = useSeller(user?.email)


    return (
        <>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-4">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        {
                            isBuyer && <>
                                <li><Link to='/dashboard/myorders'>My orders</Link></li>
                            </>
                        }

                        {
                            isSeller && <>
                                <li><Link to='/dashboard/createpost'>Add A Product</Link></li>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                <li><Link to='/dashboard/mybuyers'>My Buyers</Link></li>
                            </>
                        }

                        {
                            isAdmin && <>
                                <li><Link to="/dashboard/allseller">All Seller</Link></li>
                                <li><Link to="/dashboard/allbuyer">All Buyers</Link></li>
                                <li><Link to="/dashboard/reported">Reported Items</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </>
    );
};

export default Admin;