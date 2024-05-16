import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../index.css';
import '../Navbar/Navbar.css';
import logo from '../../assets/images/logo.png';
import { RiSearchLine } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DropdownMenu from '../DropdownMenu/DropdownMenu.jsx';
import AuthModal from "../AuthModal/AuthModal.jsx";
import {setUser} from "../../authSlice.js";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchCategories();

        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            dispatch(setUser(storedUser));
        }
    }, [dispatch]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/categories');
            const data = await response.json();

            const categoriesWithSubcategories = await Promise.all(data.map(async category => {
                const subcategoriesResponse = await fetch(`http://localhost:8080/api/categories/${category.categoryId}/subcategories`);
                const subcategories = await subcategoriesResponse.json();
                return { ...category, subMenu: subcategories };
            }));

            setCategories(categoriesWithSubcategories);
        } catch (error) {
            console.error('Error fetching categories and subcategories:', error);
        }
    };

    const handleMouseEnter = (index) => {
        setActiveMenu(index);
        setActiveSubMenu(null);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
        setActiveSubMenu(null);
    };

    const handleUserIconClick = () => {
        if(user){
            window.location.href = '/profile';
        }else{
            setShowModal(true);
        }
    };

    const handleCartClick = (e) =>{
        e.preventDefault();
        if(user){
            window.location.href = '/cart';
        }else{
            setShowModal(true);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const searchRequest = event.target.value;

            if(searchRequest !== '') location.href = `/search?s=${searchRequest}`;
        }
    };

    return (
        <>
            <nav className='nav-container'>
                <div className='nav-top-menu'>
                    <Link to='/'>
                        <img src={logo} width='124' alt='LORI' />
                    </Link>
                    <div className='nav-tel-container'>
                        <a>(093) 170-78-81</a>
                        <a>(093) 170-83-23</a>
                    </div>

                    <div className='search-container'>
                        <input className='nav-search-bar' type='text' placeholder='Search Furniture' onKeyPress={handleKeyPress}  />
                        <RiSearchLine className='search-icon' />
                    </div>

                    <div className='nav-auth-container'>
                        {user ? (
                            <button className='user-icon-link'>
                                <FaUser className='user-icon' />
                                <span className='user-name' onClick={handleUserIconClick}>{user.name}</span>
                            </button>

                        ) : (
                            <button className='user-icon-link' onClick={handleUserIconClick}>
                                <FaUser className='user-icon' /> Sign In
                            </button>
                        )}

                        <Link to='/cart' className='cart-icon-link'>
                            <AiOutlineShoppingCart className='shopping-cart-icon' onClick={(e)=> handleCartClick(e)} />
                            <span className="cart-item-count">{cartItems.length}</span>
                        </Link>
                    </div>
                </div>
                <div className='nav-links-container'>
                    <ul className='nav-items'>
                        {categories.map((category) => (
                            <li
                                key={category.categoryId}
                                onMouseEnter={() => handleMouseEnter(category.categoryId)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    to={`/${category.name.toLowerCase()}`}
                                    state={{category: category}}
                                    key={category.categoryId}
                                    className='nav-link'
                                >
                                    {category.name}
                                </Link>
                                {activeMenu === category.categoryId && (
                                    <DropdownMenu category={category} isOpen={() => handleMouseEnter} />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            {showModal && <AuthModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Navbar;
