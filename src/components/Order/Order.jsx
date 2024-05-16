import React, {useState} from 'react';
import './Order.css';
import ProductInCart from "../ProductInCart/ProductInCart.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import {useSelector} from "react-redux";
import {selectCartItems} from "../../cartSlice.jsx";

const Order = () => {
    const cartItems = useSelector(selectCartItems);

    const totalPrice = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState('');

    const handlePlaceOrder = async (e) => {
        e.target.disabled = true;
        setError('');
        const isValid = validateForm();
        if (isValid) {
            const responseOrderId = await sendOrder();
            setOrderId(responseOrderId);
            if(responseOrderId) {
                setShowModal(true);
                resetInputValues();
                localStorage.removeItem('cartItems');
                setTimeout(()=>{
                    window.location.href = `/`;
                },5000);
            }
        } else {
            setError('Please fill out all required fields and select delivery and payment methods');
            e.target.disabled = false;
        }
    };

    const sendOrder = async () =>{
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            const orderProductsOptional = JSON.parse(localStorage.getItem('cartItems'));
            const orderProducts = orderProductsOptional ? orderProductsOptional.map((p) => {
                return {
                    productId: p.productId,
                    amount: p.quantity,
                    colorId: p.color.colorId,
                    materialId: p.material.materialId
                };
            }) : null;

            const body = {
                userId: user ? user.userId : null,
                orderProducts: orderProducts,
                price: totalPrice
            };

            const response = await fetch("http://localhost:8080/api/orders/create",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data ? data.orderId : null;
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    const resetInputValues = () =>{
        setName('');
        setPhone('');
        setEmail('');
        setDeliveryMethod('');
        setPaymentMethod('');
        setError('');
    }

    const validateForm = () => {
        return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '' && deliveryMethod !== '' && paymentMethod !== '';
    };

    return (
        <div className="order-page-container">
            <div className="contact-details">
                <h1 className='order-title'>Placing an order</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="order-subtitle">
                    <p>Please fill out the form.</p>
                    <p>Choose a payment method and a delivery method</p>
                </div>

                <div className="contact-details-container">
                    <h2 className='contact-details-title'>Contacts</h2>
                    <div className="single-contact">
                        <label htmlFor="name">Recipient's name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Recepient name' />
                    </div>
                    <div className="single-contact">
                        <label htmlFor="phone">Phone*</label>
                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone Number' />
                    </div>
                    <div className="single-contact">
                        <label htmlFor="email">E-mail</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='abc123@gmail.com' />
                    </div>
                </div>
                <div className="contact-details-container">
                    <h2 className='contact-details-title'>Delivery and payment</h2>
                    <ul className='delivery-container'>
                        <li>
                            <span>Method of delivery</span>
                            <div>
                                <input type="radio" id='to-home' name="deliveryMethod" value="Courier" onChange={(e) => setDeliveryMethod(e.target.value)} />
                                <label htmlFor="to-home">Courier</label>
                            </div>
                            <div>
                                <input type="radio" id='pickup' name="deliveryMethod" value="Pickup" onChange={(e) => setDeliveryMethod(e.target.value)} />
                                <label htmlFor="pickup">Pickup</label>
                            </div>
                        </li>
                        <li>
                            <span>Payment method</span>
                            <div>
                                <input type="radio" id='card' name="paymentMethod" value="By bank card online" onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label htmlFor="card">By bank card online</label>
                            </div>
                            <div>
                                <input type="radio" id='cash' name="paymentMethod" value="Cash or card upon receipt" onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label htmlFor="cash">Cash or card upon receipt</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='address-container'>
                    <label htmlFor="address">Address</label>
                    <input type="text" placeholder='City, street, house, apartment' id='address' />
                </div>
                <p className='compulsory'>*Mandatory fields</p>
            </div>
            <div className="order-summary">
                <h2 className='in-cart-title'>Products in the cart</h2>
                <ul>
                    {cartItems.map((product, index) => (
                        <li key={index} className='product-item'>
                            <ProductInCart product={product} />
                        </li>
                    ))}
                </ul>

                <div className='order-sum'>
                    <p>Order price:</p>
                    <span>{totalPrice}&#8372;</span>
                </div>

                <button className="place-order-btn" onClick={handlePlaceOrder}>Confirm the order</button>
                {showModal && <ConfirmModal onClose={() => setShowModal(false)} orderId={orderId} />}
            </div>
        </div>
    );
};

export default Order;
