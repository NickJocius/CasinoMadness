import React, { useState } from 'react';
import GameHeader from '../../components/headers/GameHeader';
import PokerTable from '../../components/gameTables/PokerTable';
import GameButtons from '../../components/actionButtons/GameButtons';
import Instructions from '../../components/instructions/Card5Instructions';

// deck functions
import { newDeck, dealTo } from '../../functions/deck';

// Hand Class
import { Hand, dealReplacements } from '../../functions/hand';

// User InitialState
const initialState = {
    _id: '',
    bank: 500,
    wins: { drawpoker: 0 },
    losses: { drawpoker: 0 }
}


const Poker = () => {

    const [values, setValues] = useState(initialState);

    // Deck and Cards
    const [deck, setDeck] = useState([]);
    const [playerHand, setPhand] = useState([]);
    const [replacing, setReplacing] = useState([]);
    const [faceDown, setFaceDown] = useState(false);

    // Bet and Buttons UI
    const [currentBet, setCurrentBet] = useState(25);
    const [dealDisabled, setDealDisabled] = useState(true);
    const [drawDisabled, setDrawDisabled] = useState(true);
    const [standDisabled, setStandDisabled] = useState(true);

    // Game outcome
    const [outcome, setOutcome] = useState("C'mon puddin, see if you can win!");
    const updateWins = () => {
        const curr = values.wins.drawpoker;
        const update = curr + 1;
        setValues({ ...values, curr: update });
    }
    const updateLosses = () => {
        const update = values.losses.drawpoker + 1;
        console.log(update);
        setValues({ ...values, losses: { ...values, drawpoker: update } });
    }


    // Bet Functions
    const placeBet = () => {
        const newBank = (values.bank - currentBet);
        setValues({ ...values, bank: newBank });
    }

    const payout = (odds) => {
        const newBank = (values.bank + (currentBet * odds));
        setValues({ ...values, bank: newBank });
    }

    const makeDeck = () => {
        setDeck([]);
        const myDeck = newDeck();
        setDeck(myDeck);
        setDealDisabled(false);
    }

    const handleDeal = () => {
        setDealDisabled(true);
        setDrawDisabled(false);
        setStandDisabled(false);
        if (deck.length > 5) {
            setFaceDown(false);
            if (values.bank >= 0 && values.bank >= currentBet) {
                const myHand = dealTo(deck);
                setPhand(myHand);
                placeBet();
            } else {
                setDealDisabled(true);
                setDrawDisabled(true);
                setStandDisabled(true);
                setOutcome("Not Enough Money!");
            }
        } else {
            reShuffle();
        }
    }

    const reShuffle = () => {
        setOutcome("Re-shuffling Deck");
        handleReset();
        makeDeck();
        setOutcome("Lets do this baby!");
    }

    const handleDraw = () => {
        setDrawDisabled(true);
        if (deck.length >= replacing.length) {
            const newPHand = dealReplacements(replacing, playerHand, deck, setDeck);
            setPhand(newPHand);
            setReplacing([]);
        } else {
            reShuffle();
        }

    }

    const handleStand = () => {
        setStandDisabled(true);
        setDrawDisabled(true);
        setDealDisabled(false);
        const myHand = new Hand(playerHand);
        let handtype = myHand.handType();
        setOutcome(handtype);
        let odds = myHand.handOdds();
        if (odds > 0) {
            console.log(odds);
            updateWins();
        } else if (odds <= 0) {
            console.log(odds);
            updateLosses();
        }
        payout(odds);
        setFaceDown(true);
    }

    const handleReset = () => {
        setDealDisabled(true);
        setDrawDisabled(true);
        setStandDisabled(true);
        setDeck([]);
        setPhand([]);
        setReplacing([]);
    }

    //Method to replace a card with a one from the deck
    const replaceFromDeck = (rankValue, suit) => {
        const newHand = [...playerHand];

        // loop through playerhand
        for (let i = 0; i < newHand.length; i++) {
            // check if card is equal to any card in hand
            if (newHand[i].rankValue === rankValue && newHand[i].suit === suit) {
                // assign new card equal to hand in playerhand
                let card = newHand[i];
                setReplacing([...replacing, card]);
            }
        }
    }

    const removeFromReplace = (rank, suit) => {
        const newArray = replacing.filter((c) => (c.rank !== rank && c.suit !== suit));
        setReplacing(newArray);
    }


    return (
        <main className={`w-full min-h-screen m-0 p-2 bg-black`}>
            <GameHeader title={"5 Card Draw"} titleBG={"cardspread"} />
            <PokerTable
                handleDeal={handleDeal}
                dealDisabled={dealDisabled}
                handleDraw={handleDraw}
                drawDisabled={drawDisabled}
                standDisabled={standDisabled}
                handleStand={handleStand}
                outcome={outcome}
                faceDown={faceDown}
                playerHand={playerHand}
                replaceFromDeck={replaceFromDeck}
                removeFromReplace={removeFromReplace}
            />
            <GameButtons
                makeDeck={makeDeck}
                handleReset={handleReset}
            />
            <Instructions />
        </main>
    );
};

export default Poker;
