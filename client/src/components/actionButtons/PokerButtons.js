import React from 'react';

const PokerButtons = ({ handleDeal, dealDisabled, handleDraw, drawDisabled, standDisabled, handleStand }) => {
    return (
        <div className={`container mx-auto flex flex-row justify-center flex-wrap mb-10`}>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${dealDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleDeal} disabled={dealDisabled}>Deal</button>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${drawDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleDraw} disabled={drawDisabled}>Draw</button>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${standDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleStand} disabled={standDisabled}>Stand</button>
        </div>
    );
};

export default PokerButtons;
