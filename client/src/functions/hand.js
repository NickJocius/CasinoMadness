export class Hand {

    //Constructor for Hand
    constructor(playerHand) {
        this.cards = [...playerHand];
    } //end Hand Constructor

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
