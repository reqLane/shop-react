import React from 'react'
import '../../index.css'
import '../Navbar/Navbar.css'
import logo from '../../assets/images/logo.png';
import { RiSearchLine } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <>
            <nav className='nav-container'>
                <div className="nav-top-menu">
                    <a href="#">
                        <img src={logo} width='124'  alt="LORI"/>
                    </a>
                    <div className="nav-tel-container">
                        <a href="#">(093) 170-78-81</a>
                        <a href="#">(093) 170-83-23</a>
                    </div>

                    <div className="search-container">
                        <input className='nav-search-bar' type="text" placeholder='Пошук Меблів' />
                        <RiSearchLine className='search-icon' />
                    </div>

                    <div className="nav-auth-container">
                        <a href="#" className='user-icon-link'><FaUser className='user-icon'/> Увійти</a>
                        <a href="#" className='cart-icon-link'><AiOutlineShoppingCart className='shopping-cart-icon'/></a>
                    </div>
                </div>
                <div className='nav-links-container'>
                    <ul className='nav-items'>
                        <li><a href="#" className='nav-link'>Столи</a></li>
                        <li><a href="#" className='nav-link'>Стільці</a></li>
                        <li><a href="#" className='nav-link'>Лавки</a></li>
                        <li><a href="#" className='nav-link'>Корпусні меблі</a></li>
                        <li><a href="#" className='nav-link'>Ліжка</a></li>
                        <li><a href="#" className='nav-link'>Аксесуари</a></li>
                        <li><a href="#" className='nav-link'>Вироби з металу</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
