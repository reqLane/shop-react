import React from 'react';
import '../PopularCategories/PopularCategories.css';
const PopularCategories = () => {
    return (
        <div className='popular-categories-container'>
            <h1 className='popular-categories-title'>Популярні категорії</h1>
            <ul className='categories-items'>
                <li>
                    <div className="category-info">
                        <p className='popular-category-text'>Столи</p>
                        <span className='category-description'>Вирізняються міцною та надійною конструкцією. Матеріал – дуб.</span>
                        <button className='category-btn'>Детальніше</button>
                    </div>
                </li>
                <li>
                    <div className="category-info">
                        <p className='popular-category-text'>Столи</p>
                        <span className='category-description'>Вирізняються міцною та надійною конструкцією. Матеріал – дуб.</span>
                        <button className='category-btn'>Детальніше</button>
                    </div>
                </li>
                <li>
                    <div className="category-info">
                        <p className='popular-category-text'>Столи</p>
                        <span className='category-description'>Вирізняються міцною та надійною конструкцією. Матеріал – дуб.</span>
                        <button className='category-btn'>Детальніше</button>
                    </div>
                </li>
                <li>
                    <div className="category-info">
                        <p className='popular-category-text'>Столи</p>
                        <span className='category-description'>Вирізняються міцною та надійною конструкцією. Матеріал – дуб.</span>
                        <button className='category-btn'>Детальніше</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default PopularCategories;
