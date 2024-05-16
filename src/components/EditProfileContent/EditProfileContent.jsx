import React from 'react';
import './EditProfileContent.css';

const EditProfileContent = () => {
    const range = (start, end) => Array.from({length: (end - start + 1)}, (_, i) => start + i);
    const days = range(1, 31);
    const months = range(1, 12);
    const years = range(1900, new Date().getFullYear());

    const handleProfileEdit = async () => {
        const nameField = document.getElementById('name-field');
        const surnameField = document.getElementById('surname-field');
        const fathernameField = document.getElementById('fathername-field');
        const phoneField = document.getElementById('phone-field');
        const dayField = document.getElementById('day-field');
        const monthField = document.getElementById('month-field');
        const yearField = document.getElementById('year-field');

        const name = nameField.value;
        const surname = surnameField.value;
        const fathername = fathernameField.value;
        const phone = phoneField.value;
        const day = dayField.value;
        const month = monthField.value;
        const year = yearField.value;
        const dateStr = formatDate(day, month, year);

        if (isValidPhoneNumber(phone)) {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('loggedInUser');
            const userId = user ? JSON.parse(user).userId : '-1';
            const body = {
                name: name,
                surname: surname,
                fathername: fathername,
                phone: phone,
                birthdate: dateStr
            }
            const response = await fetch(`http://localhost:8080/api/users/${userId}/profile-edit`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });
            if (response.status === 200) {
                nameField.value = '';
                surnameField.value = '';
                fathernameField.value = '';
                phoneField.value = '';
                dayField.value = '1';
                monthField.value = '1';
                yearField.value = '1900';
                console.log("Success editing profile");
            }
            else if (response.status === 403) {
                console.error('403 Forbidden editing user profile');
            }
        }
    }

    function formatDate(day, month, year) {
        const dayString = String(day).padStart(2, '0');
        const monthString = String(month).padStart(2, '0');
        return `${year}-${monthString}-${dayString}`;
    }

    function isValidPhoneNumber(phoneNumber) {
        const digitOnlyRegex = /^\d+$/;
        return digitOnlyRegex.test(phoneNumber) && phoneNumber.length >= 10 && phoneNumber.length <= 15;
    }

    return (
        <div className='selected-profile-wrapper'>
            <h3 className='selected-profile-title'>User Profile</h3>
            <div className="selected-profile-form">
                <div className="single-form-container">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" id='name-field' />
                </div>
                <div className="single-form-container">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" id='surname-field' />
                </div>
                <div className="single-form-container">
                    <label>Father Name</label>
                    <input type="text" placeholder="Father Name" id='fathername-field' />
                </div>
                <div className="single-form-container">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="380632116776" id='phone-field' />
                </div>
                <p>Date of birth</p>
                <div className="date-of-birth-container">
                    <div className="dob-dropdown">
                        <select id='day-field'>
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div className="dob-dropdown">
                        <select id='month-field'>
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div className="dob-dropdown">
                        <select id='year-field'>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className='selected-profile-submit-btn' onClick={handleProfileEdit}>Save changes</button>
            </div>
        </div>
    );
};

export default EditProfileContent;
