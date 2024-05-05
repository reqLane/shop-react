import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout.jsx"
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage/>}/>
                <Route path='/products' element={<ProductPage/>}/>
            </Route>
        )
    );

    return <RouterProvider router={router}/>;
}

export default App;