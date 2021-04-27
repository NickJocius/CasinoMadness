import React, { useState, useEffect } from 'react';
import CardBack from '../../assets/images/cardback.png';
import styles from './Card.module.css';

const Card = ({ faceDown, index, rank, suit, removeFromReplace, replaceFromDeck }) => {

    const [flip, setFlip] = useState(false);

    useEffect(() => {
        setFlip(false);
        console.log("used effect");
    }, [rank, suit])

    let suitAbbr = suit.substring(0, 1).toLowerCase();

    let src = `${suitAbbr}${rank}.png`;

    const discard = (e) => {
        if (flip === false) {
            setFlip(!flip);
            replaceFromDeck(rank, suit);

        } else if (flip === true) {
            setFlip(!flip);
            removeFromReplace(rank, suit);
        }

    }

    return (
        <div id={`${styles.card}`} className={` h-20 sm:h-32 md:h-40 bg-transparent rounded-md`} onClick={discard}>
            <img
                className={`w-full h-full rounded-md ${faceDown === true || flip === true ? `${styles.front}` : `${styles.back}`} object-scale-down md:object-contain`}
                src={CardBack}
                alt="card-back"
            />
            <img
                className={`w-full h-full rounded-md ${faceDown === true || flip === true ? `${styles.back}` : `${styles.front}`} object-scale-down md:object-contain`}
                src={`${process.env.PUBLIC_URL}/images/${src}`}
                alt={src}
            />
        </div>
    );
};

export default Card;
