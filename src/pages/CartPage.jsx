import React from 'react';
import Cart from "../components/Cart/Cart.jsx";
import {useSelector} from "react-redux";

const CartPage = ({popularProducts}) => {
    const cartItems = useSelector(state => state.cart.items);
    return (
        <>
            <Cart popularProducts={popularProducts} cartItems={cartItems}/>
        </>
    );
};

export default CartPage;
