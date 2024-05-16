import React, {useEffect, useState} from 'react';
import './AccountDashboard.css';
import SelectedProfileContent from "../EditProfileContent/EditProfileContent.jsx";
import ChangePasswordContent from "../ChangePasswordContent/ChangePasswordContent.jsx";
import OrdersContent from "../OrdersContent/OrdersContent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logout, setUser} from "../../authSlice.js";

const AccountDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            dispatch(setUser(user));
        }
    }, [dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('cartItems');
        window.location.href = '/';
    };

    return (
        <div className='account-container'>
            <div className='account-path'>
                <p>Main > Account Page</p>
            </div>
            <h1 className='account-title'>Welcome, {user ? user.name : 'Guest'}</h1>

            <div className="account-content">
                <ul className="account-left-section">
                    <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>Change Profile</li>
                    <li className={activeTab === 'password' ? 'active' : ''} onClick={() => handleTabChange('password')}>Change Password</li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => handleTabChange('orders')}>My Orders</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
                <div className="account-right-section">
                    {activeTab === 'profile' && <SelectedProfileContent />}
                    {activeTab === 'password' && <ChangePasswordContent />}
                    {activeTab === 'orders' && <OrdersContent />}
                </div>
            </div>
        </div>
    );
};

export default AccountDashboard;
