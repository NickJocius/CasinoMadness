import React from 'react';
import CardStack from '../cards/CardStack';
import PokerButtons from '../actionButtons/PokerButtons';
import Card2 from '../cardContainers/Card2';
import DealerCard2 from '../cardContainers/DealerCard2';
import styles from './BlackJTable.module.css';

const BlackJTable = ({
    outcome,
    handleDeal,
    dealDisabled,
    drawDisabled,
    handleDraw,
    standDisabled,
    faceDown,
    playerHand,
    dealerHand,
    handleStand,
    setBet,
    currentBet
}) => {
    return (
        <div className={`min-h-screen bg-superman bg-fixed bg-left bg-contain bg-no-repeat`} id={`${styles.BlackJTable}`}>
            <div className={`${styles.Hand} container-xl mx-auto min-h-screen w-full md:max-w-5xl mt-6 flex flex-col bg-opacity-70`}>
                <CardStack
                    outcome={outcome}
                />
                <DealerCard2
                    faceDown={faceDown}
                    Hand={dealerHand}
                />
                <Card2
                    faceDown={faceDown}
                    Hand={playerHand}
                />
                <PokerButtons
                    handleDeal={handleDeal}
                    dealDisabled={dealDisabled}
                    drawDisabled={drawDisabled}
                    handleDraw={handleDraw}
                    standDisabled={standDisabled}
                    handleStand={handleStand}
                    setBet={setBet}
                    currentBet={currentBet}
                />
            </div>

        </div>
    );
};

export default BlackJTable;
