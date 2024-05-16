import React from 'react';
const ChangePasswordContent = () => {

    const onPasswordChangeSubmit = async () => {
        const currentPasswordField = document.getElementById('current-password');
        const newPasswordField = document.getElementById('new-password');
        const newPasswordConfirmField = document.getElementById('new-password-confirm');
        const currentPassword = currentPasswordField.value;
        const newPassword = newPasswordField.value;
        const newPasswordConfirm = newPasswordConfirmField.value;
        if (newPassword === newPasswordConfirm) {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('loggedInUser');
            const userId = user ? JSON.parse(user).userId : '-1';
            const body = {
                password: currentPassword,
                newPassword: newPassword
            }
            const response = await fetch(`http://localhost:8080/api/users/${userId}/password-change`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (response.status === 200) {
                currentPasswordField.value = '';
                newPasswordField.value = '';
                newPasswordConfirmField.value = '';
                console.log("Success changing password");
            }
            else if (response.status === 403) {
                console.error('403 Forbidden changing user password');
            }
        }
    }

    return (
        <div className='selected-profile-wrapper'>
            <h3 className='selected-profile-title'>Change Password</h3>
            <div className="selected-profile-form">
                <div className="single-form-container">
                    <label>Current Password</label>
                    <input type="password" placeholder="Current Password" id='current-password' />
                </div>
                <div className="single-form-container">
                    <label>New Password</label>
                    <input type="password" placeholder="New Password" id='new-password' />
                </div>
                <div className="single-form-container">
                    <label>Re-enter New Password</label>
                    <input type="password" placeholder="Re-enter new password" id='new-password-confirm' />
                </div>
            </div>
            <button type="submit" className='selected-profile-submit-btn' onClick={onPasswordChangeSubmit}>Save changes</button>
        </div>
    );
};

export default ChangePasswordContent;
