import React from 'react';
import Card from '../cards/Card';

const Cards5 = ({ faceDown, playerHand, removeFromReplace, replaceFromDeck }) => {



    return (
        <div className={`grid grid-cols-3 p-4 gap-8 min-h-full sm:grid-cols-4 md:grid-cols-5 md:mb-16 justify-self-end flex-grow`}>
            {playerHand.map((c, index) =>
                <Card
                    faceDown={faceDown}
                    key={index}
                    rank={c.rankValue}
                    suit={c.suit}
                    replaceFromDeck={replaceFromDeck}
                    removeFromReplace={removeFromReplace}

                />
            )}
        </div>
    );
};

export default Cards5;
