import { Navigation} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React from 'react';

const Slider = () => {
    return (
        <div className='container mx-auto'>
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation
        >
            <SwiperSlide>
                <div className='relative '>
                    <h1 className='absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-purple-500 to-pink-500 p-6 '>Best Used Bike Haat.</h1>
                    <img className='' src="https://www.suzuki.com.bd/images/website/Cruiser.jpg" alt='' />
                     
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='relative'>
                <h1 className='absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-purple-500 to-pink-500 p-6 '>Feel The Thril. Accelarete!!</h1>
                    <img className='h-100' src="https://www.suzuki.com.bd/images/website/Sports.jpg" alt='' />
                </div>
            </SwiperSlide>
        </Swiper>
        </div>
    );
};

export default Slider;