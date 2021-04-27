import React from 'react';
import Card from '../cards/Card';

const Cards2 = ({ faceDown, Hand, removeFromReplace, replaceFromDeck }) => {



    return (
        <div className={`grid grid-cols-2 p-4 gap-8 min-h-full  md:mb-16 justify-self-end flex-grow`}>
            {Hand.map((c, index) =>
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

export default Cards2;
