import React, { useState } from 'react';
import '../../index.css';
import '../Navbar/Navbar.css';
import logo from '../../assets/images/logo.png';
import { RiSearchLine } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MenuItems } from '../../MenuItems/MenuItems.js';
import DropdownMenu from '../DropdownMenu/DropdownMenu.jsx';
import AuthModal from "../AuthModal/AuthModal.jsx";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleMouseEnter = (index) => {
        setActiveMenu(index);
        setActiveSubMenu(null); // Reset active submenu when hovering over a new menu item
    };

    const handleSubMenuEnter = (index) => {
        setActiveSubMenu(index);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
        setActiveSubMenu(null);
    };

    const handleUserIconClick = () => {
        setShowModal(true); // Open the modal when user icon is clicked
    };

    return (
        <>
            <nav className='nav-container'>
                <div className='nav-top-menu'>
                    <Link to='/'>
                        <img src={logo} width='124' alt='LORI' />
                    </Link>
                    <div className='nav-tel-container'>
                        <a href='#'>(093) 170-78-81</a>
                        <a href='#'>(093) 170-83-23</a>
                    </div>

                    <div className='search-container'>
                        <input className='nav-search-bar' type='text' placeholder='Пошук Меблів' />
                        <RiSearchLine className='search-icon' />
                    </div>

                    <div className='nav-auth-container'>
                        <button className='user-icon-link' onClick={handleUserIconClick}>
                            <FaUser className='user-icon' /> Увійти
                        </button>
                        <Link to='/cart' className='cart-icon-link'>
                            <AiOutlineShoppingCart className='shopping-cart-icon' />
                        </Link>
                    </div>
                </div>
                <div className='nav-links-container'>
                    <ul className='nav-items'>
                        {MenuItems.map((item, index) => (
                            <Link to={`${item.slug}`}
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span  className='nav-link'>
                                    {item.slug}
                                </span>
                                <DropdownMenu items={item.subMenu} slug={item.slug} category={item.category} isOpen={activeMenu === index} />
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>
            {showModal && <AuthModal onClose={()=> setShowModal(false)}/>}
        </>
    );
};

export default Navbar;
