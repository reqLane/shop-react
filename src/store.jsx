import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCartItems } from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
});

store.dispatch(loadCartItems());

export default store;
