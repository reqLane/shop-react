import React from 'react';
import Carousel from "../components/Carousel/Carousel.jsx";
import PopularCategories from "../components/PopularCategories/PopularCategories.jsx";
import PopularProducts from "../components/PopularProducts/PopularProducts.jsx";
import '../index.css'
const HomePage = () => {

    return (
        <div className='home-page-container'>
            <Carousel/>
            <PopularProducts/>
            <PopularCategories/>
        </div>
    );
};

export default HomePage;
