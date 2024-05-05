import React from 'react';
import Carousel from "../components/Carousel/Carousel.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Products from "../components/Products/Products.jsx";

const HomePage = () => {

    return (
        <>
            <Carousel/>
            <Products/>
            <Categories/>
        </>
    );
};

export default HomePage;
