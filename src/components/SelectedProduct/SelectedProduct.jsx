import React, {useRef, useState} from 'react';
import './SelectedProduct.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import mainImg from '../../assets/selectedProduct/selected-img-main.png'
import PopularProducts from "../PopularProducts/PopularProducts.jsx";
import {Link} from "react-router-dom";

const SelectedProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const galleryRef = useRef(null);
    const images = [
        {
            original: mainImg,
            thumbnail: mainImg,
        },
        {
            original: mainImg,
            thumbnail: mainImg,
        },
        {
            original: mainImg,
            thumbnail: mainImg,
        },
        {
            original: mainImg,
            thumbnail: mainImg,
        },

    ];
    const handleThumbnailClick = (index) => {
        if (galleryRef.current) {
            galleryRef.current.slideToIndex(index);
        }
    };

    return (
        <div className='selected-product-container'>
            <div className="category-path">
                <span>Головна Стільці Стільці Кухонні Стілець Урбано</span>
            </div>
            <h2 className='selected-product-title'>Стілець УРБАНО</h2>
            <div className="selected-product-main-info-wrapper">
                <div className="main-image-container">
                    <ImageGallery
                        ref={galleryRef}
                        items={images}
                        autoPlay={false}
                        showNav={false}
                        onClickThumbnail={handleThumbnailClick}
                    />
                </div>
                <div className='selected-product-description-container'>
                    <p className='selected-product-price'>1440 <span>грн</span></p>
                    <p className='selected-product-desc'>Особливістю моделі стільця «Урбано» є його сучасний дизайн, який стане чудовим акцентом у Вашій оселі. Виріб має надійну конструкцію, а також є ергономічним. Стілець «Урбано» виготовлено з екологічно чистого масиву дуба. Гарантія від виробника – 2 роки.</p>
                    <h3 className='selected-product-dimensions'>Габарити</h3>
                    <p>Висота 810 мм; розмір сидіння  450х450 мм; висота сидіння 450 мм</p>

                    <div className="selected-product-filter">
                        <div className="change-color-product">
                            <p>Обрати колір</p>
                            <select name="" id="" className='select-color'>
                                <option value="">Дикий дуб</option>
                                <option value="">Ясний береза</option>
                            </select>
                        </div>

                        <div className="change-material-product">
                            <p>Обрати матеріал</p>
                            <select name="" id="" className='select-material'>
                                <option value="">Дерево</option>
                                <option value="">Метал</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-bottom-desc">
                        <p>Кількість</p>
                        <div className="quantity-selector">
                            <button className="quantity-btn" onClick={() => decrementQuantity()}>-</button>
                            <span className="quantity">{quantity}шт</span>
                            <button className="quantity-btn" onClick={() => incrementQuantity()}>+</button>
                        </div>
                        <Link to={`/cart`} className="add-to-cart" >У Кошик</Link>
                    </div>
                </div>
            </div>

            <div className="selected-product-characteristics">
                <h2>Характеристики</h2>
                <ul className='characteristics-container'>
                    <li>
                        <span>Покриття</span>
                        <p>Більше 20 варіантів фарбування (лляна олія, олія-віск, безбарвний лак, тонований лак, RAL)</p>
                    </li>
                    <li>
                        <span>Сидіння</span>
                        <p>Дерев'яне або м'яке</p>
                    </li>
                    <li>
                        <span>Оббивка</span>
                        <p>Тканина або шкірзам на вибір наступних торгових марок: «ЕксімТекстіль», «Аппарель»</p>
                    </li>
                    <li>
                        <span>Упаковка</span>
                        <p>Картонна коробка: 2шт. в 1 коробці;Вага брутто коробки – 16 кг;Об'єм коробки – 0,33м3;Розмір коробки – 62х68х120см</p>
                    </li>
                </ul>
            </div>

            <PopularProducts/>
        </div>
    );
};

export default SelectedProduct;
