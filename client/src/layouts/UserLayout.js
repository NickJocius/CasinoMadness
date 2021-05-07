import React from 'react';
import TopNav from '../components/navs/TopNav';

const UserLayout = ({ children, ...rest }) => {
    return (
        <div className={`UserLayout min-h-screen`}>
            <TopNav />
            <div className={`min-h-screen w-full`}>
                {children}
            </div>

        </div>
    );
};

export default UserLayout;
