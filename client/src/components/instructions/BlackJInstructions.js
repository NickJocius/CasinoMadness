import React from 'react';

const BlackJInstructions = () => {
    return (
        <div className={`container mx-auto flex justify-center text-white text-xl leading-snug py-8 my-8`}>
            <p className={`text-center text-sm md:text-lg lg:text-xl`}>
                Select the size of your bet from the drop-down list box and then click
            the <strong>Deal</strong> button to deal your hand. To draw new cards,
            select the cards to discard and then click the
             <strong> Draw</strong> button. To stand, click the
            <strong> Stand</strong> button. Click the <strong> Save</strong> button
            to save your current bank and <strong>Load</strong> to load your saved
            bank. To the game and reset your bank, click the
             <strong> Reset</strong> button.
            </p>
        </div>
    );
};

export default BlackJInstructions;
