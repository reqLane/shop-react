import React from 'react';
import './ProductInCart.css';
const ProductInCart = ({ product }) => {
    return (
        <div className="product-in-cart-container">
            <img src={product.image} alt="Product" className="product-image" />
            <div className="product-details">
                <div className='top-order-detail'>
                    <p className="product-title">{product.name}</p>
                    <p className="product-price">{product.price} грн</p>
                </div>
                <p className="product-info product-color">{product.color}</p>
                <p className="product-info product-material">{product.material}</p>
            </div>
        </div>
    );
};

export default ProductInCart;