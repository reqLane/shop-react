import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCartItems } from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.dispatch(loadCartItems());

export default store;
