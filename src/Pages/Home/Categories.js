import React from 'react';
import { useQuery } from '@tanstack/react-query'
import {Link} from 'react-router-dom'

const Categories = () => {

    const { data: items = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
            const data = await res.json();
            return data;
        }
    });


    return (
        <div className='container mx-auto py-10'>
            <h1 className='text-3xl text-center font-bold my-8'>Browse By Categories</h1>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-6 md:grid-cols-3'>
                {
                    items.map(item => <div key={item._id} className="sm:w-full shadow-xl bg-gradient-to-r from-sky-500 to-indigo-500 p-4 w-40 rounded text-center text-white">
                        <Link to={`/category/${item._id}`}><h1 className='text-xl font-bold my-2'>{item.category}</h1></Link>
                    </div>
                    )
                }

            </div>
        </div>
    );
};

export default Categories;