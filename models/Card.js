import Rank from './Rank';
import Suit from './Suit';

/**
 * @class Represents an inmutable card.
 */
export default class Card {

    _suit = undefined;
    _rank = undefined;

    /**
     * @constructor Provides a new inmutable card.
     * @param {Suit} suit The suit/color of the card.
     * @param {Rank} rank The rank/number of the card.
     */
    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
        Object.freeze(this);
    }

    /**
     * @description Returns the suit/color of the card.
     * @returns {Suit} The suit of the card
     */
    get suit() {
        return this._suit;
    }

    /**
     * @description Returns the rank/number of the card.
     * @returns {Suit} The rank of the card
     */
    get rank() {
        return this._rank;
    }

    get path() { 
        return `/img/${this._rank.value}${this._suit.value}.jpg`;
    }

}
