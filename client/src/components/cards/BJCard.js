import React, { useState, useEffect } from 'react';
import CardBack from '../../assets/images/cardback.png';
import styles from './Card.module.css';

const BJCard = ({ faceDown, index, rank, suit }) => {

    const [flip, setFlip] = useState(false);

    useEffect(() => {
        if (index === 1) {
            setFlip(true);
        } else {
            setFlip(false);
        }
    }, [rank, suit, index])

    let suitAbbr = suit.substring(0, 1).toLowerCase();

    let src = `${suitAbbr}${rank}.png`;



    return (
        <div id={`${styles.card}`} className={` h-20 sm:h-32 md:h-40 bg-transparent rounded-md`}>
            <img
                className={`w-full h-full rounded-md ${faceDown === false && flip === true ? `${styles.front}` : `${styles.back}`} object-scale-down md:object-contain`}
                src={CardBack}
                alt="card-back"
            />
            <img
                className={`w-full h-full rounded-md ${faceDown === false && flip === true ? `${styles.back}` : `${styles.front}`} object-scale-down md:object-contain`}
                src={`${process.env.PUBLIC_URL}/images/${src}`}
                alt={src}
            />
        </div>
    );
};

export default BJCard;