import React, { useState } from 'react';
import './Cart.css';
import productImage from '../../assets/images/logo.png';
import PopularProducts from "../PopularProducts/PopularProducts.jsx";
import {Link} from "react-router-dom"; // Import your product image

const Cart = () => {
    // State for product details
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', color: 'Red', material: 'Wood', quantity: 1, price: 100 },
        { id: 2, name: 'Product 2', color: 'Blue', material: 'Metal', quantity: 2, price: 150 },
        // Add more products as needed
    ]);

    // Function to handle quantity change
    const handleQuantityChange = (id, value) => {
        const updatedProducts = [...products];
        const index = updatedProducts.findIndex(product => product.id === id);
        updatedProducts[index].quantity += value;
        setProducts(updatedProducts);
    };

    // Function to handle product deletion
    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    return (
        <div className='cart-container'>
            <div className="cart-path">
                <span>Головна Кошик</span>
            </div>
            <h1 className='cart-title'>Кошик</h1>
            <div className="table-container">
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Назва товару</th>
                        <th>Колір</th>
                        <th>Матеріал</th>
                        <th>Кількість</th>
                        <th>Ціна</th>

                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img src={productImage} alt="Product" className="product-image" />
                                {product.name}
                            </td>
                            <td>
                                <select value={product.color} onChange={(e) => console.log(e.target.value)}>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                </select>
                            </td>
                            <td>
                                <select value={product.material} onChange={(e) => console.log(e.target.value)}>
                                    <option value="Wood">Wood</option>
                                    <option value="Metal">Metal</option>
                                </select>
                            </td>
                            <td>
                                <button className="cart-quantity-btn" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                <span>{product.quantity}</span>
                                <button className="cart-quantity-btn" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                            </td>
                            <td>{product.price}</td>
                            <td><button onClick={() => handleDeleteProduct(product.id)}>X</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="cart-total-container">
                    <div>
                        <p>Всього у кошику 3 товари на суму</p>
                        <span>6670 грн</span>
                    </div>
                    <Link to='/order' className='make-order-btn'>Оформити замовлення</Link>
                </div>
            </div>
            <PopularProducts/>
        </div>
    );
};

export default Cart;
