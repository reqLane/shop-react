import React, {useEffect} from 'react';
import AccountDashboard from "../components/AccountDashboard/AccountDashboard.jsx";

const ProfilePage = ({checkAuth}) => {

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <div>
            <AccountDashboard/>
        </div>
    );
};

export default ProfilePage;
