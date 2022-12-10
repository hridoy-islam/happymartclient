import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast'

const AllSeller = () => {

    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['allseller'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allseller`)
            const data = await res.json()
            return data;
        }
    })

    const handleSellerVerify = id => {
        fetch(`${process.env.REACT_APP_API_URL}/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('happymart')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Seller Verified successfully.')
                    refetch();
                }
            })
    }


    const deleteUser = id => {
        console.log(id)
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
            method: 'delete',
            headers: {
                authorization: `bearer ${localStorage.getItem('happymart')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            toast('Deleted Successfully');
            refetch()
        })
    }



    return (
        <div>
            <h1 className='text-3xl font-bold text-primary'>All Sellers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Verify Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{seller.email}</td>
                                    <td>
                                        {seller?.verified ? 'Verfied' :  
                                        <button onClick={() => handleSellerVerify(seller._id)} className='btn btn-accent btn-xs'>Verify Seller</button>}
                                    </td>
                                    <td><button className='btn btn-xs btn-accent' onClick={()=>deleteUser(seller._id)}>Delete</button></td>
                                </tr>
                            </>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;