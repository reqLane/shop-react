
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Cart.css';
import PopularProducts from "../PopularProducts/PopularProducts.jsx";
import {Link} from "react-router-dom";
import {removeFromCart, selectCartItems} from "../../cartSlice.jsx";


const Cart = ({popularProducts}) => {
    const cartItems = useSelector(selectCartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalPrice(total);
    };

    const handleDeleteProduct = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className='cart-container'>
            <div className="cart-path">
                <h1>Home &#8594; Cart</h1>
            </div>
            <h1 className='cart-title'>Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Currently no products in cart.</p>
            ) : (
                <div className="table-container">
                    <table className="cart-table">
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Color</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((product) => (
                            <tr key={product.id}>
                                <td className='image-column'>
                                    <img src={`http://localhost:8080/api/products/${product.productId}/picture-main`} alt=""/>
                                    {product.name}
                                </td>
                                <td>
                                    {product.color}
                                </td>
                                <td>
                                    {product.material}
                                </td>
                                <td>
                                    {product.quantity}
                                </td>
                                <td>{product.price}</td>
                                <td><button onClick={() => handleDeleteProduct(product.productId)}>X</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="cart-total-container">
                        <div>
                            <p>Price: </p>
                            <span>{totalPrice}</span>
                        </div>
                        <Link to='/order' className='make-order-btn'>Proceed With Order</Link>
                    </div>
                </div>
            )}
            <PopularProducts popularProducts={popularProducts} title={'Frequently bought together'}/>
        </div>
    );
};

export default Cart;
