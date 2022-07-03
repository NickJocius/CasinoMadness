import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, updateProfile } from '../../functions/profile';
import GameHeader from '../../components/headers/GameHeader';
import PokerTable from '../../components/gameTables/PokerTable';
import GameButtons from '../../components/actionButtons/GameButtons';
import Instructions from '../../components/instructions/Card5Instructions';
import PokerOdds from '../../components/gameOdds/PokerOdds';

// deck functions
import { newDeck, dealTo } from '../../functions/deck';

// Hand Class
import { Hand, dealReplacements } from '../../functions/hand';

// User InitialState
const initialState = {
    _id: '',
    bank: 0,
    wins: { drawpoker: 0 },
    losses: { drawpoker: 0 }
}

const Poker = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);
    const [wins, setWins] = useState(0);
    const [loss, setLoss] = useState(0);
    const [loading, setLoading] = useState(false);

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
        loadProfile();
    }, [updateProfile])

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
    }// end updateWins()
    const updatelosses = () => {
        setLoss(prevloss => prevloss + 1);
    }// end updateLosses()

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

    const handleDeal = () => {
        setDealDisabled(true);
        setDrawDisabled(false);
        setStandDisabled(false);
        if (deck.length > 5) {
            setFaceDown(false);
            if (values.bank >= 0 && values.bank >= currentBet) {
                const myHand = dealTo(deck, 5);
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
            updateWins();
        } else if (odds <= 0) {
            updatelosses();
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

    const handleSave = () => {
        console.log(values);
        updatedProfile({
            bank: values.bank,
            wins: { drawpoker: wins },
            losses: { drawpoker: loss }
        })
    }

    //Method to replace a card with a one from the deck
    const replaceFromDeck = (rankValue, suit) => {
        const newHand = [...playerHand];

        let card = newHand.find(value => value.rankValue === rankValue && value.suit === suit);
        setReplacing([...replacing, card]);
    } // end replaceFromeDeck()

    const removeFromReplace = (rank, suit) => {
        const newArray = replacing.filter((c) => (c.rank !== rank && c.suit !== suit));
        setReplacing(newArray);
    }// end removeFromReplace()


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
            <PokerOdds />
        </main>
    );
};

export default Poker;
