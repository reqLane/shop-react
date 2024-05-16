import React, {useEffect} from 'react';
import Order from "../components/Order/Order.jsx";

const OrderPage = ({checkAuth}) => {

    useEffect(() => {
        checkAuth();
        checkCart();
    }, []);

    const checkCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (!cartItems || cartItems.length === 0) {
            window.location.href = '/';
        }
    }

    return (
        <div>
            <Order/>
        </div>
    );
};

export default OrderPage;
