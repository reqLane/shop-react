import React, {useEffect, useState} from 'react';
import './AuthModal.css';
import { useDispatch, useSelector } from 'react-redux';
import {loginUser,registerUser,setUser} from "../../authSlice.js";

const AuthModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', surname: '', phone:'', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth.error);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authStatus === 'succeeded' && activeTab === 'login') {
            setActiveTab('login');
            const userData = JSON.parse(localStorage.getItem('loggedInUser'));
            dispatch(setUser(userData));
            onClose();
        }
    }, [authStatus,dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError('');
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        if (error) {
            validateRegisterForm();
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (validateLoginForm()) {
            dispatch(loginUser(loginData));
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (validateRegisterForm()) {
            dispatch(registerUser(registerData));
        }
    };

    const validateLoginForm = () => {
        if (loginData.email.trim() === '' || loginData.password.trim() === '') {
            setError('All fields are required.');
            return false;
        }
        return true;
    };

    const validateRegisterForm = () => {
        if (registerData.name.trim() === '' || registerData.surname.trim() === '' ||
            registerData.email.trim() === '' || registerData.password.trim() === '' || registerData.confirmPassword.trim() === '') {
            setError('All fields are required.');
            return false;
        }
        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        if(registerData.phone.length < 10){
            setError('Phone number must be at least 10 digits');
            return false;
        }
        setError('');
        return true;
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
                    {error && <p className="error-message">{error}</p>}
                    {activeTab === 'login' ? (
                        <div className='login-container'>
                            <p>Please enter your account details to login</p>
                            <form className="login-form" onSubmit={handleLoginSubmit}>
                                <label>E-mail</label>
                                <input type="text" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="E-mail" />
                                <label>Password</label>
                                <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" />
                                <button type="submit" className='auth-submit-btn'>Login</button>
                            </form>
                        </div>
                    ) : (
                        <div className='register-container'>
                            <form className="register-form" onSubmit={handleRegisterSubmit}>
                                <label>First Name</label>
                                <input type="text" name="name" value={registerData.name} onChange={handleRegisterChange} placeholder="First Name" />
                                <label>Last Name</label>
                                <input type="text" name="surname" value={registerData.surname} onChange={handleRegisterChange} placeholder="Last Name" />
                                <label>E-mail</label>
                                <input type="text" name="email" value={registerData.email} onChange={handleRegisterChange} placeholder="E-mail" />
                                <label>Phone Number</label>
                                <input type="text" name="phone" value={registerData.phone} onChange={handleRegisterChange} placeholder="Phone Number" />
                                <label>Password</label>
                                <input type="password" name="password" value={registerData.password} onChange={handleRegisterChange} placeholder="Password" />
                                <label>Re-enter Password</label>
                                <input type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} placeholder="Re-enter Password" />
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
