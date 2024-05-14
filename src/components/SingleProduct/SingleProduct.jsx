import React from 'react';
import '../SingleProduct/SingleProduct.css'
import {Link} from 'react-router-dom';

const SingleProduct = ({product,showToCart}) => {
    return (
        <div className='single-product'>
            <Link
                to={`/products/${product.productId}/`}
                state={{product}}
                className='single-product-container'>
                <div className="img-container" style={{backgroundImage: `url(http://localhost:8080/api/products/${product.productId}/picture-main)`}}></div>
                <p className='single-product-description'>{product.name}</p>
                <div className="single-product-price-container">
                    <p className='price'>{product.price}&#8372;</p>
                </div>
                {showToCart &&
                    <button className="add-to-cart-btn">
                     View Product<span className="cart-icon">&#128722;</span>
                    </button>
                }
            </Link>
        </div>


    );
};

export default SingleProduct;
