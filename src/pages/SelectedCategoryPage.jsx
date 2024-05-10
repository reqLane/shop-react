import React from 'react';
import {useParams} from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory/SelectedCategory.jsx";
const SelectedCategoryPage = () => {
    const {category,title} = useParams();
    return (
        <>
            <SelectedCategory category={category} title={title} />
        </>
    );
};

export default SelectedCategoryPage;
