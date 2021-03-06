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
import { Hand, dealCard } from '../../functions/hand';

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
    const [playerTotal, setPlayerTotal] = useState(0);
    const [dealerHand, setDealerHand] = useState([]);
    const [dealerTotal, setDealerTotal] = useState(0);
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

    useEffect(() => {
        if (componentMounted) {
            const phand = new Hand(playerHand);
            let pTotal = phand.handTotal();
            const dhand = new Hand(dealerHand);
            let dTotal = dhand.handTotal();
            setDealerTotal(dTotal);
            setPlayerTotal(pTotal);
        }
        return () => { componentMounted = false; }

    }, [playerHand, dealerHand]);

    const updatedProfile = (newValues) => {
        let userId = user._id;
        updateProfile(userId, { newValues }, user.token)
            .then((res) => {
                dispatch({
                    type: 'UPDATE_PROFILE',
                    payload: res.data
                });
                //setValues({ ...values, ...res.data });

            }).catch((err) => {

                console.log(err.message);
            })
    }

    // update wins/losses
    const updateWins = () => {
        setWins(prevwin => prevwin + 1);

    }
    const updatelosses = () => { setLoss(prevloss => prevloss + 1); }

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
        if (deck.length > 4) {
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
        const dHand = new Hand(dealerHand);
        let dTotal = dHand.handTotal();
        let handtype = myHand.bjHandType(dTotal);
        setOutcome(handtype);
        let odds = myHand.bjOdds(dTotal);
        console.log(odds);
        if (odds > 0) {
            updateWins();
        } else if (odds <= 0) {
            updatelosses();
        }
        payout(odds);
        setValues({ ...values, wins: { ...values.wins, blackjack: wins } });
        //setValues({ ...values, losses: { ...values.losses, blackjack: loss } });
        //handleSave();
        // updatedProfile({
        //     wins: { blackjack: wins },
        //     losses: { blackjack: loss }
        // })

        setFaceDown(true);
    }

    function handleDraw() {

        if (deck.length > 0 && dealerTotal < 21) {
            const newCard = dealCard(deck, setDeck);
            setPhand(() => [...playerHand, newCard]);
        } else if (dealerHand === 21) {
            handleStand();
        } else {
            setDrawDisabled(true);
            reShuffle();
        }
    }

    const handleReset = () => {
        setDealDisabled(true);
        setDrawDisabled(true);
        setStandDisabled(true);
        setDeck([]);
        setPhand([]);
        setDealerHand([]);
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
