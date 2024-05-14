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
                            <p className="product-price">{product.price}</p>
                        ) : (
                            <div>
                                <p className="product-price">{product.price}</p>
                                <p className='product-quantity-price'>{product.quantity} * {product.price}</p>
                            </div>
                        )}
                    </div>
                </div>
                <p className="product-info product-color">Color: {product.color}</p>
                <p className="product-info product-material">Material: {product.material}</p>
            </div>
        </div>
    );
};

export default ProductInCart;