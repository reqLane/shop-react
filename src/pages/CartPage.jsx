import React, {useEffect} from 'react';
import Cart from "../components/Cart/Cart.jsx";
import {useSelector} from "react-redux";

const CartPage = ({popularProducts, checkAuth}) => {
    const cartItems = useSelector(state => state.cart.items);

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <Cart popularProducts={popularProducts} cartItems={cartItems}/>
        </>
    );
};

export default CartPage;
