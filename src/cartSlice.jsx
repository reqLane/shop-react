// cartSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        setCartItems(state, action) {
            state.items = action.payload;
        },
        addToCart(state, action) {
            state.items.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.productId !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        loadCartItems(state) {
            const savedCartItems = localStorage.getItem('cartItems');
            if (savedCartItems) {
                state.items = JSON.parse(savedCartItems);
            }
        }
    }
});

export const selectCartItems = state => state.cart.items;
export const { addToCart, removeFromCart, loadCartItems } = cartSlice.actions;
export default cartSlice.reducer;
