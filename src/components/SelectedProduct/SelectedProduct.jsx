import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart, selectCartItems} from '../../cartSlice.jsx';
import './SelectedProduct.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PopularProducts from "../PopularProducts/PopularProducts.jsx";
import {setUser} from "../../authSlice.js";
import AuthModal from "../AuthModal/AuthModal.jsx";

const SelectedProduct = ({location}) => {
    const [quantity, setQuantity] = useState(1);
    const [images,setImages] = useState([]);
    const [selectColors, setSelectColors] = useState([]);
    const [selectMaterials, setSelectMaterials] = useState([]);
    const [productRecommendations, setProductRecommendations] = useState([]);
    const [addedToCart,setAddedToCart] = useState(false);
    const [colorChoice, setColorChoice] = useState(null);
    const [materialChoice, setMaterialChoice] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const user = useSelector((state) => state.auth.user);

    const product = location.state.product;

    useEffect(() => {
        getProductImages();
        getSelectColors();
        getSelectMaterials();
        getRecommendations();
        checkCartItems();
    }, [location,cartItems]);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            dispatch(setUser(user));
        }
    }, [dispatch]);


    const checkCartItems = () => {
        const found = cartItems.find(item => item.productId === product.productId);
        setAddedToCart(!!found);
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const getProductImages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/${product.productId}/pictures`);
            const data = await response.json();

            const base64Images = data.map(byteArray => {
                return { original: `data:image/jpeg;base64,${byteArray}` };
            }).filter(image => image !== null);

            setImages(base64Images);

        } catch (error) {
            console.error('Error fetching product images:', error);
        }
    }

    const getSelectColors = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/api/products/${product.productId}/colors`);
            const data = await response.json();
            setSelectColors(data);
            setColorChoice(data[0]);
        }catch (error){
            console.error('Error fetching select colors:', error);
        }
    }

    const getSelectMaterials = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/api/products/${product.productId}/materials`);
            const data = await response.json();
            setSelectMaterials(data);
            setMaterialChoice(data[0]);
        }catch (error){
            console.error('Error fetching select materials:', error);
        }
    }

    const getRecommendations = async () =>{
        try{
            const response = await fetch(`http://localhost:8080/api/products/${product.productId}/recommendations?size=5`);
            const data = await response.json();
            setProductRecommendations(data);
        }catch (error){
            console.error('Error fetching select materials:', error);
        }
    }

    const handleColorChange = (event) => {
        setColorChoice(JSON.parse(event.target.value));
    };
    const handleAddToCart = () => {
        if(user){
            const selectedColor = colorChoice ? colorChoice : selectColors[0];
            const selectedMaterial = materialChoice ? materialChoice : selectMaterials[0];

            const productToAdd = {
                ...product,
                color: selectedColor,
                material: selectedMaterial,
                quantity:quantity
            };

            if (addedToCart) {
                dispatch(removeFromCart(product.productId));
            } else {
                dispatch(addToCart(productToAdd));
            }
        }else{
            setShowModal(true);
        }

    };

    const handleMaterialChange = (event) => {
        setMaterialChoice(JSON.parse(event.target.value));
    };

    return (
        <div className='selected-product-container'>
            {/*<div className="category-path">*/}
            {/*    <span>Головна Стільці Стільці Кухонні Стілець Урбано</span>*/}
            {/*</div>*/}
            <h2 className='selected-product-title'>{product.name}</h2>
            <div className="selected-product-main-info-wrapper">
                <div className="main-image-container">
                    <ImageGallery
                        items={images}
                        autoPlay={true}
                        showPlayButton={false}
                    />
                </div>
                <div className='selected-product-description-container'>
                    <p className='selected-product-price'>{product.price}&#8372;</p>
                    <p className='selected-product-desc'>{product.description}</p>
                    <h3 className='selected-product-dimensions'>Dimensions</h3>
                    <p>Height {product.height}mm; Length {product.width}mm</p>

                    <div className="selected-product-filter">
                        <div className="change-color-product">
                            <p>Choose Color</p>
                            <select
                                name=""
                                id=""
                                className='select-color'
                                onChange={handleColorChange}
                            >
                                {selectColors.map(color => (
                                    <option
                                        key={color.colorId}
                                        value={JSON.stringify(color)}
                                    >
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            {colorChoice && (
                                <div
                                    className="circle-color"
                                    style={{ backgroundColor: `#${colorChoice ? colorChoice.hexCode : selectColors[0].hexCode}` }}
                                />
                            )}
                        </div>

                        <div className="change-material-product">
                            <p>Choose Material</p>
                            <select
                                name=""
                                id=""
                                className='select-material'
                                onChange={handleMaterialChange}
                            >
                                {selectMaterials.map(material => (
                                    <option value={JSON.stringify(material)} key={material.materialId}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="product-bottom-desc">
                        <p>Quantity</p>
                        <div className="quantity-selector">
                            <button className="quantity-btn" onClick={() => decrementQuantity()}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={() => incrementQuantity()}>+</button>
                        </div>
                        { addedToCart ? (
                            <button className='add-to-cart' onClick={handleAddToCart}>Remove From Cart</button>
                        ) : (
                            <button className="add-to-cart" onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                        )}
                        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
                    </div>
                </div>
            </div>

            <div className="selected-product-characteristics">
                <h2>Characteristics</h2>
                <ul className='characteristics-container'>
                    <li>
                        <span>Weight</span>
                        <p>{product.weight}kg</p>
                    </li>
                    <li>
                        <span>Package</span>
                        <p>{product.packageDescription}</p>
                    </li>

                </ul>
            </div>
            <PopularProducts popularProducts={productRecommendations} title={'You Might Also Like'} />
        </div>
    );
};

export default SelectedProduct;
