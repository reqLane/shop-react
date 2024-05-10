import React, { useState } from 'react';
import './AuthModal.css';
import {Link} from "react-router-dom";

const AuthModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>Login</button>
                    <button className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`} onClick={() => handleTabChange('register')}>Register</button>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    {activeTab === 'login' ? (
                        <div className='login-container'>
                            <p>Please enter your account details to login</p>
                            <form className="login-form">
                                <label>E-mail</label>
                                <input type="text" placeholder="E-mail" />
                                <label>Password</label>
                                <input type="password" placeholder="Password" />
                                <Link to={`/profile`} type="submit" onClick={onClose} className='auth-submit-btn'>Login</Link>
                            </form>
                        </div>
                    ) : (
                        <div className='register-container'>
                            <form className="register-form">
                                <label>First Name</label>
                                <input type="text" placeholder="First Name" />
                                <label>Last Name</label>
                                <input type="text" placeholder="Last Name" />
                                <label>E-mail</label>
                                <input type="text" placeholder="E-mail" />
                                <label>Password</label>
                                <input type="text" placeholder="Password" />
                                <label>Re-enter Password</label>
                                <input type="text" placeholder="Re-enter Password" />
                                <button type="submit" className='auth-submit-btn'>Register</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
