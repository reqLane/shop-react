import React, {useEffect, useState} from 'react';
import Slider from 'react-slider'
import './SelectedCategory.css';
import SingleProduct from "../SingleProduct/SingleProduct.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart, selectCartItems} from "../../cartSlice.jsx";

const SelectedCategory = ({location}) => {
    const [edgePrices, setEdgePrices] = useState([0,0]);
    const [sliderValues,setSliderValues] = useState([0,0]);
    const [selectedSliderValues,setSelectedSliderValues] = useState([0,0]);
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectOption,setSelectOption] = useState('asc');
    const [loading,setLoading] = useState(true);

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('s');

    const category = location.state ? location.state.category : null;
    const subcategory = location.state ? location.state.subcategory : null;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product.productId));
    };

    useEffect(()=>{
        getEdgePrices().then((data) => {
            const priceLow = data.priceLow;
            const priceHigh = data.priceHigh;

            setEdgePrices([priceLow, priceHigh]);
            setSliderValues([priceLow,priceHigh]);
            setSelectedSliderValues([priceLow,priceHigh]);

            getFilteredProducts(priceLow,priceHigh);
            setLoading(false);
        });

        getMaterials();
        getColors();
    },[location]);

    useEffect(()=>{
        getFilteredProducts(selectedSliderValues[0], selectedSliderValues[1]);
    },[selectOption]);

    const getEdgePrices = async () => {
        const body = {
            categoryId: category ? category.categoryId : "-1",
            subcategoryId: subcategory ? subcategory.subcategoryId : "-1",
        };

        const response= await fetch('http://localhost:8080/api/products/edge-prices', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    }

    const getMaterials = async () =>{
        const response = await fetch('http://localhost:8080/api/materials');
        const data = await response.json();
        setMaterials(data);
    }

    const getColors = async () =>{
        const response = await fetch('http://localhost:8080/api/colors');
        const data = await response.json();
        setColors(data);
    }

    const getMaterialsChecked = () => {
        const checkedMaterials = materials.filter(material => {
            const checkbox = document.getElementById(material.name);
            return checkbox.checked;
        });
        const materialIds = checkedMaterials.map(material => material.materialId);
        return materialIds;
    };

    const getColorsChecked = () => {
        const checkedColors = colors.filter(color => {
            const checkbox = document.getElementById(color.name);
            return checkbox.checked;
        });
        const colorIds = checkedColors.map(color => color.colorId);
        return colorIds;
    };

    const getFilteredProducts = async (priceLow, priceHigh) => {
        const url = new URL('http://localhost:8080/api/products/filtered');
        url.searchParams.append('price-sort',selectOption);
        url.searchParams.append('size', '100');

        const body = {
            categoryId: category ? category.categoryId : "-1",
            subcategoryId: subcategory ? subcategory.subcategoryId : "-1",
            search: search ? search : null,
            priceMin: priceLow,
            priceMax: priceHigh,
            materialIds: getMaterialsChecked(),
            colorIds: getColorsChecked()
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        setFilteredProducts(data);
    }

    const togglePriceSort = () =>{
        const select = document.getElementById("price-sort").value;
        setSelectOption(select === 'Highest Price' ? 'desc' : 'asc');
    }

    const submitFilters = () => {
        setSelectedSliderValues(sliderValues);
        getFilteredProducts(sliderValues[0], sliderValues[1]);
    }

    return (
        <div className='selected-category-container'>
            <div className="category-path">
                {subcategory ?
                    <h1>Home &#8594; <span>{category.name} &#8594; {subcategory.name}</span></h1>
                    :
                    (category ? <h1>Home &#8594; <span>{category.name}</span></h1> : <h1>Home &#8594; <span>{search}</span></h1>)
                }
            </div>

            <div className="category-top-menu">
                {subcategory ?
                    <h2 className='category-title'>{subcategory.name}</h2>
                    :
                    <h2 className='category-title'>{category && category.name}</h2>
                }

                <div className="category-overall-filter">
                    <span>Sort By: </span>
                    <select name="" id="price-sort" className='category-select' onChange={togglePriceSort}>
                        <option value="Lowest Price">Lowest Price</option>
                        <option value="Highest Price">Highest Price</option>
                    </select>
                </div>
            </div>
            <div className="selected-category-main-container">
                <div className="category-bottom-menu">
                    <div className="category-filter-container">
                        <div className="category-price-container">
                            <div className="category-price-top">
                                <p className='price'>Price</p>
                            </div>
                            <Slider className='slider' onChange={setSliderValues} value={sliderValues} min={edgePrices[0]} max={edgePrices[1]}/>
                            <div className="values">
                                <div className="value-from"> {sliderValues[0]}</div>
                                <div className="value-to">{sliderValues[1]}</div>
                                <div className='confirm-btn' onClick={submitFilters}>OK</div>
                            </div>
                        </div>
                        <ul className='category-filter-list'>
                            <li>
                                <h2>Material</h2>
                                {materials.map(material=>
                                    <div className="checkbox-container" key={`${material.materialId}`}>
                                        <input type="checkbox" id={`${material.name}`}/>
                                        <label htmlFor={`${material.name}`}>{material.name}</label>
                                    </div>
                                )}
                            </li>
                            <li>
                                <h2>Color</h2>
                                {colors.map(color=>
                                    <div className="checkbox-container" key={`${color.colorId}`}>
                                        <input type="checkbox" id={`${color.name}`}/>
                                        <label htmlFor={`${color.name}`}>{color.name}</label>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                {loading ? (<Spinner/>) : (
                    <div className="selected-category-items">
                        {filteredProducts.map(product => (
                            <SingleProduct
                                key={product.productId}
                                showToCart={true}
                                product={product}
                                addToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
                                cartItems={cartItems}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default SelectedCategory;
