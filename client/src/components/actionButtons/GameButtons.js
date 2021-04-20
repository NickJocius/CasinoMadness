import React from 'react';

const GameButtons = ({ makeDeck, handleReset }) => {
    return (
        <div className={`flex flex-row justify-around py-8`}>
            <button onClick={makeDeck} className={`text-white mx-2`}>New Game</button>
            <button className={`text-white mx-2`} onClick={handleReset}>Reset</button>
        </div>
    );
};

export default GameButtons;
