import React from 'react';
import Categories from './Categories';
import Featured from './Featured';
import MakeMoney from './MakeMoney';
import Slider from './Slider';


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Featured></Featured>
            <Categories></Categories>
            <MakeMoney></MakeMoney>
        </div>
    );
};

export default Home;