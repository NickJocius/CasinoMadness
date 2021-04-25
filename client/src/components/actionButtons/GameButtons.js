import React from 'react';

const GameButtons = ({ makeDeck, handleReset, handleSave, bank, wins, losses }) => {
    return (
        <div className={`container mx-auto flex flex-col md:flex-row content-center justify-around py-8 flex-wrap text-xs md:text-lg`}>
            <button onClick={makeDeck} className={`text-white mx-2 rounded-full bg-red-blood py-2 px-4 font-bold hover:bg-white hover:text-red-blood focus:outline-none`}>New Game</button>
            <span className={`text-white mx-2 rounded-full text-center w-full md:w-1/6 font-bold text-bg-red-blood border-2 py-2 px-4 border-red-blood`}>Bank: ${bank}</span>
            <span className={`text-white mx-2 rounded-full text-center w-full md:w-1/6 font-bold text-bg-red-blood border-2 py-2 px-4 border-red-blood`}>Wins: {wins}</span>
            <span className={`text-white mx-2 rounded-full text-center w-full md:w-1/6 font-bold text-bg-red-blood border-2 py-2 px-4 border-red-blood`}>Losses: {losses}</span>
            <button className={`text-white mx-2 rounded-full bg-red-blood py-2 px-4 font-bold hover:bg-white hover:text-red-blood focus:outline-none`} onClick={handleSave}>Save</button>
            <button className={`text-white mx-2 rounded-full bg-red-blood py-2 px-4 font-bold hover:bg-white hover:text-red-blood focus:outline-none`} onClick={handleReset}>Reset</button>
        </div>
    );
};

export default GameButtons;
