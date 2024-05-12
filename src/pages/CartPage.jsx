import React from 'react';
import Cart from "../components/Cart/Cart.jsx";

const CartPage = ({popularProducts}) => {
    return (
        <>
            <Cart popularProducts={popularProducts}/>
        </>
    );
};

export default CartPage;
