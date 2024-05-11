import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout.jsx"
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SelectedCategoryPage from "./pages/SelectedCategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage/>}/>
                <Route path='/products/:product1' element={<ProductPage/>}/>
                <Route path='/:categoryName/:subcategoryName' element={<SelectedCategoryPage />}/>
                <Route path='/:categoryName' element={<SelectedCategoryPage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/order' element={<OrderPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
            </Route>
        )
    );
    return <RouterProvider router={router}/>;
}

export default App;