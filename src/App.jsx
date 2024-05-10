import React, {useEffect} from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout.jsx"
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SelectedCategoryPage from "./pages/SelectedCategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const categoriesAPI = 'http://localhost:8080/api/categories';

const App = () => {
    useEffect(() => {
        fetch(categoriesAPI)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            });
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage/>}/>
                <Route path='/products/:product1' element={<ProductPage/>}/>
                <Route path='/:category/:title' element={<SelectedCategoryPage/>}/>
                <Route path='/:category' element={<SelectedCategoryPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/order' element={<OrderPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Route>
        )
    );
    return <RouterProvider router={router}/>;
}

export default App;