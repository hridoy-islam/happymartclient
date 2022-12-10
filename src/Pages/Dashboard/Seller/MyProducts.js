import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../../../Contexts/AuthContext'
import toast from 'react-hot-toast'

const MyProducts = () => {
    const { user } = useContext(userContext);
    const { data: products = [], refetch } = useQuery({
        queryKey: ['email', user.email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/seller/${user.email}`)
            const data = await res.json()
            return data;
        }
    })

    const advertiseProduct = id => {
        fetch(`${process.env.REACT_APP_API_URL}/products/addvertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('happymart')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Products Advertised successfully.')
                    refetch();
                }
            })

    }

    const deleteProduct = id => {
        fetch(`${process.env.REACT_APP_API_URL}/products/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('happymart')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Products Deleted successfully.')
                    refetch();
                }
            })

    }

    return (
        <div>
            <h1 className='text-2xl text-primary'>My Products - {user.email}</h1>
            {products.length === 0 && <p>No Products Found</p>}
            <div className="overflow-x-auto">
                {
                    products.length > 0 && 
                
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>kilometers</th>
                            <th>Years Used</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Actions</th>
                            <th>Publish</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        { products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.productname}</td>
                                <td>{product.kilometers}</td>
                                <td>{product.yearsused}</td>
                                <td>{product.resaleprice}</td>
                                <td>{product.location}</td>
                                <td>{product.status}</td>
                                <td>{product.addvertise ? 'Done' : 'No'}</td>
                                <td><button onClick={() => deleteProduct(product._id)} className='btn btn-accent btn-xs'>Delete</button></td>
                                <td>{product.status === 'available' && <button onClick={() => advertiseProduct(product._id)} className='btn btn-primary btn-xs'>Advertise</button>}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
                }
            </div>
        </div>
    );
};

export default MyProducts;