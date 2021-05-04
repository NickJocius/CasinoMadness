export class Hand {

    //Constructor for Hand
    constructor(playerHand) {
        this.cards = [...playerHand];
    } //end Hand Constructor

    // BlackJack methods
    // method to total up players hands
    handTotal() {
        let total = 0;
        let rTotal = 0;
        let result = this.cards.filter(c => c.rankValue != 14);

        for (const c of result) {
            rTotal += c.rankValue;
        }
        for (const c of this.cards) {
            if (c.rankValue > 10 && c.rankValue < 14) {
                total += 10;
            } else if (c.rankValue === 14 && rTotal === 20) {
                total += 1;
            } else if (c.rankValue === 14 && rTotal <= 10) {
                total += 11;
            } else if (c.rankValue === 14 && rTotal > 10) {
                total += 1;
            } else {
                total += c.rankValue;
            }
        }
        return total;
    }

    // test hand for blackjack
    hasBlackJack() {
        let finalTotal = this.handTotal();
        if (finalTotal === 21) {
            return true;
        }
    }

    // compare dealer and player hands
    isWinner(dealerTotal) {
        if (this.hasBlackJack() && dealerTotal != 21 || this.handTotal() > dealerTotal) {
            return true;
        }
    }

    // returns outcome text
    bjHandType(dealerTotal) {
        if (this.hasBlackJack() && this.isWinner(dealerTotal)) {
            return "BlackJack!";
        } else if (!this.hasBlackJack() && this.isWinner(dealerTotal)) {
            return "Winner";
        } else {
            return "Not a winner."
        }
    }

    // returns odds
    bjOdds(dealerTotal) {

        switch (this.bjHandType(dealerTotal)) {
            case "BlackJack!":
                return 5;
            case "Winner":
                return 5;
            case "Not a winner.":
                return 0;
            default:
                return 0;
        }
    }

    // Poker Methods
    // 
    highcard() {
        return Math.max.call(
            Hand,
            this.cards[0].rankValue,
            this.cards[1].rankValue,
            this.cards[2].rankValue,
            this.cards[3].rankValue,
            this.cards[4].rankValue
        );
    }
    hasFlush() {
        let firstSuit = this.cards[0].suit;
        return this.cards.every(function (card) {
            return card.suit === firstSuit;
        });
    }

    hasStraight() {
        this.cards.sort(function (a, b) {
            return a.rankValue - b.rankValue;
        });
        return this.cards.every(function (card, i, cards) {
            if (i > 0) {
                return cards[i].rankValue - cards[i - 1].rankValue === 1;
            } else {
                return true;
            }
        });
    }

    //Test for presence of straight flush
    hasStraightFlush() {
        return this.hasFlush() && this.hasStraight();
    }

    //Test for presence of royal flush
    hasRoyalFlush() {
        return this.hasStraightFlush() && this.highCard() === 14;
    }

    //Tests for duplicates in the hand
    hasSets() {
        //handSets summarizes the duplicates in the hand
        let handSets = {};
        this.cards.forEach(function (card) {
            if (handSets.hasOwnProperty(card.rankValue)) {
                handSets[card.rankValue]++;
            } else {
                handSets[card.rankValue] = 1;
            }
        });

        //stores the sets found in the hand
        let sets = "none";
        //stores the rank value of the first pair found in the hand
        let pairRank;

        //goes through each of the properties in the handSets object
        for (let cardRank in handSets) {
            if (handSets[cardRank] === 4) {
                sets = "Four of a kind";
            }
            if (handSets[cardRank] === 3) {
                if (sets === "Pair") {
                    sets = "Full House";
                } else {
                    sets = "Three of a Kind";
                }
            }
            if (handSets[cardRank] === 2) {
                if (sets === "Three of a Kind") {
                    sets = "Full House";
                } else if (sets === "Pair") {
                    sets = "Two Pair";
                } else {
                    sets = "Pair";
                    pairRank = cardRank;
                }
            }
        }

        if (sets === "Pair" && pairRank >= 11) {
            sets = "Jacks or Better";
        }
        return sets;
    }

    //Returns the type of  hand
    handType() {
        if (this.hasRoyalFlush()) {
            return "Royal Flush";
        } else if (this.hasStraightFlush()) {
            return "Straight Flush";
        } else if (this.hasFlush()) {
            return "Flush";
        } else if (this.hasStraight()) {
            return "Straight";
        } else {
            let sets = this.hasSets();
            if (sets === "Pair" || sets === "none") {
                sets = "No Winner";
            }
            return sets;
        }
    }

    //Returns the payout multiplier for each hand
    handOdds() {
        switch (this.handType()) {
            case "Royal Flush":
                return 250;
            case "Straight Flush":
                return 50;
            case "Four of a Kind":
                return 25;
            case "Full House":
                return 9;
            case "Flush":
                return 6;
            case "Straight":
                return 4;
            case "Three of a Kind":
                return 3;
            case "Two Pair":
                return 2;
            case "Jack or Better":
                return 1;
            default:
                return 0;
        }
    }

}

// function for adding new card to hand
export const dealCard = (deck, setDeck) => {

    const newDeck = [...deck];
    const newCard = newDeck.shift();
    setDeck(newDeck);
    return newCard;
}

// function for dealing replacement cards to hand
export const dealReplacements = (oldCards, playerHand, deck, setDeck) => {
    const oldPHand = [...playerHand];
    const newDeck = [...deck];

    let card1 = oldPHand.indexOf(oldCards[0]);
    let card2 = oldPHand.indexOf(oldCards[1]);
    let card3 = oldPHand.indexOf(oldCards[2]);
    let card4 = oldPHand.indexOf(oldCards[3]);
    let card5 = oldPHand.indexOf(oldCards[4]);

    const oldMinusR = oldPHand.filter(function (card) {
        return !oldCards.includes(card);
    })

    let replacementCount = oldPHand.length - oldMinusR.length;

    const replacements = new Array(replacementCount);
    for (let i = 0; i < replacements.length; i++) {
        replacements[i] = newDeck.shift();
    }
    setDeck(newDeck);

    if (card1 !== '') {
        oldPHand[card1] = replacements[0];
    }
    if (card2 !== '') {
        oldPHand[card2] = replacements[1];
    }
    if (card3 !== '') {
        oldPHand[card3] = replacements[2];
    }
    if (card4 !== '') {
        oldPHand[card4] = replacements[3];
    }
    if (card5 !== '') {
        oldPHand[card5] = replacements[4];
    }

    return oldPHand;
}

