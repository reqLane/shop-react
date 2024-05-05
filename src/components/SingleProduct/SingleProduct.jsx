import React from 'react';
import '../SingleProduct/SingleProduct.css'
import img1 from '../../assets/popular-products/img-1.png';
import {Link} from 'react-router-dom';
const SingleProduct = () => {
    return (
        <Link to={`/products`} className='single-product-container'>
            <div className="img-container">
                <img src={img1} alt=""/>
            </div>
            <p className='single-product-description'>Стілець з масиву дуба САБРІНА</p>
            <div className="price-container">
                <p className='price'>2 600</p>
                <p className='currency'>грн</p>
            </div>
        </Link>
    );
};

export default SingleProduct;
