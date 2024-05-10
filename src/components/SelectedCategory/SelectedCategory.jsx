import React, {useState} from 'react';
import Slider from 'react-slider'
import './SelectedCategory.css';
import SingleProduct from "../SingleProduct/SingleProduct.jsx";
const MIN = 100;
const MAX = 12000;
import {MenuItems} from "../../MenuItems/MenuItems.js";

const SelectedCategory = ({category,title}) => {
    const [values,setValues] = useState([MIN,MAX]);

    return (
        <div className='selected-category-container'>
            <div className="category-path">
                {title ? <span>Головна  {category}  {title}</span> : <span>Головна {category}</span>}
            </div>

            <div className="category-top-menu">
                {title ?<h2 className='category-title'>{title}</h2>  : <h2 className='category-title'>{category}</h2>}

                <div className="category-overall-filter">
                    <span>Сортувати по: </span>
                    <select name="" id="" className='category-select'>
                        <option value="">Збільшенню ціни</option>
                        <option value="">Зменшенню ціни</option>
                    </select>
                </div>
            </div>
            <div className="selected-category-main-container">
                <div className="category-bottom-menu">
                    <div className="category-filter-container">
                        <div className="category-price-container">
                            <div className="category-price-top">
                                <p className='price'>Ціна</p>
                                <p className='currency'>грн</p>
                            </div>
                            <Slider className='slider' onChange={setValues} value={values} min={MIN} max={MAX}/>
                            <div className="values">
                                <div className="value-from"> {values[0]}</div>
                                <div className="value-to">{values[1]}</div>
                                <div className='confirm-btn'>OK</div>
                            </div>
                        </div>
                        <ul className='category-filter-list'>
                            <li>
                                <h2>Матеріал</h2>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='material-1'/>
                                    <label htmlFor="material-1">Із суцільного дерева</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='material-2'/>
                                    <label htmlFor="material-2">Комбіновані (дерево + метал)</label>
                                </div>
                            </li>
                            <li>
                                <h2>Сидіння</h2>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='seat-1'/>
                                    <label htmlFor="seat-1">З твердим сидінням</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='seat-2'/>
                                    <label htmlFor="seat-2">З м’яким сидінням</label>
                                </div>
                            </li>
                            <li>
                                <h2>Висота</h2>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='height-1'/>
                                    <label htmlFor="height-1">60–85 mm</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='height-2'/>
                                    <label htmlFor="height-2">більше 85 mm</label>
                                </div>
                            </li>
                            <li>
                                <h2>Колір</h2>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='color-1'/>
                                    <label htmlFor="color-1">Дикий дуб</label>
                                </div>
                                <div className="checkbox-container">
                                    <input type="checkbox" id='color-2'/>
                                    <label htmlFor="color-2">Слонова кістка</label>
                                </div>
                            </li>
                            <button className='show-more-btn'>Показати ще 8</button>
                        </ul>
                    </div>
                </div>
                <div className="selected-category-items">
                    {MenuItems.map((item, index)=>(
                        <SingleProduct key={index}  showToCart={true}/>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default SelectedCategory;
