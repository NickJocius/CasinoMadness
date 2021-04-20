import React from 'react';

const GameHeader = ({ title, titleBG }) => {
    return (
        <div className={`container mx-auto py-9 bg-${titleBG} bg-right bg-50 bg-no-repeat bg-opacity-25`}>
            <h1 className={`GameTitle TitleTransform md:text-6xl`}>{title}</h1>
        </div>
    );
};

export default GameHeader;
