// Deck functions
export const newDeck = () => {

    //Create constructor function for Card object
    function Card(cardSuit, cardRank) {
        this.suit = cardSuit;
        this.ranks = cardRank;
        this.rankValue = null;
    }

    let thisDeck = new Array(52);
    let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    let ranks = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
        "Ace",
    ];
    let cardCount = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            thisDeck[cardCount] = new Card(suits[i], ranks[j]);
            thisDeck[cardCount].rankValue = j + 2;
            cardCount++;
        }
    }
    //Method to randomly sort the deck
    thisDeck.sort(function () {
        return 0.5 - Math.random();
    });

    return thisDeck;

}

//Method to deal cards from the deck into a  hand
export const dealTo = (deck) => {
    let pCards = new Array(5);
    for (let i = 0; i < pCards.length; i++) {
        pCards[i] = deck.shift();
    }
    return pCards;
}