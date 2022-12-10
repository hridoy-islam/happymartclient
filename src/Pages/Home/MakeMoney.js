import React from 'react';
import { BiDollarCircle } from 'react-icons/bi'
import { TbTruckDelivery } from 'react-icons/tb'
import BasicButton from '../../Components/BasicButton';

const MakeMoney = () => {
    return (
        <div className='container mx-auto p-10 rounded shadow-xl my-10 bg-gradient-to-r from-sky-500 to-indigo-500 text-white'>
            <h1 className='text-4xl my-10 font-bold text-center'> The Largest Marketplace in Bangladesh!</h1>
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-2 md:grid-cols-1'>
                <div className='flex items-center gap-5'>
                    <div>
                        <BiDollarCircle className='text-9xl font-bold' />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>Start making money!</h2>
                        <p className="my-3">Do you have something to sell? Post your first ad and start making money!</p>
                        <BasicButton >Post Your Add For Free</BasicButton>
                    </div>

                </div>

                <div className='flex items-center gap-5'>
                    <div>
                        <TbTruckDelivery className='text-9xl font-bold' />
                    </div>

                    <div>
                        <h2 className='text-2xl font-bold'>Doorstep Delivery!</h2>
                        <p className="my-3">Get items delivered to you!</p>
                        <BasicButton >Shop Now</BasicButton>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MakeMoney;