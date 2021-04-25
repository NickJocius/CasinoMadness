import React from 'react';

const PokerButtons = ({
    handleDeal,
    dealDisabled,
    handleDraw,
    drawDisabled,
    standDisabled,
    handleStand,
    currentBet,
    setBet }) => {
    return (
        <div className={`container mx-auto flex flex-row justify-center flex-wrap mb-10`}>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${dealDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleDeal} disabled={dealDisabled}>Deal</button>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${drawDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleDraw} disabled={drawDisabled}>Draw</button>
            <button className={`rounded-full py-2 px-4 font-bold bg-red-blood ${standDisabled ? 'opacity-20' : 'opacity-100'}`} onClick={handleStand} disabled={standDisabled}>Stand</button>
            <label className={`inline-block py-2 px-4 font-bold text-black`}>Bet: </label>
            <select value={currentBet} onChange={setBet} className={`rounded-2xl`}>
                <option value={`25`}>$25</option>
                <option value={`50`}>$50</option>
                <option value={`100`}>$100</option>
                <option value={`150`}>$150</option>
                <option value={`250`}>$250</option>
            </select>
        </div>
    );
};

export default PokerButtons;
