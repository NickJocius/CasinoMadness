import React from 'react';
import headerImage from '../../assets/images/Casino.png';

const MainHeader = () => {
    // https://media.giphy.com/media/1DEJwfwdknKZq/giphy.gif 
    return (
        <header className={`hidden md:block md:w-full`}>
            <img src={headerImage} alt="Casino Madness Header" loading="lazy" className={`md:w-full`} />

        </header>
    );
};

export default MainHeader;
