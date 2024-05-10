import React from 'react';
const ChangePasswordContent = () => {
    return (
        <div className='selected-profile-wrapper'>
            <h3 className='selected-profile-title'>Change Password</h3>
            <div className="selected-profile-form">
                <div className="single-form-container">
                    <label>Current Password</label>
                    <input type="text" placeholder="Current Password" />
                </div>
                <div className="single-form-container">
                    <label>New Password</label>
                    <input type="text" placeholder="New Password" />
                </div>
                <div className="single-form-container">
                    <label>Re-enter New Password</label>
                    <input type="email" placeholder="Re-enter new password" />
                </div>
            </div>
            <button type="submit" className='selected-profile-submit-btn '>Save changes</button>
        </div>
    );
};

export default ChangePasswordContent;
