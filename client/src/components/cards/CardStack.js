import React from 'react';
import Cards from '../../assets/images/cardstack.png';

const CardStack = ({ outcome }) => {
    return (

        <div className={`w-full flex flex-row justify-items-start justify-self-start flex-shrink my-8`}>
            <img src={Cards} alt="cardstack" id="cardstack" className={`object-scale-down h-24 md:h-32 lg:h-56 w-auto`} />
            <div className={`mx-auto flex justify-center justify-items-center content-center items-center flex-wrap`}>
                <p className={`text-center text-base md:text-4xl font-bangers`}>{outcome}</p>
            </div>

        </div>

    )
}

export default CardStack;