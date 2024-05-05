import React from 'react';
import './Footer.css';
import logo from '../../assets/images/logo.png'
const Footer = () => {
    return (
        <div className='footer-container'>
            <ul className='footer-category-list'>
                <li className='footer-category-wrapper'>
                    <div className="footer-top-category">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="footer-sub-category">
                        <p>Фабрика «React Ecommerce Website» – український виробник, eвропейська якість!</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Інформація</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>Про нас</p>
                        <p>Партнерам</p>
                        <p>Вакансії</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Покупцям</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>Гарантія</p>
                        <p>Оплата та доставка</p>
                        <p>Обмін та повернення</p>
                        <p>Кредит та оплата частинами</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Контакти</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>м. Київ,</p>
                        <p>вул. Кривоноса, 26</p>
                        <p>react-project@.com.ua</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Підписка на розсилку</h2>
                    </div>
                    <div className="footer-sub-category">
                        <input type="text" placeholder='E-mail'/>
                        <p className='footer-follow-us'>Стежте за нами</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
