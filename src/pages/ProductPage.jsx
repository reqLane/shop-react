import React from 'react';
import SelectedProduct from "../components/SelectedProduct/SelectedProduct.jsx";
import {useLocation} from "react-router-dom";
const ProductPage = ({popularProducts}) => {
    const location = useLocation();
    return (
        <>
            <SelectedProduct popularProducts={popularProducts} location={location}/>
        </>
    );
};

export default ProductPage;
