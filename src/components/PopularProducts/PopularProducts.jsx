import React from 'react';
import SingleProduct from "../SingleProduct/SingleProduct.jsx";
import '../PopularProducts/PopularProducts.css'
const PopularProducts = () => {
    return (
        <>
            <h1 className='popular-products-title'>Популярні товари</h1>
            <div className='popular-products-container'>
                <SingleProduct  />
                <SingleProduct />
                <SingleProduct />
                <SingleProduct />
                <SingleProduct />
                <SingleProduct />
            </div>
        </>
    );
};

export default PopularProducts;
