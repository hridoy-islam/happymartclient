import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Featured = () => {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/featured/`)
            const data = await res.json()
            return data;
        }
    })

    return (
        <div className='container mx-auto py-10'>
            <h1 className='text-3xl text-center font-bold my-8'>Available For Sale</h1>
            <div className='grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
                {
                    products.length > 0 && products.map(product => <div key={product._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.productname}</h2>
                            <p>Model: {product.model}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Original Price: {product.originalprice} BDT</p>
                            <p>Resale Price : {product.resaleprice} BDT</p>
                            <p>Years Used: {product.yearsused} Years</p>
                            <label htmlFor="book-now" className="btn btn-primary btn-md">Book Now</label>
                        </div>
                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default Featured;