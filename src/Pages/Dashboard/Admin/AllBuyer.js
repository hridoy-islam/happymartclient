import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyer = () => {

    const {data:buyers = [], refetch} = useQuery({
        queryKey: ['allbuyer'],
        queryFn: async()=> {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/allbuyer`)
            const data = await res.json()
            return data;
        }
    })

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
            <h1 className='text-3xl font-bold text-primary'>All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        buyers.map((buyer, i) => <>
                            <tr>
                            <th>{i+1}</th>
                            <td>{buyer.email}</td>
                            <td><button onClick={()=>deleteUser(buyer._id)} className="btn btn-xs btn-accent">Delete</button></td>
                        </tr>
                        </>)
                    }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;