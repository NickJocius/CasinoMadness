import React from 'react';
import BJCard from '../cards/BJCard';


const DealerCard2 = ({ faceDown, Hand }) => {



    return (
        <div className={`grid grid-cols-2 p-4 gap-8 min-h-full  md:mb-16 justify-self-end flex-grow`}>
            {Hand.map((c, index) =>
                <BJCard
                    faceDown={faceDown}
                    key={index}
                    index={index}
                    rank={c.rankValue}
                    suit={c.suit}
                />
            )}
        </div>
    );
};

export default DealerCard2;
