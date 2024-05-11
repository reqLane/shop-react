import React, {useEffect, useState} from 'react';
import Carousel from "../components/Carousel/Carousel.jsx";
import PopularCategories from "../components/PopularCategories/PopularCategories.jsx";
import PopularProducts from "../components/PopularProducts/PopularProducts.jsx";
import '../index.css';
const HomePage = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const [popularCategories, setPopularCategories] = useState([]);

    useEffect(() => {
        return () => {
          getAllPopularProducts();
          getAllPopularCategories();
        };
    }, []);

    const getAllPopularProducts = async () =>{
        const popProducts= await fetch("http://localhost:8080/api/products/trending?size=6");
        const data = await popProducts.json();
        setPopularProducts(data);
    }

    const getAllPopularCategories = async () =>{
        const popCategories= await fetch("http://localhost:8080/api/categories/trending");
        const data = await popCategories.json();
        setPopularCategories(data);
    }
    
    return (
        <div className='home-page-container'>
            <Carousel />
            <PopularProducts popularProducts={popularProducts}/>
            <PopularCategories popularCategories={popularCategories}/>
        </div>
    );
};

export default HomePage;
