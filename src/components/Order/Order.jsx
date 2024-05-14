import React, {useState} from 'react';
import './Order.css';
import ProductInCart from "../ProductInCart/ProductInCart.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../cartSlice.jsx";
const Order = () => {
    const cartItems = useSelector(selectCartItems);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const handlePlaceOrder = () => {
        const isValid = validateForm();
        if (isValid) {
            setShowModal(true);
            resetInputValues();
            setTimeout(()=>{
                window.location.href = `/`;
            },3000);

        } else {
            setError('Please fill out all required fields and select delivery and payment methods.');
        }
    };

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
                    <p>Order amount:</p>
                    <span>{cartItems.reduce((total, product) => total + product.price, 0)}</span>
                </div>

                <button className="place-order-btn" onClick={handlePlaceOrder}>Confirm the order</button>
                {showModal && <ConfirmModal onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default Order;
