import React from 'react';
import CardStack from '../cards/CardStack';
import Card5 from '../cardContainers/Cards5';
import PokerButtons from '../actionButtons/PokerButtons';
import styles from './PokerTable.module.css';

const PokerTable = ({ handleDeal, dealDisabled, drawDisabled, handleDraw, standDisabled, handleStand, outcome, faceDown, playerHand, removeFromReplace, replaceFromDeck }) => {
    return (
        <div className={`min-h-screen bg-harley bg-fixed bg-left bg-contain bg-no-repeat`}>

            <div className={`${styles.Hand} container-xl mx-auto min-h-screen w-full md:max-w-5xl mt-6 flex flex-col`}>
                <CardStack outcome={outcome} />
                <Card5
                    faceDown={faceDown}
                    playerHand={playerHand}
                    replaceFromDeck={replaceFromDeck}
                    removeFromReplace={removeFromReplace}
                />
                <PokerButtons
                    handleDeal={handleDeal}
                    dealDisabled={dealDisabled}
                    drawDisabled={drawDisabled}
                    handleDraw={handleDraw}
                    standDisabled={standDisabled}
                    handleStand={handleStand}
                />
            </div>


        </div>
    );
};

export default PokerTable;
