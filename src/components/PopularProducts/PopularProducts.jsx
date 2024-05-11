import React from 'react';
import SingleProduct from "../SingleProduct/SingleProduct.jsx";
import '../PopularProducts/PopularProducts.css'
const PopularProducts = ({popularProducts}) => {
    return (
        <>
            <h1 className='popular-products-title'>Популярні товари</h1>
            <div className='popular-products-container'>
                {popularProducts.map(product=>
                    <SingleProduct product={product} showToCart={false} key={product.productId}/>
                )}
            </div>
        </>
    );
};

export default PopularProducts;
