import React from 'react';
import '../SingleProduct/SingleProduct.css'
import img1 from '../../assets/popular-products/img-1.png';
import {Link} from 'react-router-dom';
const SingleProduct = ({showToCart}) => {
    return (
        <Link to={`/products/product1/`} className='single-product-container'>
            <div className="img-container">
                <img src={img1} alt=""/>
            </div>
            <p className='single-product-description'>Стілець з масиву дуба САБРІНА</p>
            <div className="single-product-price-container">
                <p className='price'>2 600</p>
                <p className='currency'>грн</p>
            </div>
            {showToCart &&
                <button className="add-to-cart-btn">У Кошик <span className="cart-icon">&#128722;</span></button>
            }
        </Link>
    );
};

export default SingleProduct;
