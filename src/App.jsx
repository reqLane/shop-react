import React, {useEffect, useState} from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout.jsx"
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SelectedCategoryPage from "./pages/SelectedCategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        getAllPopularProducts();
    }, []);

    const getAllPopularProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products/trending?size=5");
            const data = await response.json();
            setPopularProducts(data);
        } catch (error) {
            console.error('Error fetching popular products:', error);
        }
    };

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8080/api/auth",{
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status === 403) {
                localStorage.removeItem('loggedInUser');
                localStorage.removeItem('cartItems');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error checking auth:', error);
        }
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage popularProducts={popularProducts}/>}/>
                <Route path='/products/:productId/' element={<ProductPage/>}/>
                <Route path='/:categoryName/:subcategoryName' element={<SelectedCategoryPage />}/>
                <Route path='/:categoryName' element={<SelectedCategoryPage />}/>
                <Route path='/search?s=:search' element={<SelectedCategoryPage />}/>
                <Route path='/cart' element={<CartPage popularProducts={popularProducts} checkAuth={checkAuth} />}/>
                <Route path='/order' element={<OrderPage checkAuth={checkAuth} />}/>
                <Route path='/profile' element={<ProfilePage checkAuth={checkAuth} />}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        )
    );
    return <RouterProvider router={router}/>;
}

export default App;
