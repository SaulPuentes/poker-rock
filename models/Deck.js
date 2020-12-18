import Card from './Card';
import Rank from './Rank';
import Suit from './Suit';

/**
 * @class Represents a deck of cards.
 */
export default class Deck {

    _cards = [];

    /**
     * @constructor Provides a new ordered deck of 52 cards.
     */
    constructor() {
        this._cards = [];
        for(let r in Rank.enum.values) {
            for(let s in Suit.enum.values) {
                let rank = Rank.enum.values[r];
                let suit = Suit.enum.values[s];
                let card = new Card(suit, rank);
                this._cards.push(card);
            }
        }
        Object.seal(this);
    }

    /**
     * @description The amount of cards left in the deck.
     * @returns {number} The number of cards left in the deck.
     */
    get count() {
        return this._cards.length;
    }

    /**
     * @description Shuffles the cards in the deck.
     * @returns {undefined} Nothing.
     */
    shuffle() {
        /*
        for(let i = 0; i < this._cards.length; i++) {
            let j = Math.floor(Math.random() * this._cards.length);
            
            this._cards[i] = this._cards[j];
            //this._cards[i], this._cards[j] = this._cards[j], this._cards[i];
        }
        */
       this._cards.sort(() => Math.random() -0.5)
        
        return this._cards
    }

    /**
     * @description Removes and returns the top most card of the deck.
     * @returns {Card | undefined} The next card in the deck, ```undefined``` when there are no more cards.
     */
    nextCard() {
        
        //return this._cards.slice(1)[0];
        return this._cards.pop();
    }

}
