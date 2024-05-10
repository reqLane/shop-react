import React, {useState} from 'react';
import './Order.css';
import ProductInCart from "../ProductInCart/ProductInCart.jsx";
import inCartImg from '../../assets/inCart/inCart.png';
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
const Order = () => {
    const products = [
        { name: 'Product 1', price: 100,color: 'red', material: 'Apparel biaggi 051', image: inCartImg },
        { name: 'Product 1', price: 100,color: 'red', material: 'Apparel biaggi 058',image: inCartImg},
    ];

    const [showModal, setShowModal] = useState(false);

    const handlePlaceOrder = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="order-page-container">
            <div className="contact-details">
                <h1 className='order-title'>Оформлення замовлення</h1>
                <div className="order-subtitle">
                    <p>Будь ласка, заповніть форму.</p>
                    <p>Оберіть спосіб оплати та спосіб доставки</p>
                </div>

                <div className="contact-details-container">
                    <h2 className='contact-details-title'>Контактні дані</h2>
                    <div className="single-contact">
                        <label htmlFor="">Ім’я одержувача</label>
                        <input type="text" placeholder='Ім’я одержувача'/>
                    </div>
                    <div className="single-contact">
                        <label htmlFor="">Телефон*</label>
                        <input type="text" placeholder='+380'/>
                    </div>
                    <div className="single-contact">
                        <label htmlFor="">E-mail</label>
                        <input type="text" placeholder='E-mail'/>
                    </div>
                </div>
                <div className="contact-details-container">
                    <h2 className='contact-details-title'>Доставка та оплата</h2>
                    <ul className='delivery-container'>
                        <li>
                            <span>Спосіб доставки</span>
                            <div>
                                <input type="radio" id='to-home'/>
                                <label htmlFor="to-home">Кур’єром додому</label>
                            </div>
                           <div>
                               <input type="radio" id='pickup'/>
                               <label htmlFor="pickup">Самовивіз</label>
                           </div>
                        </li>
                        <li>
                            <span>Спосіб розрахунку</span>
                            <div>
                                <input type="radio" id='card'/>
                                <label htmlFor="card">Банківською карткою онлайн</label>
                            </div>
                            <div>
                                <input type="radio" id='cash'/>
                                <label htmlFor="cash">Готівкою або карткою при отриманні</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='address-container'>
                    <label htmlFor="address">Адреса</label>
                    <input type="text" placeholder='Місто, вулиця, будинок, квартира' id='address'/>
                </div>
                <p className='compulsory'>*Поля, обяв’язкові до заповнення</p>
            </div>
            <div className="order-summary">
                <h2 className='in-cart-title'>Товари у кошику</h2>
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className='product-item'>
                            <ProductInCart product={product} />
                        </li>
                    ))}
                </ul>

                <div className='order-sum'>
                    <p> Сума замовлення:</p>
                    <span>{products.reduce((total, product) => total + product.price, 0)} грн</span>
                </div>

                <button className="place-order-btn" onClick={handlePlaceOrder}>Підтвердити замовлення</button>
                {showModal && <ConfirmModal onClose={handleCloseModal} />}
            </div>
        </div>
    );
};

export default Order;
