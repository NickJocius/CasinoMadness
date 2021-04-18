import React from 'react';
import TopNav from '../../components/navs/TopNav';
import MainHeader from '../../components/headers/MainHeader';

const Home = () => {
    return (
        <div className={`Home w-full h-screen m-0 bg-black`}>
            <TopNav />
            <MainHeader />
            <div className={`HomeMain w-full m-0 p-2 h-min-full`}>
                <h1 className={`text-center p-4 my-4 text-azure`} id={`Home_title`}>Welcome To Casino Madness</h1>
            </div>

        </div>
    );
};

export default Home;
