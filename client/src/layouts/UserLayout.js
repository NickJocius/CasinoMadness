import React from 'react';
import TopNav from '../components/navs/TopNav';

const UserLayout = ({ children, ...rest }) => {
    return (
        <div className={`UserLayout h-screen`}>
            <TopNav />
            <div className={``}>
                {children}
            </div>
        </div>
    );
};

export default UserLayout;
