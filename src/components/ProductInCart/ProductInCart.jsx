import React from 'react';
import './ProductInCart.css';
const ProductInCart = ({ product }) => {
    return (
        <div className="product-in-cart-container">
            <img src={`http://localhost:8080/api/products/${product.productId}/picture-main`} alt="Product" className="product-image" />
            <div className="product-details">
                <div className='top-order-detail'>
                    <p className="product-title">{product.name}</p>
                    <div>
                        {product.quantity === 1 ? (
                            <p className="product-price">{product.price}&#8372;</p>
                        ) : (
                            <div>
                                <p className="product-price">{(product.price * product.quantity).toFixed(2)}&#8372;</p>
                                <p className='product-quantity-price'>{product.quantity} * {product.price}</p>
                            </div>
                        )}
                    </div>
                </div>
                <p className="product-info product-color">Color: {product.color.name}</p>
                <p className="product-info product-material">Material: {product.material.name}</p>
            </div>
        </div>
    );
};

export default ProductInCart;
