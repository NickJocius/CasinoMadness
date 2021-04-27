import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateProfile } from '../../functions/profile';
import GameHeader from '../../components/headers/GameHeader';
import BlackJTable from '../../components/gameTables/BlackJTable';
import GameButtons from '../../components/actionButtons/GameButtons';
import Instructions from '../../components/instructions/BlackJInstructions';

// deck functions
import { newDeck, dealTo } from '../../functions/deck';

// Hand Class
import { Hand, dealReplacements } from '../../functions/hand';

// User InitialState
const initialState = {
    _id: '',
    bank: 0,
    wins: { blackjack: 0 },
    losses: { blackjack: 0 }
}

const BlackJack = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [wins, setWins] = useState(0);
    const [loss, setLoss] = useState(0);
    const [loading, setLoading] = useState(false);

    // Deck and Cards
    const [deck, setDeck] = useState([]);
    const [playerHand, setPhand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [replacing, setReplacing] = useState([]);
    const [faceDown, setFaceDown] = useState(false);

    // Bet and Buttons UI
    const [currentBet, setCurrentBet] = useState(25);
    const [dealDisabled, setDealDisabled] = useState(true);
    const [drawDisabled, setDrawDisabled] = useState(true);
    const [standDisabled, setStandDisabled] = useState(true);

    let componentMounted = true;

    // Game outcome
    const [outcome, setOutcome] = useState("Man of Steel means nothing here!");

    const dispatch = useDispatch();

    const loadProfile = () => {
        let id = user._id;
        setLoading(true);
        getUserProfile(id, user.token)
            .then((res) => {
                setLoading(false);
                dispatch({
                    type: 'GET_PROFILE',
                    payload: res.data
                });
                setValues({ ...values, ...res.data });
            }).catch((err) => {
                setLoading(false);
                console.log(err.message);
            })

    }

    useEffect(() => {
        if (componentMounted) {
            loadProfile();
        }
        return () => { componentMounted = false; }
    }, [])

    const updatedProfile = (newValues) => {
        let userId = user._id;
        updateProfile(userId, { newValues }, user.token)
            .then((res) => {
                dispatch({
                    type: 'UPDATE_PROFILE',
                    payload: res.data
                });
                setValues({ ...values, ...res.data });

            }).catch((err) => {

                console.log(err.message);
            })
    }

    const updateWins = () => {
        setWins(prevwin => prevwin + 1);
    }
    const updatelosses = () => {
        setLoss(prevloss => prevloss + 1);
        console.log(loss);
        // update profile
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

    const setBet = (event) => { setCurrentBet(parseInt(event.target.value)); }

    const makeDeck = () => {
        setDeck([]);
        const myDeck = newDeck();
        setDeck(myDeck);
        setDealDisabled(false);
        setWins(values.wins.drawpoker);
        setLoss(values.losses.drawpoker);
    }

    const reShuffle = () => {
        setOutcome("Re-shuffling Deck");
        handleReset();
        makeDeck();
        setOutcome("Lets do this baby!");
    }

    const handleDeal = () => {
        setDealDisabled(true);
        setDrawDisabled(false);
        setStandDisabled(false);
        if (deck.length > 5) {
            setFaceDown(false);
            if (values.bank >= 0 && values.bank >= currentBet) {
                const myHand = dealTo(deck, 2);
                const dHand = dealTo(deck, 2);
                setDealerHand(dHand);
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

    const handleStand = () => {
        setStandDisabled(true);
        setDrawDisabled(true);
        setDealDisabled(false);
        const myHand = new Hand(playerHand);
        let handtype = myHand.handType();
        setOutcome(handtype);
        let odds = myHand.handOdds();
        if (odds > 0) {
            updateWins();
        } else if (odds <= 0) {
            updatelosses();
        }
        payout(odds);
        updatedProfile({
            wins: { drawpoker: wins },
            losses: { drawpoker: loss }
        })

        setFaceDown(true);
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


    const handleSave = () => {
        console.log(values);
        updatedProfile(values);
    }

    return (
        <main className={`w-full min-h-screen m-0 p-2 bg-black`}>
            <GameHeader title={"Black Jack"} titleBG={"blood1"} />
            <BlackJTable
                outcome={outcome}
                handleDeal={handleDeal}
                dealDisabled={dealDisabled}
                handleDraw={handleDraw}
                drawDisabled={drawDisabled}
                standDisabled={standDisabled}
                handleStand={handleStand}
                faceDown={faceDown}
                playerHand={playerHand}
                dealerHand={dealerHand}
                replaceFromDeck={replaceFromDeck}
                removeFromReplace={removeFromReplace}
                currentBet={currentBet}
                setBet={setBet}
            />
            <GameButtons
                makeDeck={makeDeck}
                handleReset={handleReset}
                handleSave={handleSave}
                bank={values.bank}
                wins={wins}
                losses={loss}
            />
            <Instructions />
        </main>
    );
};

export default BlackJack;
