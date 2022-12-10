import React, { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { userContext } from '../../Contexts/AuthContext';
import BookingModal from './BookingModal';

const Category = () => {
    const loadedCat = useLoaderData();
    const { user } = useContext(userContext)
    const [product, setProduct] = useState(null)

    const { id } = useParams();

    const { data: products = [], refetch } = useQuery({
        queryKey: ['id'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/${id}`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div className='py-4 container mx-auto'>
            <h1 className='text-2xl text-accent text-center font-bold my-2 underline'>{loadedCat.category} Products</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                {
                    products.map(product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            {product?.image ? <img src={product.image} alt="" /> : <img src="https://placeimg.com/400/225/arch" alt="" />}
                            
                            <h2 className="card-title">{product.productname}</h2>
                            <p>Model: {product.model}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Original Price: {product.originalprice} BDT</p>
                            <p>Resale Price : {product.resaleprice} BDT</p>
                            <p>Years Used: {product.yearsused} Years</p>
                            <div className='flex justify-between items-center'>
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user.photoURL} alt="" />
                                    </div>
                                </div>
                                <div className=''>
                                    <p>{user.displayName}</p>

                                </div>
                                 

                                <div className="card-actions justify-end">
                                    {
                                        product.status === 'sold' ? 
                                        <label className="btn btn-accent">Sold</label>
                                        : 
                                        <label htmlFor="book-now" onClick={()=>setProduct(product)} className="btn btn-primary btn-md">Book Now</label>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>

            {product && <BookingModal product={product} refetch={refetch} setProduct={setProduct}></BookingModal>}
        </div>
    );
};

export default Category;