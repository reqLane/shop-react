import React, { useState } from 'react';
import './AccountDashboard.css';
import SelectedProfileContent from "../EditProfileContent/EditProfileContent.jsx";
import ChangePasswordContent from "../ChangePasswordContent/ChangePasswordContent.jsx";
import OrdersContent from "../OrdersContent/OrdersContent.jsx";

const AccountDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='account-container'>
            <div className='account-path'>
                <p>Main > Account Page</p>
            </div>
            <h1 className='account-title'>Your Account</h1>

            <div className="account-content">
                <ul className="account-left-section">
                    <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')}>Change Profile</li>
                    <li className={activeTab === 'password' ? 'active' : ''} onClick={() => handleTabChange('password')}>Change Password</li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => handleTabChange('orders')}>My Orders</li>
                    <li>Logout</li>
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
