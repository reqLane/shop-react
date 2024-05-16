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
                        <p>«React Shop» – Ukrainian manufacturer, European quality!</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Information</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>About us</p>
                        <p>Partnership</p>
                        <p>Vacancies</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>For clients</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>Warranty</p>
                        <p>Payment & delivery</p>
                        <p>Exchange & return</p>
                        <p>Credit and payment in installments</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Contacts</h2>
                    </div>
                    <div className="footer-sub-category">
                        <p>Kyiv, Ukraine</p>
                        <p>St. Kryvonosa, 26</p>
                        <p>react-project@react.com.ua</p>
                    </div>
                </li>
                <li>
                    <div className="footer-top-category">
                        <h2>Subscribe</h2>
                    </div>
                    <div className="footer-sub-category">
                        <input type="text" placeholder='E-mail'/>
                        <p className='footer-follow-us'>Follow us</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
