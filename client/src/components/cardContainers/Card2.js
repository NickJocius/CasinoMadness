import React from 'react';
import Card from '../cards/Card';


const Cards2 = ({ faceDown, Hand }) => {



    return (
        <div className={`grid grid-cols-${Hand.length} p-4 gap-6 min-h-full  md:mb-16 justify-self-end flex-grow`}>
            {Hand.map((c, index) =>
                <Card
                    faceDown={faceDown}
                    key={index}
                    rank={c.rankValue}
                    suit={c.suit}
                />
            )}
        </div>
    );
};

export default Cards2;
