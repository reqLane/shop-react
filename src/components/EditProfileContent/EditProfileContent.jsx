import React from 'react';
import './EditProfileContent.css';

const EditProfileContent = () => {
    // Function to generate an array of numbers from start to end
    const range = (start, end) => Array.from({length: (end - start + 1)}, (_, i) => start + i);

    // Generate arrays for days, months, and years
    const days = range(1, 31);
    const months = range(1, 12);
    const years = range(1900, new Date().getFullYear());

    return (
        <div className='selected-profile-wrapper'>
            <h3 className='selected-profile-title'>User Profile</h3>
            <div className="selected-profile-form">
                <div className="single-form-container">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" />
                </div>
                <div className="single-form-container">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" />
                </div>
                <div className="single-form-container">
                    <label>E-mail</label>
                    <input type="email" placeholder="E-mail" />
                </div>
                <div className="single-form-container">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+380632116776" />
                </div>
                <p>Date of birth</p>
                <div className="date-of-birth-container">
                    <div className="dob-dropdown">
                        <select>
                            {days.map(day => (
                                <option key={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <div className="dob-dropdown">
                        <select>
                            {months.map(month => (
                                <option key={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div className="dob-dropdown">
                        <select>
                            {years.map(year => (
                                <option key={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className='selected-profile-submit-btn'>Save changes</button>
            </div>
        </div>
    );
};

export default EditProfileContent;
