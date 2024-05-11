import React from 'react';
import {useLocation} from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory/SelectedCategory.jsx";
const SelectedCategoryPage = () => {
    const location = useLocation();
    return (
        <>
            <SelectedCategory location={location} />
        </>
    );
};

export default SelectedCategoryPage;
