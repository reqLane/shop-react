import React from 'react';
import '../PopularCategories/PopularCategories.css';
import {Link} from "react-router-dom";
const PopularCategories = ({popularCategories}) => {
    return (
        <div className='popular-categories-container'>
            <h1 className='popular-categories-title'>Popular Categories</h1>
            <ul className='categories-items'>
                {popularCategories.map(category=>
                    <Link
                        className='category-link'
                        to={`/${category.name.toLowerCase()}`}
                        state={{category: category}}
                        style={{backgroundImage: `url(http://localhost:8080/api/categories/${category.categoryId}/picture)`}}
                        key={category.categoryId}>
                        <div className="category-info">
                            <p className='popular-category-text'>{category.name}</p>
                            <span className='category-description'>{category.description}</span>
                            <button className='category-btn'>See More</button>
                        </div>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default PopularCategories;
